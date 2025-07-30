import { useState, useEffect } from "react";
import axios from "axios";

export function useProgressData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch stats from the backend
        const response = await axios.get(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/progress`);
        const { pendingCount, completedCount, percentage } = response.data;
        // Mock data with stats updated from the backend
        const mockData = {
          clearanceItems: [ 
            {
              id: 1,
              department: "Library",
              status: "completed",
              date: "2023-04-15",
              approver: {
                name: "Wasihun",
                position: "Head Librarian",
                date: "2023-04-15",
                comments: "All books returned, no outstanding fees.",
              },
            },

            {
              id: 2,
              department: "IT Department",
              status: "completed",
              date: "2023-04-12",
              approver: {
                name: "Niway",
                position: "IT Manager",
                date: "2023-04-12",
                comments:
                  "All accounts deactivated, equipment returned in good condition.",
              },
            },
            {
              id: 3,
              department: "Finance",
              status: "in-progress",
              date: "2023-04-10",
              pendingWith: {
                name: "Biniyam",
                position: "Finance Director",
                lastUpdated: "2023-04-10",
                status: "Under review - checking for outstanding payments",
              },
            },
            {
              id: 4,
              department: "Novel",
              status: "in-progress",
              date: "2023-04-05",
              pendingWith: {
                name: "Dr. Lisa Rodriguez",
                position: "Lab Manager",
                lastUpdated: "2023-04-05",
                status: "Waiting for inventory verification",
              },
            },
            {
              id: 5,
              department: "Human Resources",
              status: "completed",
              date: "2023-04-03",
              approver: {
                name: "Sarah ",
                position: "HR Manager",
                date: "2023-04-03",
                comments:
                  "Exit interview completed, all documentation received.",
              },
            },
          ],
          stats: {
            pendingCount,
            completedCount,
            progressPercentage: percentage, // Mapped to progressPercentage
          },
        };

        setData(mockData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch progress data. Please try again later.");
        console.error("Error fetching progress data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
