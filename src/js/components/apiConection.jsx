import React, { useEffect, useState } from "react";

useEffect(() => {
  const fetchPost = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/alesanchezr"
      );

      if (!response.ok) {
        throw new Error("Error! Algo salió mal");
      }

      const data = await response.json();

      setAllMyTasks(data.slice(2, 7));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  fletchPost();
}, []);

//ERROR

if (error) {
  return <div className="Error">{error}</div>;
}
