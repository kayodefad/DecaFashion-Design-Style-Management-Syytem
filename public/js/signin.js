$( document ).ready(function() {

    $('#signin').click(function(e) {
        e.preventDefault();

        let email = $('#email').val();
        let password = $('#password').val();
        let user 

        $.get('http://localhost:3000/registered', function(data) {
            user = data.filter(el => el.email == email)
            console.log(user)
            if(email == '' || password == '') {
                alert('Fill in all the fields')
            } else if (user.length == 0 || user[0].password != password || user[0].email != email) {
                alert('Email or password incorrect')
            } else
                window.location = 'index2.html';
        })
    })
    
});