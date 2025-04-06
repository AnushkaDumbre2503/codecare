import { db } from './firebase.js';
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

async function fetchPosts() {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '<p>Loading posts...</p>';

  try {
    const postsCol = collection(db, "posts");
    const postSnapshot = await getDocs(postsCol);
    const postList = postSnapshot.docs.map(doc => doc.data());

    if (postList.length === 0) {
      mainContent.innerHTML = '<p>No posts yet. Be the first to post!</p>';
      return;
    }

    mainContent.innerHTML = '';

    postList.forEach(post => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');
      postCard.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="width:100%;">` : ''}
      `;
      mainContent.appendChild(postCard);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function addPost(title, description, imageUrl) {
  try {
    const postsCol = collection(db, "posts");
    await addDoc(postsCol, { title, description, imageUrl: imageUrl || '' });
    alert("Post added!");
    fetchPosts();
  } catch (err) {
    console.error("Error adding post:", err);
  }
}

function createHamburger() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.createElement('button');
  hamburger.classList.add('hamburger');
  hamburger.innerHTML = '&#9776;';
  navbar.insertBefore(hamburger, navbar.children[1]);
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show-links');
  });
}

function sidebarToggle() {
  const sidebar = document.querySelector('.sidebar');
  const toggleButton = document.createElement('button');
  toggleButton.classList.add('sidebar-toggle');
  toggleButton.textContent = '☰ Menu';
  sidebar.parentNode.insertBefore(toggleButton, sidebar);
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-hidden');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createHamburger();
  sidebarToggle();
  fetchPosts();

  const addPostForm = document.getElementById('addPostForm');
  addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value.trim();
    const description = document.getElementById('postDescription').value.trim();
    const imageUrl = document.getElementById('postImageUrl').value.trim();
    if (!title || !description) {
      alert("Please fill in required fields.");
      return;
    }
    addPost(title, description, imageUrl);
    addPostForm.reset();
  });
});
