  import { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  import {
    Star,
    Mail,
    Phone,
    MapPin,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Trash2
  } from "lucide-react";

  const MachineryReview = () => {
    const [formData, setFormData] = useState({
      userName: "",
      productId: "",
      rating: 5,
      comment: "",
      email: "",
    });
    const Api="http://localhost:8080/api/reviews/";

    const [reviews, setReviews] = useState([]);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch all reviews when component mounts
    useEffect(() => {
      fetchReviews();
    }, []);

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${Api}all`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitStatus(null);

      try {
        const response = await fetch(`${Api}add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        console.log(response.data);
        if (!response.ok) throw new Error("Failed to submit review");


        setSubmitStatus("success");
        fetchReviews();
        setFormData({  rating: 5, comment: "" });
      } catch (error) {
        console.error("Error submitting review:", error);
        setSubmitStatus("error");
      } finally {
        setSubmitting(false);
      }
    };

    const handleDelete = async (id) => {
      try {
        const response = await fetch(`${Api}delete/${id}`, { method:"DELETE" });
        {console.log("deleted");}
        if (!response.ok)
           throw new Error("Failed to delete review");
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    };

    const renderStars = (rating) => (
      Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={18} fill={i < rating ? "gold" : "none"} color={i < rating ? "gold" : "gray"} />
      ))
    );

    const socialLinks = [
      { Icon: Twitter, url: "https://twitter.com", color: "text-blue-400" },
      { Icon: Facebook, url: "https://facebook.com", color: "text-blue-600" },
      { Icon: Instagram, url: "https://instagram.com", color: "text-pink-500" },
      { Icon: Linkedin, url: "https://linkedin.com", color: "text-blue-700" },
    ];

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-gray-900 text-white p-8 rounded-xl flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
              <p className="text-gray-300 mb-6">
                Share your experience with our industrial machinery products. Your feedback helps us improve our offerings.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3"><Mail className="text-blue-400" /><span>mightytech@gmail.com</span></div>
              <div className="flex items-center space-x-3"><Phone className="text-green-400" /><span>+91 9512081506</span></div>
              <div className="flex items-center space-x-3"><MapPin className="text-red-400" /><span>Tech park, Bangalore</span></div>
            </div>

            <div className="flex space-x-4 mt-6">
              {socialLinks.map(({ Icon, url, color }) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className={`${color} hover:opacity-80 transition`}>
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Write a Review</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus === "success" && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">Review submitted successfully!</div>}
              {submitStatus === "error" && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">Error submitting review. Please try again.</div>}

              <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg" required />

              <div className="space-y-2">
                <label className="block text-gray-700">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className="focus:outline-none">
                      <Star size={24} fill={star <= formData.rating ? "gold" : "none"} color={star <= formData.rating ? "gold" : "gray"} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Share your experience with this product" className="w-full p-3 border border-gray-300 rounded-lg h-32" required />

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </motion.div>

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Customer Reviews</h3>

          {loading ? <div className="text-center py-8">Loading reviews...</div> : reviews.length === 0 ? <div className="text-center py-8 text-gray-500">No reviews yet. Be the first to review!</div> : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div key={review.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start">
                    <div><h4 className="font-semibold text-lg">{review.userName}</h4><div className="flex my-1">{renderStars(review.rating)}</div><p className="text-gray-600 text-sm mb-2">Product ID: {review.productId}</p><p className="text-gray-800">{review.comment}</p></div>
                    <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default MachineryReview;
