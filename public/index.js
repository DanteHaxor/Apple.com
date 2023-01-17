async function test(){
    let res=await fetch("http://localhost:1337/users")
    let data=await res.json()
    console.log(data);
    document.getElementById("test").innerHTML=data.msg
}
test()