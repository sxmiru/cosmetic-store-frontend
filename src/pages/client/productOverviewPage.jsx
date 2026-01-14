import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import Reviews from "../../components/reviews";

export default function ProductOverviewPage() {
    const params = useParams();
    const productId = params.productId
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    

    // Fetch product details
    useEffect(() => {
        if (status === "loading") {
            axios.get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`)
                .then((res) => {
                    setProduct(res.data);
                    setStatus("success");
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to load product");
                    setStatus("error");
                });
        }
    }, [status]);

    

    return (
        <div className="w-full h-full">
            {status === "loading" && <Loader />}
            
            {status === "success" && (
                <div className="w-full h-full">
                    {/* Product Details Section */}
                    <div className="w-full flex flex-col md:flex-row mb-8">
                        <h1 className="text-2xl my-4 font-bold text-center md:hidden">
                            {product.name}
                            <span className="font-light ml-2.5">{product.altNames.join(" | ")}</span>
                        </h1>
                        
                        <div className="w-full md:w-[49%] h-full flex col justify-center items-center">
                            <ImageSlider images={product.images} />
                        </div>
                        
                        <div className="w-full md:w-[49%] h-full flex flex-col items-center pt-[50px]">
                            <h1 className="text-2xl font-bold hidden md:block">
                                {product.name}
                                <span className="font-light ml-2.5">{product.altNames.join(" | ")}</span>
                            </h1>
                            <p className="text-lg p-2">{product.description}</p>
                            
                            <div className="w-full flex flex-col items-center mt-[20px]">
                                {product.labelledPrice > product.price ? (
                                    <div>
                                        <span className="text-2xl line-through mr-[20px]">
                                            {product.labelledPrice.toLocaleString("en-Us", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </span>
                                        <span className="text-3xl font-semibold">
                                            {product.price.toLocaleString("en-Us", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <span className="text-3xl font-semibold">
                                            {product.price.toLocaleString("en-Us", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="w-full flex flex-row justify-center items-center mt-[20px] gap-[10px]">
                                <button
                                    className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-900 border-[3px] border-blue-800 hover:bg-white hover:text-blue-900"
                                    onClick={() => {
                                        navigate("/checkout", {
                                            state: {
                                                items: [
                                                    {
                                                        productId: product.productId,
                                                        quantity: 1,
                                                        name: product.name,
                                                        image: product.images[0],
                                                        price: product.price,
                                                    },
                                                ],
                                            },
                                        });
                                    }}
                                >
                                    Buy Now
                                </button>
                                <button
                                    className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-500 border-[3px] border-blue-500 hover:bg-white hover:text-blue-900"
                                    onClick={() => {
                                        addToCart(product, 1);
                                        toast.success("Added to cart");
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <Reviews productId={productId}/>
                </div>
            )}
            {status === "error" && <div>Error loading product</div>}
        </div>
    );
}