import React, { useEffect, useContext } from "react";
import TitleBar from "../../components/layout/TitleBar";
import SearchBar from "../../components/layout/SearchBar";
import TableCard from "../../components/layout/TableCard";
import Wrapper from "./Wrapper";
import useFetch from "../../api/useFetch.js";
import Spinner from "../../components/ui/Spinner";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HRContext } from "../../contexts/AllDataContext.js";

export default function ClearanceRequestersList() {
  const { data, error, loading, get } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/request/admin`);

  useEffect(() => {
    get("/get"); // Fetch data on component mount
  }, []);

  console.log(data);

  const navigate = useNavigate();

  const { HR, setHR } = useContext(HRContext);
  const [HRFilteredData, setHRFilteredData] = React.useState([]);

  //========================================= HR =============================================//

  const {
    data: HRData,
    error: HRError,
    loading: HRLoading,
    get: getHR,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/admin`);

  useEffect(() => {
    if (!HR) {
      getHR("/displayAll");
    } else {
      setHRFilteredData(HR);
    }
  }, []);

  useEffect(() => {
    if (HRData?.status) {
      setHR(HRData.status);
      setHRFilteredData(HRData.status);
    }
  }, [HRData, HR, setHR]);

  //========================================= login post API =============================================//

  const {
    data: postData,
    error: postError,
    loading: postLoading,
    post,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin`);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const newData = { username: "yoya", password: "123456" };
    await post("/login", newData);
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

  const { data: postdata, post: postApprove } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/cleared`);

  const handleApprove = (row) => {
    navigate(`/clearedstaffform/${row.staff_id}`);
  };

  console.log("postdata", postdata);

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

  const handleRowClick = (rowId) => {
    navigate(`/requester/${rowId}`);
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
        {/* <div>
          <button onClick={handleSignIn}>login</button>
          <br />

          {postLoading && <p>post Loading...</p>}
          {postError && <p>post Error: {postError.message}</p>}
          {postData && ` posted ${console.log(postData)}`}
        </div> */}
        {/* //========================================= HR table =============================================// */}

        {HRLoading && <Spinner />}
        {HRError && (
          <>
            {console.log("Error occurred:", HRError)}
            <p className="text-red-600">Can not load, check your connection.</p>
          </>
        )}
        {!HRLoading && !HRError && HRFilteredData && (
          <div>
            <div className="mt-10 text-2xl font-bold ">
              List of employees who are aproving the clearance request in
              different offices:
            </div>
            <br />
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
            <br />
            <br />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

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
// /
// /
// /
// /
// /

// import React, { useEffect, useContext, useState, useCallback } from "react"; // Added useState and useCallback
// import TitleBar from "../../components/layout/TitleBar";
// import SearchBar from "../../components/layout/SearchBar";
// import TableCard from "../../components/layout/TableCard";
// import Wrapper from "./Wrapper";
// import useFetch from "../../api/useFetch.js";
// import Spinner from "../../components/ui/Spinner";
// import { useNavigate } from "react-router-dom";
// import { HRContext } from "../../contexts/AllDataContext.js";

// export default function ClearanceRequestersList() {
//   const navigate = useNavigate();

//   const { HR, setHR } = useContext(HRContext);
//   const [HRFilteredData, setHRFilteredData] = useState([]); // Use useState
//   const [searchTerm, setSearchTerm] = useState(""); // State for search term
//   const [selectedFilter, setSelectedFilter] = useState("All"); // State for selected filter

//   // Helper function to format date (re-using from previous examples for consistency)
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//       });
//     } catch (e) {
//       console.error("Error formatting date:", e);
//       return dateString;
//     }
//   };

//   // ========================================= HR Data Fetching and Context =============================================//

//   const {
//     data: HRData,
//     error: HRError,
//     loading: HRLoading,
//     get: getHR,
//   } = useFetch("/status/admin"); // Assuming /status/admin is the correct base for HR

//   useEffect(() => {
//     // If HR context is empty, fetch data.
//     // If HR is an object like { status: [] }, check HR.status.length
//     if (!HR || !Array.isArray(HR.status) || HR.status.length === 0) {
//       getHR("/displayAll"); // Specific endpoint for HR data
//     } else {
//       // If HR data already exists in context, format and set it to filtered data
//       const formattedHR = HR.status.map((item) => ({
//         ...item,
//         updated_at: formatDate(item.updated_at), // Format updated_at date
//       }));
//       setHRFilteredData(formattedHR);
//     }
//   }, []); // Run once on component mount

//   useEffect(() => {
//     // Check if HRData exists and has a 'status' property which is an array
//     if (HRData && Array.isArray(HRData.status)) {
//       const formattedData = HRData.status.map((item) => ({
//         ...item,
//         updated_at: formatDate(item.updated_at), // Format updated_at date
//       }));
//       setHR(formattedData); // Update context with formatted data
//       setHRFilteredData(formattedData); // Update local filtered state
//     }
//   }, [HRData, setHR]);

//   // ========================================= Search and Filter Logic =============================================//

//   const handleSearch = useCallback((term, filter) => {
//     setSearchTerm(term);
//     setSelectedFilter(filter);
//   }, []);

//   useEffect(() => {
//     // Ensure HR context data is available and is an array
//     if (!HR || !Array.isArray(HR.status)) {
//       setHRFilteredData([]); // Reset to empty if no data or not array
//       return;
//     }

//     const filtered = HR.status.filter((data) => {
//       // Combine name fields for broader search
//       const name = `${data.fname || ""} ${data.sname || ""} ${
//         data.lname || ""
//       }`;
//       const lowerCaseSearchTerm = searchTerm.toLowerCase();

//       const matchesName = name.toLowerCase().includes(lowerCaseSearchTerm);

//       const matchesFilter =
//         selectedFilter === "All" || data.status === selectedFilter;

//       return matchesName && matchesFilter;
//     });

//     // Format the dates of the filtered results before setting the state
//     const formattedFiltered = filtered.map((item) => ({
//       ...item,
//       updated_at: formatDate(item.updated_at),
//     }));

//     setHRFilteredData(formattedFiltered);
//   }, [HR, searchTerm, selectedFilter]); // Dependencies for re-running filter

//   // ========================================= Table Configuration and Actions =============================================//

//   const header1 = [
//     { label: "First Name", key: "fname" },
//     { label: "Middle Name", key: "sname" },
//     { label: "Last Name", key: "lname" },
//     { label: "E-mail", key: "email" },
//     { label: "Status", key: "status" },
//     { label: "Updated Date", key: "updated_at" }, // This key will now hold the formatted date string
//     { label: "Action", key: "action" },
//   ];

//   const handleApprove = (row) => {
//     navigate(`/clearedstaffform/${row.staff_id}`);
//   };

//   const handleRowClick = (rowId) => {
//     navigate(`/requester/${rowId}`);
//   };

//   // ========================================= Render Section =============================================//

//   return (
//     <Wrapper>
//      { console.log(HRFilteredData)    }  
//       <div>
//         <TitleBar title="Clearance Requesters List" />

//         {/* Display Loading Spinner */}
//         {HRLoading && <Spinner />}

//         {/* Display Error Message */}
//         {HRError && (
//           <p className="text-red-600">
//             Can not load data, please check your connection.
//           </p>
//         )}

//         {/* Conditional Rendering for Data or No Data Message */}
//         {!HRLoading && !HRError && (
//           <>
//             {HRFilteredData.length === 0 ? (
            
//               <div className="mt-10 text-2xl text-center font-bold">
//                   {console.log(HRFilteredData)              }
//                 No employees are currently requesting clearance approval.
//               </div>
//             ) : (
//               // Display SearchBar and Table only if there is data
//               <div>
//                 <SearchBar
//                   filterParams={["All", "Approved", "Pending", "Rejected"]} // Adjust based on actual status values
//                   searchFunction={handleSearch}
//                   placeholder="Search for requests..."
//                 />
//                 <div className="mt-10 text-2xl font-bold">
//                   List of employees who are approving the clearance request in
//                   different offices:
//                 </div>
//                 <br />
//                 <TableCard
//                   header={header1}
//                   inputData={HRFilteredData} // HRFilteredData is already an array and formatted
//                   onRowClick={handleRowClick}
//                   renderAction={(row) =>
//                     row.status === "completed" ? (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation(); // Prevent row navigation
//                           handleApprove(row);
//                         }}
//                         className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                       >
//                         Approve
//                       </button>
//                     ) : (
//                       <span className="text-gray-400">N/A</span>
//                     )
//                   }
//                 />
//                 <br />
//                 <br />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </Wrapper>
//   );
// }
