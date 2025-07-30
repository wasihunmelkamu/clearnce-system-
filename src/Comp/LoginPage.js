"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, Lock, AlertCircle, CheckCircle, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"
import axios from "axios"

const LoginPage = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmNewPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const validatePasswordStrength = (password) => {
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) return "Password must be at least 8 characters."
    if (!hasUppercase) return "Password must include an uppercase letter."
    if (!hasLowercase) return "Password must include a lowercase letter."
    if (!hasNumber) return "Password must include a number."
    if (!hasSpecial) return "Password must include a special character."

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (oldPassword === newPassword) {
      setError("New password must be different from the old password.")
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.")
      setLoading(false)
      return
    }

    const strengthError = validatePasswordStrength(newPassword)
    if (strengthError) {
      setError(strengthError)
      setLoading(false)
      return
    }

    // Clear previous errors and success messages
    setError("")
    setSuccess("")

    // Send data to backend
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEPLOYMENT_LINK}/staff/changepassword`, // Replace with the correct backend URL
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true, // Send cookies if necessary
        },
      )

      if (response.status === 200 && response.data.message) {
        setSuccess("Password changed successfully.")
        setTimeout(() => {
          navigate("/employeehomepage")
        }, 2000)
      } else {
        setError(response.data.message || "Failed to change password.")
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-backgroundColor">
      {/* Enhanced Header with Logo and Navigation */}
      <header className="w-full flex items-center justify-between px-6 md:px-12 py-4 bg-sideBarColor shadow-lg sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover border-2 border-gold shadow-md"
          />
          <span className="text-white font-bold text-xl hidden md:block">ClearanceSystem</span>
        </div>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gold hover:bg-lightGold text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            <Home className="h-4 w-4" />
            <span>Home Page</span>
          </motion.button>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-sideBarColor to-blue-800 px-8 py-6 text-white">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/10 p-3 rounded-full">
                  <Lock className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-center">Change Your Password</h1>
              <p className="text-blue-200 text-center text-sm mt-2">Update your password for enhanced security</p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Old Password Field */}
              <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible" className="space-y-2">
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className="block w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* New Password Field */}
              <motion.div custom={1} variants={fadeIn} initial="hidden" animate="visible" className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="block w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                </p>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div custom={2} variants={fadeIn} initial="hidden" animate="visible" className="space-y-2">
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="block w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-red-700 ml-3">{error}</p>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-green-50 border-l-4 border-green-500 p-4 flex items-start"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-green-700 ml-3">{success}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-gold hover:bg-lightGold text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    Change Password
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Additional Information */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Need help?{" "}
                  <Link to="/contact" className="font-medium text-sideBarColor hover:text-blue-800 transition-colors">
                    Contact support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Clearance System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LoginPage
