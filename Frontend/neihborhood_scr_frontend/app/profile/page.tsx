// 'use client';
// import { useEffect, useState } from 'react';
// import axios from '@/app/lib/axios';
// import Navbar from '@/app/components/Navbar';

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<any>(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isFading, setIsFading] = useState(false);

//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     gender: '',
//     religion: '',
//     language: '',
//     bio: '',
//     avatar: null as File | null,
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('access');
//       if (!token) {
//         window.location.href= '/login';
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

// // ✅ Avatar preview handler
//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setFormData({ ...formData, avatar: file });
//       setPreview(URL.createObjectURL(file)); // for live preview
//     }
//   };


//   // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files && e.target.files[0]) {
//   //     const formData = new FormData();
//   //     formData.append('avatar', e.target.files[0]);
//   //     axios.patch('/profile/', formData, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });
//   //   }
//   // };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem('access');
//     const form = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       if (value ! == null && value !== '') {
//         form.append(key, value);
//       }
//     });

//     try {
//       const res = await axios.patch('/profile/', formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setProfile(res.data);
//       setMessage('✅ Profile updated successfully!');
//       setError('');

//       // Smooth fade-out after 3 seconds
//       setTimeout(() => setIsFading(true), 2500);
//       setTimeout(() => {
//         setMessage('');
//         setIsFading(false);
//       }, 3500);
//     } catch {
//       setError('❌ Failed to update profile.');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh');
//     window.location.href = '/login';
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
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       <Navbar />

//       <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-xl flex flex-col md:flex-row border border-gray-200 overflow-hidden">
//         {/* Sidebar */}
//         <aside className="md:w-1/3 bg-gray-50 p-6 border-b md:border-b-0 md:border-r">
//           <div className="flex flex-col items-center">
//             <img
//               src={profile.avatar || 'https://via.placeholder.com/100'}
//               alt="User avatar"
//               className="w-24 h-24 rounded-full border mb-3 object-cover"
//             />
//             <h2 className="text-lg font-semibold capitalize">
//               {profile.first_name} {profile.last_name}
//             </h2>
//             <p className="text-sm text-gray-500">{profile.email}</p>
//           </div>

//           <nav className="mt-8 space-y-3 w-full">
//             <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
//               Account Details
//             </button>
//             <button
//               onClick={() => (window.location.href = '/change-password')}
//               className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md">
//               Change Password
//             </button>
//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md">
//               Logout
//             </button>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 px-6 py-8">
//           <h1 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3">
//             Account Settings
//           </h1>

//           {/* Success Message */}
//           {message && (
//             <p
//               className={`text-green-600 mb-4 font-medium transition-opacity duration-700 ${
//                 isFading ? 'opacity-0' : 'opacity-100'
//               }`}
//             >
//               {message}
//             </p>
//           )}
//           {error && (
//             <p className="text-red-500 mb-4 font-medium transition-opacity duration-500">
//               {error}
//             </p>
//           )}

//           <form onSubmit={handleUpdate} className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <label className="block text-sm font-medium mb-1">First name</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Last name</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Religion</label>
//                 <input
//                   type="text"
//                   name="religion"
//                   value={formData.religion}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Language</label>
//                 <input
//                   type="text"
//                   name="language"
//                   value={formData.language}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Bio</label>
//               <textarea
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md p-2 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
//             >
//               Save Changes
//             </button>
//           </form>
//         </main>
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
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    religion: '',
    language: '',
    bio: '',
    avatar: null as File | null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        window.location.href = '/login';
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
          avatar: null,
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

  // ✅ Avatar preview handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file)); // for live preview
    }
  };

  // ✅ Update Profile
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        form.append(key, value);
      }
    });

    try {
      const res = await axios.patch('/profile/', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(res.data);
      setMessage('✅ Profile updated successfully!');
      setIsEditing(false);
      setPreview(null);

      // hide message after 3s
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('❌ Failed to update profile.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/login';
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
              src={preview || profile.avatar || 'https://via.placeholder.com/80'}
              alt="profile"
              className="w-20 h-20 rounded-full border mb-4 object-cover"
            />
            <label
              htmlFor="avatar"
              className="cursor-pointer bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition"
            >
              Change Photo
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <h2 className="text-lg font-semibold mt-3">{profile.username}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          <nav className="space-y-3 mt-6">
            <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
              Account Details
            </button>
            <a
              href="/change-password"
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              Change Password
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-10 p-8">
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
        </main>
      </div>
    </div>
  );
}
