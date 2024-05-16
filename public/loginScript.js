if(localStorage.getItem('email')){
    window.location.href='https://socket-io-basic.onrender.com/dashboard'
}




var email = document.getElementById("email");
var password = document.getElementById("password");
var button = document.getElementById("submit");

button.addEventListener("click", function(e) {
   
    fetch('https://socket-io-basic.onrender.com/login', {
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
        
       
        
          
       localStorage.setItem('accessToken',"Bearer "+data.accessToken)
       localStorage.setItem('name', data.data.name)
       localStorage.setItem('email', data.data.email)
       window.location.reload()
    });
   
    e.preventDefault();
});

const goToRegister=document.getElementById("goToRegister");

goToRegister.addEventListener('click',()=>{
    window.location.href='https://socket-io-basic.onrender.com/register'
})