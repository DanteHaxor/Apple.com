async function getdata(){
    let res=await fetch("https://pear-z5ta.onrender.com/api/products/")
    let data=await res.json()
    display(data)
}
getdata()

function display(data){
  let newData=data.map((el)=>{
     return `<div class="grid-product addtocart" data-id=${el._id}>
        <img src="${el.image}" data-id=${el._id}>
        <div class="grid-detail" data-id=${el._id}>
          <p data-id=${el._id}>${el.title}</p>
          <p data-id=${el._id}>From $${el.price}</p>
        </div>
      </div>`
    })
    document.querySelector(".product-mac>.container>.grid").innerHTML=newData.join("")
let ele=document.querySelectorAll(".addtocart")
for(item of ele){
    item.addEventListener("click",(e)=>{
        addtocart(e.target.dataset.id)
    })
}
}

async function addtocart(id){
    let res=await fetch(`https://pear-z5ta.onrender.com/api/products?_id=${id}`)
    let data=await res.json()
    let token=document.cookie
    let post=await fetch("https://pear-z5ta.onrender.com/api/cart/addtocart",{
        method: "POST",
        headers:{
            "content-type": "application/json",
            "authorization":`${token}`
        },
        body: JSON.stringify(data[0])
    })
    
    if(post.ok){
        swal("",`${data[0].title} added to cart`,"success")
    }
}
console.log(document.cookie.split("="))