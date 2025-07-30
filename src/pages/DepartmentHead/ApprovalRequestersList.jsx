import React, { useEffect } from "react";
import TitleBar from "../../components/layout/TitleBar";
import SearchBar from "../../components/layout/SearchBar";
import TableCard from "../../components/layout/TableCard";
import Wrapper from "./Wrapper";
import useFetch from "../../api/useFetch.js";

export default function ClearanceRequestersList() {


  const { data: empdata, get: empget } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/request/admin`);

  useEffect(() => {
    empget("/department/get"); // Fetch data on component mount
  }, []);

  console.log(empdata);

  const header = [
    { label: "Id", key: "id" },
    { label: "Name", key: "username" },
    { label: "E-mail", key: "email" },
    { label: "Phone", key: "phone" },
    {
      label: "Address",
      key: "address",
      render: (address) => `${address.street}, ${address.city}`,
    },
    { label: "website", key: "website" },
  ];

  const [originalData, setOriginalData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const { data, error, loading, get } = useFetch(
    "https://jsonplaceholder.typicode.com"
  );

  useEffect(() => {
    get("/users");
  }, []);

  useEffect(() => {
    if (data) {
      setOriginalData(data);
      setFilteredData(data);
    }
  }, [data]);

  const handleSearch = (searchTerm, selectedFilter) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const filtered = originalData.filter((item) => {
      const matchesName = item.username
        .toLowerCase()
        .startsWith(lowerSearchTerm);

      const matchesFilter =
        selectedFilter === "All" || item.status === selectedFilter;

      return matchesName && matchesFilter;
    });

    setFilteredData(filtered);
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
        <TableCard header={header} inputData={filteredData} />
      </div>
    </Wrapper>
  );
}
