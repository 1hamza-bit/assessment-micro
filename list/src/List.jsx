import React, { useEffect, useState } from "react";

// Optimized List component fetching data from an API
export const List = () => {
  // State to store the API response
  const [data, setData] = useState([]);
  // State for loading state
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); // Example API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  // Conditional rendering based on state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>List of Users</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
