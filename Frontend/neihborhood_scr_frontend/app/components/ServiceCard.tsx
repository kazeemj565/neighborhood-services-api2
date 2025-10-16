// components/ServiceCard.tsx
'use client';
import Link from 'next/link';
export default function ServiceCard({ service }: any) {
  return (
    <Link href={`/services/${service.id}`}>
      <div className="border rounded-xl p-4 shadow hover:shadow-lg transition duration-200 bg-white dark:bg-gray-800 cursor-pointer">
        <h3 className="text-xl font-semibold">{service.title}</h3>
        <p className="text-sm text-gray-600">{service.description}</p>
        {/* <div className="mt-2 text-sm">Price: ${service.price}</div> */}
        <p className="text-sm text-gray-600">₦{service.price}</p>
        <div className="text-xs text-gray-500">Location: {service.location}</div>
      </div>
    </Link>
  );
}