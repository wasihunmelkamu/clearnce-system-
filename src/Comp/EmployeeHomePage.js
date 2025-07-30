"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileCheck,
  HelpCircle,
  HomeIcon,
  Info,
  Loader2,
  LogOut,
  Menu,
  Shield,
  Star,
  User,
  X,
  TrendingUp, // Import the icon for progress
} from "lucide-react";
import { Link } from "react-router-dom";

function StatusBadge({ status }) {
  const colorClasses =
    status === "Returned"
      ? "bg-green-100 text-green-800 border border-green-200"
      : "bg-yellow-100 text-yellow-800 border border-yellow-200";
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}
    >
      {status}
    </span>
  );
}

function EmployeeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  // Fetch records from the backend
  useEffect(() => {
    if (activeView === "data") {
      fetchRecords();
    }
  }, [activeView]);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/api/wam/man`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setRecords(data);
    } catch (err) {
      console.error("Failed to fetch records:", err);
      setError("Failed to load your records. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const employee = {
    name: "Hello,User",
    email: "niway.chemer@astu.edu",
    department: "Computer Science",
    id: "EMP-123456",
    position: "Associate Professor",
    joinDate: "September 15, 2018",
    // Use the avatar from the original code
  };

  // Stats for dashboard
  const stats = [];

  // Clearance process steps
  const clearanceSteps = [
    {
      title: "Check Your Records",
      description: "Review all borrowed items and outstanding obligations",
      icon: ClipboardList,
    },
    {
      title: "Return All Items",
      description: "Return all university property to respective departments",
      icon: Calendar,
    },
    {
      title: "Complete Form",
      description:
        "Fill out the clearance request form with all required information",
      icon: FileCheck,
    },
    {
      title: "Submit Request",
      description: "Submit your clearance request for departmental approval",
      icon: BookOpen,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-sideBarColor text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-30 shadow-xl`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center space-x-3 p-6 border-b border-white/10">
              <div className="bg-white p-2 rounded-full">
                <FileCheck className="h-6 w-6 text-sideBarColor" />
              </div>
              <span className="font-bold text-lg">STAFF CLEARANCE</span>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center space-x-3">
                {employee.avatar ? (
                  <img
                    src={employee.avatar || "/placeholder.svg"}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center text-white font-bold">
                    {employee.name.charAt(0)}
                  </div>
                )}
                <div className="text-sm">
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-gray-300 text-xs">
                    {employee.department}
                  </div>
                </div>
              </div>
            </div>
            <nav className="mt-6 space-y-1 px-3">
              <button
                onClick={() => setActiveView("dashboard")}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                  activeView === "dashboard"
                    ? "bg-white/10 text-white font-medium"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <HomeIcon className="h-5 w-5 mr-3" /> Dashboard
              </button>
              <button
                onClick={() => setActiveView("data")}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                  activeView === "data"
                    ? "bg-white/10 text-white font-medium"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <ClipboardList className="h-5 w-5 mr-3" /> Your Records
              </button>
              <button
                onClick={() => setActiveView("progress")}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                  activeView === "progress"
                    ? "bg-white/10 text-white font-medium"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <Link
                  to="/staffDashboard"
                  className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition"
                >
                  <FileCheck className="h-5 w-5 mr-3" /> Progress
                </Link>
              </button>
              <Link
                to="/form"
                className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition"
              >
                <FileCheck className="h-5 w-5 mr-3" /> Request Clearance
              </Link>
              <Link
                to="/support"
                className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition"
              >
                <HelpCircle className="h-5 w-5 mr-3" /> Support
              </Link>
            </nav>
          </div>
          <div className="px-3 mb-6">
            <Link
              to="/"
              className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gold rounded-lg transition"
            >
              <LogOut className="h-5 w-5 mr-3" /> Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? "16rem" : "0" }}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none mr-4"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <h1 className="text-xl font-semibold text-sideBarColor">
                {activeView === "dashboard"
                  ? "Dashboard"
                  : activeView === "data"
                  ? "Your Records"
                  : activeView === "progress"
                  ? "Clearance Progress"
                  : "Unknown View"}
              </h1>
            </div>
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 focus:outline-none bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {employee.avatar ? (
                  <img
                    src={employee.avatar || "/placeholder.svg"}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-sideBarColor flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <span className="text-gray-700 font-medium">
                  {employee.name}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden z-20 border border-gray-200 animate-fadeIn">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-sideBarColor to-editButtonColor">
                    <div className="flex items-center space-x-3">
                      {employee.avatar ? (
                        <img
                          src={employee.avatar || "/placeholder.svg"}
                          alt="User Avatar"
                          className="h-12 w-12 rounded-full object-cover border-2 border-white"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-sideBarColor font-bold text-lg">
                          {employee.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white">
                          {employee.name}
                        </p>
                        <p className="text-sm text-blue-100">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Department:</span>
                        <span className="font-medium text-gray-800">
                          {employee.department}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Position:</span>
                        <span className="font-medium text-gray-800">
                          {employee.position}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Employee ID:</span>
                        <span className="font-medium text-gray-800">
                          {employee.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Join Date:</span>
                        <span className="font-medium text-gray-800">
                          {employee.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-200 flex justify-between">
                    <Link
                      to="/profile"
                      className="text-editButtonColor hover:underline text-sm"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="text-gray-500 hover:underline text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeView === "dashboard" ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Welcome Section */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-sideBarColor to-editButtonColor text-white p-6">
                  <h2 className="text-2xl font-bold">
                    Welcome, {employee.name.split(" ")[0]}
                  </h2>
                  <p className="mt-1 text-blue-100">
                    This is your personalized dashboard for managing your
                    clearance process.
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">
                    Use this dashboard to track your obligations, monitor your
                    status, and access important information related to your
                    clearance process. Follow the steps below to complete your
                    clearance successfully.
                  </p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-editButtonColor transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`${stat.color} h-12 w-12 rounded-lg flex items-center justify-center text-white`}
                      >
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">
                          {stat.title}
                        </h3>
                        <p className="text-2xl font-bold text-gray-800">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clearance Process Steps */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-sideBarColor mb-4 flex items-center">
                  <ClipboardCheck className="h-5 w-5 mr-2 text-editButtonColor" />
                  Clearance Process
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {clearanceSteps.map((step, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-editButtonColor hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-sideBarColor bg-opacity-10 flex items-center justify-center text-sideBarColor mr-3 group-hover:bg-sideBarColor group-hover:text-white transition-colors">
                          <step.icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-sideBarColor">
                          Step {index + 1}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Reminders */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-sideBarColor mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-gold" />
                  Important Reminders
                </h3>
                <div className="bg-yellow-50 border-l-4 border-gold rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    Before requesting clearance:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li>Complete all academic requirements and unpaid dues</li>
                    <li>Return all borrowed university property</li>
                    <li>
                      Ensure all research and teaching responsibilities are
                      fulfilled
                    </li>
                    <li>
                      Update contact information for future correspondence
                    </li>
                    <li>Backup all important data from university systems</li>
                  </ul>
                </div>
              </div>

              {/* Request Clearance Button */}
              <div className="flex justify-center mt-8">
                <Link
                  to="/form"
                  className="bg-gradient-to-r from-sideBarColor to-editButtonColor hover:opacity-90 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center group"
                >
                  <FileCheck className="h-5 w-5 mr-2" />
                  Request Clearance
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ) : activeView === "data" ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Records Header */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-sideBarColor">
                  Your Borrowed Items
                </h3>
                <p className="text-gray-600 mt-1">
                  Review all items you have borrowed from the university. All
                  items must be returned before your clearance request can be
                  approved.
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Records Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {isLoading ? (
                  <div className="flex items-center justify-center p-12">
                    <Loader2 className="h-8 w-8 text-sideBarColor animate-spin mr-3" />
                    <p className="text-gray-600">Loading your records...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    {records.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-sideBarColor to-editButtonColor text-white">
                          <tr>
                            {[
                              "Loan Office",
                              "Item",
                              "Borrowing Date",
                              "Returning Date",
                              "Status",
                              "Comment",
                            ].map((col, index) => (
                              <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {records.map((record, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 1
                                  ? "bg-evenTableRowColor"
                                  : "bg-white"
                              } hover:bg-blue-50 transition-colors`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {record.office}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {record.item}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {record.borrowDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {record.returnDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={record.status} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {record.comment || "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center p-8">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                          <ClipboardList className="h-6 w-6 text-sideBarColor" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          No Records Found
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          You don't have any borrowed items recorded in the
                          system.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex justify-end mt-6">
                <Link
                  to="/form"
                  className="bg-gradient-to-r from-sideBarColor to-editButtonColor hover:opacity-90 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center group"
                >
                  <FileCheck className="h-5 w-5 mr-2" />
                  Request Clearance
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ) : activeView === "progress" ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-sideBarColor flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-editButtonColor" />
                  Your Clearance Progress
                </h3>
                <p className="text-gray-600 mt-1">
                  Track the status of your clearance request and see which
                  departments have approved it.
                </p>
              </div>

              {/* Placeholder for progress content */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">
                      Department of Finance
                    </span>
                    <span className="text-green-600 font-semibold flex items-center">
                      <ClipboardCheck className="h-4 w-4 mr-1" /> Approved
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">
                      Library Services
                    </span>
                    <span className="text-yellow-600 font-semibold flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> Pending
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">
                      IT Department
                    </span>
                    <span className="text-green-600 font-semibold flex items-center">
                      <ClipboardCheck className="h-4 w-4 mr-1" /> Approved
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">
                      Human Resources
                    </span>
                    <span className="text-gray-500 font-semibold flex items-center">
                      <Info className="h-4 w-4 mr-1" /> Not Started
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  Please note that clearance approvals depend on each
                  department's review.
                </p>
              </div>

              {/* Reminder to check records or request clearance */}
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <h3 className="text-lg font-semibold text-sideBarColor mb-3">
                  Need to expedite your clearance?
                </h3>
                <p className="text-gray-600 mb-4">
                  Ensure all your records are clear and then submit a new
                  request.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setActiveView("data")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium flex items-center"
                  >
                    <ClipboardList className="h-4 w-4 mr-2" /> View Records
                  </button>
                  <Link
                    to="/form"
                    className="bg-gradient-to-r from-sideBarColor to-editButtonColor hover:opacity-90 text-white px-5 py-2 rounded-lg font-medium flex items-center"
                  >
                    <FileCheck className="h-4 w-4 mr-2" /> Request Clearance
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
