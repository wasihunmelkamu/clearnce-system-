// import React, { useEffect, useContext } from "react";
// import TitleBar from "../../components/layout/TitleBar";
// import SearchBar from "../../components/layout/SearchBar";
// import TableCard from "../../components/layout/TableCard";
// import Wrapper from "./Wrapper";
// import useFetch from "../../api/useFetch.js";
// import Spinner from "../../components/ui/Spinner";
// import { useNavigate } from "react-router-dom";
// import { ViceContext } from "../../contexts/AllDataContext.js";

// export default function ClearanceRequestersList() {
//   const navigate = useNavigate(); 

//   const { vice, setVice } = useContext(ViceContext);
//   const [viceFilteredData, setViceFilteredData] = React.useState([]);

//   const {
//     data: viceData,
//     error: viceError,
//     loading: viceLoading,
//     get: getVice,
//   } = useFetch("/request/admin");

//   useEffect(() => {
//     if (!vice) {
//       getVice("/vice/get");
//     } else {
//       setViceFilteredData(vice);
//     }
//   }, []);

//   useEffect(() => {
//     if (viceData && !vice) {
//       setVice(viceData);
//       setViceFilteredData(viceData);
//     }
//   }, [viceData, vice, setVice]);

//   const header1 = [
//     { label: "First Name", key: "fname" },
//     { label: "Middle Name", key: "sname" },
//     { label: "Last Name", key: "lname" },
//     { label: "E-mail", key: "email" },
//     { label: "Status", key: "status" },
//     { label: "Updated Date", key: "updated_at" },
//     { label: "Action", key: "action" },
//   ];

//   const handleSearch = (searchTerm, selectedFilter) => {
//     if (!vice) return;

//     const filtered1 = vice.filter((data) => {
//       const name = data.fname || "";
//       const matchesName = name
//         .toLowerCase()
//         .startsWith(searchTerm.toLowerCase());

//       const matchesFilter =
//         selectedFilter === "All" || data.status === selectedFilter;

//       return matchesName && matchesFilter;
//     });

//     setViceFilteredData(filtered1);
//   };

//   const handleRowClick = (rowId) => {
//     navigate(`#`);
//   };

//   return (
//     <Wrapper>
//       {console.log(vice)}

//       <div>
//         <TitleBar title="request for department head" />
//         <SearchBar
//           filterParams={["All", "Approved", "Pending", "Rejected"]}
//           searchFunction={handleSearch}
//           placeholder="Search for requests..."
//         />

//         {/* //========================================= head table =============================================// */}

//         {viceLoading && <Spinner />}
//         {viceError && (
//           <>
//             {console.log("Error occurred:", viceError)}
//             <p className="text-red-600">Can not load, check your connection.</p>
//           </>
//         )}
//         {!viceLoading && !viceError && viceFilteredData.request === null && (
//           <div>
//             <div className="mt-10 text-2xl font-bold ">
//               No employees are waiting for Vice President approval.
//             </div>
//             <br />
//           </div>
//         )}
//         {!viceLoading && !viceError && viceFilteredData && (
//           <div>
//             <div className="mt-10 text-2xl font-bold ">
//               List of employees who are waiting for department head approval:
//             </div>
//             <br />
//             <TableCard
//               header={header1}
//               inputData={
//                 Array.isArray(viceFilteredData) ? viceFilteredData : []
//               }
//               onRowClick={handleRowClick}

//             />
//             <br />
//             <br />
//           </div>
//         )}
//       </div>
//     </Wrapper>
//   );
// }

// import React, { useEffect, useContext, useState } from "react"; // Added useState
// import TitleBar from "../../components/layout/TitleBar";
// import SearchBar from "../../components/layout/SearchBar";
// import TableCard from "../../components/layout/TableCard";
// import Wrapper from "./Wrapper";
// import useFetch from "../../api/useFetch.js";
// import Spinner from "../../components/ui/Spinner";
// import { useNavigate } from "react-router-dom";
// import { ViceContext } from "../../contexts/AllDataContext.js";

// export default function ClearanceRequestersList() {
//   const navigate = useNavigate();

//   const { vice, setVice } = useContext(ViceContext);
//   // Initialize with an object that has a 'request' property as an empty array
//   // This matches the expected data structure {"request": []}
//   const [viceFilteredData, setViceFilteredData] = useState({ request: [] });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   const {
//     data: viceData,
//     error: viceError,
//     loading: viceLoading,
//     get: getVice,
//   } = useFetch("/status/admin");   //older url = /request/admin/vice/get

//   useEffect(() => {
//     // If vice is null/undefined in context, fetch it.
//     // If vice exists, use it directly (this handles cases where it might be loaded elsewhere)
//     if (!vice) {
//       getVice("/request/vice");
//     } else {
//       // Ensure vice is treated as the full object, and filter its 'request' array
//       setViceFilteredData(vice);
//     }
//   }, []);

//   // Update vice context and filtered data when viceData changes from fetch
//   useEffect(() => {
//     // Check if viceData exists and has a 'request' property
//     if (viceData && viceData.request !== undefined) {
//       setVice(viceData); // Update context
//       setViceFilteredData(viceData); // Update local filtered state
//     }
//   }, [viceData, setVice]); // vice is removed from dependency because we update it via setVice

//   // Apply search/filter whenever base data (vice), searchTerm, or selectedFilter changes
//   useEffect(() => {
//     // Ensure vice context data is available and has a 'request' array
//     if (!vice || !Array.isArray(vice.request)) {
//       setViceFilteredData({ request: [] }); // Reset to empty if no data or not array
//       return;
//     }

//     const filteredRequests = vice.request.filter((data) => {
//       const name = data.fname || "";
//       const matchesName = name
//         .toLowerCase()
//         .startsWith(searchTerm.toLowerCase());

//       const matchesFilter =
//         selectedFilter === "All" || data.status === selectedFilter;

//       return matchesName && matchesFilter;
//     });

//     setViceFilteredData({ ...vice, request: filteredRequests }); // Keep other vice properties, update 'request'
//   }, [vice, searchTerm, selectedFilter]);

//   const header1 = [
//     { label: "First Name", key: "fname" },
//     { label: "Middle Name", key: "sname" },
//     { label: "Last Name", key: "lname" },
//     { label: "E-mail", key: "email" },
//     { label: "Department Name", key: "dept_name" },
//     { label: "Created Date", key: "created_at" },
//     { label: "Action", key: "action" },
//   ];

//   const handleSearch = (term, filter) => {
//     setSearchTerm(term);
//     setSelectedFilter(filter);
//     // The actual filtering is now handled by the useEffect above
//   };

//   const handleRowClick = (rowId) => {
//     navigate(`#`); // Adjust this path if needed
//   };

//   return (
//     <Wrapper>
//       {console.log("vice context:", viceData)}
//       {console.log("viceFilteredData:", viceFilteredData)}

//       <div>
//         <TitleBar title="Requests for Vice President Approval" /> {/* Corrected title */}
//         <SearchBar
//           filterParams={["All", "Approved", "Pending", "Rejected"]}
//           searchFunction={handleSearch}
//           placeholder="Search for requests..."
//         />

//         {viceLoading && <Spinner />}
//         {viceError && (
//           <>
//             {console.log("Error occurred:", viceError)}
//             <p className="text-red-600">Can not load, check your connection.</p>
//           </>
//         )}

//         {/* CONDITION FOR "No employees are waiting..." */}
//         {!viceLoading && !viceError && viceFilteredData?.request?.length === 0 && (
//           <div>
//             <div className="mt-10 text-2xl text-center font-bold ">
//               No employees are waiting for Vice President approval.
//             </div>
//             <br />
//           </div>
//         )}

//         {/* CONDITION FOR DISPLAYING THE TABLE (only if there are requests) */}
//         {!viceLoading && !viceError && viceFilteredData?.request?.length > 0 && (
//           <div>
//             <div className="mt-10 text-2xl font-bold ">
//               List of employees who are waiting for Vice President approval: {/* Corrected text */}
//             </div>
//             <br />
//             <TableCard
//               header={header1}
//               // Pass the 'request' array from viceFilteredData
//               inputData={Array.isArray(viceFilteredData.request) ? viceFilteredData.request : []}
//               onRowClick={handleRowClick}
//             />
//             <br />
//             <br />
//           </div>
//         )}
//       </div>
//     </Wrapper>
//   );
// }





import React, { useEffect, useContext, useState } from "react";
import TitleBar from "../../components/layout/TitleBar";
import SearchBar from "../../components/layout/SearchBar";
import TableCard from "../../components/layout/TableCard";
import Wrapper from "./Wrapper";
import useFetch from "../../api/useFetch.js";
import Spinner from "../../components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import { ViceContext } from "../../contexts/AllDataContext.js";

export default function ClearanceRequestersList() {
  const navigate = useNavigate();

  const { vice, setVice } = useContext(ViceContext);
  // Initialize with an object that has a 'request' property as an empty array
  // This matches the expected data structure {"request": []}
  const [viceFilteredData, setViceFilteredData] = useState({ request: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const {
    data: viceData,
    error: viceError,
    loading: viceLoading,
    get: getVice,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/admin`); //older url = /request/admin/vice/get

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      // Using toLocaleDateString for a user-friendly, locale-aware date format
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString; // Return original if parsing fails
    }
  };

  useEffect(() => {
    // If vice is null/undefined in context, fetch it.
    // If vice exists, use it directly (this handles cases where it might be loaded elsewhere)
    if (!vice || !vice.request || vice.request.length === 0) {
      getVice("/request/vice");
    } else {
      // Ensure vice is treated as the full object, and format its 'request' array
      const formattedRequests = vice.request.map((item) => ({
        ...item,
        created_at: formatDate(item.created_at),
      }));
      setViceFilteredData({ ...vice, request: formattedRequests });
    }
  }, []);

  // Update vice context and filtered data when viceData changes from fetch
  useEffect(() => {
    // Check if viceData exists and has a 'request' property that is an array
    if (viceData && Array.isArray(viceData.request)) {
      const formattedFetchedRequests = viceData.request.map((item) => ({
        ...item,
        created_at: formatDate(item.created_at),
      }));
      setVice({ ...viceData, request: formattedFetchedRequests }); // Update context with formatted data
      setViceFilteredData({ ...viceData, request: formattedFetchedRequests }); // Update local filtered state
    }
  }, [viceData, setVice]);

  // Apply search/filter whenever base data (vice), searchTerm, or selectedFilter changes
  useEffect(() => {
    // Ensure vice context data is available and has a 'request' array
    if (!vice || !Array.isArray(vice.request)) {
      setViceFilteredData({ request: [] }); // Reset to empty if no data or not array
      return;
    }

    const filteredRequests = vice.request.filter((data) => {
      const name = data.fname || "";
      const matchesName = name
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "All" || data.status === selectedFilter;

      return matchesName && matchesFilter;
    });

    // Format the dates of the filtered requests before setting the state
    const formattedFilteredRequests = filteredRequests.map((item) => ({
      ...item,
      created_at: formatDate(item.created_at),
    }));

    setViceFilteredData({ ...vice, request: formattedFilteredRequests }); // Keep other vice properties, update 'request'
  }, [vice, searchTerm, selectedFilter]);

  const header1 = [
    { label: "First Name", key: "fname" },
    { label: "Middle Name", key: "sname" },
    { label: "Last Name", key: "lname" },
    { label: "E-mail", key: "email" },
    { label: "Department Name", key: "dept_name" },
    { label: "Created Date", key: "created_at" }, // This key will now hold the formatted date string
  ];

  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setSelectedFilter(filter);
    // The actual filtering is now handled by the useEffect above
  };

  const handleRowClick = (rowId) => {
    navigate(`#`); // Adjust this path if needed
  };

  return (
    <Wrapper>
      {/* console.log statements are useful for debugging but should be removed in production */}
      {/* {console.log("vice context:", viceData)} */}
      {/* {console.log("viceFilteredData:", viceFilteredData)} */}

      <div>
        <TitleBar title="Requests for Vice President Approval" />
        <SearchBar
          filterParams={["All", "Approved", "Pending", "Rejected"]}
          searchFunction={handleSearch}
          placeholder="Search for requests..."
        />

        {viceLoading && <Spinner />}
        {viceError && (
          <>
            {console.error("Error occurred:", viceError)}
            <p className="text-red-600">Can not load, check your connection.</p>
          </>
        )}

        {/* CONDITION FOR "No employees are waiting..." */}
        {!viceLoading &&
          !viceError &&
          viceFilteredData?.request?.length === 0 && (
            <div>
              <div className="mt-10 text-2xl text-center font-bold ">
                No employees are waiting for Vice President approval.
              </div>
              <br />
            </div>
          )}

        {/* CONDITION FOR DISPLAYING THE TABLE (only if there are requests) */}
        {!viceLoading &&
          !viceError &&
          viceFilteredData?.request?.length > 0 && (
            <div>
              <div className="mt-10 text-2xl font-bold ">
                List of employees who are waiting for Vice President approval:
              </div>
              <br />
              <TableCard
                header={header1}
                // Pass the 'request' array from viceFilteredData, ensuring it's an array
                inputData={
                  Array.isArray(viceFilteredData.request)
                    ? viceFilteredData.request
                    : []
                }
                onRowClick={handleRowClick}
              />
              <br />
              <br />
            </div>
          )}

      </div>
    </Wrapper>
  );
}
