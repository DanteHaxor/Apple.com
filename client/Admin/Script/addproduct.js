var addbtn=document.querySelector("#add-btn")
addbtn.addEventListener("click",()=>{
    var image=document.getElementById("pro-img").value
    var title=document.getElementById("pro-name").value
    var price=document.getElementById("pro-price").value
    var obj={
        title,
        image,
        price
    }
    if(obj.MRP=="" || obj.type=="" || obj.image=="" || obj.stock==""){
        swal("","Something is missing!","warning")
    }else{
    postdata(obj)
    }
})
let token=document.cookie.split("=")[1]
async function postdata(obj){
        let res=await fetch("https://pear-z5ta.onrender.com/api/products/addproduct",{
        method:"POST",
        headers:{
            "content-type":"application/json",
            "authorization":`${token}`
        },
        body:JSON.stringify(obj)
    })
    if(res.ok){
        swal("",`${obj.title} has been added sucessfully`,"success")
        window.location.reload()
    }
    }
    


