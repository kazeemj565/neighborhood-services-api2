// app/register/page.tsx

'use client';
import { useState } from 'react';
import axios from '@/app/lib/axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/register/', form); // adjust endpoint if needed
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {success ? (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4 text-center">
            Registration successful! 🎉
            <div className="mt-2">
              <Link href="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Go to Login
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {error && <p className="text-red-600 text-center text-sm">{error}</p>}
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Register
            </button>
          </form>
        )}
        {!success && (
          <p className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        )}
      </main>
    </>
  );
}
