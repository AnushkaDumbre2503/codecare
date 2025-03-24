// Toggle the nav-links when screen is small (Hamburger)
const createHamburger = () => {
    const navbar = document.querySelector('.navbar');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '&#9776;'; // ☰ icon
    
    navbar.insertBefore(hamburger, navbar.children[1]);

    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show-links');
    });
};

// Toggle sidebar visibility on smaller screens
const sidebarToggle = () => {
    const sidebar = document.querySelector('.sidebar');
    
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('sidebar-toggle');
    toggleButton.textContent = '☰ Menu';

    sidebar.parentNode.insertBefore(toggleButton, sidebar);

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-hidden');
    });
};

// Initialize responsive behavior when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createHamburger();
    sidebarToggle();
});
