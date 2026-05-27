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
	let res=await fetch(`${api}/user/login`,{
		method: "POST",
		credentials: "include",
		headers:{
			"content-type": "application/json"
		},
		body: JSON.stringify(obj)
	})
	if(res.ok){
		const data = await res.json();
		const expired = "path=/; max-age=" + 60 * 60 * 24 * 7 + "; SameSite=Lax";
		if (data.token) {
			document.cookie = `authToken=${encodeURIComponent(data.token)}; ${expired}`;
		}
		if (data.displayName) {
			document.cookie = `displayName=${encodeURIComponent(data.displayName)}; ${expired}`;
		}
		swal("", `Welcome ${obj.email}!`, "success");
		await waitForPopup();
		if (typeof updateAuthNav === "function") updateAuthNav();
		window.location.href = url + "/";
	}else{
		swal("","Wrong Credentials!","warning");
	}
}
