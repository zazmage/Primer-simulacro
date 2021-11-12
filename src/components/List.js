import React, { useEffect, useState } from "react";
import "../styles/List.css";

export const List = () => {
  const [animals, setAnimals] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://primer-simulacro.herokuapp.com/animals");
      const json = await res.json();
      setAnimals(json);
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`https://primer-simulacro.herokuapp.com/animals/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre del Animal</th>
            <th>Imagen</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {animals === null ? (
            <tr>
              <td>
                <h3>Cargando...</h3>
              </td>
            </tr>
          ) : (
            animals.map((el) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>
                  <img
                    src={el.imgUrl}
                    alt={el.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(el.id)}
                    style={{ cursor: "pointer" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
