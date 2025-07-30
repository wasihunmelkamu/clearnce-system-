



// import React, { useContext } from "react";
// import TitleBar from "../../components/layout/TitleBar";
// import Wrapper from "./Wrapper";
// import useFetch from "../../api/useFetch.js";
// import { useEffect } from "react";
// import TableCard from "../../components/layout/TableCard.jsx";
// import { useNavigate } from "react-router-dom";
// import SearchBar from "../../components/layout/SearchBar.jsx";
// import Spinner from "../../components/ui/Spinner.jsx";
// import { StaffContext } from "../../contexts/AllDataContext.js";

// function ClearedStaff() {
//   const { staff, setStaff } = useContext(StaffContext);

//   const [filteredData, setFilteredData] = React.useState([]);
//   const { data, error, loading, get } = useFetch("/cleared");

//   const navigate = useNavigate();

//   const header = [
//     { label: "First Name", key: "fname" },
//     { label: "Middle Name", key: "sname" },
//     { label: "Last Name", key: "lname" },
//     { label: "Cleared Date", key: "cleared_date" },
//     {
//       label: "Educational Level",
//       key: "educational_level",
//     },
//     { label: "Postition", key: "position" },
//   ];
//   // fetch cleared data

//   useEffect(() => {
//     if (!staff) {
//       get("/get");
//     } else {
//       setFilteredData(staff);
//     }
//   }, []);

//   useEffect(() => {
//     if (data && !staff) {
//       setStaff(data.message);
//       setFilteredData(data.message);
//     }
//   }, [data, staff, setStaff]);

//   const handleSearch = (searchTerm, selectedFilter) => {
//     if (!staff) return;
//     const filtered = staff.filter((data) => {
//       const name = data.fname || "";
//       const matchesName = name
//         .toLowerCase()
//         .startsWith(searchTerm.toLowerCase());

//       const matchesFilter =
//         selectedFilter === "All" || data.status === selectedFilter;

//       return matchesName && matchesFilter;
//     });

//     setFilteredData(filtered);
//   };

//   // row click
//   const handleRowClick = (rowId) => {
//     navigate(`/clearedstaff/${rowId}`);
//   };

//   return (
//     <Wrapper>
//       {console.log(data)}

//       <div>
//         <TitleBar title="Cleared Staff" />
        
//         {loading && <Spinner />}
//         {error && <p className="text-red-600">Error: {error.message}</p>}

//         {!loading && staff && (
//           <div>
//             <SearchBar
//             filterParams={["All", "Approved", "Pending", "Rejected"]}
//             searchFunction={handleSearch}
//             placeholder="Search for requests..."
//                     />
//             <TableCard
//               header={header}
//               inputData={Array.isArray(filteredData) ? filteredData : []}
//               onRowClick={handleRowClick}
//             />
//           </div>
//         )}
//       </div>
//     </Wrapper>
//   );
// }

// export default ClearedStaff;






import React, { useContext, useEffect, useState, useCallback } from "react"; // Added useState and useCallback
import TitleBar from "../../components/layout/TitleBar";
import Wrapper from "./Wrapper";
import useFetch from "../../api/useFetch.js";
import TableCard from "../../components/layout/TableCard.jsx";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/layout/SearchBar.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import { StaffContext } from "../../contexts/AllDataContext.js";

function ClearedStaff() {
  const { staff, setStaff } = useContext(StaffContext);

  const [filteredData, setFilteredData] = useState([]); // Use useState directly
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedFilter, setSelectedFilter] = useState("All"); // State for selected filter

  const { data, error, loading, get } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/cleared`); // Assuming /cleared/get is the endpoint

  const navigate = useNavigate();

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

  const header = [
    { label: "First Name", key: "fname" },
    { label: "Middle Name", key: "sname" },
    { label: "Last Name", key: "lname" },
    { label: "Cleared Date", key: "cleared_date" }, // This key will now hold the formatted date string
    {
      label: "Educational Level",
      key: "educational_level",
    },
    { label: "Position", key: "position" }, // Corrected typo: Postition -> Position
  ];

  // Effect to fetch cleared data on component mount if not in context
  useEffect(() => {
    // Check if staff is null, or if it's an empty array.
    // Assuming staff context should hold the array of cleared staff directly.
    if (!staff || staff.length === 0) {
      get("/get"); // Call the specific endpoint to get cleared staff
    } else {
      // If staff data already exists in context, format it and set it to filteredData
      const formattedStaff = staff.map((item) => ({
        ...item,
        cleared_date: formatDate(item.cleared_date),
      }));
      setFilteredData(formattedStaff);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  // Effect to update staff context and filtered data when fetched 'data' changes
  useEffect(() => {
    // Check if data exists and is an array (assuming data.message is the array)
    if (data && Array.isArray(data.message)) {
      const formattedData = data.message.map((item) => ({
        ...item,
        cleared_date: formatDate(item.cleared_date),
      }));
      setStaff(formattedData); // Update context with formatted data
      setFilteredData(formattedData); // Update local filtered state with formatted data
    }
  }, [data, setStaff]); // Added setStaff to dependencies

  // Memoized search handler for the SearchBar
  const handleSearch = useCallback((term, filter) => {
    setSearchTerm(term);
    setSelectedFilter(filter);
  }, []);

  // Effect to apply filtering whenever base data (staff), searchTerm, or selectedFilter changes
  useEffect(() => {
    // Ensure staff data is available and is an array
    if (!staff || !Array.isArray(staff)) {
      setFilteredData([]); // Reset to empty if no data or not array
      return;
    }

    const filtered = staff.filter((item) => {
      const name = `${item.fname || ""} ${item.sname || ""} ${item.lname || ""}`; // Include all name parts for broader search
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const matchesName = name.toLowerCase().includes(lowerCaseSearchTerm);

      // Assuming 'status' field might exist for filtering, otherwise remove this part
      const matchesFilter =
        selectedFilter === "All" || item.status === selectedFilter;

      return matchesName && matchesFilter;
    });

    // Format the dates of the filtered results before setting the state
    const formattedFiltered = filtered.map((item) => ({
      ...item,
      cleared_date: formatDate(item.cleared_date),
    }));

    setFilteredData(formattedFiltered);
  }, [staff, searchTerm, selectedFilter]); // Include all relevant dependencies

  // row click
  const handleRowClick = (rowId) => {
    navigate(`/clearedstaff/${rowId}`);
  };

  return (
    <Wrapper>
      {/* console.log(data) is useful for debugging but should be removed in production */}
      {/* {console.log(data)} */}

      <div>
        <TitleBar title="Cleared Staff" />

        {loading && <Spinner />}
        {error && <p className="text-red-600">Error: {error.message}</p>}

        {/* Display SearchBar and TableCard only when not loading and data is available */}
        {!loading && (
          <>
            {/* Condition for "No cleared staff found" */}
            {filteredData.length === 0 ? (
              <div className="mt-10 text-2xl text-center font-bold">
                No cleared staff found.
              </div>
            ) : (
              <>
                <SearchBar
                  filterParams={["All", "Approved", "Pending", "Rejected"]} // Adjust based on actual status values
                  searchFunction={handleSearch}
                  placeholder="Search cleared staff by name..."
                />
                <TableCard
                  header={header}
                  inputData={filteredData} // filteredData already formatted
                  onRowClick={handleRowClick}
                />
              </>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default ClearedStaff;