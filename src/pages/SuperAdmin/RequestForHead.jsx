// import React, { useEffect, useContext, useState, useCallback } from "react";
// import useFetch from "../../api/useFetch.js";
// import Spinner from "../../components/ui/Spinner";
// import TableCard from "../../components/layout/TableCard";
// import { HeadContext } from "../../contexts/AllDataContext.js";
// import { useNavigate } from "react-router-dom";
// import SearchBar from "../../components/layout/SearchBar.jsx"; // Assuming path is correct
// import TitleBar from "../../components/layout/TitleBar.jsx"; // Assuming path is correct
// import Wrapper from "../SuperAdmin/Wrapper.jsx"; // Assuming Wrapper is needed here too for consistent layout

// const RequestForHead = () => {
//   const navigate = useNavigate();
//   const { head, setHead } = useContext(HeadContext);
//   const [headFilteredData, setHeadFilteredData] = useState([]); // Initialize as empty array
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   // useFetch for Head data
//   const {
//     data: headData,
//     error: headError,
//     loading: headLoading,
//     get: getHead,
//   } = useFetch("/status/admin"); // Base URL for the fetch //status/admin/request
//   // older fetche url = request/admin/department/get
//   // Effect to fetch Head data if not in context
//   useEffect(() => {
//     if (!head || head.length === 0) {
//       // Check if head is empty or not loaded
//       getHead("/request/department"); // Specific endpoint for head data
//     } else {
//       setHeadFilteredData(head); // Use existing context data if available
//     }
//   }, []);

//   // Effect to update Head context and filtered data when headData from fetch changes
//   useEffect(() => {
//     if (headData && Array.isArray(headData)) {
//       // Ensure headData is an array
//       setHead(headData); // Update context
//       setHeadFilteredData(headData); // Update local filtered state
//     }
//   }, [headData, setHead]); // Removed 'head' from dependency as it's updated here

//   // Local search and filter handler for the SearchBar
//   const handleSearch = useCallback((term, filter) => {
//     setSearchTerm(term);
//     setSelectedFilter(filter);
//   }, []);

//   // Effect to apply filtering whenever base data (head), searchTerm, or selectedFilter changes
//   useEffect(() => {
//     if (!head || !Array.isArray(head)) {
//       setHeadFilteredData([]); // Ensure it's an empty array if no data
//       return;
//     }

//     const filtered = head.filter((data) => {
//       const staffName = `${data.staff_fname || ""} ${data.staff_sname || ""} ${
//         data.staff_lname || ""
//       }`;
//       const deptName = data.dept_name || "";
//       const email = data.email || "";

//       const matchesSearch =
//         staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         deptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         email.toLowerCase().includes(searchTerm.toLowerCase());

//       // Note: Original data for head table doesn't have a 'status' field.
//       // If you need filtering by status, ensure your /department/get endpoint provides it,
//       // or adjust/remove this part of the filter. For now, assuming status filtering is not directly applicable.
//       // const matchesFilter = selectedFilter === "All" || data.status === selectedFilter;

//       // Returning only based on search term for now, as no status filter key provided in header2.
//       return matchesSearch;
//     });

//     setHeadFilteredData(filtered);
//   }, [head, searchTerm, selectedFilter]); // Include selectedFilter even if not directly used in matchesFilter

//   const header2 = [
//     { label: "First Name", key: "fname" },
//     { label: "Middle Name", key: "sname" },
//     { label: "Last Name", key: "lname" },
//     { label: "E-mail", key: "email" },
//     { label: "Current Position", key: "current_position" },
//     { label: "Unfinished Projects", key: "unfinished_project" },
//     { label: "Reason", key: "reason" },
//     { label: "Department Name", key: "dept_name" },
//   ];

//   const handleRowClick = (rowId) => {
//     // This was previously '#', so I'm keeping it as a placeholder.
//     // You'll likely want to navigate to a specific detail page for head requests too.
//     navigate(`#`); // Adjust this path if needed
//   };

//   return (
//     <Wrapper>
//       {console.log(headData)}

//       <div>
//         <TitleBar title="Requests for Department Head Approval" />
//         <SearchBar
//           filterParams={["All"]} // Adjust filter params if your head data has a status field
//           searchFunction={handleSearch}
//           placeholder="Search requests by name..."
//         />

//         {headLoading && <Spinner />}
//         {headError && (
//           <>
//             {console.log("Error occurred:", headError)}
//             <p className="text-red-600">
//               Can not load department head requests, check your connection.
//             </p>
//           </>
//         )}

//         {/* Condition for "No employees are waiting..." */}
//         {!headLoading && !headError && headFilteredData.length === 0 ? (
//           <div>
//             <div className="mt-10 text-2xl text-center font-bold">
//               No employees are waiting for Department Head approval.
//             </div>
//             <br />
//           </div>
//         ) : (
//           // Condition for displaying the table (only if there are requests)
//           !headLoading &&
//           !headError && (
//             <div>
//               <div className="mt-10 text-2xl font-bold">
//                 List of employees who are waiting for Department Head approval:
//               </div>
//               <br />
//               <TableCard
//                 header={header2}
//                 inputData={headFilteredData} // Pass the filtered array directly
//                 onRowClick={handleRowClick}
//                 // No renderAction for head table in original code, so omit here
//               />
//               <br />
//               <br />
//             </div>
//           )
//         )}
//       </div>
//     </Wrapper>
//   );
// };

// export default RequestForHead;

import React, { useEffect, useContext, useState, useCallback } from "react";
import useFetch from "../../api/useFetch.js";
import Spinner from "../../components/ui/Spinner";
import TableCard from "../../components/layout/TableCard";
import { HeadContext } from "../../contexts/AllDataContext.js";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/layout/SearchBar.jsx"; // Assuming path is correct
import TitleBar from "../../components/layout/TitleBar.jsx"; // Assuming path is correct
import Wrapper from "../SuperAdmin/Wrapper.jsx"; // Assuming Wrapper is needed here too for consistent layout

const RequestForHead = () => {
  const navigate = useNavigate();
  const { head, setHead } = useContext(HeadContext);
  const [headFilteredData, setHeadFilteredData] = useState([]); // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // useFetch for Head data
  const {
    data: headData,
    error: headError,
    loading: headLoading,
    get: getHead,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/admin`); // Base URL for the fetch //status/admin/request
  // older fetche url = request/admin/department/get
  // Effect to fetch Head data if not in context
  useEffect(() => {
    if (!head || head.length === 0) {
      // Check if head is empty or not loaded
      getHead("/request/department"); // Specific endpoint for head data
    } else {
      // Access the 'request' array from the context data
      setHeadFilteredData(head.request || []); // Use existing context data if available
    }
  }, []);

  // Effect to update Head context and filtered data when headData from fetch changes
  useEffect(() => {
    if (headData && headData.request && Array.isArray(headData.request)) {
      // Ensure headData.request is an array
      setHead(headData); // Update context with the whole object
      setHeadFilteredData(headData.request); // Update local filtered state with the 'request' array
    }
  }, [headData, setHead]);

  // Local search and filter handler for the SearchBar
  const handleSearch = useCallback((term, filter) => {
    setSearchTerm(term);
    setSelectedFilter(filter);
  }, []);

  // Effect to apply filtering whenever base data (head), searchTerm, or selectedFilter changes
  useEffect(() => {
    // Ensure 'head' is an object and contains the 'request' array
    const dataToFilter =
      head && Array.isArray(head.request) ? head.request : [];

    if (!dataToFilter.length === 0) {
      setHeadFilteredData([]); // Ensure it's an empty array if no data
      return;
    }

    const filtered = dataToFilter.filter((data) => {
      const staffName = `${data.fname}`;
      // const deptName = data.dept_name || "";

      const matchesSearch = staffName
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());

      return matchesSearch;
    });

    setHeadFilteredData(filtered);
  }, [head, searchTerm, selectedFilter]); // Include selectedFilter even if not directly used in matchesFilter

  const header2 = [
    { label: "First Name", key: "fname" },
    { label: "Middle Name", key: "sname" },
    { label: "Last Name", key: "lname" },
    { label: "E-mail", key: "email" },
    // Removed 'Current Position' and 'Unfinished Projects' as they are not in the new JSON
    // { label: "Current Position", key: "current_position" },
    // { label: "Unfinished Projects", key: "unfinished_project" },
    { label: "Staff ID", key: "staff_id" }, // Assuming 'reason' might be added or is implicitly understood
    { label: "Department Name", key: "dept_name" },
  ];

  const handleRowClick = (rowId) => {
    navigate(`#`); // Adjust this path if needed
  };

  return (
    <Wrapper>
      {console.log(headData)}

      <div>
        <TitleBar title="Requests for Department Head Approval" />
        <SearchBar
          filterParams={["All"]} // Adjust filter params if your head data has a status field
          searchFunction={handleSearch}
          placeholder="Search requests by name..."
        />

        {headLoading && <Spinner />}
        {headError && (
          <>
            {console.log("Error occurred:", headError)}
            <p className="text-red-600">
              Can not load department head requests, check your connection.
            </p>
          </>
        )}

        {/* Condition for "No employees are waiting..." */}
        {!headLoading && !headError && headFilteredData.length === 0 ? (
          <div>
            <div className="mt-10 text-2xl text-center font-bold">
              No employees are waiting for Department Head approval.
            </div>
            <br />
          </div>
        ) : (
          // Condition for displaying the table (only if there are requests)
          !headLoading &&
          !headError && (
            <div>
              <div className="mt-10 text-2xl font-bold">
                List of employees who are waiting for Department Head approval:
              </div>
              <br />
              <TableCard
                header={header2}
                inputData={headFilteredData} // Pass the filtered array directly
                onRowClick={handleRowClick}
                // No renderAction for head table in original code, so omit here
              />
              <br />
              <br />
            </div>
          )
        )}
      </div>
    </Wrapper>
  );
};

export default RequestForHead;
