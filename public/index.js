async function test(){
    let res=await fetch("https://dulcet-licorice-2602ef.netlify.app/users")
    let data=await res.json()
    console.log(data);
    document.getElementById("test").innerHTML=data.msg
}
test()
