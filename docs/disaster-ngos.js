
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDwX2VlkdgQSC0Lp10XLni5-QlU2hwj4P4",
    authDomain: "codecare2503.firebaseapp.com",
    projectId: "codecare2503",
    storageBucket: "codecare2503.appspot.com",
    messagingSenderId: "934670174568",
    appId: "1:934670174568:web:51987743767f02261c2edd"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('ngoList');
    container.innerHTML = '<p>Loading NGOs...</p>';

    try {
     const ngosRef = collection(db, "disaster-ngos");

      const q = query(ngosRef, where("domain", "==", "Disaster"), where("verified", "==", true));

      const snapshot = await getDocs(q);
      const ngos = snapshot.docs.map(doc => doc.data());

      if (ngos.length === 0) {
        container.innerHTML = '<p>No disaster management NGOs found.</p>';
        return;
      }

      container.innerHTML = '';
      ngos.forEach(ngo => {
        const card = document.createElement('div');
        card.classList.add('post-card');
        card.innerHTML = `
          <h3>${ngo.name}</h3>
           <img src="${ngo.imageUrl}" alt="${ngo.name}" style="width:100%; max-height:200px; object-fit:cover;">
          <p><strong>Contact:</strong> ${ngo.contact}</p>
          <p>${ngo.description}</p>
        `;
        container.appendChild(card);
      });

    } catch (error) {
      console.error("Error loading NGOs:", error);
      container.innerHTML = '<p>Failed to load NGOs.</p>';
    }
  });

