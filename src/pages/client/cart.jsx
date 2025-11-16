import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function CartPage(){
    const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();
    console.log(cart);
    return (
        <div className="w-full h-screen flex flex-col py-[40px] items-center">
            {
                cart.map(
                    (item)=>{
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
                                            addToCart(item, -1);
                                            setCart(getCart());
                                        }
                                    }>-</button>
                                    <button className="mx-[10px]">{item.quantity}</button>
                                    <button className="flex items-center justify-center w-[30px] rounded-lg bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-400" onClick={
                                        ()=>{
                                            addToCart(item, 1);
                                            setCart(getCart());
                                        }
                                    }>+</button>
                                </div>
                                <div className="w-[190px] h-full flex justify-end items-center pr-[10px]">
                                    <span className="font-semibold">{(item.quantity * item.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                                <button className="w-[30px] h-[30px] absolute right-[-40px] cursor-pointer text-white bg-red-600 shadow rounded-full flex justify-center items-center border-[2px] border-red-600 hover:bg-white hover:text-red-600" onClick={
                                    ()=>{
                                        addToCart(item, -item.quantity)
                                        setCart(getCart());
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
                <button className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl border-[2px] border-blue-600 text-white font-semibold bg-blue-600 hover:bg-white hover:text-blue-600" onClick={
                    ()=>{
                        navigate("/checkout",
                            {
                                state: {items: cart}
                            }
                        )
                    }
                }>
                    Checkout
                </button>
            </div>
        </div>
    );
}