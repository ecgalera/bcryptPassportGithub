console.log("Register !!!")

const form = document.getElementById("formRegister");
form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data)
    const obj ={};
    data.forEach((value,key)=>obj[key]=value)
    console.log(obj)
    const response =await fetch("/api/session/register", {
        method:"POST",
        body: JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })

    const responseData = await response.json();
    console.log(responseData)
    // si todo sale bien me redirecciono a login 
    if(responseData.status === "success"){
        window.location.replace("/login")
    }
})