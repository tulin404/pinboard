// HAMBURGUER MENU
const menu = document.getElementById('ham-menu');
const nav = document.getElementById('nav');
const smallHeader = document.getElementById('small-header-section');

menu.addEventListener('click', () => {
    if (smallHeader.contains(menu)) {
        menu.classList.toggle('active');
        nav.classList.toggle('active');
    } else {
        menu.classList.toggle('active');
        nav.classList.toggle('active');
    };
})