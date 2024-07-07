import Footer from "./components/_partials/Footer";
import Sidebar from "./components/_partials/Sidebar";
import Navegation from "./components/routes/Navegation";
import Navbar from "./components/_partials/MixedNavbar";
// import MobileNavbar from "./components/_partials/MobileNavbar";
function App() {
  return (
    <div className="min-h-screen flex dark:bg-[#131314] border-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 h-screen overflow-auto transition-all duration-500 ease-in-out p-7">
          <Navegation />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
