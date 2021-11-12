import React, { useState } from "react";
import "../styles/Form.css";

// 	https://api.cloudinary.com/v1_1/deildujgx
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("upload_preset", "animalapp");
  formData.append("file", file);

  const res = await fetch("https://api.cloudinary.com/v1_1/deildujgx/upload", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  return json.secure_url;
};

export const Form = () => {
  const [form, setForm] = useState({
    name: "",
    imgUrl: "",
  });

  const handleChanged = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleImageFile = async ({ target }) => {
    const file = target.files[0],
      res = await uploadFile(file);
    setForm({
      ...form,
      imgUrl: res,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlePost = async () => {
    if (form.imgUrl !== "") {
      await fetch("https://primer-simulacro.herokuapp.com/animals", {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(form),
      });
      window.location.reload();
    }
  };

  return (
    <div>
      <form id="formulario" onSubmit={handleSubmit}>
        <h2>Registro de Animales</h2>
        <hr />
        <div>
          <label>Nombre</label>
          <input id="inputNombre" name="name" onChange={handleChanged} />
        </div>
        <div>
          <label>Imagen</label>
          <input
            id="botonImagen"
            type="file"
            name="imgUrl"
            onChange={handleImageFile}
          />
        </div>
        <div>
          <button id="btnRegistro" onClick={handlePost}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
