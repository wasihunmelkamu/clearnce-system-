// Sidebar.js
import React from "react";
import NavLinkItem from "../ui/NavLinkItem";
import aastuLogo from "../../assets/images/aastuLogo.png";
// import { nav } from "framer-motion/client"; // This import seems unused and might be causing issues. Remove if not used.
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../api/useFetch"; // Adjust the import path as necessary

const Sidebar = ({ AdminData, navItems }) => {
  // AdminData prop is not used in the provided snippet. If it's meant to pass admin data, consider using it instead of re-fetching.

  const {
    data: HRData,
    error: HRError,
    loading: HRLoading,
    get: getHR,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/admin`); // Base URL for useFetch should be set in its configuration

  // State to hold the admin data once fetched
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    // Fetch the data when the component mounts
    // The specific endpoint to get the data containing 'admin' object is '/displayAll'
    getHR("/displayAll");
  }, []); // Empty dependency array ensures this runs once on mount

  // Update adminInfo state when HRData changes (after successful fetch)
  useEffect(() => {
    if (HRData && HRData.admin) {
      setAdminInfo(HRData.admin);
    }
  }, [HRData]);

  return (
    <div className=" w-56 bg-sideBarColor text-white flex flex-col p-2">
      <div className="flex mb-6 items-center">
        <img
          className="rounded-full w -14 h-14 mr-4"
          src={aastuLogo}
          alt="AASTU-LOGO"
        />
        <h2 className="text-lg font-bold">Staff Clearance System</h2>
      </div>
      <hr className="border-gray-300 w-full my-4" />
      <div className="flex items-center my-4 space-x-2">
        {/* You can uncomment and use AdminData.img if you intend to pass an image prop */}
        {/* <img
          className="w-14 h-14 rounded-full"
          src={AdminData.img}
          alt="Admin-Image"
        /> */}
        <NavLink to={"/HrProfile"}>
          {/* {HRLoading && (
            <div className="flex items-center">
              <p className="ml-2 text-sm">...</p>
            </div>
          )}

          {HRError && (
            <div className="text-red-300 text-sm">---</div>
          )} */}

          {adminInfo && ( // ONLY RENDER THIS BLOCK IF adminInfo IS NOT NULL
            <div className="ml-2">
              <p className="font-semibold">
                {adminInfo.fname} {adminInfo.sname} {adminInfo.lname}
              </p>
              <p className="text-sm">{adminInfo.role}</p>
            </div>
          )}
          {/* Optional: if you want a placeholder when not loading and no adminInfo */}
          {!adminInfo && !HRLoading && !HRError && (
            <div>
              <p className="font-semibold">Guest User</p>
              <p className="text-sm">Please login</p>
            </div>
          )}
        </NavLink>
      </div>
      <hr className="border-gray-300 w-full mt-4 mb-6" />
      <nav className="flex flex-col gap-6">
        {navItems.map((item, index) => (
          <NavLinkItem key={index} to={item.to}>
            <>
              <div className="flex items-center">
                <img
                  className="w-6 h-6 mr-3 invert"
                  src={item.icon}
                  alt={item.label}
                />
                {item.label}
              </div>
            </>
          </NavLinkItem>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
