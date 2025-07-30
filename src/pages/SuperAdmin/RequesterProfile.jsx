// // import React, { useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import useFetch from "../../api/useFetch"; // Adjust the import based on your file structure

// // const RequesterProfile = () => {
// //   const { id } = useParams();
// //   const { data, error, loading, get } = useFetch('/status');
// //   const [originalData, setOriginalData] = React.useState([]);

// //   // setOriginalData(data.data);
// //   useEffect(() => {
// //     get('/displayall/' + id);
// // }, []);

// // console.log(id);
// // console.log(data);

// //   return <div>

// //   </div>;
// // };

// // export default RequesterProfile;

// // /////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useFetch from "../../api/useFetch"; // Adjust the import based on your file structure

// const RequesterProfile = () => {
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

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Requester Profile: {id}</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-600">Error: {error.message}</p>}

//       {originalData.length === 0 ? (
//         <p>No data available.</p>
//       ) : (<div></div>
//         <div className="space-y-4">
//           {originalData.map((item, index) => (
//             <div
//               key={index}
//               className="border rounded-lg p-4 shadow-md bg-white"
//             >

//               <p><strong>Item Name:</strong> {item.item_name}</p>
//               <p><strong>Office:</strong> {item.office_name}</p>
//               <p><strong>Status:</strong> {item.description}</p>
//               <p><strong>Updated At:</strong> {new Date(item.updated_at).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequesterProfile;


/////////////////////////////////////
/////////////////////////////////////
//////////////////////////////////////



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../api/useFetch";
import Wrapper from "./Wrapper";
const RequesterProfile = () => {
  const { id } = useParams();
  const { data, error, loading, get } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/admin`);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    get("/displayall/" + id);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setOriginalData(data.data);
    }
  }, [data]);

  const firstRecord = originalData[0];

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">
            Requester Profile
          </h1>
          {loading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-600">Error: {error.message}</p>}
          {!loading && firstRecord && (
            <div className="mb-8">
              <p className="text-lg font-semibold text-gray-700">
                <span className="mr-2 text-gray-500">First Name:</span>
                {firstRecord.fname}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                <span className="mr-2 text-gray-500">Middle Name:</span>
                {firstRecord.sname}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                <span className="mr-2 text-gray-500">Last Name:</span>
                {firstRecord.lname}
              </p>
            </div>
          )}
          {originalData.length === 0 ? (
            <p className="text-gray-500">No progress records available.</p>
          ) : (
            <div className="grid gap-6">
              {originalData.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 shadow bg-gray-50"
                >
                  <p>
                    <strong>Item:</strong> {item.item_name}
                  </p>
                  <p>
                    <strong>Office:</strong> {item.office_name}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        item.description === "completed"
                          ? "bg-green-600"
                          : item.description === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      {item.description}
                    </span>
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(item.updated_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default RequesterProfile;

/////////////////////////////////////
/////////////////////////////////////
//////////////////////////////////////
