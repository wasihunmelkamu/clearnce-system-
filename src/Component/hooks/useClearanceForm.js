"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function useClearanceForm() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Form state
  const [formData, setFormData] = useState({
    department: "",
    position: "",
    reason: "",
    committees: {
      academicAffairs: false,
      researchEthics: false,
      curriculumDevelopment: false,
      studentAffairs: false,
      facultyDevelopment: false,
    },
    universityCommittees: "",
    unfinishedWork: "",
    reasonDetails: "",
    declaration: false,
  });

  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "declaration") {
        setFormData((prev) => ({
          ...prev,
          declaration: checked,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          committees: {
            ...prev.committees,
            [name]: checked,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.position || formData.position.length < 2)
      errors.position = "Current position must be at least 2 characters long";
    if (!formData.reason || formData.reason.length < 2)
      errors.reason = "Reason must be at least 2 characters long";

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  // Submit form to database
  const submitForm = async () => {
    const { isValid, errors } = validateForm();

    if (!isValid) {
      setSubmitError({ message: "Please fill in all required fields", errors });
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch(`${process.env.REACT_APP_DEPLOYMENT_LINK}./staff/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

      
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }






      const data = await response.json();

      if (response.status === 200 && data.message) {
        navigate("/staffDashboard"); // Navigate to the "/t" route after successful submission
      }

      setSubmitSuccess(true);
      return { success: true, data };
    } catch (error) {
      setSubmitError({
        message: "Failed to submit clearance request",
        error: error.message,
      });
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }

  
  };

  return {
    formData,
    handleChange,
    isSubmitting,
    submitError,
    submitSuccess,
    submitForm,
  };
}

export default useClearanceForm;
