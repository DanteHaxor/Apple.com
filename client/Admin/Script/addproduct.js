var addbtn=document.querySelector("#add-btn")
addbtn.addEventListener("click",()=>{
    var image=document.getElementById("pro-img").value
    var type=document.getElementById("pro-name").value
    var MRP=document.getElementById("pro-price").value
    var stock=document.getElementById("stock").value
    var obj={
        "MRP":MRP,
        "type":type,
        "image":image,
        "stock":stock
    }
    if(obj.MRP=="" || obj.type=="" || obj.image=="" || obj.stock==""){
        swal("","Something is missing!","warning")
    }else{
    postdata(obj)
    }
})

async function postdata(obj){
    
        let res=await fetch("https://639b037e31877e43d67f1598.mockapi.io/crud",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    swal("",`${obj.type} has been added sucessfully`,"success")
    window.location.reload()
    }
    


