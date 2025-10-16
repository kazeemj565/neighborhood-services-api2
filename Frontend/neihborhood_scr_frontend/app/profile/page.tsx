// 'use client';
// import { useEffect, useState } from 'react';
// import axios from '@/app/lib/axios';
// import Navbar from '@/app/components/Navbar';

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     gender: '',
//     religion: '',
//     language: '',
//     bio: '',
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('access');
//       if (!token) {
//         setMessage('You must be logged in to view your profile.');
//         return;
//       }

//       try {
//         const res = await axios.get('/profile/', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(res.data);
//         setFormData({
//           first_name: res.data.first_name || '',
//           last_name: res.data.last_name || '',
//           gender: res.data.gender || '',
//           religion: res.data.religion || '',
//           language: res.data.language || '',
//           bio: res.data.bio || '',
//         });
//       } catch {
//         setError('Failed to fetch profile.');
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem('access');
//     try {
//       const res = await axios.patch('/profile/', formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const updated = await axios.get('/profile/', {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//       setProfile(updated.data);
//       setFormData({
//         first_name: updated.data.first_name || '',
//         last_name: updated.data.last_name || '',
//         gender: updated.data.gender || '',
//         religion: updated.data.religion || '',
//         language: updated.data.language || '',
//         bio: updated.data.bio || '',
//       });

//       setIsEditing(false);
//       setMessage('✅ Profile updated successfully!');
//       setTimeout(() =>{
//         setMessage('');
//       }, 3000)
//     } catch {
//       setMessage('❌ Failed to update profile.');
//       setTimeout(() => {
//         setMessage('');
//       }, 3000);
//     }
//   };

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 bg-gray-50">
//         <Navbar />
//         <p className="text-lg font-medium">{message || 'Loading profile...'}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//       <Navbar />

//       <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md border border-gray-200">
//         <h1 className="text-3xl font-semibold mb-6 text-gray-900 border-b pb-3">
//           My Profile
//         </h1>

//         {message && <p className="text-green-600 mb-3 font-medium">{message}</p>}
//         {error && <p className="text-red-500 mb-3 font-medium">{error}</p>}

//         {!isEditing ? (
//           <div className="space-y-3 text-gray-700 leading-relaxed">
//             <p><strong className="text-gray-900">First Name:</strong> {profile.first_name || '-'}</p>
//             <p><strong className="text-gray-900">Last Name:</strong> {profile.last_name || '-'}</p>
//             <p><strong className="text-gray-900">Gender:</strong> {profile.gender || '-'}</p>
//             <p><strong className="text-gray-900">Religion:</strong> {profile.religion || '-'}</p>
//             <p><strong className="text-gray-900">Language:</strong> {profile.language || '-'}</p>
//             <p><strong className="text-gray-900">Bio:</strong> {profile.bio || '-'}</p>

//             <button
//               onClick={() => setIsEditing(true)}
//               className="mt-6 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
//             >
//               Edit Profile
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleUpdate} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 placeholder="First Name"
//                 className="border border-gray-300 rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//                 className="border border-gray-300 rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>

//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>

//             <input
//               type="text"
//               name="religion"
//               value={formData.religion}
//               onChange={handleChange}
//               placeholder="Religion"
//               className="border border-gray-300 rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <input
//               type="text"
//               name="language"
//               value={formData.language}
//               onChange={handleChange}
//               placeholder="Language"
//               className="border border-gray-300 rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//               placeholder="Write your bio..."
//               className="border border-gray-300 rounded-lg p-2 w-full h-24 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
//               >
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(false)}
//                 className="px-5 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';
import { useEffect, useState } from 'react';
import axios from '@/app/lib/axios';
import Navbar from '@/app/components/Navbar';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    religion: '',
    language: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        setMessage('You must be logged in to view your profile.');
        return;
      }

      try {
        const res = await axios.get('/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setFormData({
          first_name: res.data.first_name || '',
          last_name: res.data.last_name || '',
          gender: res.data.gender || '',
          religion: res.data.religion || '',
          language: res.data.language || '',
          bio: res.data.bio || '',
        });
      } catch {
        setError('Failed to fetch profile.');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    try {
      const res = await axios.patch('/profile/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data);
      setIsEditing(false);
      setMessage('✅ Profile updated successfully!');

      // Hide message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('❌ Failed to update profile.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 bg-gray-50">
        <Navbar />
        <p className="text-lg font-medium">{message || 'Loading profile...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-xl flex border border-gray-200">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-50 p-6 border-r rounded-l-xl">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/80"
              alt="User avatar"
              className="w-20 h-20 rounded-full border mb-4"
            />
            <h2 className="text-lg font-semibold">{profile.username}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          <nav className="mt-8 space-y-3 w-full">
            <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
              Account Details
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md">
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3">
            Account Settings
          </h1>

          {message && (
            <p className="text-green-600 mb-4 font-medium transition-opacity duration-500">
              {message}
            </p>
          )}
          {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">First name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
