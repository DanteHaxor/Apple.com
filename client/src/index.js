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
let token=document.cookie.split("=")[1]
if(token){
    document.getElementById("ltoggle").innerText="Sign Out"
}else{
    document.getElementById("ltoggle").innerText="Sign in"
}
const displayName=document.cookie.split("=")[0]
console.log(displayName);
document.getElementById("dname").innerText=displayName||"Account";

async function getOrders(){
    let res=await fetch("https://pear-z5ta.onrender.com/api/cart/",{
        method:"GET",
        headers:{
            "content-type": "application/json",
            "authorization": `${token}`
        }
    })
    let data=await res.json()
    displayorders(data)
}
getOrders()
function displayorders(data){
    let newdata=data.map((el)=>{
        return `<div class="bag-pro">
        <img src="${el.image}" alt="">
        <div>
            <h4>${el.title} <br> $${el.price}</h4>     
        </div>
    </div>`
    })
    document.getElementById("bitem").innerHTML = newdata.join("") || `<p>Your bag is empty</p>`
    if(newdata){
    document.getElementById("bagbtn").innerHTML = `<button id=submit>Checkout</button>`
    document.getElementById("bspan").innerText = `(${data.length})`
    }
}