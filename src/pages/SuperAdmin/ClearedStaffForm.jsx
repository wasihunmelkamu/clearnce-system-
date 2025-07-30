// import React, { useState } from "react";
// import useFetch from "../../api/useFetch";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Wrapper from "./Wrapper";
// import TitleBar from "../../components/layout/TitleBar";

// const ClearedStaffForm = () => {
//   const navigate = useNavigate();
//   const { staffId } = useParams();
//   const { post, loading, error, data } = useFetch("/cleared");

//   const [formData, setFormData] = useState({
//     id: staffId,
//     fname: "",
//     sname: "",
//     lname: "",
//     position: "",
//     cleared_date: "",
//     birthdate: "",
//     employment_date: "",
//     salary: "",
//     educational_level: "",
//     education_field: "",
//     descipline: false,
//     pension_number: "",
//     nonused_breaks: "",
//     public_transport: false,
//     last_time_salary: "",
//     cleared: true,
//     employment_type: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await post("/create", formData);
//       alert("Cleared staff data submitted successfully.");
//       navigate("/");
//     } catch (err) {
//       alert("Failed to submit. Try again.");
//     }
//   };

//   return (
//     <Wrapper>
//       <TitleBar title="Cleared Staff Form" />
// {console.log(data)
// }
//       <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 max-w-4xl w-full">
//           <h2 className="text-2xl font-extrabold text-sideBarColor mb-8 text-center">
//             Fill the form to proceed approval
//           </h2>
//            {/* Separator */}
//            <div className="relative flex py-5 items-center">
//               <div className="flex-grow border-t border-gold"></div>
//               <span className="flex-shrink mx-4 text-gold text-lg">
//                 Staff Details
//               </span>
//               <div className="flex-grow border-t border-gold"></div>
//             </div>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Section 1: Personal and Professional Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
//               {[
//                 ["fname", "First Name", "text", "e.g., John"],
//                 ["sname", "Second Name", "text", "e.g., Doe (Middle Name)"],
//                 ["lname", "Last Name", "text", "e.g., Smith"],
//                 ["position", "Position", "text", "e.g., Software Engineer"],
//                 [
//                   "educational_level",
//                   "Educational Level",
//                   "text",
//                   "e.g., Bachelor's Degree",
//                 ],
//                 [
//                   "education_field",
//                   "Education Field",
//                   "text",
//                   "e.g., Computer Science",
//                 ],
//                 ["salary", "Salary", "number", "e.g., 50000"],
//                 ["pension_number", "Pension Number", "text", "e.g., P1234567"],
//                 ["nonused_breaks", "Unused Breaks", "number", "e.g., 5"],
//                 [
//                   "employment_type",
//                   "Employment Type",
//                   "text",
//                   "e.g., Full-time",
//                 ],
//               ].map(([name, label, type, placeholder]) => (
//                 <div key={name} className="relative z-0 w-full group">
//                   <input
//                     type={type}
//                     name={name}
//                     id={name}
//                     value={formData[name] || ""}
//                     onChange={handleChange}
//                     placeholder=" " // Important for the floating label effect
//                     className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                     // Use 'number' type for salary and nonused_breaks for better input validation
//                     min={type === "number" ? "0" : undefined}
//                   />
//                   <label
//                     htmlFor={name}
//                     className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
//                   >
//                     {label}
//                   </label>
//                 </div>
//               ))}
//             </div>

//             {/* Separator */}
//             <div className="relative flex py-5 items-center">
//               <div className="flex-grow border-t border-gold"></div>
//               <span className="flex-shrink mx-4 text-gold text-lg">
//                 Dates & Status
//               </span>
//               <div className="flex-grow border-t border-gold"></div>
//             </div>

//             {/* Section 2: Dates */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 ["birthdate", "Birth Date"],
//                 ["employment_date", "Employment Date"],
//                 ["cleared_date", "Cleared Date"],
//                 ["last_time_salary", "Last Salary Date"],
//               ].map(([name, label]) => (
//                 <div key={name} className="relative z-0 w-full group">
//                   <input
//                     type="date"
//                     name={name}
//                     id={name}
//                     // Ensure value is a string in "YYYY-MM-DD" format
//                     value={formData[name] ? formData[name].slice(0, 10) : ""}
//                     onChange={handleChange}
//                     className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor={name}
//                     className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
//                   >
//                     {label}
//                   </label>
//                 </div>
//               ))}
//             </div>

//             {/* Separator */}
//             <div className="relative flex py-5 items-center">
//               <div className="flex-grow border-t border-gold"></div>
//               <span className="flex-shrink mx-4 text-gold text-lg">
//                 Other Details
//               </span>
//               <div className="flex-grow border-t border-gold"></div>
//             </div>

//             {/* Section 3: Checkboxes */}
//             <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center">
//               <label className="flex items-center gap-3 text-lg font-medium text-gray-700 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="descipline"
//                   checked={formData.descipline || false} // Ensure it's a boolean
//                   onChange={handleChange}
//                   className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                 />
//                 <span className="select-none">Disciplined</span>
//               </label>
//               <label className="flex items-center gap-3 text-lg font-medium text-gray-700 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="public_transport"
//                   checked={formData.public_transport || false} // Ensure it's a boolean
//                   onChange={handleChange}
//                   className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                 />
//                 <span className="select-none">Uses Public Transport</span>
//               </label>
//             </div>

//             {/* Submission Button and Feedback */}
//             <div className="pt-4 flex flex-col items-center">
//               <button
//                 type="submit"
//                 className={`w-full sm:w-auto px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out
//                 ${
//                   loading
//                     ? "bg-blue-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
//                 }
//               `}
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : "Submit Details"}
//               </button>
//               {error && (
//                 <p className="mt-4 text-red-600 text-center font-medium">
//                   Error: {error.message || "An unexpected error occurred."}
//                 </p>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default ClearedStaffForm;

// /
// /
// /
// /
// /
// /
// /

import React, { useState } from "react";
import useFetch from "../../api/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import TitleBar from "../../components/layout/TitleBar";

const ClearedStaffForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, loading, error } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/cleared`); // Removed 'data' as it's not directly used for display here

  const [formData, setFormData] = useState({
    id: id,
    fname: "",
    sname: "",
    lname: "",
    position: "",
    cleared_date: "",
    birth_date: "",
    employment_date: "",
    salary: "",
    educational_level: "",
    education_field: "",
    descipline: false,
    pension_number: "",
    nonused_breaks: "",
    public_transport: false,
    last_time_salary: "",
    cleared: true,
    employment_type: "",
  });

  // State for popups
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/create", formData); // Assuming your post function returns a response object with 'success' and 'message'

      if (response && response.success) {
        setSuccessMessage(response.message || "Cleared staff data submitted successfully!");
        setShowSuccessPopup(true);
        // Optionally clear form or navigate after user acknowledges success
        // navigate("/"); // Consider if you want to navigate immediately or after popup is closed
      } else {
        setErrorMessage(response.message || "Failed to submit. Please try again.");
        setShowErrorPopup(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "An unexpected error occurred during submission.");
      setShowErrorPopup(true);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    navigate("/dashboard"); // Navigate after the user closes the success popup
  };

  const handleErrorPopupClose = () => {
    setShowErrorPopup(false);
  };

  return (
    <Wrapper>
      {console.log(id)}
      
      <TitleBar title="Cleared Staff Form" />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 max-w-4xl w-full">
          <h2 className="text-2xl font-extrabold text-sideBarColor mb-8 text-center">
            Fill the form to proceed approval
          </h2>
          {/* Separator */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gold"></div>
            <span className="flex-shrink mx-4 text-gold text-lg">
              Staff Details
            </span>
            <div className="flex-grow border-t border-gold"></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal and Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["fname", "First Name", "text", "e.g., John"],
                ["sname", "Second Name", "text", "e.g., Doe (Middle Name)"],
                ["lname", "Last Name", "text", "e.g., Smith"],
                ["position", "Position", "text", "e.g., Software Engineer"],
                [
                  "educational_level",
                  "Educational Level",
                  "text",
                  "e.g., Bachelor's Degree",
                ],
                [
                  "education_field",
                  "Education Field",
                  "text",
                  "e.g., Computer Science",
                ],
                ["salary", "Salary", "number", "e.g., 50000"],
                ["pension_number", "Pension Number", "text", "e.g., P1234567"],
                ["nonused_breaks", "Unused Breaks", "number", "e.g., 5"],
                [
                  "employment_type",
                  "Employment Type",
                  "text",
                  "e.g., Full-time",
                ],
              ].map(([name, label, type, placeholder]) => (
                <div key={name} className="relative z-0 w-full group">
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    placeholder=" " // Important for the floating label effect
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    // Use 'number' type for salary and nonused_breaks for better input validation
                    min={type === "number" ? "0" : undefined}
                  />
                  <label
                    htmlFor={name}
                    className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gold"></div>
              <span className="flex-shrink mx-4 text-gold text-lg">
                Dates & Status
              </span>
              <div className="flex-grow border-t border-gold"></div>
            </div>

            {/* Section 2: Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["birth_date", "Birth Date"],
                ["employment_date", "Employment Date"],
                ["cleared_date", "Cleared Date"],
                ["last_time_salary", "Last Salary Date"],
              ].map(([name, label]) => (
                <div key={name} className="relative z-0 w-full group">
                  <input
                    type="date"
                    name={name}
                    id={name}
                    // Ensure value is a string in "YYYY-MM-DD" format
                    value={formData[name] ? formData[name].slice(0, 10) : ""}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor={name}
                    className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gold"></div>
              <span className="flex-shrink mx-4 text-gold text-lg">
                Other Details
              </span>
              <div className="flex-grow border-t border-gold"></div>
            </div>

            {/* Section 3: Checkboxes */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center">
              <label className="flex items-center gap-3 text-lg font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="descipline"
                  checked={formData.descipline || false} // Ensure it's a boolean
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="select-none">Disciplined</span>
              </label>
              <label className="flex items-center gap-3 text-lg font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="public_transport"
                  checked={formData.public_transport || false} // Ensure it's a boolean
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="select-none">Uses Public Transport</span>
              </label>
            </div>

            {/* Submission Button and Feedback */}
            <div className="pt-4 flex flex-col items-center">
              <button
                type="submit"
                className={`w-full sm:w-auto px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                }
              `}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Details"}
              </button>
            </div>
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
              onClick={handleSuccessPopupClose}
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
              onClick={handleErrorPopupClose}
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

export default ClearedStaffForm;


