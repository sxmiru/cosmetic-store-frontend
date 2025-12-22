import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function CartPage(){
    const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();
    console.log(cart);
    return (
        <div className="w-full h-screen flex flex-col px-[10px] py-[40px] items-center">
            {
                cart.map(
                    (item)=>{
                        return(
                            <div key={item.productId} className="w-full md:w-[800px] h-[200px] md:h-[100px] m-[10px] shadow-2xl flex flex-row items-center relative">
                                <div className="md:w-[100px] w-[200px] flex flex-col justify-center items-center">
                                    <img src={item.image} alt="product image" className="w-[100px] h-[100px] object-cover"/>
                                    <div className="h-full flex-col justify-center pl-[10px] flex md:hidden">
                                        <span className="font-bold text-center md:text-left">{item.name}</span>
                                        <span className="font-semibold text-center md:text-left">{item.price}</span>
                                    </div>
                                </div>
                                <div className="h-full flex-col justify-center pl-[10px] hidden md:flex">
                                        <span className="font-bold text-center md:text-left">{item.name}</span>
                                        <span className="font-semibold text-center md:text-left">{item.price}</span>
                                    </div>
                                <div className="w-[190px] h-full flex flex-row justify-center items-center text-4xl md:text-base">
                                    <button className="flex items-center justify-center w-[30px] rounded-lg bg-accent text-white font-bold cursor-pointer hover:bg-blue-400" onClick={
                                        ()=>{
                                            addToCart(item, -1);
                                            setCart(getCart());
                                        }
                                    }>-</button>
                                    <button className="mx-[10px]">{item.quantity}</button>
                                    <button className="flex items-center justify-center w-[30px] rounded-lg bg-accent text-white font-bold cursor-pointer hover:bg-blue-400" onClick={
                                        ()=>{
                                            addToCart(item, 1);
                                            setCart(getCart());
                                        }
                                    }>+</button>
                                </div>
                                <div className="w-[190px] h-full flex justify-end items-center pr-[10px] text-3xl md:text-xl">
                                    <span className="font-semibold">{(item.quantity * item.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                                <button className="w-[30px] h-[30px] absolute md:right-[-40px] md:top-[35px] top-[0px] right-[0px] cursor-pointer text-white bg-red-600 shadow rounded-full flex justify-center items-center border-[2px] border-red-600 hover:bg-white hover:text-red-600 " onClick={
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
            <div className="md:w-[800px] w-full h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
                <span className="font-bold md:text-2xl text-3xl ">
                    Total: {getTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
                <button className="absolute left-[10px] w-[150px] h-[50px] text-2xl md:text-base cursor-pointer rounded-lg shadow-2xl border-[2px] border-
                 text-white font-semibold bg-accent hover:bg-white hover:text-accent" onClick={
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