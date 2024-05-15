


var  form=document.getElementById("form");
var submit = document.getElementById("submit");

form.addEventListener("submit",function(e){
    fetch('https://socket-io-basic.onrender.com/upload',{
        method:"POST",
        body:new FormData(form)
    }).then((resp)=>resp.json()).then((data)=>console.log(data));
    window.location.href="https://socket-io-basic.onrender.com"
    e.preventDefault();
   
})
