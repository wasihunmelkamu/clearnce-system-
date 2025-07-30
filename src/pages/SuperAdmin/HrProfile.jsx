// import React, { useState, useEffect, use } from "react";
// import Wrapper from "./Wrapper";
// import TitleBar from "../../components/layout/TitleBar";
// import useFetch from "../../api/useFetch";
// const ProfileEditor = () => {
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [adminProfile, setAdminProfile] = useState(null);

//   const [newName, setNewName] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const {
//     data: adminData,
//     error: adminError,
//     loading: adminLoading,
//     get: getAdminProfile,
//   } = useFetch("/status/admin");

//   useEffect(() => {
//     if (adminData?.admin) {
//       setAdminProfile(adminData.admin);
//     } else {
//       getAdminProfile("/status/admin");
//       setAdminProfile(adminData.admin);
//     }
//   }, [adminData, getAdminProfile]);
//   console.log(adminProfile);

//   // useEffect(() => {
//   //   if (!AdminProfile) {
//   //     getAdminProfile("/displayAll");
//   //   } else {
//   //     setAdminProfile(adminData.admin);
//   //   }
//   // }, []);

//   //   useEffect(() => {
//   //     if (adminData?.admin) {
//   //       setAdminProfile(HRData.status);
//   //       setHRFilteredData(HRData.status);
//   //     }
//   //   }, [HRData, HR, setHR]);

//   const employee = {
//     name: "Dr Niway Chemer",
//     email: "niway@aastu.edu.et",
//     department: "ICT",
//     id: "AASTU12345",
//   };

//   const handlePasswordSubmit = () => {
//     setShowEditForm(true);
//   };

//   const handleSaveChanges = () => {
//     console.log("Saved:", { newName, newEmail, newPassword });
//     setShowEditForm(false);
//   };

//   const toggleProfile = () => {
//     setProfileOpen(!profileOpen);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Wrapper>
//       <div className="min-h-screen bg-gray-100">
//         <TitleBar title="Edit Your Profile" />
//         {/* Header */}
//         {/* <header className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-blue-900 hover:shadow-lg transition duration-300">
//           <div className="flex items-center space-x-3 p-0">
//             <img
//               src="/Logo.png"
//               alt="Logo"
//               className="h-10 w-10 rounded-full object-cover"
//             />
//             <span className="text-white font-bold text-lg">AASTU</span>
//           </div>
//           {/* Profile Dropdown */}
//         {/* <div className="relative">
//             <button
//               onClick={toggleProfile}
//               className="flex items-center space-x-2 focus:outline-none"
//             >
//               <img
//                 src="/niway.png"
//                 alt="User Avatar"
//                 className="h-8 w-8 rounded-full"
//               />
//               <span className="text-white font-medium">{employee.name}</span>
//             </button>
//             {profileOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4 z-20">
//                 <p className="text-sm font-semibold text-gray-700 mb-2">
//                   Profile
//                 </p>
//                 <div className="text-sm text-gray-800">
//                   <p><strong>Name:</strong> {employee.name}</p>
//                   <p><strong>Email:</strong> {employee.email}</p>
//                   <p><strong>Department:</strong> {employee.department}</p>
//                   <p><strong>ID:</strong> {employee.id}</p>
//                 </div>
      
//                 <button
//                   onClick={() => setProfileOpen(false)}
//                   className="mt-3 w-full text-center text-blue-600 hover:underline text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div> */}
//         {/* </header> */}
//         {/* Main Section */}
//         <div className="p-8">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto flex justify-between gap-8">
//             {/* Profile Info */}
//             <div className="flex-1">
//               <h2 className="text-xl font-bold mb-4">Profile Details</h2>
//               <p>
//                 <strong>Name:</strong> {employee.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {employee.email}
//               </p>
//               <p>
//                 <strong>Department:</strong> {employee.department}
//               </p>
//               <p>
//                 <strong>ID:</strong> {employee.id}
//               </p>
//               <button
//                 // onClick={handleEditClick}
//                 onClick={handlePasswordSubmit}
//                 className="mt-4 bg-gold text-white px-4 py-2 rounded hover:bg-blue-800"
//               >
//                 Edit Profile
//               </button>
//             </div>

//             {/* Image Upload Section */}
//             <div className="w-60 text-center">
//               <h3 className="font-semibold mb-2">Profile Image</h3>
//               <img
//                 src={preview || "/niway.png"}
//                 alt="Profile"
//                 className="w-32 h-32 mx-auto rounded-full object-cover border border-gray-300"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Edit Profile Form */}
//         {showEditForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             {/* Image Upload Section */}
//             <div className="w-60 text-center">
//               <h3 className="font-semibold mb-2">Profile Image</h3>
//               <img
//                 src={preview || "/niway.png"}
//                 alt="Profile"
//                 className="w-32 h-32 mx-auto rounded-full object-cover border border-gray-300"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mt-3 text-sm"
//               />
//             </div>
//             <div className="bg-white p-6 rounded shadow-md w-96">
//               <h3 className="font-bold mb-4">Edit Profile</h3>
//               <input
//                 type="text"
//                 placeholder="Admin Name"
//                 className="w-full border p-2 mb-2"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//               />
//               <input
//                 type="email"
//                 placeholder="New Email"
//                 className="w-full border p-2 mb-2"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 className="w-full border p-2 mb-4"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={() => setShowEditForm(false)}
//                   className="bg-gray-300 hover:bg-gold px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSaveChanges}
//                   className="bg-blue-900 hover:bg-gold text-white px-4 py-2 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Wrapper>
//   );
// };

// export default ProfileEditor;








import React, { useEffect, useState } from "react";
import useFetch from "../../api/useFetch"; // Adjust path as needed
import Wrapper from "../SuperAdmin/Wrapper"; // Adjust path as needed, assuming this is for layout
import TitleBar from "../../components/layout/TitleBar"; // Adjust path as needed
import Spinner from "../../components/ui/Spinner"; // Assuming you have a Spinner component

const HrProfile = () => {
  // Destructure the useFetch hook for HR data
  const {
    data: HRData,
    error: HRError,
    loading: HRLoading,
    get: getHR,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/admin`); // Base URL for useFetch should be set in its configuration

  // State to hold the admin data once fetched
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    // Fetch the data when the component mounts
    // The specific endpoint to get the data containing 'admin' object is '/displayAll'
    getHR("/displayAll");
  }, []); // Empty dependency array ensures this runs once on mount

  // Update adminInfo state when HRData changes (after successful fetch)
  useEffect(() => {
    if (HRData && HRData.admin) {
      setAdminInfo(HRData.admin);
    }
  }, [HRData]); // Depend on HRData to update when it's fetched

  return (
    <Wrapper>
      <TitleBar title="HR Profile" />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 max-w-2xl w-full">
          <h2 className="text-2xl font-extrabold text-sideBarColor mb-6 text-center">
            Admin Profile Details
          </h2>

          {HRLoading && (
            <div className="flex justify-center items-center h-48">
              <Spinner /> {/* Display spinner while loading */}
              <p className="ml-2 text-lg text-gray-600">Loading profile data...</p>
            </div>
          )}

          {HRError && (
            <div className="text-red-600 text-center font-medium text-lg p-4 bg-red-100 border border-red-400 rounded">
              Error loading profile: {HRError.message || "An unexpected error occurred."}
            </div>
          )}

          {adminInfo && !HRLoading && !HRError && (
            <div className="space-y-4 text-lg">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-32">First Name:</span>
                <span className="text-gray-900">{adminInfo.fname}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-32">Middle Name:</span>
                <span className="text-gray-900">{adminInfo.sname}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-32">Last Name:</span>
                <span className="text-gray-900">{adminInfo.lname}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-32">Role:</span>
                <span className="text-gray-900">{adminInfo.role}</span>
              </div>
            </div>
          )}

          {/* Optional: Message if no admin info is found after loading */}
          {!adminInfo && !HRLoading && !HRError && (
            <div className="text-center text-gray-500 text-lg p-4">
              No admin profile data found.
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default HrProfile;