"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { Save, ArrowLeft, AlertCircle, X } from "lucide-react"

function CreateRecord() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    reason: "",
    idNumber: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Number.parseInt(formData.quantity, 10) <= 0) {
      setError("Quantity must be a positive number.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post(`${process.env.REACT_APP_DEPLOYMENT_LINK}/record/create`, formData)
      if (response.status === 200) {
        setSuccessMessage("Record created successfully!")
        setTimeout(() => {
          navigate("/office")
        }, 1500)
      } else {
        throw new Error("Failed to create the record")
      }
    } catch (err) {
      setError(err.message || "An error occurred while creating the record.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto mb-8">
        <button
          onClick={() => navigate("/office")}
          className="flex items-center text-sideBarColor hover:text-gold transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Records
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-sideBarColor">Create New Record</h1>
        <p className="text-gray-600 mt-2">Fill in the details below to create a new record in the system</p>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white"
      >
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setSuccessMessage("")}
                    className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  >
                    <span className="sr-only">Dismiss</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Header */}
        <div className="bg-sideBarColor text-white p-6">
          <h2 className="text-xl font-semibold">Record Information</h2>
          <p className="text-blue-200 text-sm mt-1">All fields are required unless marked optional</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setError("")}
                  className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="space-y-6">
              {/* Item Name Field */}
              <div className="space-y-2">
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  id="itemName"
                  name="itemName"
                  placeholder="Enter the name of the item"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                  value={formData.itemName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Quantity Field */}
              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Enter the quantity"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                  value={formData.quantity}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === "" || Number.parseInt(value, 10) > 0) {
                      handleChange(e)
                    }
                  }}
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">Must be a positive number</p>
              </div>

              {/* Reason Field */}
              <div className="space-y-2">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  placeholder="Explain the reason for this record"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                  value={formData.reason}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* ID Number Field */}
              <div className="space-y-2">
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                  ID Number
                </label>
                <input
                  id="idNumber"
                  name="idNumber"
                  placeholder="Enter your ID number"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                  value={formData.idNumber}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate("/office")}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-gold hover:bg-lightGold text-white font-medium shadow-md transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="mr-2 h-5 w-5 animate-spin"
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
                    Creating Record...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Create Record
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Help Text */}
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-semibold text-sideBarColor mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600">
          If you're having trouble creating a record, please contact the system administrator or refer to the
          documentation for guidance.
        </p>
      </div>
    </div>
  )
}

export default CreateRecord
