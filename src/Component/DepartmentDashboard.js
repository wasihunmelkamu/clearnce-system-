"use client";

import { useEffect, useState } from "react";
import {
  Building,
  CheckCircle,
  ChevronDown,
  FileCheck,
  Filter,
  Loader2,
  Search,
  ThumbsDown,
  ThumbsUp,
  User,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function DepartmentDashboard() {
  const [clearanceRequests, setClearanceRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch clearance requests from the backend
  useEffect(() => {
    const fetchClearanceRequests = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/request/admin/department/get`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        // Map the backend response to the expected format
        const mappedData = data.map((item) => ({
          id: item.staff_id,
          employeeName: `${item.staff_fname} ${item.staff_lname} ${
            item.staff_sname || ""
          }`.trim(),
          position: item.current_position,
          department: item.dept_name,
          submissionDate: item.created_at,
          status: item.status.toLowerCase(),
          reason: item.reason,
          unfinishedWork: item.unfinished_projects
            ? [
                {
                  id: 1,
                  task: item.unfinished_projects,
                  priority: "medium",
                  deadline: new Date().toISOString(),
                },
              ]
            : [],
        }));
        setClearanceRequests(mappedData);
      } catch (err) {
        console.error("Failed to fetch clearance requests:", err);
        setError("Failed to load clearance requests. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClearanceRequests();
  }, []);

  // Filter requests based on search term and status filter
  const filteredRequests = clearanceRequests.filter((request) => {
    const matchesSearch =
      request.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(request.id)?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      request.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (id) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/request/admin/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: "approved", staff_id: id }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Update local state after successful API call
      setClearanceRequests(
        clearanceRequests.map((request) =>
          request.id === id ? { ...request, status: "approved" } : request
        )
      );

      // Update selected request if it's the one being approved
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, status: "approved" });
      }

      alert(
        `Clearance request ${id} has been approved and sent to the backend.`
      );
    } catch (err) {
      console.error("Failed to approve clearance request:", err);
      alert(`Failed to approve clearance request: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async (id) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/request/admin/reject/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected", staff_id: id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Update local state after successful API call
      setClearanceRequests(
        clearanceRequests.map((request) =>
          request.id === id ? { ...request, status: "rejected" } : request
        )
      );

      // Update selected request if it's the one being rejected
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, status: "rejected" });
      }

      alert(`Clearance request ${id} has been rejected.`);
    } catch (err) {
      console.error("Failed to reject clearance request:", err);
      alert(`Failed to reject clearance request: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();

    switch (statusLower) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status || "Unknown"}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  const getReadinessLevelBadge = (level) => {
    switch (level) {
      case "high":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            <ThumbsUp className="mr-1 h-3 w-3" />
            High
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            <ThumbsDown className="mr-1 h-3 w-3" />
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-backgroundColor">
      {/* Header */}
      <header className="bg-sideBarColor text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building className="h-8 w-8 mr-3" />
              <div>
                <h1 className="text-xl font-bold">Department Dashboard</h1>
                <p className="text-sm text-titleBarColor">
                  Clearance Request Management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Admin: Department Head</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-sideBarColor">
            Employee Clearance Requests
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or ID"
                className="pl-10 pr-4 py-2 border border-lightGray rounded-lg focus:outline-none focus:ring-2 focus:ring-editButtonColor w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border border-lightGray rounded-lg focus:outline-none focus:ring-2 focus:ring-editButtonColor appearance-none bg-white w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-3 text-red-500" />
            <p>{error}</p>
          </div>
        )}

        {/* Table of clearance requests */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 text-sideBarColor animate-spin" />
                <span className="ml-2 text-sideBarColor">
                  Loading clearance requests...
                </span>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-lightGray">
                <thead className="bg-sideBarColor text-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Employee
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Submission Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-lightGray">
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request, index) => (
                      <tr
                        key={request.id}
                        className={`${
                          index % 2 === 1 ? "bg-evenTableRowColor" : "bg-white"
                        } hover:bg-blue-50 cursor-pointer transition-colors`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sideBarColor">
                          {request.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {request.employeeName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {request.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(
                            request.submissionDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {getStatusBadge(request.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <button
                            className="text-editButtonColor hover:text-sideBarColor font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRequest(request);
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No clearance requests found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Selected request details */}
        {selectedRequest && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-sideBarColor text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <FileCheck className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-medium">
                  Clearance Request Details
                </h3>
              </div>
              <div>{getStatusBadge(selectedRequest.status)}</div>
            </div>

            <div className="p-6">
              {/* Employee info */}
              <div className="mb-6 pb-6 border-b border-lightGray">
                <div className="flex items-start">
                  <div className="bg-sideBarColor rounded-full p-3 mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-sideBarColor">
                      {selectedRequest.employeeName}
                    </h4>
                    <p className="text-gray-600">
                      {selectedRequest.position} • {selectedRequest.department}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Submitted on{" "}
                      {new Date(
                        selectedRequest.submissionDate
                      ).toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700">
                        Reason:{" "}
                      </span>
                      <span className="text-sm text-gray-600">
                        {selectedRequest.reason}
                      </span>
                      {selectedRequest.reasonDetails && (
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedRequest.reasonDetails}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Unfinished work */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-sideBarColor mb-3 pb-2 border-b border-lightGray">
                  Unfinished Work
                </h4>
                <div className="bg-evenTableRowColor rounded-lg p-4">
                  {selectedRequest.unfinishedWork &&
                  selectedRequest.unfinishedWork.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {selectedRequest.unfinishedWork.map((work) => (
                        <li key={work.id} className="py-3 first:pt-0 last:pb-0">
                          <div className="flex justify-between">
                            <div className="text-sm font-medium text-gray-800">
                              {work.task}
                            </div>
                            <div>{getPriorityBadge(work.priority)}</div>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <div className="text-sm text-gray-600">
                              Deadline:{" "}
                              {new Date(work.deadline).toLocaleDateString()}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No unfinished work reported.
                    </p>
                  )}
                </div>
              </div>

              {/* Replacement feasibility */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-sideBarColor mb-3 pb-2 border-b border-lightGray">
                  Replacement Feasibility
                </h4>
                <div className="bg-evenTableRowColor rounded-lg p-4">
                  {selectedRequest.replacementFeasibility ? (
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">
                            Replacement Available:{" "}
                          </span>
                          {selectedRequest.replacementFeasibility.hasReplacement
                            ? "Yes"
                            : "No"}
                        </p>

                        {selectedRequest.replacementFeasibility
                          .hasReplacement && (
                          <p className="text-sm text-gray-700 mt-1">
                            <span className="font-medium">Replacement: </span>
                            {
                              selectedRequest.replacementFeasibility
                                .replacementName
                            }
                          </p>
                        )}

                        <p className="text-sm text-gray-700 mt-2">
                          <span className="font-medium">Comments: </span>
                          {selectedRequest.replacementFeasibility.comments}
                        </p>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          Readiness Level:
                        </div>
                        {getReadinessLevelBadge(
                          selectedRequest.replacementFeasibility.readinessLevel
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No replacement feasibility information available.
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              {selectedRequest.status === "pending" && (
                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6 pt-4 border-t border-lightGray">
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    disabled={isSubmitting}
                    className={`px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    Reject Clearance
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-sideBarColor text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sideBarColor flex items-center justify-center ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Approve & Send to Backend
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
