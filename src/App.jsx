import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import ProductCard from "./components/productCard";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import ClientWebpage from "./pages/client/clientPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="flex items-center justify-center w-full h-screen bg-primary text-secondary">
              <Toaster position="top-right"/>
              <Routes path="/">
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/test" element={<TestPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/admin/*" element={<AdminPage/>} />
                <Route path="/*" element={<ClientWebpage/>}/>
              </Routes>
            </div>
          </GoogleOAuthProvider>
      </BrowserRouter>

      {/* <div className="w-full h-screen bg-blue-300">
        <div className="w-[600px] h-[600px] bg-black relative flex flex-col justify-center items-center" >
          <div className="w-[75px] h-[75px] bg-[#cbcb00] "></div>
          <div className="w-[75px] h-[75px] bg-[#ac0000]"></div>
          <div className="w-[75px] h-[75px] bg-[#00ac00] fixed right-[5px] bottom-[5px] rounded-full"></div>
          <div className="w-[75px] h-[75px] bg-[#ac00ac] absolute right-[5px] top-[5px]"></div>
          <div className="w-[75px] h-[75px] bg-[#00acac]"></div>
          <div className="w-[75px] h-[75px] bg-[#acac00]"></div>
        </div>
      </div> */}
    </>
  );
}

export default App;
