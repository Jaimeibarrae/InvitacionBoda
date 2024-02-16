// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  where, query 
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Put you credentials here
    apiKey: "AIzaSyDuvI0jRsSKNvkke4HelJClAtkWIn0JbTk",
    authDomain: "invitacionboda-fc1c8.firebaseapp.com",
    projectId: "invitacionboda-fc1c8",
    storageBucket: "invitacionboda-fc1c8.appspot.com",
    messagingSenderId: "459406392625",
    appId: "1:459406392625:web:62d8ebff973a09790bc410"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = (familia, invitados,mesa) =>
  addDoc(collection(db, "invitados"), { familia, invitados, mesa });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "invitados"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "invitados", id));
export const getTask = async (title) => {
  try {
      const docRef = doc(db, "tasks", title);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.error('No such document!');
          return null;
      }
  } catch (error) {
      console.error('Error getting document:', error);
      return null;
  }
};

export const getTaskByTitle = async (title) => {
  try {
      // Realiza una consulta para buscar documentos con el campo 'title' igual a 'title'
      const q = query(collection(db, "invitados"), where("familia", "==", title));
      const querySnapshot = await getDocs(q);
      // Inicializa un arreglo para almacenar los resultados
      const tasks = [];
      // Itera sobre los documentos encontrados y los agrega al arreglo
      querySnapshot.forEach((doc) => {
          tasks.push(doc.data());
      });
      return tasks;
  } catch (error) {
      console.error('Error getting documents:', error);
      return null;
  }
};


export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));
export const getAllTasks = async () => {
  try {
      // Realiza una consulta para obtener todos los documentos de la colección "tasks"
      const querySnapshot = await getDocs(collection(db, "invitados"));
      // Inicializa un arreglo para almacenar los resultados
      const tasks = [];
      // Itera sobre los documentos encontrados y los agrega al arreglo
      querySnapshot.forEach((doc) => {
          tasks.push(doc.data());
      });
      return tasks;
  } catch (error) {
      console.error('Error getting documents:', error);
      return null;
  }
};