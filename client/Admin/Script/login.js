let login_btn = document.querySelector(".center form");
login_btn.addEventListener("submit", (event) => {
	event.preventDefault();
	let username = document.querySelector("#user").value;
	let password = document.querySelector("#pass").value;
	let obj={
		username,
		password
	}
	console.log(obj);
	auth(obj)
});

async function auth(obj){
	let res=await fetch("https://pear-z5ta.onrender.com/api/admin/login",{
		method: "POST",
		headers:{
			"content-type": "application/json"
		},
		body: JSON.stringify(obj)
	})
	if(res.ok){
		swal("", "Welcome Admin!", "success");
		window.location.href = "../dashboard.html";
	}else{
		swal("","Wrong Credentials!","warning");
	}
}