import { Link } from "react-router-dom";

export default function Header() {
    return (
            <header className="h-[100px] bg-blue-700 flex  justify-center items-center">
                <Link to="/" className="text-white text-xl ml-4">
                    Home
                </Link>
                <Link to="/products" className="text-white text-xl ml-4">
                    Prodcuts
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
            </header>       
    );
}