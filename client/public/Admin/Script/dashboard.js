let sidemenu=document.querySelector("aside");
let menubtn=document.querySelector("#menu-btn");
let closebtn=document.querySelector("#close-btn");
let themetoggler=document.querySelector(".theme-toggler")

menubtn.addEventListener("click",()=>{
    sidemenu.style.display="block";
})
closebtn.addEventListener("click",()=>{
    sidemenu.style.display="none";
})
themetoggler.addEventListener("click",()=>{
    document.body.classList.toggle("dark-theme-variables");
    themetoggler.querySelector("span").classList.toggle("active"); 
})

async function getdata(){
    let res=await fetch("https://639b1b94d5141501974b716f.mockapi.io/AddCart?page=1&limit=10")
    let data=await res.json()
    displaydata(data)
}
getdata()
function displaydata(data){
    data.forEach((el)=>{
        let tr=document.createElement("tr")
        let trcontent=`
            <td>${el.title}</td>
            <td>${el.id}</td>
            <td>${el.price}</td>
            <td class="success">Available</td>
            <td class="danger">details</td>                
        `
        tr.innerHTML=trcontent;
        document.querySelector("tbody").append(tr)
    })
    
}
let showall=document.querySelector(".showall")
    showall.addEventListener("click",()=>{
    getalldata()
})
async function getalldata(){
    let res = await fetch("https://639b1b94d5141501974b716f.mockapi.io/AddCart");
	let data = await res.json();
    displaydata(data)
}