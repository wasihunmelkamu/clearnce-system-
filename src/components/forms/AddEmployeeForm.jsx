// import React, { useState, useEffect } from "react";
// import Wrapper from "../../pages/SuperAdmin/Wrapper.jsx"; // Ensure this path is correct
// import TitleBar from "../../components/layout/TitleBar.jsx"; // Ensure this path is correct
// import Button from "../ui/Button.jsx"; // Ensure this path is correct
// import useFetch from "../../api/useFetch.js"; // Ensure this path is correct
// import Spinner from "../../components/ui/Spinner.jsx"; // Assuming you have a Spinner component
// import "./style.css"; // Your custom styles for no-spinner etc.

// const AddEmployeeForm = () => {
//   // useFetch for POST request to register a new employee
//   // Renamed variables for clarity
//   const {
//     data: postData,
//     error: postError,
//     loading: postLoading,
//     post,
//   } = useFetch("/admin");

//   // useFetch for GET request to fetch departments
//   const {
//     data: departmentData, // Renamed 'getData' to 'departmentData' for clarity
//     error: departmentError, // Renamed 'getError'
//     loading: departmentLoading, // Renamed 'getLoading'
//     get,
//   } = useFetch("/admin");

//   // State for form inputs (no photo field in this version)
//   const [formData, setFormData] = useState({
//     fname: "",
//     sname: "", // This should be for Middle Name
//     lname: "", // This should be for Last Name
//     phone: "",
//     address: "",
//     email: "",
//     is_academic: false,
//     dept_id: "",
//   });

//   // States for success/error popups
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showErrorPopup, setShowErrorPopup] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Effect to fetch departments on component mount
//   useEffect(() => {
//     get("/department");
//   }, []); // Empty dependency array ensures this runs once

//   // Handler for form input changes (text, email, etc.)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handler for form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission (page reload)

//     try {
//       // Perform the POST request using the useFetch hook
//       // Since there's no file, send formData directly (useFetch will send it as JSON)
//       const response = await post("/register", formData);

//       // Check the 'success' flag from the standardized useFetch response
//       if (response.success) {
//         setSuccessMessage(response.message || "Employee added successfully!");
//         setShowSuccessPopup(true);

//         // Clear form data on successful submission
//         setFormData({
//           fname: "",
//           sname: "",
//           lname: "",
//           phone: "",
//           address: "",
//           email: "",
//           is_academic: false,
//           dept_id: "",
//         });

//         // IMPORTANT: No need to call get("/allstaffs") here.
//         // The AllEmployeesList page is set up to re-fetch its data
//         // when navigated to or when the browser tab gains focus,
//         // ensuring consistency.
//       } else {
//         // If operation was not successful based on the 'success' flag
//         setErrorMessage(response.message || "Failed to add employee.");
//         setShowErrorPopup(true);
//       }
//     } catch (err) {
//       // Catch any unexpected client-side errors (e.g., network issues before fetch)
//       console.error("Add employee error (client-side catch):", err);
//       setErrorMessage("An unexpected client-side error occurred: " + err.message);
//       setShowErrorPopup(true);
//     }
//   };

//   return (
//     <Wrapper>
//       <TitleBar title="Add New Employee" />
//       <div className="flex items-center justify-center bg-white">
//         <div className="flex flex-col items-center justify-center border-sideBarColor border h-fit w-4/6 p-4 m-6 bg-lightGray rounded-lg shadow-xl">
//           <form onSubmit={handleSubmit} className="w-full space-y-4">
//             {/* First Name */}
//             <label htmlFor="fname" className="block">
//               First Name:
//             </label>
//             <input
//               type="text"
//               id="fname"
//               name="fname"
//               placeholder="Enter First Name"
//               value={formData.fname}
//               onChange={handleChange}
//               className="border rounded p-2 w-full focus:outline-sideBarColor"
//               required
//             />
//             {/* Middle Name - Corrected ID and Name */}
//             <label htmlFor="sname" className="block">
//               Middle Name:
//             </label>
//             <input
//               type="text"
//               id="sname" // Corrected ID
//               name="sname" // Corrected Name
//               placeholder="Enter Middle Name"
//               value={formData.sname}
//               onChange={handleChange}
//               className="border rounded p-2 w-full focus:outline-sideBarColor"
//             />
//             {/* Last Name - Corrected ID and Name */}
//             <label htmlFor="lname" className="block">
//               Last Name:
//             </label>
//             <input
//               type="text"
//               id="lname" // Corrected ID
//               name="lname" // Corrected Name
//               placeholder="Enter Last Name"
//               value={formData.lname}
//               onChange={handleChange}
//               className="border rounded p-2 w-full focus:outline-sideBarColor"
//               required
//             />
//             {/* Phone Number */}
//             <label htmlFor="phone" className="block">
//               Phone Number:
//             </label>
//             <input
//               type="number"
//               id="phone"
//               name="phone"
//               placeholder="Enter Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="no-spinner border rounded p-2 w-full focus:outline-sideBarColor"
//               required
//             />
//             {/* Address */}
//             <label htmlFor="address" className="block">
//               Address:
//             </label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               placeholder="Enter Address"
//               value={formData.address}
//               onChange={handleChange}
//               className="border rounded p-2 w-full focus:outline-sideBarColor"
//               required
//             />
//             {/* E-mail */}
//             <label htmlFor="email" className="block">
//               E-mail:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter E-mail"
//               value={formData.email}
//               onChange={handleChange}
//               className="border rounded p-2 w-full focus:outline-sideBarColor"
//               required
//             />
//             {/* Is Academic Checkbox */}
//             <div className="flex items-center w-full">
//               <input
//                 type="checkbox"
//                 id="is_academic"
//                 name="is_academic"
//                 checked={formData.is_academic}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, is_academic: e.target.checked }))
//                 }
//                 className="w-6 h-6 text-sideBarColor border-gray-300 rounded focus:ring-sideBarColor"
//               />
//               <label
//                 htmlFor="is_academic"
//                 className="text-gray-700 text-xl pl-3"
//               >
//                 IS ACADEMIC
//               </label>
//             </div>
//             {/* Department Select */}
//             <label htmlFor="dept_id" className="block">
//               Department:
//             </label>
//             {departmentLoading ? (
//               <Spinner /> // Show spinner while departments are loading
//             ) : departmentError ? (
//               <p className="text-red-600">Error loading departments: {departmentError.message}</p>
//             ) : (
//               <select
//                 id="dept_id"
//                 name="dept_id"
//                 value={formData.dept_id}
//                 onChange={handleChange}
//                 className="border rounded p-2 w-full focus:outline-sideBarColor"
//                 required // Added required if department is mandatory
//               >
//                 <option value="" disabled>
//                   Select Department
//                 </option>
//                 {departmentData &&
//                   Array.isArray(departmentData) && // Ensure departmentData.data is an array from useFetch
//                   departmentData.map((department) => (
//                     <option key={department.dept_id} value={department.dept_id}>
//                       {department.name}
//                     </option>
//                   ))}
//               </select>
//             )}

//             {/* Submit Button - Disabled during loading */}
//             <Button variant="ghost" disabled={postLoading}>
//               {postLoading ? "Adding Employee..." : "Add Employee"}
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
//             <h2 className="text-2xl font-bold text-green-700 mb-4">
//               {successMessage}
//             </h2>
//             <button
//               onClick={() => setShowSuccessPopup(false)}
//               className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-800"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Error Popup */}
//       {showErrorPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
//             <h2 className="text-2xl font-bold text-red-700 mb-4">Error!</h2>
//             <p className="text-red-600 mb-6">{errorMessage}</p>
//             <button
//               onClick={() => setShowErrorPopup(false)}
//               className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-800"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </Wrapper>
//   );
// };

// export default AddEmployeeForm;

// //======================================= new form to insert photo =====================================================//

// // ============================= new code that includes new popup and uses the new useFetch method ===================================//

import React, { useState, useEffect } from "react";
import Wrapper from "../../pages/SuperAdmin/Wrapper.jsx";
import TitleBar from "../../components/layout/TitleBar.jsx";
import Button from "../ui/Button.jsx";
import useFetch from "../../api/useFetch.js";
import Spinner from "../../components/ui/Spinner.jsx"; // Make sure Spinner is imported
import "./style.css";


const AddEmployeeForm = () => {
  // useFetch for POST request to register a new employee
  const {
    data: postData,
    error: postError,
    loading: postLoading,
    post,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin`);

  // useFetch for GET request to fetch departments
  const {
    data: departmentData,
    error: departmentError,
    loading: departmentLoading,
    get,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin`);

  useEffect(() => {
    get("/department");
  }, []);

  const [formData, setFormData] = useState({
    fname: "",
    sname: "", // Middle Name
    lname: "", // Last Name
    phone: "",
    address: "",
    email: "",
    is_academic: false,
    dept_id: "",
    photo: null, // Added for file object
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // New handler for file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0], // Store the File object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file upload
    const form = new FormData();
    for (const key in formData) {
      if (key === "photo" && formData.photo) {
        form.append("photo", formData.photo); // Append the actual File object
      } else if (formData[key] !== null && formData[key] !== undefined) {
        // Append other fields, excluding null/undefined values
        form.append(key, formData[key]);
      }
    }

    try {
      // Pass 'form' and 'true' as the third argument to indicate FormData
      const response = await post("/register", form, true); // Important change here

      if (response.success) {
        setSuccessMessage(response.message || "Employee added successfully!");
        setShowSuccessPopup(true);

        // Clear form data after successful submission
        setFormData({
          fname: "",
          sname: "",
          lname: "",
          phone: "",
          address: "",
          email: "",
          is_academic: false,
          dept_id: "",
          photo: null, // Reset photo field
        });
      } else {
        setErrorMessage(response.message || "Failed to add employee.");
        setShowErrorPopup(true);
      }
    } catch (err) {
      console.error("Add employee error (client-side catch):", err);
      setErrorMessage(
        "An unexpected client-side error occurred: " + err.message
      );
      setShowErrorPopup(true);
    }
  };

  return (
    <Wrapper>
      <TitleBar title="Add New Employee" />
      <div className="flex items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center border-sideBarColor border h-fit w-4/6 p-4 m-6 bg-lightGray rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* First Name */}
            <label htmlFor="fname" className="block">
              First Name:
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter First Name"
              value={formData.fname}
              onChange={handleChange}
              className="border rounded p-2 w-full focus:outline-sideBarColor"
              required
            />
            {/* Middle Name */}
            <label htmlFor="sname" className="block">
              Middle Name:
            </label>
            <input
              type="text"
              id="sname"
              name="sname"
              placeholder="Enter Middle Name"
              value={formData.sname}
              onChange={handleChange}
              className="border rounded p-2 w-full focus:outline-sideBarColor"
            />
            {/* Last Name */}
            <label htmlFor="lname" className="block">
              Last Name:
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Enter Last Name"
              value={formData.lname}
              onChange={handleChange}
              className="border rounded p-2 w-full focus:outline-sideBarColor"
              required
            />
            {/* Phone Number */}
            <label htmlFor="phone" className="block">
              Phone Number:
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="no-spinner border rounded p-2 w-full focus:outline-sideBarColor"
              required
            />
            {/* Address */}
            <label htmlFor="address" className="block">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded p-2 w-full focus:outline-sideBarColor"
              required
            />
            {/* E-mail */}
            <label htmlFor="email" className="block">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter E-mail"
              value={formData.email}
              onChange={handleChange}
              className="border rounded p-2 w-full focus:outline-sideBarColor"
              required
            />
            {/* Is Academic Checkbox */}
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                id="is_academic"
                name="is_academic"
                checked={formData.is_academic}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_academic: e.target.checked,
                  }))
                }
                className="w-6 h-6 text-sideBarColor border-gray-300 rounded focus:ring-sideBarColor"
              />
              <label
                htmlFor="is_academic"
                className="text-gray-700 text-xl pl-3"
              >
                IS ACADEMIC
              </label>
            </div>
            {/* Department Select */}
            <label htmlFor="dept_id" className="block">
              Department:
            </label>
            {departmentLoading ? (
              <Spinner />
            ) : departmentError ? (
              <p className="text-red-600">
                Error loading departments: {departmentError.message}
              </p>
            ) : (
              <select
                id="dept_id"
                name="dept_id"
                value={formData.dept_id}
                onChange={handleChange}
                className="border rounded p-2 w-full focus:outline-sideBarColor"
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departmentData &&
                  Array.isArray(departmentData) &&
                  departmentData.map((department) => (
                    <option key={department.dept_id} value={department.dept_id}>
                      {department.name}
                    </option>
                  ))}
              </select>
            )}

            {/* Photo Upload Input */}
            <label htmlFor="photo" className="block">
              Upload Photo:
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded p-2 w-full focus:outline-sideBarColor"
            />

            {/* Photo Preview */}
            {formData.photo && (
              <div className="mb-4">
                <p className="font-semibold">Selected Image Preview:</p>
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  className="w-32 h-32 rounded object-cover"
                />
              </div>
            )}

            {/* Submit Button */}
            <Button variant="ghost" disabled={postLoading}>
              {postLoading ? "Adding Employee..." : "Add Employee"}
            </Button>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              {successMessage}
            </h2>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-800"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Error!</h2>
            <p className="text-red-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AddEmployeeForm;
