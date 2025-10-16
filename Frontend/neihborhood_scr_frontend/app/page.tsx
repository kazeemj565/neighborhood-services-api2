// app/page.tsx
import Navbar from './components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <section className="text-center bg-[url('/community.jpg')] bg-cover text-white py-20">
        <h1 className="text-4xl font-bold">Welcome to Neighborhood Services</h1>
        <p className="mt-2 text-lg">Browse local professionals in your area.</p>
        <a href="/services" className="inline-block mt-6 px-6 py-2 bg-blue-700 hover:bg-blue-800 rounded">Browse Services</a>
      </section>
      <footer className="bg-gray-200 p-4 text-center text-gray-600">© 2025 Neighborhood Services</footer>
    </>
  );
}



