'use client';
import { useState } from 'react';
import axios from '@/app/lib/axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'Personal',
    gender: 'Male',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/register/', form);
      setSuccess(true);
      setError('');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      {/* ✅ Light background for whole page */}
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Registration
          </h2>

          {success ? (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-4 text-center">
              Registration successful! 🎉
              <div className="mt-3">
                <Link href="/login">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Go to Login
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* User type selector */}
              <div className="flex justify-center gap-6 mb-2 text-gray-700">
                {['Personal', 'Company'].map((type) => (
                  <label key={type} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      checked={form.userType === type}
                      onChange={(e) =>
                        setForm({ ...form, userType: e.target.value })
                      }
                      className="text-blue-600"
                    />
                    {type}
                  </label>
                ))}
              </div>

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Name"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
              />

              <div className="flex justify-center gap-6 text-gray-700">
                {['Male', 'Female'].map((g) => (
                  <label key={g} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                      className="text-blue-600"
                    />
                    {g}
                  </label>
                ))}
              </div>

              <p className="text-xs text-center text-gray-600">
                By clicking Register, you agree to our{' '}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>{' '}
                for <span className="font-semibold text-blue-700">KODEHA</span>
              </p>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          )}

          {!success && (
            <p className="text-center mt-4 text-sm text-gray-700">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
}


// 'use client';
// import { useState } from 'react';
// import axios from '@/app/lib/axios';
// import Link from 'next/link';
// import Navbar from '../components/Navbar';

// export default function RegisterPage() {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     userType: 'Personal',
//     gender: 'Male',
//   });
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleRegister = async (e: any) => {
//     e.preventDefault();
//     try {
//       await axios.post('/register/', form); // adjust endpoint as needed
//       setSuccess(true);
//       setError('');
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded-lg">
//         <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>

//         {success ? (
//           <div className="bg-green-100 text-green-700 p-4 rounded mb-4 text-center">
//             Registration successful! 🎉
//             <div className="mt-2">
//               <Link href="/login">
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                   Go to Login
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleRegister} className="space-y-4">
//             {/* User Type Selector */}
//             <div className="flex justify-center gap-4 mb-2">
//               {['Personal', 'Company'].map((type) => (
//                 <label key={type} className="flex items-center gap-1 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="userType"
//                     value={type}
//                     checked={form.userType === type}
//                     onChange={(e) => setForm({ ...form, userType: e.target.value })}
//                     className="text-blue-600"
//                   />
//                   {type}
//                 </label>
//               ))}
//             </div>

//             {/* Email Field */}
//             <input
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full p-2 border rounded"
//               required
//             />

//             {/* Username Field */}
//             <input
//               type="text"
//               placeholder="Name"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               className="w-full p-2 border rounded"
//               required
//             />

//             {/* Password Field */}
//             <input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full p-2 border rounded"
//               required
//             />

//             {/* Gender Selector */}
//             <div className="flex justify-center gap-4">
//               {['Male', 'Female'].map((g) => (
//                 <label key={g} className="flex items-center gap-1 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value={g}
//                     checked={form.gender === g}
//                     onChange={(e) => setForm({ ...form, gender: e.target.value })}
//                     className="text-blue-600"
//                   />
//                   {g}
//                 </label>
//               ))}
//             </div>

//             {/* Policy Notice */}
//             <p className="text-xs text-center text-gray-500">
//               By clicking Register, you agree to our{' '}
//               <Link href="/privacy-policy" className="text-blue-600 hover:underline">
//                 Privacy Policy
//               </Link>{' '}
//               for <span className="text-blue-600 font-medium">KODEHA</span>
//             </p>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-3"
//             >
//               Submit
//             </button>
//           </form>
//         )}

//         {!success && (
//           <p className="text-center mt-4 text-sm">
//             Already have an account?{' '}
//             <Link href="/login" className="text-blue-600 hover:underline">
//               Login
//             </Link>
//           </p>
//         )}
//       </main>
//     </>
//   );
// }
