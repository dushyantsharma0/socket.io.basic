


var  form=document.getElementById("form");
var submit = document.getElementById("submit");

form.addEventListener("submit",function(e){
    fetch('http://localhost:3000/upload',{
        method:"POST",
        body:new FormData(form)
    }).then((resp)=>resp.json()).then((data)=>console.log(data));
    window.location.href="http://localhost:3000/login"
    e.preventDefault();
   
})
