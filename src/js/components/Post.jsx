import React, { useState } from "react";

const Post = (props) => {
  const [inputValue, setInputValue] = useState("");

  const añadirTarea = async () => {
    if (!inputValue) {
      console.error("El nombre del usuario no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/Dani_Yanani`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: inputValue,
            is_done: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Actualizar la lista de usuarios tras crear uno nuevo
      props.actualizarTareas();
    } catch (error) {
      console.error("Hubo un problema al crear el usuario:", error);
    }
  };

  return (
    <div>
      <li>
        {" "}
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              añadirTarea();
              setInputValue("");
            }
          }}
          placeholder="añade una tarea"
        ></input>
      </li>
    </div>
  );
};

export default Post;
