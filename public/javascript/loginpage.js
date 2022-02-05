function senddata() {
   let username = $(#username).val()
   let password = $(#password).val()
   $.ajax({
      url: 'https://',
      method: 'post',
      contentType: 'application/json',
      data:JSON.stringify({
         username,
         password
      }),
      sucsses: function (response) {
         console.log(response);
      },
      error: function (error) {
         console.log(error);
      }
   })
}
