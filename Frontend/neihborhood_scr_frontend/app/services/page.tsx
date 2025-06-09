// app/services/page.tsx
'use client';
import { useEffect, useState } from 'react';
import axios from '@/app/lib/axios';
import ServiceCard from '@/app/components/ServiceCard';

type Service = {
  id: string | number;
  // Add other properties as needed, e.g. name: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    axios.get('/services/').then(res => setServices(res.data));
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Services</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </main>
  );
}