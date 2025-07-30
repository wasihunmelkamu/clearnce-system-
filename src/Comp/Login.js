"use client"

import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { User, Lock, ArrowRight, AlertCircle, Shield, Loader2 } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (ev) => {
    ev.preventDefault()
    setLoading(true)
    setError("")

    const { identifier, password } = formData

    if (!identifier || !password) {
      setError("Please fill out all fields.")
      setLoading(false)
      return
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
    const payload = isEmail ? { email: identifier, password } : { username: identifier, password }
    const endpoint = isEmail ? `${process.env.REACT_APP_DEPLOYMENT_LINK}/login`:`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin/login`

    try {
      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
      })
      const responseData = response.data

      if (isEmail) {
        // Email-based login logic
        const { logged } = responseData
        if (logged) {
          navigate("/EmployeeHomePage") // Redirect to a default dashboard page
        } else {
          navigate("/LoginPage")
        }
      } else {
        // Username-based login logic
        const { role } = responseData

        switch (role) {
          case "HR":
            navigate("/dashboard")
            break
          case "Vice president":
            navigate("/vdb")
            break
          case "dept":
            navigate("/employee")
            break
          case "office":
            navigate("/office")
            break
          default:
            setError("Unknown role or invalid credentials.")
            navigate("/employee") // Redirect back to login page for unknown roles
        }
      }
      
    } catch (error) {
      console.error("Login failed:", error?.response?.data || error.message)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Enhanced Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 shadow-md bg-sideBarColor">
        <div className="flex items-center space-x-3">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover border-2 border-gold shadow-md"
          />
          <span className="font-bold text-xl text-white">AASTU Clearance System</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-blue-200 hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link to="/about" className="text-blue-200 hover:text-white transition-colors duration-300">
            About
          </Link>
          <Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-300">
            Contact
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-sideBarColor to-blue-800 px-8 py-6 text-white">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/10 p-3 rounded-full">
                  <Shield className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
              <p className="text-blue-200 text-center text-sm mt-2">Sign in to access your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-6 flex items-start"
              >
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-700 ml-3">{error}</p>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="px-8 py-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-medium" htmlFor="identifier">
                  Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="example@mail.com or username"
                    className="block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
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
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgotPassword"
                  className="text-sm font-medium text-sideBarColor hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </form>

            {/* Additional Options */}
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
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-sideBarColor hover:text-blue-800 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-sideBarColor hover:text-blue-800 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} AASTU Clearance System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Login
