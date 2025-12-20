import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";

export default function OrdersPageAdmin(){
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [popupVisible, setPopupVisible] = useState(false);
    const [clickedOrder, setClickedOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState("pending"); //pending, completed, cancelled
    const [orderNotes, setOrderNotes] = useState("");

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders/"+page+"/"+limit,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            } )
            .then((res)=>{
                setOrders(res.data.orders);
                setTotalPages(res.data.totalpages);
                setIsLoading(false);
                console.log("Orders: ", orders)
            })
            .catch((error)=>{
                console.log(error)
            })
            }
        },[isLoading,page,limit]
    );

    return(
        <div className="w-full h-full flex flex-col justify-between">
            <table className="border-[2px]">
                <thead>
                    <tr>
                        <th className="p-[10px]">OrderId</th>
                        <th className="p-[10px]">Email</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Address</th>
                        <th className="p-[10px]">Phone</th>
                        <th className="p-[10px]">Status</th>
                        <th className="p-[10px]">Date</th>
                        <th className="p-[10px]">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(
                            (order)=>(
                                <tr key={order.orderId} className="border-b-[1px] hover:bg-blue-600 hover:text-white" onClick={()=>{
                                    setOrderStatus(order.status);
                                    setOrderNotes(order.notes);
                                    setClickedOrder(order);
                                    setPopupVisible(true);
                                }}>
                                    <td className="p-[10px]">{order.orderId}</td>
                                    <td className="p-[10px]">{order.email}</td>
                                    <td className="p-[10px]">{order.name}</td>
                                    <td className="p-[10px]">{order.address}</td>
                                    <td className="p-[10px]">{order.phone}</td>
                                    <td className="p-[10px]">{order.status}</td>
                                    <td className="p-[10px]">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="p-[10px] text-end">{order.total.toLocaleString("en-Us", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                    
                                </tr>
                            )
                        )
                        
                    }
                </tbody>
            </table>
            {
                // Actual Code
                // popupVisible && (
                //     <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                //         <div className="w-[550px] h-[550px] bg-white relative">
                //             <button className="absolute w-[30px] h-[30px] bg-red-600 border-[2px] border-red-600 text-white top-[-30px] right-[-30px] rounded-full cursor-pointer hover:bg-transparent hover:text-red-600"
                //             onClick={()=>{setPopupVisible(false)}}>
                //                 X
                //             </button>
                //             {
                //                 clickedOrder.orderId
                //             }
                //         </div>
                //     </div>
                // )

                popupVisible && (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50 p-4">
        <div className="relative">
            { 
              (orderStatus != clickedOrder.status || orderNotes != clickedOrder.notes) &&  <button className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-lg "
                onClick={async()=>{setPopupVisible(false);
                    try{
                        await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/orders/"+clickedOrder.orderId, {
                            status : orderStatus,
                            notes : orderNotes
                        },
                        {
                            headers : {
                                Authorization : `Bearer ${localStorage.getItem("token")}`
                            }

                        })
                        toast.success("Order status updated successfully");
                        setIsLoading(true);
                    }catch(error){
                        console.log(error);
                        toast.error("Failed to update order status");
                    }

                }}>
                    Save Changes
                </button>
            }
            {/* Main Container */}
            <div className="w-[650px] h-[620px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-blue-600">
                                {clickedOrder.orderId}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                clickedOrder.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : clickedOrder.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                            }`}>
                                {clickedOrder.status.charAt(0).toUpperCase() + clickedOrder.status.slice(1)}
                            </span>
                            <select className="ml-[4px] p-1 border-rounded" value={orderStatus} onChange={(e)=>{setOrderStatus(e.target.value)}}>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden p-5">
                    {/* Customer Information */}
                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Customer Information</h3>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Name</p>
                                <p className="text-sm font-medium text-gray-800 truncate">{clickedOrder.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Email</p>
                                <p className="text-sm font-medium text-gray-800 truncate">{clickedOrder.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Phone</p>
                                <p className="text-sm font-medium text-gray-800">{clickedOrder.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Date</p>
                                <p className="text-sm font-medium text-gray-800">
                                    {new Date(clickedOrder.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Address</p>
                            <p className="text-sm font-medium text-gray-800 line-clamp-2">{clickedOrder.address}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-700">Order Items ({clickedOrder.items.length})</h3>
                        </div>
                        <div className="h-[120px] overflow-y-auto border border-gray-200 rounded-lg">
                            <div className="divide-y divide-gray-100">
                                {clickedOrder.items.map((item, index) => (
                                    <div key={item._id || index} className="flex items-center gap-2 p-2 hover:bg-gray-50">
                                        <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                                            <p className="text-xs text-gray-500 truncate">{item.productId}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-sm font-medium text-gray-800">Rs{item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-1 text-xs text-gray-600">
                                                <span>×{item.qty}</span>
                                                <span className="font-semibold text-blue-600">
                                                    Rs{(item.price * item.qty).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Additional Notes</h3>
                        <div className="">
                            <textarea className="w-full h-full border rounded"
                            value={orderNotes}
                            onChange={(e)=>{setOrderNotes(e.target.value)}}>
                            </textarea>
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-700">Total Amount</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-blue-700">
                                        Rs{clickedOrder.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </span>
                                    <span className="text-xs text-gray-500">LKR</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Close Button */}
            <button 
                className="absolute w-[30px] h-[30px] bg-red-600 border-[2px] border-red-600 text-white top-[-10px] right-[-15px] rounded-full cursor-pointer hover:bg-transparent hover:text-red-600 transition-colors duration-200 flex items-center justify-center shadow-lg z-20"
                onClick={() => setPopupVisible(false)}
            >
                X
            </button>
        </div>
    </div>
)
            }
            <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setIsLoading={setIsLoading}/>
            
        </div>
    );
}