const button = document.querySelector('.btn-menu');
const menu = document.querySelector('.menu');
const spanTopo = document.querySelectorAll('.btn-menu span');
const Iconbag = document.querySelector('.svg-bag');
const bag = document.querySelector('.bag')
const main = document.querySelector('main')
const setabag = document.querySelector('.seta-bag');
const removebag = document.querySelector('.remove-bag')

const header = document.querySelector('header');

button.addEventListener('click', () => {
    menu.classList.toggle('active');

    spanTopo[0].classList.toggle('span-topo-active');

    spanTopo[1].classList.toggle('span-bottom-active');

    Iconbag.classList.toggle('bag-opacity');

    header.classList.toggle('header-active');

    bag.classList.remove('bag-active');
    setabag.classList.remove('seta-active');
})
Iconbag.addEventListener('click', () => {
    bag.classList.toggle('bag-active');
    setabag.classList.toggle('seta-active')
})
main.addEventListener('click', () => {
    bag.classList.remove('bag-active');
    setabag.classList.remove('seta-active');
})
removebag.addEventListener('click', () => {
    bag.classList.remove('bag-active');
    setabag.classList.remove('seta-active');
})