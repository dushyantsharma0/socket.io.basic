if(!localStorage.getItem('email')){
    window.location.href="http://localhost:3000/login";
    
}

const name=document.getElementById('name');
name.innerHTML+=" Dear "+localStorage.getItem('name').charAt(0).toUpperCase()+localStorage.getItem('name').slice(1);

const maindiv=document.createElement("div");



fetch('http://localhost:3000/data',{
    method:"GET",
  
    headers:{
        'Content-Type':'application/json',
        'Authorization':localStorage.getItem('accessToken'),
        'email':localStorage.getItem('email')
        
    }
}).then((resp)=>resp.json()).then((data)=>{
    data.data.forEach(element => {
        let div=document.createElement('div');
        div.style.display="flex";
        div.style.padding="10px";
        div.style.borderRadius="10px";
        div.style.margin="10px";
        div.style.border="1px solid black";
        div.style.justifyContent='space-between'
        div.style.alignItems='center'
           
        let image=document.createElement('img');
        image.width=50;
        image.height=50;
        image.style.borderRadius="50%";
        image.src=element.image;
        div.appendChild(image);
        let h1=document.createElement('h1');
        h1.innerText=element.name;
        h1.setAttribute('id', element._id);
        div.appendChild(h1);
        let p=document.createElement('p');
        p.innerText=element.email;
        div.appendChild(p);
        let br=document.createElement('br');
        div.appendChild(br);
        let button=document.createElement('button');
        button.innerText=`chat with ${element.name}`;
        button.style.background='blue'
        button.style.color='white'
        button.style.fontWeight='900'
        button.style.padding='5px'
        button.style.borderRadius='5px'
        button.onclick=function(){
            let ID = button.parentElement.children[1].id;
            localStorage.setItem('reciver_id', ID);
            window.location.href='http://localhost:3000/index'
        }
        div.appendChild(button)
        maindiv.appendChild(div);

    });
    var maidiv2=document.createElement('div');
    maidiv2.style.position='absolute';
    maidiv2.style.top='14px';
    maidiv2.style.right='24px';
    maidiv2.style.display='flex';
    maidiv2.style.justifyContent='center';  
    maidiv2.style.gap='5px';
    maidiv2.style.alignItems='center'
    var img2=document.createElement('img');
    
    img2.width=50;
    img2.height=50;
    img2.style.borderRadius="50%";
    img2.src=data.mydata.image
    maidiv2.appendChild(img2);
    let h1=document.createElement('p');
    h1.innerText=data.mydata.name;
    h1.setAttribute('id', data.mydata._id);
    maidiv2.appendChild(h1);
    
   localStorage.setItem('sender_id', data.mydata._id);
    document.body.appendChild(maidiv2)
})

document.body.appendChild(maindiv);

;

let btnLogout=document.getElementById('btnLogout');

btnLogout.addEventListener('click',()=>{
    localStorage.clear();
    window.location.reload()
})