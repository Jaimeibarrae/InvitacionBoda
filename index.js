import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
  getTaskByTitle,
  getAllTasks
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      var asist = "";
      switch (task.asis) {
        case "1":
          asist = "Si"
          break;
        case "2":
          asist = "No"
          break;
        case "3":
          asist = "Puede ser.."
          break;
        default:
          break;
      }
      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.tipo}: ${task.familia}</h3>
    <p>No. invitados: ${task.invitados}</p>
    <p>Mesa: ${task.mesa}</p>
    <p>Asistecia: ${asist}</p>
    <p>Invitacion:<a href="https://jaimeibarrae.github.io/InvitacionBoda/Invitacion.html?fun&fam=${task.familia}">https://jaimeibarrae.github.io/InvitacionBoda/Invitacion.html?fun&fam=${task.familia}</a></p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Eliminar
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Editar
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
          location.reload();
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          taskForm["familia"].value = doc.familia;
          taskForm["mesa"].value = doc.mesa;
          taskForm["familia"].setAttribute('data-id', e.target.dataset.id);
          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const familia = taskForm["familia"];
  const invitados = taskForm["invitados"];
  const mesa = taskForm["mesa"];
  const tipoInv = taskForm["tipo"];
  const asis = taskForm["asis"];

  try {
    if (!editStatus) {
      await saveTask(familia.value, invitados.value, mesa.value, tipoInv.value,asis.value);
    } else {
      id = familia.getAttribute('data-id');
      await updateTask(id, {
        familia: familia.value,
        invitados: invitados.value,
        mesa: mesa.value,
        tipoInv : tipoInv.value,
        asis:asis.value,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }
    taskForm.reset();
    familia.focus();
    

  } catch (error) {
    console.log(error);
  }
});
