import {
    getTaskByTitle,
    updateTask,
    updateTaskByTitle
  } from "./firebase.js";

const taskForm = document.getElementById("rsvp-form");
  
function invi(parametro1) {
    // Llama a la función getTask con el ID proporcionado
    const tasks = getTaskByTitle(parametro1);
    tasks.then((data) => {
        if (data) {
          const container = document.getElementById('resultado');
          const btn = document.getElementById('botonenviar');
          // Limpiar el contenido anterior en el contenedor
          container.innerHTML = ''
          
          
          // Iterar sobre los datos y crear elementos HTML para cada tarea
          data.forEach(task => {
              // Crear elementos para title y description
              const titleElement = document.createElement('h3');
              titleElement.textContent = task.data["tipo"]+": "+ task.data["familia"];

              const invitadosElement = document.createElement('h3');
              invitadosElement.textContent = "No. Invitados: "+ task.data["invitados"];
              
              const descriptionElement = document.createElement('p');
              descriptionElement.textContent = "Tu Mesa: " + task.data["mesa"];
              
              // Agregar los elementos al contenedor
              container.appendChild(titleElement);
              container.appendChild(invitadosElement);
              //container.appendChild(descriptionElement);
                

              

              
          });
        }
    });
  }
  
  window.onload = async function() {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const parametro1 = params.get('fam');
    invi(parametro1);
    // Verificar si existen parámetros en la URL
    if (params.has('fun')) {
        // Obtener el nombre del método y los parámetros
        
        // Verificar si el método existe en el contexto global (window)
        
    }
  };



taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  let editStatus =true;
    try {
      if (!editStatus) {
        
      } else {
        const selectElement = document.getElementById('asis');
        let id = selectElement.getAttribute('data-id');
        await updateTask(id, {
          asis: selectElement.value
        });
        
        editStatus = false;
        id = "";
        if(selectElement.value=="1"){
          $("#rsvp-modal").modal("show");
        }else{
          location.assign(location.href);
        }
        
      }
      
      
  
    } catch (error) {
      console.log(error);
    }
  });
