$(document).ready(function() {

    getStyles();

    $('#triggerform').on('click', function(e) {
        e.preventDefault();
        $('#addnewform').toggle();
    });
    

        function getStyles() {
            $.get('http://localhost:3000/addedstyles', function(data) {
                for (let i = 0; i<data.length;i++) {
                    $('#add').append(`<div class="col t-shirt mb-5">
                    <img src="images/${data[i].image}.jpeg" alt="">
                    <p class="font-weight-bold mt-3">${data[i].name}</p>
                    <p id = "model">${data[i].style}</p>
                    <span class="font-weight-bold" style="margin-right: 35px">$${data[i].price}.00</span>
                    <a href = 'index3.html?id=${data[i].id}'><button type="button" class="btn btn-info fetch" id="${data[i].id}">Fetch Items</button></a>
                    <button type="button" class="btn btn-success edit-style" id="edit-${data[i].id}">Edit</button>
                    <button type="button" class="btn btn-danger remove-style" id="remove-${data[i].id}">Remove</button>
                    </div>`) 
                }
                
                $('.remove-style').on('click', function(e) {
                    e.preventDefault();
                    let x = (e.target.id).split('-')[1];
                    $.ajax({
                        method:'delete',
                        url:'http://localhost:3000/addedstyles/'+ x,
                        dataType:'json',
                        success:()=>console.log('deleted')
                    })
                    $(this).parent().fadeOut(600, function() {
                        $(this).remove();
                    }); 
   
                })

                $('.edit-style').on('click', function(e) {
                    e.preventDefault();
                    let id = (e.target.id).split('-')[1];
                    id = parseInt(id)

                    let data = {
                        'name': 'Adinlewa Samuel',
                        'style': 'Buba and Soro',
                        'price': 5,
                        "image": nike
                    };

                    $.ajax({
                        url:`http://localhost:3000/addedstyles/` + id,
                        method: "PUT",
                        data: data,
                        success: function(res) {
                           data
                        },
                        error: function(e) {
                            console.log(e)
                        }
                    })
                    
                }) 
                
                let url = window.location.href;
                let path = $(location).attr('pathname');

                let urlArr = url.split("id=");

                let id = urlArr[1];
                id = parseInt(id);

                
                if (path === "/public/index3.html") {
                    
                    $.get(`http://localhost:3000/addedstyles/${id}`, function(data) {
                        console.log(data);

                        $("#getit").append(`
                            <div class="col t-shirt mb-5">
                            <img src="images/${data.image}.jpeg" alt="">
                            <p class="font-weight-bold mt-3">${data.name}</p>
                            <p>${data.style}</p>
                            <span class="font-weight-bold" style="margin-right: 35px">$${data.price}</span>
                            </div>
                        `);
                        
                    });
                }

                
                
                
            })// note this
        }

       
});
   

$('#addcollection').on('click', function (e) {
    let name = $('#name').val();
    let style = $('#style').val();
    let price = $('#price').val();
    let image = $('#image').val();

    let info = {
        'name': name,
        'style': style,
        'price': price,
        'image': image
    }

    postStyles(info);
    $('#addnewform').trigger('reset')
    e.preventDefault();

});

function postStyles(info) {
    $.post('http://localhost:3000/addedstyles', info, function() {
        console.log(info);
        getStyles();
    })
}


