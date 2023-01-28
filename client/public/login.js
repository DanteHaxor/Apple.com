let loginbtn=document.querySelector("#lbtn")
loginbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("pass").value;
    let obj={
        email,
        password
    }
    auth(obj)
})
let token=document.cookie.split("=")[1]
async function auth(obj){
	let res=await fetch("https://pear-z5ta.onrender.com/api/user/login",{
		method: "POST",
		headers:{
			"content-type": "application/json"
		},
		body: JSON.stringify(obj)
	})
	if(res.ok){
		swal("", `Welcome ${obj.email}!`, "success");
		window.location.href = "https://pear-z5ta.onrender.com";
	}else{
		swal("","Wrong Credentials!","warning");
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