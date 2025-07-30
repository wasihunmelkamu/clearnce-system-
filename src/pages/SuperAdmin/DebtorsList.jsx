import React, { useEffect } from "react";
import Wrapper from "./Wrapper.jsx";
import TitleBar from "../../components/layout/TitleBar.jsx";
import TableCard from "../../components/layout/TableCard.jsx";
import debtors from "../../assets/data/DebtorList.js";
import SearchBar from "../../components/layout/SearchBar.jsx";
import useFetch from "../../api/useFetch.js";

function DebtorsList() {
  const { data, error, loading, get } = useFetch();
  const {
    data: postData,
    error: postError,
    loading: postLoading,
    post,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin`);

  useEffect(() => {
    get("/");
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const newData = { username: "bina", password: "123456" };
    await post("/login", newData);
  };

  const handleSerch = (searchTerm) => {
    const filteredData = debtors.filter(
      (data) =>
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.contactnumber.toString().includes(searchTerm) ||
        data.amountowed.toString().includes(searchTerm) ||
        data.duedate.includes(searchTerm)
    );
    return filteredData;
  };

  return (
    <Wrapper>
      <div>
        <TitleBar title="Creditees List" />
        <SearchBar
          filterParams={[]}
          searchFunction={handleSerch}
          placeholder="Search for Debtors..."
        />
        <button onClick={handleSignIn}>login</button>
        <TableCard
          header={[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Contact Number", key: "contactnumber" },
            { label: "Amount Owed", key: "amountowed" },
            { label: "Due Date", key: "duedate" },
            { label: "Status", key: "status" },
          ]}
          inputData={debtors}
        />
        <div>
          {loading && <p>get Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && `got ${console.log(data)}`}
          {postLoading && <p>post Loading...</p>}
          {postError && <p>post Error: {postError.message}</p>}
          {postData && ` posted ${console.log(postData)}`}
        </div>
      </div>
    </Wrapper>
  );
}

export default DebtorsList;
