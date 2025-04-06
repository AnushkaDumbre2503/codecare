import { db } from './firebase.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('ngoList');

  container.innerHTML = '<p>Loading NGOs...</p>';

  try {
    const ngosRef = collection(db, "ngos");
    const q = query(ngosRef, where("domain", "==", "Health"), where("verified", "==", true));
    const snapshot = await getDocs(q);
    const ngos = snapshot.docs.map(doc => doc.data());

    if (ngos.length === 0) {
      container.innerHTML = '<p>No health NGOs found.</p>';
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
