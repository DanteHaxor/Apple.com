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
// const displayName=document.cookie.split("=")[1]
// console.log(displayName);
// document.getElementById("dname").innerText=displayName||"Sign in";
