// app/services/[id]/page.tsx
'use client';

import { Heart } from "lucide-react";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/app/lib/axios';
import Navbar from '@/app/components/Navbar';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [service, setService] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [error, setError] = useState('');

  function LikeButton() {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
      setIsLiked(!isLiked);
    };

  useEffect(() => {
    axios.get(`/services/${id}/`).then(res => setService(res.data));
    axios.get(`/services/${id}/reviews/`).then(res => setReviews(res.data));
  }, [id]);

  const submitReview = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    try {
      const res = await axios.post(`/services/${id}/reviews/`, newReview, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews([res.data, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    } catch {
      setError('Failed to submit review');
    }
  };

  const addToFavorites = async (serviceId: number) => {
  const token = localStorage.getItem('access');
  try {
    await axios.post('/favorites/', { service: serviceId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // alert('Service added to favorites!');
    setIsFavorite(true);
  } catch (err) {
    console.error(err);
    alert('Failed to add to favorites.');
  }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow rounded">
        {service && (
          <>
            <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
            <p className="text-gray-600 mb-1">Category: {service.category?.name}</p>
            <p className="text-gray-600 mb-1">Price: ₦{service.price}</p>
            <p className="text-gray-600 mb-1">Location: {service.location}</p>
            <p className="text-gray-600 mb-4">Availability: {service.availability}</p>
            <p>{service.description}</p>
          </>
        )}

        <hr className="my-6" />

        <section>
          <h3 className="text-xl font-semibold mb-2">Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r, i) => (
                <li key={i} className="border-b pb-2">
                  <p className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
                  <p className="text-gray-700 text-sm">{r.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <Heart
          fill={isLiked ? "red" : "none"}
          color={isLiked ? "red" : "black"}
          onClick={toggleLike}
          style={{ cursor: "pointer" }}
        />
        <form onSubmit={submitReview} className="mt-6 space-y-3">
          {error && <p className="text-red-600">{error}</p>}
          <label className="block">
            Rating
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              className="w-full p-2 border rounded mt-1"
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </label>
          <textarea
            placeholder="Leave a comment..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit Review</button>
        </form>
        <button
          className="w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700"
          onClick={() => addToFavorites(service.id)}
        >
          Add to Favorites
          
        </button>
      </main>
    </>
  );
}}



