if(localStorage.getItem('email')){
    window.location.href='http://localhost:3000/dashboard'
}




var email = document.getElementById("email");
var password = document.getElementById("password");
var button = document.getElementById("submit");

button.addEventListener("click", function(e) {
   
    fetch('http://localhost:3000/login', {
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