const db = require("./db");
const config = require("../config");

function getTareas(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM Tareas LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

function create(tareaObj) {
  const { titulo, terminado } = tareaObj;
  const result = db.run(
    "INSERT INTO Tareas (titulo, terminado) VALUES (@titulo, @terminado)",
    { titulo, terminado }
  );

  let message = "Error in creating Tareas";
  if (result.changes) {
    message = "Tareas created successfully";
  }

  return { message };
}

const update = (tareaObj) => {
  const { titulo, terminado } = tareaObj;
  ter = terminado? 1 : 0;
  const result = db.run(
    "UPDATE Tareas SET terminado = @terminado WHERE titulo = @titulo",
    { titulo,  terminado: ter}
  );

  let message = "Error in updating Tarea";
  if (result.changes) {
    message = "Tarea updated successfully";
  }

  return { message };
};

const deleteTask = (tareaObj) => {
  const { titulo } = tareaObj;
  const result = db.run("DELETE FROM Tareas WHERE titulo = @titulo", 
    {titulo}
  );

  let message = "Error deleting Tareas";
  if (result.changes) {
    message = "Tarea deleted successfully";
  }

  return { message };
};

module.exports = {
  getTareas,
  create,
  update,
  deleteTask
};
