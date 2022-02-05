// function senddata() {
//    const name = $("#username").val()
//    const word = $("#password").val()
//    $.ajax({
//       url: '/signup/auth',
//       method: 'post',
//       contentType: 'application/json',
//       data:JSON.stringify({
//          name,
//          word
//       }),
//       success: function (response) {
//          console.log(response);
//       },
//       error: function (error) {
//          console.log(error);
//       }
//    })
// }

let username = document.getElementById('username');
let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let password = document.getElementById('password');
let RePassword = document.getElementById('RePassword');
let form = document.getElementById('form');
const error = document.getElementById('error');
const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

form.addEventListener('submit', (e) => {
    let = []
    if(username.value === '' || username.value === null) {
        return message.push('Please enter a username')
    }
    if(firstname.value === '' || firstname.value === null) {
       return message.push('Please enter a first name')
    }
    if(lastname.value === '' || lastname.value === null){
      return message.push('Please enter a last name')
    }
    if(username.length > 30){
        return message.push('username should be less than 30 characters')
    }
    if(username.length < 2){
        message.push('username must be more than 2 characters')
    }
    if(firstname.length > 30){
        return message.push('firstname must be less than 30 characters')
    }
    if(firstname.length < 2){
        return message.push('firstname must be more than 2 characters')
    } 
    if (lastname.length >30){
        return message.push('lastname must be less than 30 characters')
    }
    if(lastname.length < 2){
        return message.push('lastname must be more than 2 characters')
    }
    if(password.value === '' || password.value === null){
        message.push('Please enter a password')
    }
    if(RePassword.value === '' || RePassword.value === null){
        message.push('Please enter a RePassword')
    }
    if(!pass.test(password)){
     message.push('Please enter correct password')
    }
    if(password.value !== RePassword.value){
        message.push('Please enter equle password and Repassword')
    }
    if(massage.length > 0){
        e.preventDefault()
        error.innerText = message.join(', ') 
    }

})