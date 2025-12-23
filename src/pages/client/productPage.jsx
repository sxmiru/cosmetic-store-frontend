import axios from "axios";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage() {

const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [query, setQuery] = useState("");

useEffect(
    ()=> {
        if(isLoading){
            if(query == ""){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
                (res)=> {
                    setProducts(res.data)
                    setIsLoading(false)
                }
            )
            }else{
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/"+query).then(
                (res)=> {
                    setProducts(res.data)
                    setIsLoading(false)
                }
            )
            } 
        }
    },
    [isLoading]
)

    return(
        <div className="w-full h-full">
            <div className="w-full h-[100px] flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search products"
                    value={query}
                    onChange={(e)=>{
                        setQuery(e.target.value)
                        setIsLoading(true)
                    }}
                    className="w-[400px] h-[40px] border border-gray-300 rounded-lg p-[10px] m-[10px] text-lg"
                />
            </div>
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