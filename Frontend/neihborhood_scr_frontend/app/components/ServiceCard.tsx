// components/ServiceCard.tsx
export default function ServiceCard({ service }: any) {
  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
      <div className="mt-2 text-sm">Price: ${service.price}</div>
      <div className="text-xs text-gray-500">Location: {service.location}</div>
    </div>
  );
}