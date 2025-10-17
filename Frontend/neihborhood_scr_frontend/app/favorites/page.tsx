// app/favorites/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from '@/app/lib/axios';
// import Navbar from '../components/Navbar';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      setError('You must be logged in to view favorites.');
      return;
    }

  //   axios.get('/favorites/', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then(res => setFavorites(res.data))
  //     .catch(() => setError('Failed to fetch favorites.'));
  // }, []);

    axios.get('/favorites/', {
    headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      // console.log('Axios base URL:', axios.defaults.baseURL);
      console.log('Favorites data:', res.data);
      setFavorites(res.data.data);
    })
    .catch(err => {
      console.error('Favorites error:', err);
      setError('Failed to fetch favorites.');
    });
  }, []);

  const removeFavorite = async (id: number) => {
    const token = localStorage.getItem('access');
    try {
      await axios.delete(`/favorites/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { service: id },
      });
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch {
      alert('Failed to remove favorite');
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Favorites</h2>
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorites yet.</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((fav: any) => (
              <li
                key={fav.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <Link href={`/services/${fav.id}`} className="font-semibold hover:underline">
                    {fav.title}
                  </Link>
                  <p className="text-sm text-gray-600">{fav.description}</p>
                </div>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}


