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