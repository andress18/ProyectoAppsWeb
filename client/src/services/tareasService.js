import axios from "axios";

const getTareas = async () => {
    let response = [];
  await fetch("http://localhost:9000/tareas")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      response = res.data;
    });
    return response;
};

const crearTarea = async (tarea) => {
    let response = [];
  await axios.post("http://localhost:9000/tareas",tarea)
    .then((res) => {
      console.log(res);
      response = res.data;
    });
    return response;
};

const deleteTarea = async (tarea) => {
    let response = [];
  await axios.post("http://localhost:9000/tareas/delete",tarea)
    .then((res) => {
      console.log(res);
      response = res.data;
    });
    return response;
};

const updateTarea = async (tarea) => {
    let response = [];
  await axios.put("http://localhost:9000/tareas",tarea)
    .then((res) => {
      console.log(res);
      response = res.data;
    });
    return response;
};

export { getTareas, crearTarea,deleteTarea, updateTarea };
