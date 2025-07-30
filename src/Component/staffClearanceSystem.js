"use client";

import { useEffect, useState } from "react";
import { User, Search } from "lucide-react";
import Wrapper from "../pages/Vice/Wrapper";
import axios from "axios";

export default function ApprovalRequestList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchClearanceRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_DEPLOYMENT_LINK}/request/admin/vice/get`);
        setRequests(response.data.request || []);
      } catch (err) {
        console.error("Failed to fetch clearance requests:", err);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClearanceRequests();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return "Invalid date";
    }
  };
  const handleAction = async (staff_id, action) => {
   

    try {
      setProcessingId(staff_id);
      // Updated URL to request/admin/vice/update
      await axios.put("/request/admin/vice/update", { staff_id, action });

      setRequests((prev) =>
        prev.map((request) =>
          request.staff_id === staff_id
            ? {
                ...request,
                status_vice: action === "approve" ? "Approved" : "Rejected",
              }
            : request
        )
      );
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredRequests = requests.filter((request) => {
    const fullName = `${request.staff_fname || ""} ${
      request.staff_sname || ""
    } ${request.staff_lname || ""}`.toLowerCase();
    const department = request.dept_name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return fullName.includes(search) || department.includes(search);
  });

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_DEPLOYMENT_LINK}/request/admin/vice/get`);
      setRequests(response.data.request || []);
    } catch (err) {
      console.error("Failed to refresh data:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="p-8 bg-backgroundColor">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-sideBarColor">
              Approval Request List
            </h1>
            <p className="text-gray-600 mt-2">
              Review and approve pending requests
            </p>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sideBarColor focus:border-sideBarColor sm:text-sm"
                placeholder="Search by name or department"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={refreshData}
              className="px-4 py-2 bg-sideBarColor text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 text-sm font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-titleBarColor">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-sideBarColor uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Employee Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-sideBarColor uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-sideBarColor uppercase tracking-wider">
                      Request Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-sideBarColor uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-sideBarColor uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        Loading requests...
                      </td>
                    </tr>
                  ) : filteredRequests.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No approval requests found
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request) => (
                      <tr
                        key={request.staff_id}
                        className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sideBarColor/10 flex items-center justify-center text-sideBarColor font-semibold">
                              {`${request.staff_fname?.[0]}${request.staff_sname?.[0]}`}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {`${request.staff_fname} ${request.staff_sname} ${request.staff_lname}`}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {request.staff_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.dept_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(request.created_at)}
                          <div className="text-xs text-gray-500">
                            {new Date(request.created_at).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status_vice === "Approved"
                                ? "bg-green-100 text-green-800"
                                : request.status_vice === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status_vice}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status_vice === "Pending" && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleAction(request.staff_id, "approve")
                                }
                                disabled={processingId === request.staff_id}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors duration-200 text-sm flex items-center"
                              >
                                {processingId === request.staff_id && (
                                  <svg
                                    className="animate-spin mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                )}
                                {processingId === request.staff_id
                                  ? "Processing..."
                                  : "Approve"}
                              </button>
                              <button
                                onClick={() =>
                                  handleAction(request.staff_id, "reject")
                                }
                                disabled={processingId === request.staff_id}
                                className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors duration-200 text-sm flex items-center"
                              >
                                {processingId === request.staff_id && (
                                  <svg
                                    className="animate-spin mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                )}
                                {processingId === request.staff_id
                                  ? "Processing..."
                                  : "Reject"}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
