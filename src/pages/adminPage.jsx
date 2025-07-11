import { Link, Route, Routes } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[300px] h-full flex flex-col items-center">
        <span className="text-3xl font-bold my-5">Admin Panel</span>
        <Link className="flex items-center p-[20px] row h-[60px] w-full text-xl gap-[25px]" to="/admin/products"><FaBoxArchive/>Products</Link>
        <Link className="flex items-center p-[20px] row h-[60px] w-full text-xl gap-[25px]" to="/admin/orders"><FaBagShopping/>Orders</Link>
        <Link className="flex items-center p-[20px] row h-[60px] w-full text-xl gap-[25px]" to="/admin/users"><IoPeople/>Users</Link>
        <Link className="flex items-center p-[20px] row h-[60px] w-full text-xl gap-[25px]" to="/admin/settings"><IoMdSettings/>Settings</Link>
      </div>
      <div className="w-[calc(100%-300px)] h-full">
        <Routes path="/">
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/orders" element={<h1>Orders</h1>} />
        </Routes>
      </div>
    </div>
  );
}
