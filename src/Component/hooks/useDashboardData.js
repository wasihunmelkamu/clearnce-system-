// hooks/useDashboardData.js
import { useState, useEffect } from "react";
import axios from "axios";


export function useDashboardData() {
  const [data, setData] = useState({
    user: { name: "Student" },
    stats: {
      progressPercentage: 0, //
      completedCount: 0,
      totalCount: 0,
      inProgressCount: 0,
    },
    recentUpdates: [],
    requiredActions: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_DEPLOYMENT_LINK}/status/progress`, {
          withCredentials: true,
        });
        const { pendingCount, completedCount, percentage } = response.data;

        const totalCount = pendingCount + completedCount;

        setData({
          user: { name: "Student" },
          stats: {
            progressPercentage: percentage,
            completedCount: completedCount,
            totalCount: totalCount,
            inProgressCount: pendingCount,
          },
          recentUpdates: [],
          requiredActions: [],
        });
        setError(null);
      } catch (err) {
        setError("Failed to fetch dashboard data. Please try again later.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}