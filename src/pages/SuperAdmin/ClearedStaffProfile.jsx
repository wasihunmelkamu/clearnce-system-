// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useFetch from "../../api/useFetch";
// import { useNavigate } from "react-router-dom";

// const ClearedStaffProfile = () => {

//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { data, error, loading, get } = useFetch("/status");
//   const [originalData, setOriginalData] = useState([]);

//   useEffect(() => {
//     get("/displayall/" + id);
//   }, []);

//   useEffect(() => {
//     if (data?.data) {
//       setOriginalData(data.data);
//     }
//   }, [data]);

//   const firstRecord = originalData[0];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
//         <div>
//           <h1 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2 flex justify-between items-center">
//             Cleared Staff Profile
//             <div className="space-x-2">
//               <button
//                 onClick={() => {
//                   navigate("/leavingletter");
//                 }}
//                 className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition duration-200"
//               >
//                 Print Leaving Letter
//               </button>
//               <button
//                 onClick={() => {
//                   navigate("/experienceletter");
//                 }}
//                 className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
//               >
//                 Print Experience Letter
//               </button>
//             </div>
//           </h1>
//         </div>

//         {loading && <p className="text-gray-600">Loading...</p>}
//         {error && <p className="text-red-600">Error: {error.message}</p>}

//         {!loading && firstRecord && (
//           <div className="mb-8">
//             <p className="text-lg font-semibold text-gray-700">
//               <span className="mr-2 text-gray-500">First Name:</span>
//               {firstRecord.fname}
//             </p>
//             <p className="text-lg font-semibold text-gray-700">
//               <span className="mr-2 text-gray-500">Middle Name:</span>
//               {firstRecord.sname}
//             </p>
//             <p className="text-lg font-semibold text-gray-700">
//               <span className="mr-2 text-gray-500">Last Name:</span>
//               {firstRecord.lname}
//             </p>
//           </div>
//         )}

//         {originalData.length === 0 ? (
//           <p className="text-gray-500">No progress records available.</p>
//         ) : (
//           <div className="grid gap-6">
//             {originalData.map((item, index) => (
//               <div
//                 key={index}
//                 className="border rounded-lg p-4 shadow bg-gray-50"
//               >
//                 <p>
//                   <strong>Item:</strong> {item.item_name}
//                 </p>
//                 <p>
//                   <strong>Office:</strong> {item.office_name}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`px-2 py-1 rounded text-white ${
//                       item.description === "completed"
//                         ? "bg-green-600"
//                         : item.description === "pending"
//                         ? "bg-yellow-500"
//                         : "bg-red-600"
//                     }`}
//                   >
//                     {item.description}
//                   </span>
//                 </p>
//                 <p>
//                   <strong>Updated At:</strong>{" "}
//                   {new Date(item.updated_at).toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClearedStaffProfile;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import useFetch from "../../api/useFetch";
// import Wrapper from "./Wrapper";

// const ClearedStaffProfile = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // this is a string
//   const staffId = parseInt(id); // convert it to number
//   const { data, error, loading, get } = useFetch("/cleared");
//   const [staffDetail, setStaffDetail] = useState(null);

//   useEffect(() => {
//     get("/get");
//   }, []);

//   useEffect(() => {
//     if (data?.message && Array.isArray(data.message)) {
//       const found = data.message.find((staff) => staff.id === staffId);
//       setStaffDetail(found || null);
//     }
//   }, [data, staffId]);

//   return (
//     <Wrapper>
//       <div className="min-h-screen bg-gray-100 p-6">
//         <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
//           <h1 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2 flex justify-between items-center">
//             Cleared Staff Profile
//             <div className="space-x-2">
//               <button
//                 onClick={() => navigate(`/leavingletter/${id}`)}
//                 className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
//               >
//                 Print Leaving Letter
//               </button>
//               <button
//                 onClick={() => navigate("/experienceletter")}
//                 className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
//               >
//                 Print Experience Letter
//               </button>
//             </div>
//           </h1>
//           {loading && <p className="text-gray-600">Loading...</p>}
//           {error && <p className="text-red-600">Error: {error.message}</p>}
//           {!loading && staffDetail ? (
//             <div className="mb-8 space-y-2 text-lg text-gray-700">
//               <p><strong>First Name:</strong> {staffDetail.fname}</p>
//               <p><strong>Middle Name:</strong> {staffDetail.sname}</p>
//               <p><strong>Last Name:</strong> {staffDetail.lname}</p>
//               <p><strong>Position:</strong> {staffDetail.position}</p>
//               <p><strong>Birthdate:</strong> {new Date(staffDetail.birthdate).toLocaleDateString()}</p>
//               <p><strong>Salary:</strong> {staffDetail.salary}</p>
//               <p><strong>Cleared:</strong> {staffDetail.cleared ? "Yes" : "No"}</p>
//               {/* Add more fields as needed */}
//             </div>
//           ) : (
//             !loading && <p className="text-gray-500">No staff found with ID: {id}</p>
//           )}
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default ClearedStaffProfile;

// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// /
// //
// /
// /
// /

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../api/useFetch";
import Wrapper from "./Wrapper";
import Button from "../../components/ui/Button.jsx";
import TitleBar from "../../components/layout/TitleBar.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

const ClearedStaffProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const staffId = parseInt(id);
  const { data, error, loading, get } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/cleared`);
  const [staffDetail, setStaffDetail] = useState(null);

  useEffect(() => {
    get("/get");
  }, []);

  useEffect(() => {
    if (data?.message && Array.isArray(data.message)) {
      const found = data.message.find((staff) => staff.id === staffId);
      setStaffDetail(found || null);
    }
  }, [data, staffId]);

  return (
    <Wrapper>
      <TitleBar title="Cleared Staff Profile" />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-black border-b pb-2 flex justify-between items-center">
          Employee Details
            <div className="space-x-2">
              <Button
                className="py-2 hover:text-white ml-9"
                variant="outline"
                onClick={() => navigate(`/leavingletter/${id}`)}
              >
                Print Leaving Letter
              </Button>
              {/* <button
                onClick={() => navigate(`/leavingletter/${id}`)}
                className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
              >
                Print Leaving Letter
              </button> */}
              <Button
                className="py-2 hover:text-white ml-9"
                variant="outline"
                onClick={() => navigate(`/experienceletter/${id}`)}
              >
                Print Experience Letter
              </Button>
              {/* <button
                onClick={() => navigate(`/experienceletter/${id}`)}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                Print Experience Letter
              </button> */}
            </div>
          </h1>
          {loading && (
            <p className="text-gray-600">
              <Spinner />
            </p>
          )}
          {error && <p className="text-red-600">Error: {error.message}</p>}
          {!loading && staffDetail ? (
            // <div className="mb-8 space-y-2 text-lg text-gray-700">
            //   <p>
            //     <strong>First Name:</strong> {staffDetail.fname}
            //   </p>
            //   <p>
            //     <strong>Middle Name:</strong> {staffDetail.sname}
            //   </p>
            //   <p>
            //     <strong>Last Name:</strong> {staffDetail.lname}
            //   </p>
            //   <p>
            //     <strong>Position:</strong> {staffDetail.position}
            //   </p>
            //   <p>
            //     <strong>Birth Date:</strong>{" "}
            //     {new Date(staffDetail.birth_date).toLocaleDateString()}
            //   </p>
            //   <p>
            //     <strong>Employment Date:</strong>{" "}
            //     {new Date(staffDetail.employment_date).toLocaleDateString()}
            //   </p>
            //   <p>
            //     <strong>Salary:</strong> {staffDetail.salary}
            //   </p>
            //   <p>
            //     <strong>Last Time Salary:</strong>{" "}
            //     {new Date(staffDetail.last_time_salary).toLocaleDateString()}
            //   </p>
            //   <p>
            //     <strong>Public Transport:</strong>{" "}
            //     {staffDetail.public_transport ? "Yes" : "No"}
            //   </p>
            //   <p>
            //     <strong>Cleared:</strong> {staffDetail.cleared ? "Yes" : "No"}
            //   </p>
            //   <p>
            //     <strong>Cleared Date:</strong>{" "}
            //     {staffDetail.cleared_date
            //       ? new Date(staffDetail.cleared_date).toLocaleDateString()
            //       : "N/A"}
            //   </p>
            //   <p>
            //     <strong>Nonused Breaks:</strong> {staffDetail.nonused_breaks}
            //   </p>
            //   <p>
            //     <strong>Education Field:</strong> {staffDetail.education_field}
            //   </p>
            //   <p>
            //     <strong>Educational Level:</strong>{" "}
            //     {staffDetail.educational_level}
            //   </p>
            //   <p>
            //     <strong>Discipline:</strong>{" "}
            //     {staffDetail.descipline ? "Yes" : "No"}
            //   </p>
            //   {/* Add more fields as needed */}
            // </div>
            <div className="mb-8 text-black">
             
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
                <div>
                  <strong>First Name:</strong> <span>{staffDetail.fname}</span>
                </div>
                <div>
                  <strong>Middle Name:</strong> <span>{staffDetail.sname}</span>
                </div>
                <div>
                  <strong>Last Name:</strong> <span>{staffDetail.lname}</span>
                </div>
                <div>
                  <strong>Position:</strong> <span>{staffDetail.position}</span>
                </div>
                <div>
                  <strong>Birth Date:</strong>{" "}
                  <span>
                    {new Date(staffDetail.birth_date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <strong>Employment Date:</strong>{" "}
                  <span>
                    {new Date(staffDetail.employment_date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <strong>Salary:</strong> <span>{staffDetail.salary}</span>
                </div>
                <div>
                  <strong>Last Salary Date:</strong>{" "}
                  <span>
                    {new Date(
                      staffDetail.last_time_salary
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <strong>Public Transport:</strong>{" "}
                  <span>{staffDetail.public_transport ? "Yes" : "No"}</span>
                </div>
                <div>
                  <strong>Cleared:</strong>{" "}
                  <span>{staffDetail.cleared ? "Yes" : "No"}</span>
                </div>
                <div>
                  <strong>Cleared Date:</strong>{" "}
                  <span>
                    {staffDetail.cleared_date
                      ? new Date(staffDetail.cleared_date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <strong>Unused Breaks:</strong>{" "}
                  <span>{staffDetail.nonused_breaks}</span>
                </div>
                <div>
                  <strong>Education Field:</strong>{" "}
                  <span>{staffDetail.education_field}</span>
                </div>
                <div>
                  <strong>Educational Level:</strong>{" "}
                  <span>{staffDetail.educational_level}</span>
                </div>
                <div>
                  <strong>Discipline:</strong>{" "}
                  <span>{staffDetail.descipline ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          ) : (
            !loading && (
              <p className="text-gray-500">No staff found with ID: {id}</p>
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ClearedStaffProfile;
