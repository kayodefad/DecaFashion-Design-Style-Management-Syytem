$(document).ready(function () {
    $('#register').click(function(e) {
        e.preventDefault();
        
        let firstName = $('#firstname').val();
        let lastName = $('#lastname').val();
        let emailAddress = $('#email').val();
        let password = $('#password').val();

        let info = {
            'firstName': firstName,
            'lastName': lastName,
            'email': emailAddress,
            'password': password,
        }
        console.log(info);

        if(firstName=='' || lastName== '' || emailAddress=='' || password=='') {
            alert('Fill in all the fields');
        } else {
            $.post("http://localhost:3000/registered", info, function () {
                $('form').trigger('reset');
                // alert('REGISTRATION SUCCESSFUL');
                window.location = 'signin.html';                    
            });
        }
    })
});
