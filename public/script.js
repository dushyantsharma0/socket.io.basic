



var form = document.getElementById("form");
var submit = document.getElementById("submit");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    fetch('https://socket-io-basic.onrender.com/upload', {
        method: "POST",
        body: new FormData(form)
    })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
        window.location.href = "https://socket-io-basic.onrender.com"
    })
    .catch((error) => console.error('Error:', error));
});

const alredyRegister=document.getElementById("alredyRegister");

alredyRegister.addEventListener("click",function(){
    window.location.href="https://socket-io-basic.onrender.com"
})
