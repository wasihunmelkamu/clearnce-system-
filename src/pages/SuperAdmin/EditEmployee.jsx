import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../api/useFetch"; // Ensure this path is correct
import Wrapper from "./Wrapper"; // Ensure this path is correct
import Spinner from "../../components/ui/Spinner"; // Ensure this path is correct

const fieldDisplayNames = {
  fname: "First Name",
  sname: "Surname",
  lname: "Last Name",
  email: "Email",
  phone: "Phone Number",
  address: "Address",
  // id_number: "Staff ID"

  // Add any other fields you want to display differently
};

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const staffId = parseInt(id);


  const { data, error, loading, get } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin`);


  const {
    data: putdata, // Renamed to avoid confusion with the main 'data'
    error: puterror,
    loading: putloading,
    put,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin`);

  const {
    data: deletedata, // Renamed
    error: deleteerror,
    loading: deleteloading,
    del,
  } = useFetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}/admin`);

  const [staffDetail, setStaffDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableStaffDetail, setEditableStaffDetail] = useState(null);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Effect to fetch all staffs on component mount
  useEffect(() => {
    get("/allstaffs");
  }, []); // Empty dependency array ensures this runs once on mount

  // Effect to find the specific staff detail when 'data' (all staffs) or 'staffId' changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const found = data.find((staff) => staff.id === staffId);
      setStaffDetail(found || null);
      // Initialize editableStaffDetail with a copy of found staff, and set photo to null
      // This prepares the form for edits without carrying over the photo_url
      setEditableStaffDetail(found ? { ...found, photo: null } : null);
    }
  }, [data, staffId]); // Re-run if data or staffId changes

  // Handler for clicking the "Edit Employee" button
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handler for input field changes (text, email, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableStaffDetail((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for file input change (profile photo)
  const handleFileChange = (e) => {
    setEditableStaffDetail((prev) => ({
      ...prev,
      photo: e.target.files[0], // Store the File object
    }));
  };

  // Handler for submitting the edit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (!editableStaffDetail) return; // Should not happen if staffDetail is loaded

    try {
      const formData = new FormData();
      // Loop through editableStaffDetail to append data to FormData
      for (const key in editableStaffDetail) {
        if (key === "photo" && editableStaffDetail.photo) {
          // If a new photo file is selected, append it
          formData.append("photo", editableStaffDetail.photo);
        } else if (key !== "id" && editableStaffDetail[key] !== null) {
          // Append other fields, excluding 'id' (as it's in the URL) and null values
          formData.append(key, editableStaffDetail[key]);
        }
      }

      // Perform the PUT request using the useFetch hook
      const response = await put(`/allstaffs/${staffId}`, formData, true); // `true` indicates FormData

      // Check the 'success' flag from the standardized useFetch response
      if (response.success) {
        // Update local staffDetail with the new data from editableStaffDetail
        // and the potentially updated photo_url from the backend response.
        setStaffDetail({
          ...editableStaffDetail,
          photo_url: response.data.photo_url || staffDetail.photo_url,
          photo: null, // Clear the photo from editableStaffDetail
        });
        setIsEditing(false); // Exit editing mode
        setSuccessMessage(response.message || "Employee updated successfully!"); // Use message from hook
        setShowSuccessPopup(true); // Show success popup
        get("/allstaffs"); // Re-fetch all staffs to ensure data consistency across the app
      } else {
        // If operation was not successful based on the 'success' flag
        setErrorMessage(response.message || "Failed to update employee."); // Use message from hook
        setShowErrorPopup(true); // Show error popup
      }
    } catch (err) {
      // Catch any unexpected client-side errors (e.g., network issues before fetch)
      console.error("Update error (client-side catch):", err);
      setErrorMessage(
        "An unexpected client-side error occurred during update: " + err.message
      );
      setShowErrorPopup(true);
    }
  };

  // Handler for clicking the "Delete Employee" button (shows confirmation)
  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  // Handler for confirming the deletion
  const handleDeleteConfirmed = async () => {
    setShowConfirmDelete(false); // Close confirmation popup immediately

    try {
      // Perform the DELETE request using the useFetch hook
      const response = await del(`/allstaffs/${staffId}`);

      // Check the 'success' flag from the standardized useFetch response
      if (response.success) {
        setSuccessMessage(response.message || "Employee deleted successfully!"); // Use message from hook
        setShowSuccessPopup(true); // Show success popup
        // Navigation to /employees will happen when the user clicks 'OK' on the success popup
      } else {
        // If operation was not successful based on the 'success' flag
        setErrorMessage(response.message || "Failed to delete employee."); // Use message from hook
        setShowErrorPopup(true); // Show error popup
      }
    } catch (err) {
      // Catch any unexpected client-side errors
      console.error("Delete error (client-side catch):", err);
      setErrorMessage(
        "An unexpected client-side error occurred during deletion: " +
          err.message
      );
      setShowErrorPopup(true);
    }
  };

  // Handler for canceling the edit operation
  const handleCancelEdit = () => {
    setIsEditing(false); // Exit editing mode
    // Reset editableStaffDetail to the original staffDetail, clearing any selected photo
    setEditableStaffDetail(
      staffDetail ? { ...staffDetail, photo: null } : null
    );
  };

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2 flex justify-between items-center">
            Employee Profile
            <div className="space-x-2">
              {/* Edit Employee Button - visible when not editing */}
              {!isEditing && (
                <button
                  onClick={handleEditClick}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-800"
                >
                  Edit Employee
                </button>
              )}
              {/* Save Changes Button - visible when editing */}
              {isEditing && (
                <button
                  onClick={handleSubmit}
                  disabled={putloading} // Disable during PUT operation
                  className={`text-white text-sm px-3 py-1 rounded ${
                    putloading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-800"
                  }`}
                >
                  {putloading ? "Saving..." : "Save Changes"}
                </button>
              )}
              {/* Delete Employee Button */}
              <button
                onClick={handleDelete}
                disabled={deleteloading} // Disable during DELETE operation
                className={`text-white text-sm px-3 py-1 rounded ${
                  deleteloading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-800"
                }`}
              >
                {deleteloading ? "Deleting..." : "Delete Employee"}
              </button>
            </div>
          </h1>

          {/* Initial Data Loading and Error Display */}
          {loading && <Spinner />}
          {error && (
            <p className="text-red-600">Error loading data: {error.message}</p>
          )}

          {/* Employee Profile Display/Edit Form */}
          {!loading && staffDetail ? (
            <form onSubmit={handleSubmit} className="space-y-2 text-lg">
              {/* Current Image preview (if exists and no new photo selected) */}
              {staffDetail?.photo_url && !editableStaffDetail?.photo && (
                <div className="mb-4">
                  <p className="font-semibold">Current Profile Image:</p>
                  <img
                    src={staffDetail.photo_url}
                    alt="Profile"
                    className="w-32 h-32 rounded object-cover"
                  />
                </div>
              )}

              {/* New Image preview (if a new photo is selected for upload) */}
              {editableStaffDetail?.photo && (
                <div className="mb-4">
                  <p className="font-semibold">Selected Image Preview:</p>
                  <img
                    src={URL.createObjectURL(editableStaffDetail.photo)}
                    alt="Preview"
                    className="w-32 h-32 rounded object-cover"
                  />
                </div>
              )}

              {/* Basic fields (First Name, Surname, Last Name, Email, Phone, Address) */}
              {["fname", "sname", "lname", "email", "phone", "address"].map(
                (field) => (
                  <p key={field}>
                    {/* Use the mapping object for display name, fallback to capitalized field if not found */}
                    <strong>
                      {fieldDisplayNames[field] ||
                        field.charAt(0).toUpperCase() + field.slice(1)}
                      :
                    </strong>{" "}
                    {isEditing ? (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={editableStaffDetail?.[field] || ""}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      staffDetail?.[field] || "-"
                    )}
                  </p>
                )
              )}

              {/* Image input field - visible only when editing */}
              {isEditing && (
                <div className="mb-4">
                  <label className="block font-semibold mb-1" htmlFor="photo">
                    Update Profile Image:
                  </label>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full border rounded px-2 py-1"
                  />
                </div>
              )}

              {/* Employee ID (always displayed, not editable) */}
              <p>
                <strong>Staff ID:</strong> {staffDetail.id_number}
              </p>

              {/* Edit/Cancel Buttons - visible only when editing */}
              {isEditing && (
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={putloading} // Disable during PUT operation
                    className={`text-white px-3 py-1 rounded ${
                      putloading
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-800"
                    }`}
                  >
                    {putloading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          ) : (
            // Message if no staff found or still loading
            !loading && (
              <p className="text-gray-500">No staff found with ID: {id}</p>
            )
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this employee?
            </h2>
            <div className="space-x-4">
              <button
                onClick={handleDeleteConfirmed}
                disabled={deleteloading}
                className={`text-white px-4 py-2 rounded ${
                  deleteloading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-800"
                }`}
              >
                {deleteloading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                disabled={deleteloading}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              {successMessage}
            </h2>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                // Navigate to employees list only after a deletion
                if (successMessage.includes("deleted")) {
                  navigate("/employees"); // Navigate to the employees list page
                }
              }}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-800"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Error!</h2>
            <p className="text-red-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default EditEmployee;
