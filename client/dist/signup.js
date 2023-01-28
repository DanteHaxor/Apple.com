let submitbtn=document.getElementById("submit")
submitbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let firstname=document.getElementById("firstname").value
    let lastname=document.getElementById("lastname").value
    let country=document.getElementById("country").value
    let dob=document.getElementById("dob").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let obj={
        firstname,
        lastname,
        country,
        dob,
        email,
        password
    }
    register(obj)
})
let token=document.cookie.split("=")[1]
async function register(obj){
    let res=await fetch("https://pear-z5ta.onrender.com/api/user/register",{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    if(res.ok){
        swal("",`${obj.firstname} registered Successfully`,"success")
        window.location.href = "./signin.html";
    }else{
        swal("","Registration Failed!","warning");
    }

}
if(token){
    document.getElementById("ltoggle").innerText="Sign Out"
}else{
    document.getElementById("ltoggle").innerText="Sign in"
}
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