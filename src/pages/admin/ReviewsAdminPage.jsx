import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";

export default function ReviewsAdminPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [popupVisible, setPopupVisible] = useState(false);
    const [clickedReview, setClickedReview] = useState(null);
    const [reviewComment, setReviewComment] = useState("");

    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews"+"/"+page+"/"+limit)
                .then((res) => {
                    setReviews(res.data.reviews);
                    setTotalPages(res.data.totalPages);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [isLoading, page, limit]);

    async function editReview() {
        const reviewData = {
            reviewId: clickedReview.reviewId,
            productId: clickedReview.productId,
            rating: clickedReview.rating,
            comment: reviewComment
        }

        const token = localStorage.getItem("token");
        if(token == null){
            window.location.href = "/login";
            return;
        }
            axios.put(import.meta.env.VITE_BACKEND_URL+"/api/reviews/"+clickedReview.reviewId, reviewData,
            {
                headers: {
                    Authorization: `Bearer ` + token
                }
            }).then(
                (res)=>{
                    toast.success("Review updated successfully");
                    setPopupVisible(false);
                    setIsLoading(true);
                }
            ).catch(
                (error)=>{
                    toast.error("Failed to update review");
                    console.log(error);
                }
            )
    }

    async function deleteReview() {
        const token = localStorage.getItem("token");
        if(!token){
            window.location.href = "/login";
            return;
        }
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/reviews/"+clickedReview.reviewId,{
            headers: {
                Authorization: `Bearer ` + token
            }
        }).then(
            (res)=>{
                toast.success("Review deleted successfully");
                setPopupVisible(false);
                setIsLoading(true);
            }
        ).catch(
            (error)=>{
                toast.error("Failed to delete review");
                console.log(error);
            
        })
    }

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <table className="border-[2px]">
                <thead>
                    <tr>
                        <th className="p-[10px]">Review ID</th>
                        <th className="p-[10px]">Product ID</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Email</th>
                        <th className="p-[10px]">Comment</th>
                        <th className="p-[10px]">Rating</th>
                        <th className="p-[10px]">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review,index) => (
                        <tr 
                            key={index}
                            className="border-b-[1px] hover:bg-blue-600 hover:text-white"
                            onClick={() => {
                                setClickedReview(review);
                                setReviewComment(review.comment);
                                setPopupVisible(true);
                            }}
                        >
                            <td className="p-[10px]">{review.reviewId}</td>
                            <td className="p-[10px]">{review.productId}</td>
                            <td className="p-[10px]">{review.firstName + " " + review.lastName}</td>
                            <td className="p-[10px]">{review.email}</td>
                            <td className="p-[10px]">{review.comment}</td>
                            <td className="p-[10px]">{review.rating}</td>
                            <td className="p-[10px]">{new Date(review.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {popupVisible && clickedReview && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50 p-4">
                <div className="relative">
                    <div className="w-[500px] bg-white rounded-lg">
                        {/* Header */}
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold">Review Details</h3>
                            <button 
                                className="w-8 h-8 bg-red-600 text-white rounded-full hover:bg-transparent hover:text-red-600 border border-red-600"
                                onClick={() => setPopupVisible(false)}
                            >
                                X
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                            {/* Basic Info */}
                            <div className="mb-4">
                                <p className="mb-2"><strong>Review ID:</strong> {clickedReview.reviewId}</p>
                                <p className="mb-2"><strong>Product ID:</strong> {clickedReview.productId}</p>
                                <p className="mb-2"><strong>Name:</strong> {clickedReview.firstName} {clickedReview.lastName}</p>
                                <p className="mb-2"><strong>Email:</strong> {clickedReview.email}</p>
                                <p className="mb-2"><strong>Rating:</strong> {clickedReview.rating}/5</p>
                                <p className="mb-2"><strong>Date:</strong> {new Date(clickedReview.createdAt).toLocaleDateString()}</p>
                            </div>
                            
                            {/* Comment */}
                            <div className="mb-4 w-full">
                                <p className="font-bold mb-2">Comment:</p>
                                <textarea className="border p-2 rounded min-h-[100px] w-[450px]" name="comment" value={reviewComment} onChange={
                                    (e)=>{
                                        setReviewComment(e.target.value)
                                    }
                                }></textarea>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={editReview}>
                                    Edit
                                </button>
                                <button className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600" onClick={deleteReview}>
                                    Delete
                                </button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
)}

            <Paginator 
                currentPage={page} 
                totalPages={totalPages} 
                setCurrentPage={setPage} 
                limit={limit} 
                setLimit={setLimit} 
                setIsLoading={setIsLoading}
            />
        </div>
    );
}