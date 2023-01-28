async function getData(){
    let res = await fetch("https://pear-z5ta.onrender.com/api/products");
	let data = await res.json();
    displaydata(data)
}
getData()
function displaydata(data){
    data.forEach((el)=>{
        let tr=document.createElement("tr")
        let trcontent=`
            <td>${el.title}</td>
            <td>${el._id}</td>
            <td>${el.price}</td>
            <td class="success">Available</td>
            <td><button class="test del-btn" data-id="${el._id}">Delete</button></td>                
        `
        tr.innerHTML=trcontent;
        document.querySelector("tbody").append(tr)
    })
let del=document.querySelectorAll(".del-btn")
del.forEach((el)=>{
    el.addEventListener("click",(e)=>{
        let id=e.target.dataset.id
        deletedata(id)
    })
})
}
let showall=document.querySelector(".showall")
showall.addEventListener("click",()=>{
    getalldata()
})

async function getalldata(){
    let res = await fetch("https://639b037e31877e43d67f1598.mockapi.io/crud");
	let data = await res.json();
    displaydata(data)
}
let token=document.cookie.split("=")[1]
async function deletedata(id){
    let res=await fetch(`https://pear-z5ta.onrender.com/api/products/delete/${id}`,{
        method:"DELETE",
        headers: {
            "content-type": "application/json",
            "authorization":`${token}`
        }
    })
    swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Poof! Your file has been deleted!", {
      icon: "success",
    });
  } else {
    swal("Your imaginary file is safe!");
  }
});
	setTimeout(() => { 
	window.location.reload()	
	}, 3000);
   
}


