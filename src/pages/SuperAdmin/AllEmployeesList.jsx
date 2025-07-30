import React, { useEffect, useState, useCallback } from "react";
import TitleBar from "../../components/layout/TitleBar";
import Wrapper from "./Wrapper";
import TableCard from "../../components/layout/TableCard";
import SearchBar from "../../components/layout/SearchBar";
import Button from "../../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import useFetch from "../../api/useFetch.js";
import { useEmployeeContext } from "../../contexts/EmployeeContext.js";
import Spinner from "../../components/ui/Spinner.jsx";

function AllEmployeesList() {
  const { employees, setEmployees } = useEmployeeContext();
  const header = [
    { label: "First Name", key: "fname" },
    { label: "Middle Name", key: "sname" },
    { label: "Last Name", key: "lname" },
    { label: "Phone", key: "phone" },
    {
      label: "E-mail",
      key: "email",
    },
    { label: "Staff ID", key: "id_number" },
    { label: "Address", key: "address" },
  ];

  const [filteredData, setFilteredData] = useState([]);
  const { data, error, loading, get } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin`); // Assuming this is your base URL for employee data

  const navigate = useNavigate();

  const fetchEmployees = useCallback(async () => {
    const response = await get("/allstaffs");
    if (response.success && Array.isArray(response.data)) {
      setEmployees(response.data);
      setFilteredData(response.data); // Apply initial filter (show all)
    } else {
      console.error(
        "Failed to fetch employees:",
        response.message || response.error.message
      );
    }
  }, [get, setEmployees]);
  useEffect(() => {
    fetchEmployees();
  }, []); // Dependency on fetchEmployees ensures it runs when needed

  useEffect(() => {
    const handleFocus = () => {
      if (document.visibilityState === "visible") {
        fetchEmployees();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchEmployees]);

  // Use useCallback to memoize handleSearch to prevent unnecessary re-renders of SearchBar
  const handleSearch = useCallback(
    (searchTerm, selectedFilter) => {
      const lowerSearchTerm = searchTerm.toLowerCase();

      const filtered = employees?.filter((item) => {
        // Check if any of the name fields (first, middle, last) start with the search term
        const matchesName = item.fname
          ?.toLowerCase()
          .startsWith(lowerSearchTerm);

        const matchesFilter =
          selectedFilter === "All" || item.status === selectedFilter;

        return matchesName && matchesFilter;
      });

      setFilteredData(filtered);
    },
    [employees]
  );

  const handleRowClick = (id) => {
    console.log("Row clicked with ID:", id);
    navigate(`/employee/${id}`);
  };

  if (loading)
    return (
      <Wrapper>
        <TitleBar title="All Employees List" />
        <div className="items-center flex justify-between">
          <SearchBar
            filterParams={["All", "Active", "Pending"]}
            searchFunction={handleSearch}
            placeholder="Search for employees..."
          />
        </div>
        <Spinner />
      </Wrapper>
    );
  if (error)
    return (
      <Wrapper>
        <TitleBar title="All Employees List" />
        <div className="items-center flex justify-between">
          <SearchBar
            filterParams={["All", "Active", "Pending"]}
            searchFunction={handleSearch}
            placeholder="Search for employees..."
          />
        </div>
        {/* Display the error message from useFetch */}
        <p className="text-red-600">Error: {error.message}</p>
      </Wrapper>
    );

  return (
    <Wrapper>
      <div>
        <TitleBar title="All Employees List" />
        <div className="items-center flex justify-between">
          <SearchBar
            filterParams={["All", "Active", "Pending"]}
            searchFunction={handleSearch}
            placeholder="Search for employees..."
          />
          <Button
            className="py-2 ml-9"
            variant="outline"
            onClick={() => navigate("/add-employee")}
          >
            Add Employee
          </Button>
        </div>

        {/* Display message if no employees are found after loading */}
        {filteredData && filteredData.length === 0 && !loading && !error && (
          <p className="text-gray-500 mt-4 text-center">No employees found.</p>
        )}

        <TableCard
          header={header}
          inputData={filteredData}
          onRowClick={handleRowClick}
        />
      </div>
    </Wrapper>
  );
}

export default AllEmployeesList;
