import { useState } from "react";
import { useEffect } from "react";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import Loader from "../../components/loader";

// const sampleProducts = [
//   {
//     productId: "COSM001",
//     name: "Hydrating Face Cream",
//     altNames: ["Moisturizer", "Day Cream"],
//     labelledPrice: 25.99,
//     price: 19.99,
//     images: ["/images/facecream1.jpg"],
//     description: "A lightweight hydrating face cream enriched with hyaluronic acid to keep your skin moisturized all day.",
//     stock: 120,
//     isAvailable: true,
//     category: "skincare"
//   },
//   {
//     productId: "COSM002",
//     name: "Matte Liquid Lipstick",
//     altNames: ["Lip color", "Long wear lipstick"],
//     labelledPrice: 15.99,
//     price: 12.49,
//     images: ["/images/lipstick1.jpg"],
//     description: "Highly pigmented matte liquid lipstick that lasts up to 12 hours without smudging.",
//     stock: 80,
//     isAvailable: true,
//     category: "makeup"
//   },
//   {
//     productId: "COSM003",
//     name: "Vitamin C Serum",
//     altNames: ["Brightening Serum"],
//     labelledPrice: 30.00,
//     price: 25.00,
//     images: ["/images/serum1.jpg"],
//     description: "A potent Vitamin C serum that helps reduce dark spots and promotes a radiant complexion.",
//     stock: 50,
//     isAvailable: true,
//     category: "skincare"
//   },
//   {
//     productId: "COSM004",
//     name: "Volumizing Mascara",
//     altNames: ["Eyelash Enhancer"],
//     labelledPrice: 20.00,
//     price: 17.00,
//     images: ["/images/mascara1.jpg"],
//     description: "Volumizing mascara that lifts and separates lashes for a bold, dramatic look.",
//     stock: 75,
//     isAvailable: true,
//     category: "makeup"
//   },
//   {
//     productId: "COSM005",
//     name: "Nourishing Hair Oil",
//     altNames: ["Argan Oil", "Hair Treatment"],
//     labelledPrice: 22.99,
//     price: 18.99,
//     images: ["/images/hairoil1.jpg"],
//     description: "A blend of natural oils designed to nourish and strengthen hair while reducing frizz.",
//     stock: 60,
//     isAvailable: true,
//     category: "haircare"
//   }
// ];


export default function ProductsAdminPage(){
  const [products,setProducts] = useState([]);
  const [isLoading,setisLoading] = useState(true);
  useEffect(
    ()=>{
      if(isLoading){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
        (response)=> {
          setProducts(response.data);
          setisLoading(false);
        }
      )
      }
    },
    [isLoading]
  )
  const navigate = useNavigate();

    return(
        <div className="w-full h-full border-[3px]">
          {isLoading ? <Loader/> : <table>
            <thead>
              <tr>
                <th className="border-[1px] p-[10px]">Image</th>
                <th className="border-[1px] p-[10px]">Product ID</th>
                <th className="border-[1px] p-[10px]">Name</th>
                <th className="border-[1px] p-[10px]">Price</th>
                <th className="border-[1px] p-[10px]">Labelled Price</th>
                <th className="border-[1px] p-[10px]">Category</th>
                <th className="border-[1px] p-[10px]">Stock</th>
                <th className="border-[1px] p-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(
                (product,index)=>{
                  return (
                    <tr key={index}>
                      <td className="p-[10px]">
                        <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px] object-cover" />
                      </td>
                      <td className="p-[10px]">{product.productId}</td>
                      <td className="p-[10px]">{product.name}</td>
                      <td className="p-[10px]">{product.price}</td>
                      <td className="p-[10px]">{product.labelledPrice}</td>
                      <td className="p-[10px]">{product.category}</td>
                      <td className="p-[10px]">{product.stock}</td>
                      <td className="p-[15px] flex flex-row items-center justify-center">
                        <BiTrash className="text-red-500 cursor-pointer" onClick={
                          ()=>{
                            const token = localStorage.getItem("token");
                            if(token == null){
                              navigate("/login");
                              return;
                            }
                            axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/"+product.productId, {
                              headers : {
                                Authorization: `Bearer ${token}`
                              }
                            }
                          ).then(
                            (res)=>{
                              console.log("Product deleted successfully")
                              console.log(res);
                              toast.success("Product deleted successfully");
                              setisLoading(!true);
                            }
                          ).catch(
                            (error)=>{
                              console.error("Failed to delete product:", error);
                              toast.error("Failed to delete product");
                            }
                          )
                          }
                          } />
                          <BiEdit onClick={()=>{
                            navigate("/admin/updateProduct",
                              {
                                state : product
                              }
                            )
                          }} className="text-blue-800 cursor-pointer"/>
                      </td>
                    </tr>
                  )
                }
              )
            }
            </tbody>
          </table>}  
            <Link to="/admin/newProduct" className="fixed right-[30px] bottom-[30px] p-[15px] text-white border bg-black rounded-full shadow-2xl cursor-pointer">
                <BiPlus className="text-2xl"/>
            </Link>
        </div>
    );
}