$("#update_hospital").submit(function(event){
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value']
    })
    console.log(data);
    var request = {
        "url":`http://localhost:3000/api/hospital/${data.id}`,
        "method":"PUT",
        "data": data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!!")
    })
})

// function(error){
//     if(error.responseText == 'showAlert'){
//         alert("Please enter correct user name and password.")
//     }
// }


// Min Date Today 
addSlotDate.min = new Date().toISOString().split("T")[0];