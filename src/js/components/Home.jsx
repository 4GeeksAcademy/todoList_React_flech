import React, { useState, useEffect } from "react";
import Post from "./Post";

//create your first component

const Home = () => {
  const [misTareas, setMisTareas] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetchTareas();
  }, []);

  const fetchTareas = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/Dani_Yanani"
      );
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
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
        }
      );

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

      <ul>
        <Post actualizarTareas={fetchTareas} />

        {misTareas.map((t, index) => (
          <li key={index}>
            {t.label}{" "}
            <img
              src="https://raw.githubusercontent.com/4GeeksAcademy/Lista_De_Tareas/refs/heads/main/marca-x.png"
              style={{ width: "15px", height: "15" }}
              onClick={() => {
                eliminarTarea(t.id);
                setMisTareas(misTareas.filter((tarea) => tarea.id !== t.id));
              }}
            />
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "3px" }}>{misTareas.length} tareas </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        
        <button //AQUI AÑADI UN BOTON PAR AELIMINARLO TODO, EL ASUNTO ES QUE ME ELIMINA TODA LA LISTA PERO SOLO DEL FRONT.
                //NO MODIFICA LA API. ASIQUE CUANDO ESCRIBO ALGO "NUEVO" SE RECUPERA LA LISTA ANTERIOR Y LO NUEVO SE AÑADE AL FINAL.
                // ENCONTRE COMO HACER QU ESE BORRE DEL FRONT Y DEL BACK PERO NO ENTENDI MUY BIEN QUE ESTABA HACIENDO ASIQUE LO DEJE POR AHORA. CUANDO PUEDAS QUE ALGUIEN ME LO EXPLIQUE.
          onClick={() => {
            eliminarTarea(setMisTareas([]));
          }}
        >
          Eliminar todo
        </button>
      </div>
    </div>
  );
};

export default Home;
