// // app/login/page.tsx
// 'use client';
// import { useState } from 'react';
// import axios from '@/app/lib/axios';
// import { useRouter } from 'next/navigation';
// import Navbar from '../components/Navbar';

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const router = useRouter();

//   const handleLogin = async (e: any) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/login/', { username, password });
//       localStorage.setItem('access', res.data.access);
//       localStorage.setItem('refresh', res.data.refresh);
//       setError('');
//       setSuccess(true);
//       setTimeout(() => router.push('/profile'), 1500);
//     } catch (err) {
//       setError('Login failed. Check your credentials.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           {error && <p className="text-red-600 text-sm text-center">{error}</p>}
//           {success && (
//             <p className="text-green-600 text-sm text-center">
//               Login successful! Redirecting to your profile...
//             </p>
//           )}
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-2 border rounded mb-3"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded mb-3"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-4 text-sm">
//           Don't have an account?{' '}
//           <a href="/register" className="text-blue-600 hover:underline">Register</a>
//         </p>
//       </main>
//     </>
//   );
// }



'use client';
import { useState } from 'react';
import axios from '@/app/lib/axios';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login/', { username: email, password });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      setError('');
      setSuccess(true);
      setTimeout(() => router.push('/profile'), 1500);
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
            Sign in
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            or <a href="/register" className="text-blue-600 hover:underline">create an account</a>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm text-center">
                Login successful! Redirecting...
              </p>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgotten your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl mr-2" />
            Sign in with Google
          </button>
        </div>
      </main>
    </>
  );
}
