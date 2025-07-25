import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfmQCP41V8KZav_DpZlH5q_WjTKJ2BtpM",
  authDomain: "myappstore-b67ba.firebaseapp.com",
  projectId: "myappstore-b67ba",
  storageBucket: "myappstore-b67ba.firebasestorage.app",
  messagingSenderId: "513524022358",
  appId: "1:513524022358:web:01c201f40a024e4aa94ff7",
  measurementId: "G-03W2EBD0P0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Dark Mode Toggle
document.getElementById("darkModeToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Load apps (this will later read from Firestore)
async function loadApps() {
  const list = document.getElementById("app-list");
  const appsRef = collection(db, "apps");
  const querySnapshot = await getDocs(appsRef);
  querySnapshot.forEach((doc) => {
    const app = doc.data();
    const card = document.createElement("div");
    card.className = "app-card";
    card.innerHTML = `
      <h3>${app.name}</h3>
      <p>${app.description}</p>
      <a href="app.html?id=${doc.id}">View Details</a>
    `;
    list.appendChild(card);
  });
}

loadApps();
