async function getdata(){
    let res=await fetch("https://pear-z5ta.onrender.com/api/products/")
    let data=await res.json()
    display(data)
}
getdata()

function display(data){
  let newData=data.map((el)=>{
     return `<div class="grid-product addtocart" data-id=${el._id}>
        <img src="${el.image}" data-id=${el._id}>
        <div class="grid-detail" data-id=${el._id}>
          <p data-id=${el._id}>${el.title}</p>
          <p data-id=${el._id}>From $${el.price}</p>
        </div>
      </div>`
    })
    document.querySelector(".product-mac>.container>.grid").innerHTML=newData.join("")
let ele=document.querySelectorAll(".addtocart")
for(item of ele){
    item.addEventListener("click",(e)=>{
        addtocart(e.target.dataset.id)
    })
}
}

let token=document.cookie.split("=")[1]
async function addtocart(id){
    let res=await fetch(`https://pear-z5ta.onrender.com/api/products?_id=${id}`)
    let data=await res.json()
    let {title,image,price}=data[0]
    let obj={
        title,
        image,
        price
    }
    let post=await fetch("https://pear-z5ta.onrender.com/api/cart/addtocart",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "authorization":`${token}`
        },
        body: JSON.stringify(obj)
    })
    
    if(post.ok){
        swal("",`${data[0].title} added to cart`,"success")
        window.location.reload()
    }
}
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
