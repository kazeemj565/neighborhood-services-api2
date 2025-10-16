
// 1. Navbar Component (app/components/Navbar.tsx)
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Neighborhood Services</Link>
      <div className="space-x-4">
        <Link href="/services">Services</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/favorites">Favorites</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </nav>
  );
}
