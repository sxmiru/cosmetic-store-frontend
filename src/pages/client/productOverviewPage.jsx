import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";

export default function ProductOverviewPage() {

    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //loading, success, error
    useEffect(
        () => {
            if(status === "loading") {
                axios.get( import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`).then(
                    (res) => {
                        setProduct(res.data);
                        setStatus("success");
                    }
                ).catch(
                    (err) => {
                        console.error(err);
                        toast.error("Failed to load product");
                        setStatus("error");
                    }
                )
            }
        },[status]
    )
    return (
        <div className="w-full h-full">
            {
                status == "loading" && <Loader/>
            }
            {
                status == "success" && <div className="w-full h-full flex row">
                    <div className="w-[49%] h-full flex col justify-center items-center">
                        <ImageSlider images={product.images}/>
                    </div>
                    <div className="w-[49%] h-full bg-red-500">
                    </div>
                </div>
            }
            {
                status == "error" && <div>Error loading product</div>
            }
        </div>
    );
}