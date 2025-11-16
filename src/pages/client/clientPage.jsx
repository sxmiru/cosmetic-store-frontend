import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductPage from "./productPage";
import ProductOverviewPage from "./productOverviewPage";
import cartPage from "./cart";
import CartPage from "./cart";
import CheckOutPage from "./checkoutPage";


export default function ClientWebpage(){
    return (
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-100px)]">
                <Routes path="/">
                    <Route path="/" element={<h1 className="text-3xl text-center">Welcome to the homepage</h1>}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                    <Route path="/reviews" element={<h1 className="text-3xl text-center">Reviews</h1>}/>
                    <Route path="/about-us" element={<h1 className="text-3xl text-center">About Us</h1>}/>
                    <Route path="/contact-us" element={<h1 className="text-3xl text-center">Contact Us</h1>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckOutPage/>}/>
                    <Route path="/*" element={<h1 className="text-3xl text-center">Error 404</h1>}/>
                </Routes>
            </div>
        </div>
    );
}