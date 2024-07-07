import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { auth, db } from "../firebase"; // Asegúrate de importar tu instancia de auth desde firebase.js
import { collection, getDocs, query, orderBy, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { differenceInMonths } from 'date-fns';

function Record() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [lastLogin, setLastLogin] = useState(null); 
  const [records, setRecords] = useState([]);
  const { language, translations } = useLanguage();
  const texts = translations[language];

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "No data"; // Handle case where dateTime is null or undefined
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };
    return new Date(dateTime).toLocaleString("en-US", options);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const lastSignInTime = user.metadata.lastSignInTime;
        setLastLogin(new Date(lastSignInTime));
        
        // Update user status to active when they sign in
        await updateDoc(doc(db, "users", user.uid), {
          disabled: false,
        });

        // Register the beforeunload event to update user status to inactive
        const handleBeforeUnload = async (event) => {
          event.preventDefault();
          await updateDoc(doc(db, "users", user.uid), {
            disabled: true,
          });
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      } else {
        setLastLogin(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const q = query(collection(db, "app"), orderBy("Income", "desc"));
        const querySnapshot = await getDocs(q);
        const recordsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecords(recordsList);
      } catch (error) {
        setError("Error fetching records: " + error.message);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("lastSignInTime", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersList = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    }, (error) => {
      setError("Error fetching users: " + error.message);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (recordId) => {
    try {
      const recordDoc = doc(db, "app", recordId);
      await deleteDoc(recordDoc);
      setRecords(records.filter(record => record.id !== recordId));
    } catch (error) {
      setError("Error deleting record: " + error.message);
    }
  };

  const filteredRecords = records.filter(record => {
    const incomeDate = new Date(record.Income);
    return differenceInMonths(new Date(), incomeDate) >= 6;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">{texts.record.record}</h1>
        </div>
      </header>
      <main className="flex-grow mb-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          
          <div className="mt-6 bg-white dark:bg-[#1E1F20] overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-semibold text-gray-900 dark:text-gray-100">{texts.record.records}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-[#2f2f2f]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.income}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.egress}</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">{texts.record.delete}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#1E1F20] divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{formatDateTime(record.Income)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{formatDateTime(record.Egress)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-red-600 dark:text-red-400 hover:text-red-900"
                          onClick={() => handleDelete(record.id)}
                        >
                          {texts.record.delete}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{texts.record.noData}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
          <div className="mt-6 bg-white dark:bg-[#1E1F20] overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-semibold text-gray-900 dark:text-gray-100">{texts.record.users}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-[#2f2f2f]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.user}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.email}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.lastLogin}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.status}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#1E1F20] divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.uid}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={user.photoURL || "https://i.ibb.co/fvbdcxW/default-avatar.png"} alt={user.displayName || "User avatar"} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{user.displayName || "No display name"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-300">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-300">{formatDateTime(user.lastSignInTime)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.disabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {user.disabled ? texts.record.inactive : texts.record.active}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Record;
