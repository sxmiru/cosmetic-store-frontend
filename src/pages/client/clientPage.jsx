import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductPage from "./productPage";
import ProductOverviewPage from "./productOverviewPage";
import cartPage from "./cart";
import CartPage from "./cart";
import CheckOutPage from "./checkoutPage";
import ReviewsPage from "./reviewsPage";
import HomePage from "../homePage";
import AboutUs from "./aboutUS";
import ContactUs from "./contactUs";


export default function ClientWebpage(){
    return (
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-100px)]">
                <Routes path="/">
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                    <Route path="/reviews" element={<ReviewsPage/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckOutPage/>}/>
                    <Route path="/*" element={<h1 className="text-3xl text-center">Error 404</h1>}/>
                </Routes>
            </div>
        </div>
    );
}