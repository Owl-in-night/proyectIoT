import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { auth, db } from "../firebase"; // Asegúrate de importar tu instancia de auth desde firebase.js
import { collection, getDocs, query, orderBy, deleteDoc, doc, onSnapshot, updateDoc, where } from "firebase/firestore";
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
        const handleBeforeUnload = (event) => {
          event.preventDefault();
          event.returnValue = '';
          // Temporarily set the user to inactive
          updateDoc(doc(db, "users", user.uid), {
            disabled: true,
          }).then(() => {
            setTimeout(() => {
              // Reactivate the user if they stay on the page
              updateDoc(doc(db, "users", user.uid), {
                disabled: false,
              });
            }, 100);
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
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, "app"), where("uid", "==", user.uid), orderBy("Income", "desc"));
          const querySnapshot = await getDocs(q);
          const recordsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setRecords(recordsList);
        }
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
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 hidden md:table">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="bg-white dark:bg-[#1E1F20] p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      <strong>{texts.record.income}: </strong>{formatDateTime(record.Income)}
                    </div>
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      <strong>{texts.record.egress}: </strong>{formatDateTime(record.Egress)}
                    </div>
                    <div className="text-right mt-2">
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-900"
                        onClick={() => handleDelete(record.id)}
                      >
                        {texts.record.delete}
                      </button>
                    </div>
                  </div>
                ))}
                {filteredRecords.length === 0 && (
                  <div className="col-span-1 text-center text-sm text-gray-500 dark:text-gray-300">
                    {texts.record.noData}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-[#1E1F20] overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-semibold text-gray-900 dark:text-gray-100">{texts.record.users}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 hidden md:table">
                <thead className="bg-gray-50 dark:bg-[#2f2f2f]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.photo}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.user}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.status}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{texts.record.lastLogin}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#1E1F20] divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.uid}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{user.displayName || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        <span className={`inline-block w-2.5 h-2.5 mr-2 rounded-full ${user.disabled ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        {user.disabled ? texts.record.inactive : texts.record.active}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{formatDateTime(user.lastSignInTime)}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-center">{texts.record.noData}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {users.map((user) => (
                  <div key={user.uid} className="bg-white dark:bg-[#1E1F20] p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      <strong>{texts.record.user}: </strong>{user.displayName || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      <span className={`inline-block w-2.5 h-2.5 mr-2 rounded-full ${user.disabled ? 'bg-red-500' : 'bg-green-500'}`}></span>
                      {user.disabled ? texts.record.inactive : texts.record.active}
                    </div>
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      <strong>{texts.record.lastLogin}: </strong>{formatDateTime(user.lastSignInTime)}
                    </div>
                  </div>
                ))}
                {users.length === 0 && (
                  <div className="col-span-1 text-center text-sm text-gray-500 dark:text-gray-300">
                    {texts.record.noData}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && <p className="mt-4 text-red-500 dark:text-red-400">{error}</p>}
        </div>
      </main>
    </div>
  );
}

export default Record;
