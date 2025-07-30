"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { Plus, Trash2, Edit, FileText, AlertCircle, Loader2, User, ChevronRight } from "lucide-react"

function OfficePage() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState(null)

  // Transform record data to camelCase if necessary
  const transformRecord = (record) => ({
    id: record.id,
    itemName: record.item_name,
    quantity: record.quantity,
    reason: record.reason,
    createdAt: record.created_at,
    staffId: record.fname,
    adminId: record.admin_id,
    // Adding a name field for each record (this would come from your API)
    staffName: record.fname || `Staff ${record.fname || "Unknown"}`,
  })

  // Fetch records from the backend
  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true)
      setError("")

      try {
        const response = await axios.get(`${process.env.REACT_APP_DEPLOYMENT_LINK}/record/display`) // Replace with your backend endpoint
        setRecords(response.data.record.map(transformRecord)) // Transform the data
      } catch (err) {
        setError("Failed to load records.")
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  // Handle deletion of a record
  const handleDelete = async (id) => {
    try {
      setLoading(true)
      await axios.delete(`${process.env.REACT_APP_DEPLOYMENT_LINK}/record/delete/${id}`) // Replace with your backend endpoint
      setRecords((prev) => prev.filter((record) => record.id !== id))
      setIsDeleteModalOpen(false)
    } catch (err) {
      setError("Failed to delete the record.")
    } finally {
      setLoading(false)
    }
  }

  // Open delete confirmation modal
  const openDeleteModal = (record) => {
    setRecordToDelete(record)
    setIsDeleteModalOpen(true)
  }

  // Navigate to staff details page
  const navigateToStaffDetails = (staffId, staffName) => {
    navigate(`/office/${staffId}`, { state: { staffName } })
  }

  // Filter records based on search term
  const filteredRecords = records.filter(
    (record) =>
      record.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.staffName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-sideBarColor text-white py-6 px-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Office Records Management</h1>
          <p className="text-blue-200 mt-2">View, create, and manage all your records in one place</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search records, staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/create")}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 text-white font-medium shadow-md hover:bg-lightGold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
          >
            <Plus size={18} />
            Create New Record
          </motion.button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Records List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-sideBarColor animate-spin mb-4" />
            <p className="text-sideBarColor font-medium">Loading records...</p>
          </div>
        ) : filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-evenTableRowColor"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    {/* Staff Name - Clickable */}
                    <motion.div
                      className="flex items-center gap-2 mb-4 bg-blue-50 px-3 py-2 rounded-lg inline-block cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => navigateToStaffDetails(record.staffId, record.staffName)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <User className="text-sideBarColor" size={16} />
                      <span className="font-medium text-sideBarColor">{record.staffName}</span>
                      <ChevronRight className="text-gray-400" size={16} />
                    </motion.div>

                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="text-sideBarColor" size={20} />
                      <h3 className="text-xl font-semibold text-sideBarColor">{record.itemName}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Quantity</p>
                        <p className="text-base">{record.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Reason</p>
                        <p className="text-base">{record.reason}</p>
                      </div>
                      {record.createdAt && (
                        <div className="md:col-span-2 mt-1">
                          <p className="text-sm font-medium text-gray-500">Created</p>
                          <p className="text-sm text-gray-600">{formatDate(record.createdAt)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 justify-end">
                  

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openDeleteModal(record)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-red-400"
                    >
                      <Trash2 size={16} />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <FileText className="h-12 w-12 text-sideBarColor" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Records Found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {searchTerm
                  ? "No records match your search criteria. Try a different search term or clear the search."
                  : "You haven't created any records yet. Get started by creating your first record."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/create")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 text-white font-medium shadow-md hover:bg-lightGold transition-all duration-300"
              >
                <Plus size={18} />
                Create First Record
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the record "{recordToDelete?.itemName}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(recordToDelete.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default OfficePage
