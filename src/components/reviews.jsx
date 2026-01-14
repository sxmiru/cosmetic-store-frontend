import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadFile from "../utils/mediaUpload";

export default function Reviews({productId}) {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const [images, setImages] = useState([]);
    const [reviewStatus, setReviewStatus] = useState("idle");
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editReview, setEditReview] = useState({ rating: 0, comment: "", images: []});
    const [editImages, setEditImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [isLoadingUser, setIsLoadingUser] = useState(true);

        useEffect(() => {
            if (isLoading) {
                axios.get(import.meta.env.VITE_BACKEND_URL + `/api/reviews/${productId}`)
                    .then((res) => {
                        setReviews(res.data.reviews);
                        setIsLoading(false);
                        setReviewStatus("success");
                    })
                    .catch((err) => {
                        console.error("Failed to load reviews:", err);
                    });
            }
        }, [isLoading]);

        useEffect(()=>{
            if(isLoadingUser){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then((res)=>{
            setUser(res.data);
            setIsLoadingUser(false);
            })
            .catch((error)=>{
            console.log("Faild to get user", error);
            })}
        }, [isLoadingUser])
        

        async function handleSubmitReview() {
            if (!newReview.comment.trim()) {
                toast.error("Please enter a comment");
                return;
            }
    
            const promisesArray = [];
    
            for (let i=0; i<images.length; i++){
                const promise = uploadFile(images[i])
                promisesArray[i] = promise
            }
            
            const responses = await Promise.all(promisesArray)
            console.log(responses)
    
            setReviewStatus("loading");
    
            const reviewId = `REV${Math.floor(1000 + Math.random() * 9000)}`;
           
            axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/reviews",
                {
                    reviewId: reviewId,
                    productId: productId,
                    rating: newReview.rating,
                    comment: newReview.comment,
                    images: responses
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                setReviews([res.data.review, ...reviews]); 
                setNewReview({ rating: 5, comment: "" });
                setImages([]);
                toast.success("Review submitted successfully!");
                setReviewStatus("idle");
            })
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) {
                    toast.error("Please login to submit a review");
                } else {
                    toast.error("Failed to submit review");
                }
                setReviewStatus("error");
            });
        };
    
    async function handleEditReview(reviewId) {
    if (!editReview.comment.trim()) {
        toast.error("Comment cannot be empty");
        return;
    }

    const promisesArray = [];

    for(let i=0; i<editImages.length; i++) {
        const promise = uploadFile(editImages[i]);
        promisesArray[i] = promise;
    }

    let responses = []; 

    if (promisesArray.length > 0) {
        responses = await Promise.all(promisesArray);
    } else {
        responses = editReview.images || [];
    }

    console.log("Responses", responses);

    setReviewStatus("loading");

    await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/api/reviews/${reviewId}`,
        {
            rating: editReview.rating,
            comment: editReview.comment,
            images: responses
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }
    )
    .then(() => {
        const updatedReviews = reviews.map((r) =>
            r.reviewId === reviewId
                ? { 
                    ...r, 
                    rating: editReview.rating, 
                    comment: editReview.comment,
                    images: responses 
                }
                : r
        );
        setReviews(updatedReviews);
        setEditingReviewId(null);
        setEditReview({ rating: 0, comment: "" });
        setEditImages([]);
        setReviewStatus("idle");
        toast.success("Review updated");
    })
    .catch(() => {
        toast.error("Failed to update review");
        setReviewStatus("error");
    });
}

    function handleDeleteReview(reviewId) {
        if (!window.confirm("Delete this review?")) return;

        axios.delete(
            import.meta.env.VITE_BACKEND_URL + `/api/reviews/${reviewId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
        .then(() => {
            setReviews(reviews.filter((r) => r.reviewId !== reviewId));
            toast.success("Review deleted");
        })
        .catch(() => {
            toast.error("Failed to delete review");
        });
    }


        const renderStars = (rating) => {
            return (
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
                            ★
                        </span>
                    ))}
                </div>
            );
        };
    return(
        <div className="mt-12 border-t pt-8">
                        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                        
                        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-semibold">Images:</label>
                                <input 
                                    multiple 
                                    type="file" 
                                    onChange={(e) => { setImages(e.target.files) }}
                                    className="w-full border-[1px] h-[40px] rounded-md shadow-2xl"
                                />
                                {images.length > 0 && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        {images.length} image{images.length > 1 ? 's' : ''} selected
                                    </p>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <label className="block mb-2">Rating:</label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className={`text-2xl ${star <= newReview.rating ? "text-yellow-500" : "text-gray-300"} hover:text-yellow-400`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block mb-2">Comment:</label>
                                <textarea
                                    className="w-full p-2 border rounded-lg"
                                    rows="4"
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    placeholder="Share your experience with this product..."
                                />
                            </div>
                            
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleSubmitReview}
                                disabled={reviewStatus === "loading" || !newReview.comment.trim()}
                            >
                                {reviewStatus === "loading" ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>

                        <div className="space-y-6">
                            {reviews && reviews.length === 0 ? (
    <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
) : (
    reviews.map((review, index) => (
        <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
                <div className="w-full">
                    <h4 className="font-semibold">
                        {review.firstName} {review.lastName}
                    </h4>

                    {editingReviewId === review.reviewId ? (
                        <>
                            <div className="flex space-x-1 mt-2">
                                {[1,2,3,4,5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() =>
                                            setEditReview({ ...editReview, rating: star })
                                        }
                                        className={`text-xl ${
                                            star <= editReview.rating
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                        }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                            <textarea
                                className="w-full mt-2 p-2 border rounded"
                                rows="3"
                                value={editReview.comment}
                                onChange={(e) =>
                                    setEditReview({
                                        ...editReview,
                                        comment: e.target.value
                                    })
                                }
                            />

                            <input multiple type="file" onChange={(e)=>{setEditImages(e.target.files)}}
                            className="border-[1px] w-full h-[40px] rounded-md shadow-2xl"/>
 
                            <div className="flex gap-2 mt-2">
                                <button
                                    className="px-3 py-1 bg-green-600 text-white rounded"
                                    onClick={() => handleEditReview(review.reviewId)}
                                >
                                    Save
                                </button>
                                <button
                                    className="px-3 py-1 bg-gray-400 text-white rounded"
                                    onClick={() => setEditingReviewId(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center space-x-2 mt-1">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <p className="text-gray-700 mt-2 mb-4">
                                {review.comment}
                            </p>
                        </>
                    )}
                </div>

                {review.email == user.email && <div className="flex gap-2">
                    <button
                        className="text-sm text-blue-600"
                        onClick={() => {
                            setEditingReviewId(review.reviewId);
                            setEditReview({
                                rating: review.rating,
                                comment: review.comment,
                                images: review.images || []
                            });
                            setEditImages([]);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="text-sm text-red-600"
                        onClick={() => handleDeleteReview(review.reviewId)}
                    >
                        Delete
                    </button>
                </div>}
            </div>

            {review.images && review.images.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Uploaded images:</p>
                    <div className="flex flex-wrap gap-2">
                        {review.images.map((image, imgIndex) => (
                            <img
                                key={imgIndex}
                                src={image}
                                alt="Review"
                                className="w-24 h-24 object-cover rounded-lg border cursor-pointer"
                                onClick={() => window.open(image, "_blank")}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
        ))
    )}

    </div>
</div>
    );
}