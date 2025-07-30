// import React, { useEffect, useContext, useState } from "react";
// import useFetch from "../../api/useFetch.js";
// import Spinner from "../../components/ui/Spinner";
// import TableCard from "../../components/layout/TableCard"; // Assuming TableCard is correctly imported
// import { HRContext } from "../../contexts/AllDataContext.js";
// import { useNavigate } from "react-router-dom"; // Don't forget useNavigate
// import Wrapper from "./Wrapper.jsx";
// import SearchBar from "../../components/layout/SearchBar.jsx";
// import TitleBar from "../../components/layout/TitleBar.jsx";

// const RequestForHR = () => {
//   const navigate = useNavigate();
//   const { HR, setHR } = useContext(HRContext);
//   const [HRFilteredData, setHRFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // State for local search within HR data
//   const [selectedFilter, setSelectedFilter] = useState("All"); // State for local filter within HR data

//   // useFetch for HR data
//   const {
//     data: HRData,
//     error: HRError,
//     loading: HRLoading,
//     get: getHR,
//   } = useFetch("/status/admin");

//   // Fetch HR data if not already in context
//   useEffect(() => {
//     if (!HR) {
//       getHR("/displayAll");
//     } else {
//       setHRFilteredData(HR);
//     }
//   }, [HR, getHR]);

//   // Update HR context and filtered data when HRData changes
//   useEffect(() => {
//     if (HRData?.status) { // Assuming HRData structure includes a 'status' array
//       setHR(HRData.status);
//       setHRFilteredData(HRData.status);
//     }
//   }, [HRData, setHR]);

//   // Handle local search and filter for HR data

//   useEffect(() => {
//     if (!HR) return; // Ensure HR data is available

//     const filtered = HR.filter((data) => {
//       const name = data.fname || "";
//       const matchesName = name
//         .toLowerCase()
//         .startsWith(searchTerm.toLowerCase());

//       const matchesFilter =
//         selectedFilter === "All" || data.status === selectedFilter;

//       return matchesName && matchesFilter;
//     });
//     setHRFilteredData(filtered);
//   }, [HR, searchTerm, selectedFilter]);

//   const header1 = [
//     { label: "First Name", key: "fname" },
//     { label: "Middle Name", key: "sname" },
//     { label: "Last Name", key: "lname" },
//     { label: "E-mail", key: "email" },
//     { label: "Status", key: "status" },
//     { label: "Updated Date", key: "updated_at" },
//     { label: "Action", key: "action" },
//   ];

//   const handleApprove = (row) => {
//     // You might want to make an actual API call here or navigate
//     navigate(`/clearedstaffform/${row.staff_id}`);
//   };

//   const handleRowClick = (rowId) => {
//     navigate(`/requester/${rowId}`); // Adjust this path if needed
//   };

//   return (
//     <Wrapper>
//       <div>
//       <TitleBar title="Clearance Requesters List" />
//         <SearchBar
//           filterParams={["All", "Approved", "Pending", "Rejected"]}
//           // searchFunction={handleSearch}
//           placeholder="Search for requests..."
//         />
//         <div className="mt-10 text-2xl font-bold">
//           List of employees who are approving the clearance request in different offices:
//         </div>
//         <br />
//         {HRLoading && <Spinner />}
//         {HRError && (
//           <>
//             {console.log("Error occurred:", HRError)}
//             <p className="text-red-600">Can not load HR clearance statuses, check your connection.</p>
//           </>
//         )}
//         {!HRLoading && !HRError && (
//           <TableCard
//             header={header1}
//             inputData={Array.isArray(HRFilteredData) ? HRFilteredData : []}
//             onRowClick={handleRowClick}
//             renderAction={(row) =>
//               row.status === "completed" ? (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent row navigation
//                     handleApprove(row);
//                   }}
//                   className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Approve
//                 </button>
//               ) : (
//                 <span className="text-gray-400">N/A</span>
//               )
//             }
//           />
//         )}
//         <br />
//         <br />
//       </div>
//     </Wrapper>
//   );
// };

// export default RequestForHR;

import React, { useEffect, useContext, useState } from "react";
import useFetch from "../../api/useFetch.js";
import Spinner from "../../components/ui/Spinner";
import TableCard from "../../components/layout/TableCard"; // Assuming TableCard is correctly imported
import { HRContext } from "../../contexts/AllDataContext.js";
import { useNavigate } from "react-router-dom"; // Don't forget useNavigate
import Wrapper from "./Wrapper.jsx";
import SearchBar from "../../components/layout/SearchBar.jsx";
import TitleBar from "../../components/layout/TitleBar.jsx";

const RequestForHR = () => {
  const navigate = useNavigate();
  const { HR, setHR } = useContext(HRContext);
  const [HRFilteredData, setHRFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for local search within HR data
  const [selectedFilter, setSelectedFilter] = useState("All"); // State for local filter within HR data

  // useFetch for HR data
  const {
    data: HRData,
    error: HRError,
    loading: HRLoading,
    get: getHR,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/admin`);

  // Fetch HR data if not already in context
  useEffect(() => {
    if (!HR) {
      getHR("/displayAll");
    } else {
      setHRFilteredData(HR);
    }
  }, [HR, getHR]);

  // Update HR context and filtered data when HRData changes
  useEffect(() => {
    if (HRData?.status) {
      // Assuming HRData structure includes a 'status' array
      setHR(HRData.status);
      setHRFilteredData(HRData.status);
    }
  }, [HRData, setHR]);

  // Handle local search and filter for HR data

  const handleSearch = (searchTerm, selectedFilter) => {
    if (!HR) return;

    const filtered1 = HR.filter((data) => {
      const name = data.fname || "";
      const matchesName = name
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "All" || data.status === selectedFilter;

      return matchesName && matchesFilter;
    });

    setHRFilteredData(filtered1);
  };

  const header1 = [
    { label: "First Name", key: "fname" },
    { label: "Middle Name", key: "sname" },
    { label: "Last Name", key: "lname" },
    { label: "E-mail", key: "email" },
    { label: "Status", key: "status" },
    { label: "Updated Date", key: "updated_at" },
    { label: "Action", key: "action" },
  ];

  const handleApprove = (row) => {
    // You might want to make an actual API call here or navigate
    navigate(`/clearedstaffform/${row.staff_id}`);
  };

  const handleRowClick = (rowId) => {
    navigate(`/requester/${rowId}`); // Adjust this path if needed
  };

  return (
    <Wrapper>
      <div>
        <TitleBar title="Clearance Requesters List" />
        <SearchBar
          filterParams={["All", "Approved", "Pending", "Rejected"]}
          searchFunction={handleSearch}
          placeholder="Search for requests..."
        />
        <div className="mt-10 text-2xl font-bold">
          List of employees who are approving the clearance request in different
          offices:
        </div>
        <br />
        {HRLoading && <Spinner />}
        {HRError && (
          <>
            {console.log("Error occurred:", HRError)}
            <p className="text-red-600">
              Can not load HR clearance statuses, check your connection.
            </p>
          </>
        )}
        {!HRLoading && !HRError && (
          <TableCard
            header={header1}
            inputData={Array.isArray(HRFilteredData) ? HRFilteredData : []}
            onRowClick={handleRowClick}
            renderAction={(row) =>
              row.status === "completed" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row navigation
                    handleApprove(row);
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
              ) : (
                <span className="text-gray-400">N/A</span>
              )
            }
          />
        )}
        <br />
        <br />
      </div>
    </Wrapper>
  );
};

export default RequestForHR;
