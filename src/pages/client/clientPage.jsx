import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";

export default function ClientWebpage(){
    return (
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-100px)] bg-green-400">
                <Routes path="/">
                    <Route path="/" element={<h1 className="text-3xl text-center">Welcome to the homepage</h1>}/>
                    <Route path="/products" element={<h1 className="text-3xl text-center">Products</h1>}/>
                    <Route path="/reviews" element={<h1 className="text-3xl text-center">Reviews</h1>}/>
                    <Route path="/about-us" element={<h1 className="text-3xl text-center">About Us</h1>}/>
                    <Route path="/contact-us" element={<h1 className="text-3xl text-center">Contact Us</h1>}/>
                    <Route path="/*" element={<h1 className="text-3xl text-center">Error 404</h1>}/>
                </Routes>
            </div>
        </div>
    );
}