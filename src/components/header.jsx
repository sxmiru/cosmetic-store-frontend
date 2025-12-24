import { useState } from "react";
import { BiCart, BiStore, BiUser } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem("token");

    return (
            <header className="h-[100px] bg-accent flex  justify-center items-center relative">
                {isOpen &&
                    <div className="fixed z-[100] w-[100vw] h-[100vh] top-0 right-0 bg-black/50" >
                        <div className="h-full w-[350px] bg-white flex flex-col">
                            <div className="w-full h-[100px] bg-accent flex pl-[45px] flex-row items-center gap-[20px]">
                                <GiHamburgerMenu className="text-white text-4xl md:hidden" onClick={()=>{
                                    setIsOpen(false);
                                }}/>
                                <img className="w-[200px] h-[90px] object-cover cursor-pointer" src="logo.png" alt="logo" onClick={() => navigate("/")}/>
                            </div>
                            <div className="w-full h-full flex flex-col p-[45px] items-start">
                            <button className="text-accent text-3xl flex flex-row items-center m-5" onClick={()=>{
                                    setIsOpen(false);
                                    navigate("/")
                                }}>
                                <HiHome className="text-accent mr-2"/> Home
                            </button>
                            <button className="text-accent text-3xl flex flex-row items-center m-5" onClick={()=>{
                                    setIsOpen(false);
                                    navigate("/products")
                                }}>
                                <BiStore className="text-accent mr-2"/> Products
                            </button>
                            <button className="text-accent text-3xl flex flex-row items-center m-5" onClick={()=>{
                                    setIsOpen(false);
                                    navigate("/reviews")
                                }}>
                                <BiCart className="text-accent mr-2"/> Reviews
                            </button>
                            <button className="text-accent text-3xl flex flex-row items-center m-5" onClick={()=>{
                                    setIsOpen(false);
                                    navigate("/about-us")
                                }}>
                                <BiUser className="text-accent mr-2"/> About Us
                            </button>
                            <button className="text-accent text-3xl flex flex-row items-center m-5" onClick={()=>{
                                    setIsOpen(false);
                                    navigate("/contact-us")
                                }}>
                                <BsTelephone className="text-accent mr-2"/> Contact Us
                            </button>
                            </div>
                        </div>
                    </div>
                }
                <img className="w-[200px] h-[90px] object-cover absolute md:left-[0px] cursor-pointer" src="logo.png" alt="logo" onClick={() => navigate("/")}/>
                <GiHamburgerMenu className="text-white text-4xl absolute md:hidden left-[40px]" onClick={()=>{
                    setIsOpen(true);
                }}/>
                <div className="w-full justify-center items-center hidden md:flex">
                    <Link to="/" className="text-white text-xl ml-4">
                        Home
                    </Link>
                    <Link to="/products" className="text-white text-xl ml-4">
                        Products
                    </Link>
                    <Link to="/reviews" className="text-white text-xl ml-4">
                        Reviews
                    </Link>
                    <Link to="/about-us" className="text-white text-xl ml-4">
                        About Us
                    </Link>
                    <Link to="/contact-us" className="text-white text-xl ml-4">
                        Contact Us
                    </Link>
                    <Link to="/cart" className="absolute right-[160px]">
                        <BiCart className="text-white text-xl ml-4"/>
                    </Link>
                    {
                        token != null && <button onClick={()=>{
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                        className="absolute right-12 text-white text-xl ml-4 cursor-pointer">
                            Logout
                        </button>
                    }
                </div>    
            </header>       
    );
}