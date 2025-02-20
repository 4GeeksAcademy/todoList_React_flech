import React, { useState, useEffect } from "react";
import Post from "./Post";

//create your first component

const Home = () => {
  const API_URL = "https://playground.4geeks.com/todo";
  const ID_USER = "Dani_Yanani";
  const [misTareas, setMisTareas] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetchTareas();
  }, []);

  const fetchTareas = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${ID_USER}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMisTareas(data.todos);
      //console.log(data.users);
    } catch (error) {
      console.error("Hubo un problema con la solicitud:", error);
    }
  };

  const eliminarTarea = async (id) => {
    if (!id) {
      throw new Error("No existe esta tarea.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }
    } catch (error) {
      console.error("Hubo un problema al eliminar la tarea:", error.message);
    }
  };

  return (
    <div className="list" style={{ width: "500px" }}>
      <h1> Mis tareas </h1>

      <ul style={{ padding: 0, listStyle: "none" }}>
        <Post
          actualizarTareas={fetchTareas}
          INFO_API_URL={API_URL}
          INFO_ID_USER={ID_USER}
        />

        {misTareas.map((t, index) => (
          <li style={{ marginTop: "5px", marginBottom: "5px" }} key={index}>
            {t.label}{" "}
            <img
              src="https://raw.githubusercontent.com/4GeeksAcademy/Lista_De_Tareas/refs/heads/main/marca-x.png"
              style={{ width: "15px", height: "15" }}
              onClick={() => {
                eliminarTarea(t.id);
                setMisTareas(misTareas.filter((tarea) => tarea.id !== t.id));
              }}
            ></img>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "3px" }}>{misTareas.length} tareas </div>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
          backgroundcolor: "red",
        }}
      >
        <button
          onClick={() => {
            misTareas.forEach((t) => eliminarTarea(t.id));
            setMisTareas([]);
          }}
        >
          Eliminar todo
        </button>
      </div>
    </div>
  );
};

export default Home;
