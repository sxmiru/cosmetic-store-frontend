import axios from "axios";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {

const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(
    ()=> {
        if(isLoading){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
                (res)=> {
                    setProducts(res.data)
                    setIsLoading(false)
                }
            )
        }
    },
    [isLoading]
)

    return(
        <div className="w-full h-full">
            {
                isLoading ? <Loader/> : 
                <div className="w-full flex flex-wrap gap-[30px] justify-center items-center p-[20px]">
                    {
                        products.map(
                            (product,index)=> {
                                return(
                                    <ProductCard key={index} product={product}/>
                                )
                            }
                        )
                    }
                </div>
            }
        </div>
    );
}