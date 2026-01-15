import { useState, useEffect } from "react";
import axios from "axios";
import { Star, Quote, Calendar, User } from "lucide-react";
import Loader from "../../components/Loader"; 
import { useNavigate } from "react-router-dom";

export default function Reviews() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [sortBy, setSortBy] = useState("latest");

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        let filtered = [...reviews];
        
        // Filter by rating
        if (ratingFilter > 0) {
            filtered = filtered.filter(review => review.rating === ratingFilter);
        }
        
        // Sort reviews
        switch(sortBy) {
            case "highest":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "lowest":
                filtered.sort((a, b) => a.rating - b.rating);
                break;
            case "latest":
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }
        
        setFilteredReviews(filtered);
    }, [reviews, ratingFilter, sortBy]);

    async function fetchReviews() {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
            setReviews(response.data.reviews);
            setFilteredReviews(response.data.reviews);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setIsLoading(false);
        }
    }

    const StarRating = ({ rating }) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={18} 
                        className={i < rating ? "fill-[#F25912] text-[#F25912]" : "fill-gray-300 text-gray-300"}
                    />
                ))}
                <span className="ml-2 font-semibold text-gray-700">{rating}.0</span>
            </div>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <Loader />
                </div>
            ) : (
                <div className="container mx-auto px-6">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F25912]/10 mb-6">
                            <Quote className="w-8 h-8 text-[#F25912]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Customer <span className="text-[#F25912]">Reviews</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Real experiences from our beauty community. See what our customers love about CBC Cosmetic products.
                        </p>
                    </div>

                    {/* Stats Overview */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center p-6 bg-orange-50 rounded-xl">
                                <div className="text-3xl font-bold text-[#F25912] mb-2">
                                    {reviews.length}
                                </div>
                                <div className="text-gray-600">Total Reviews</div>
                            </div>
                            <div className="text-center p-6 bg-orange-50 rounded-xl">
                                <div className="text-3xl font-bold text-[#F25912] mb-2">
                                    {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
                                </div>
                                <div className="text-gray-600">Average Rating</div>
                            </div>
                            <div className="text-center p-6 bg-orange-50 rounded-xl">
                                <div className="text-3xl font-bold text-[#F25912] mb-2">
                                    {reviews.filter(r => r.rating >= 4).length}
                                </div>
                                <div className="text-gray-600">Positive Reviews</div>
                            </div>
                            <div className="text-center p-6 bg-orange-50 rounded-xl">
                                <div className="text-3xl font-bold text-[#F25912] mb-2">
                                    {new Set(reviews.map(r => r.productId)).size}
                                </div>
                                <div className="text-gray-600">Products Reviewed</div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 rounded-2xl shadow-lg">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Filter by Rating</h3>
                            <div className="flex flex-wrap gap-2">
                                <button 
                                    onClick={() => setRatingFilter(0)}
                                    className={`px-4 py-2 rounded-full ${ratingFilter === 0 ? 'bg-[#F25912] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    All Ratings
                                </button>
                                {[5, 4, 3, 2, 1].map(rating => (
                                    <button
                                        key={rating}
                                        onClick={() => setRatingFilter(rating)}
                                        className={`px-4 py-2 rounded-full flex items-center gap-2 ${ratingFilter === rating ? 'bg-[#F25912] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        <Star size={16} className={ratingFilter === rating ? "fill-white" : "fill-gray-400"} />
                                        {rating} Stars
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sort By</h3>
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-[#F25912] focus:ring-2 focus:ring-[#F25912]/20 outline-none"
                            >
                                <option value="latest">Latest First</option>
                                <option value="highest">Highest Rating</option>
                                <option value="lowest">Lowest Rating</option>
                            </select>
                        </div>
                    </div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map((review, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                    onClick={()=>{
                                        navigate(`/overview/${review.productId}`);
                                    }}
                                >
                                    {/* Review Header */}
                                    <div className="p-6 border-b">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F25912]/20 to-pink-200 flex items-center justify-center">
                                                <span className="font-bold text-[#F25912] text-lg">
                                                    {getInitials(review.firstName, review.lastName)}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">
                                                    {review.firstName} {review.lastName}
                                                </h4>
                                                <p className="text-sm text-gray-500">{review.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <StarRating rating={review.rating} />
                                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                <Calendar size={14} />
                                                <span>{formatDate(review.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Review Content */}
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-[#F25912]/10 flex items-center justify-center">
                                                    <Quote size={16} className="text-[#F25912]" />
                                                </div>
                                                <span className="text-sm font-semibold text-[#F25912]">Product #{review.productId}</span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Review Footer */}
                                    <div className="px-6 py-4 bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">
                                                Verified Purchase
                                            </span>
                                            <div className="text-xs px-3 py-1 rounded-full bg-[#F25912]/10 text-[#F25912] font-semibold">
                                                {review.rating >= 4 ? 'Highly Recommended' : 
                                                 review.rating >= 3 ? 'Satisfied' : 'Needs Improvement'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                                    <User size={40} className="text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
                                <p className="text-gray-600">Try changing your filter criteria</p>
                            </div>
                        )}
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-[#F25912] to-orange-500 rounded-3xl p-12 text-center text-white mb-12">
                        <h2 className="text-3xl font-bold mb-6">Share Your Experience</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Love our products? Help others discover the perfect beauty solutions by sharing your review.
                        </p>
                        <button 
                            onClick={() => window.location.href = "/products"}
                            className="bg-white text-[#F25912] px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                        >
                            Write a Review
                        </button>
                    </div>

                    {/* Rating Distribution */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Rating Distribution</h3>
                        <div className="max-w-2xl mx-auto">
                            {[5, 4, 3, 2, 1].map(rating => {
                                const count = reviews.filter(r => r.rating === rating).length;
                                const percentage = (count / reviews.length) * 100;
                                
                                return (
                                    <div key={rating} className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-2 w-24">
                                            <span className="font-semibold text-gray-700">{rating}</span>
                                            <Star size={16} className="fill-[#F25912] text-[#F25912]" />
                                            <span className="text-gray-500 text-sm">({count})</span>
                                        </div>
                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-[#F25912] rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="w-12 text-right font-semibold text-[#F25912]">
                                            {percentage.toFixed(1)}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}