import { useEffect, useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckOutPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState(location.state.items || []);
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const[address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("Please login to checkout");
            navigate("/login");
            return;
        }else {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                setUser(res.data);
                setName(`${res.data.firstName} ${res.data.lastName}`)
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch user details");
                navigate("/login");
            });
        }
        
        if(location.state.items.length == 0){
        toast.error("Please select items to checkout")
        navigate("/products");
        return;
    }
    },[]);

    function getTotal(){
        let total = 0;
        cart.forEach(
            (item)=>{
                total += item.quantity * item.price;
            }
        )
           return total;
    }

    async function placeOrder(){
        
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login to place order");
            navigate("/login");
            return;
        }
        if(name == "" || address == "" || phone == ""){
            toast.error("Please fill all fields")
            return;
        }
        const order = {
            phone: phone,
            address: address,
            items: []
        }
        cart.forEach(
            (item)=>{
                order.items.push(
                    {
                        productId: item.productId,
                        qty: item.quantity
                    }
                )
            }
        );
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Order placed successfully");
            //navigate("/products");
        }catch(error){
            toast.error("Failed to place order. Please try again later.");
            console.error("Order placement error: ", error);
            return;
        }
    }

    console.log(cart);
    return (
        <div className="w-full h-screen flex flex-col py-[40px] items-center">
            {
                cart.map(
                    (item, index)=>{
                        return(
                            <div key={item.productId} className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center relative">
                                <img src={item.image} alt="product image" className="w-[100px] h-[100px] object-cover"/>
                                <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                                    <span className="font-bold">{item.name}</span>
                                    <span className="font-semibold">{item.price}</span>
                                </div>
                                <div className="w-[190px] h-full flex flex-row justify-center items-center">
                                    <button className="flex items-center justify-center w-[30px] rounded-lg bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-400" onClick={
                                        ()=>{
                                            const newCart = [...cart];
                                            newCart[index].quantity -= 1;
                                            if(newCart[index].quantity <= 0) {
                                                newCart.splice(index, 1);
                                            }
                                            setCart(newCart);
                                        }
                                    }>-</button>
                                    <button className="mx-[10px]">{item.quantity}</button>
                                    <button className="flex items-center justify-center w-[30px] rounded-lg bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-400" onClick={
                                        ()=>{
                                            const newCart = [...cart]; //copy array
                                            newCart[index].quantity += 1;
                                            setCart(newCart);
                                        }
                                    }>+</button>
                                </div>
                                <div className="w-[190px] h-full flex justify-end items-center pr-[10px]">
                                    <span className="font-semibold">{(item.quantity * item.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                                <button className="w-[30px] h-[30px] absolute right-[-40px] cursor-pointer text-white bg-red-600 shadow rounded-full flex justify-center items-center border-[2px] border-red-600 hover:bg-white hover:text-red-600" onClick={
                                    ()=>{
                                        setCart(prevCart => {
                                        const newCart = [...prevCart];
                                        newCart.splice(index, 1);
                                        return newCart;
                                        });
                                    }
                                }><BiTrash/></button>
                            </div>
                        );
                    } 
                )
            }
            <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
                <span className="font-bold text-2xl ">
                    Total: {getTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
                <button className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl border-[2px] border-blue-600 text-white font-semibold bg-blue-600 hover:bg-white hover:text-blue-600" 
                    onClick={placeOrder}>
                    Place Order
                </button>
            </div>
            <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-center">
                <input className="w-[250px] h-[40px] border border-gray-300 rounded-lg p-[10px] m-[10px]"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input className="w-[250px] h-[40px] border border-gray-300 rounded-lg p-[10px] m-[10px]"
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input className="w-[250px] h-[40px] border border-gray-300 rounded-lg p-[10px] m-[10px]"
                    type="text"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
        </div>
    );
}