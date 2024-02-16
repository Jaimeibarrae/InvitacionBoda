import {
    getTaskByTitle
  } from "./firebase.js";



function invi(parametro1) {
    // Llama a la función getTask con el ID proporcionado
    const tasks = getTaskByTitle(parametro1);
    tasks.then((data) => {
        if (data) {
          const container = document.getElementById('resultado');
              
          // Limpiar el contenido anterior en el contenedor
          container.innerHTML = '';
          
          // Iterar sobre los datos y crear elementos HTML para cada tarea
          data.forEach(task => {
              // Crear elementos para title y description
              const titleElement = document.createElement('h3');
              titleElement.textContent = "Familia: "+ task.familia;

              const invitadosElement = document.createElement('h3');
              invitadosElement.textContent = "No. Invitados: "+ task.invitados;
              
              const descriptionElement = document.createElement('p');
              descriptionElement.textContent = "Tu Mesa: " + task.mesa;
              
              // Agregar los elementos al contenedor
              container.appendChild(titleElement);
              container.appendChild(invitadosElement);
              container.appendChild(descriptionElement);
          });
        }
    });
  }
  
  window.onload = async function() {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
  
    // Verificar si existen parámetros en la URL
    if (params.has('fun')) {
        // Obtener el nombre del método y los parámetros
        const parametro1 = params.get('fam');
        invi(parametro1);
        // Verificar si el método existe en el contexto global (window)
        
    }
  };