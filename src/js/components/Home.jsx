import React, { useState } from "react";

//create your first component

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const [tareas, setTareas] = useState([]);

  return (
    <div className="list" style={{ width: "500px" }}>
      <h1>Mis tareas </h1>

      <ul>
        <li>
          {" "}
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTareas(tareas.concat(inputValue));
                setInputValue("");
              }
            }}
            placeholder="añade una tarea"
          ></input>
        </li>

        {tareas.map((t, index) => (
          <li key={index}>
            {t}{" "}
            <img
              src="https://raw.githubusercontent.com/4GeeksAcademy/Lista_De_Tareas/refs/heads/main/marca-x.png"
              style={{ width: "15px", height: "15" }}
              onClick={() =>
                setTareas(
                  tareas.filter((t, currentIndex) => index != currentIndex)
                )
              }
            />
          </li>
        ))}
      </ul>
      <div>{tareas.length} tareas </div>
    </div>
  );
};

export default Home;
