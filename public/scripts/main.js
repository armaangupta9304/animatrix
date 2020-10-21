const openNav = document.querySelector('#openNav');
const closeNav = document.querySelector('#closeNav');
const mobileNav = document.querySelector('.mobile-nav');

openNav.addEventListener('click', () => {
    mobileNav.style.display = 'block'
})
closeNav.addEventListener('click', () => {
    mobileNav.style.display = 'none'
})