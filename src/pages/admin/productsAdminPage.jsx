import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ProductsAdminPage(){
    return(
        <div className="w-full h-full border-[3px]">  
            <Link to="/admin/newProduct" className="fixed right-[30px] bottom-[30px] p-[15px] text-white border bg-black rounded-full shadow-2xl cursor-pointer">
                <BiPlus className="text-2xl"/>
            </Link>
        </div>
    );
}