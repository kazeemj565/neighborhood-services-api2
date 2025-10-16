// app/services/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from '@/app/lib/axios';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('/services/').then(res => setServices(res.data));
  }, []);

  const filtered = services.filter(service =>
    service.title.toLowerCase().includes(query.toLowerCase())
  );

  const addToFavorites = async (serviceId: number) => {
    try {
      await axios.post('/favorites/', { service: serviceId });
      alert('Added to favorites!');
    } catch (err) {
      console.error(err);
      alert('Failed to add to favorites.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Services</h2>
        <input
          type="text"
          placeholder="Search services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-6 p-2 border rounded w-full max-w-md"
        />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(service => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <div className="border rounded shadow p-4 hover:shadow-lg transition cursor-pointer">
                <img src="https://via.placeholder.com/300x200" alt="service" className="mb-2 rounded" />
                <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                <p className="text-gray-600 line-clamp-2 mb-2">{service.description}</p>
                <p className="text-sm text-gray-700">₦{service.price} - {service.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}


// const [isFavorite, setIsFavorite] = useState(false);

// useEffect(() => {
//   const token = localStorage.getItem('access');
//   if (!token || !service?.id) return;

//   const fetchFavorites = async () => {
//     try {
//       const res = await axios.get('/favorites/', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Check if this service is in the favorites list
//       const favoriteIds = res.data.map((fav: any) => fav.service.id);
//       if (favoriteIds.includes(service.id)) {
//         setIsFavorite(true);
//       }
//     } catch (err) {
//       console.error("Failed to fetch favorites:", err);
//     }
//   };

//   fetchFavorites();
// }, [service?.id]);




