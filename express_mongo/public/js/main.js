var mode;

$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
	$('.editUser').on('click', getUserForm);
	$('[name="submit"]').on('click', addUser);
	$('[name="edit"]').on('click', editUser);
});

function getUserForm(){
	fetch('/users/find/'+$(this).data('id')).then(resp => resp.json()).then(resp => {
		var user = resp[0];

		$('input[name="first_name"]').val(user.first_name);
		$('input[name="last_name"]').val(user.first_name);
		$('input[name="email"]').val(user.first_name);
		$('input[name="id"]').val(user._id);

		mode = 1;

		$('[name="edit"]').show();
		$('[name="submit"]').hide();

	});
}

function addUser(){
	var formData = new FormData(document.getElementById("form"));
	console.log(formData);
	const url = '/users/add'
	fetch(url,{
		method: 'POST',
		body: formData
	})
}

function editUser(){
	var formData = new FormData(document.getElementById("form"));
	const url = '/users/edit'
	fetch(url,{
		method: 'POST',
		body: formData
	})
}

function deleteUser(){

    var confirmation = confirm('Are You Sure?');

	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url:  '/users/delete/'+$(this).data('id')
		}).done(function(response){
			window.location.replace('/')
		});
	} else {
		return false;
	}


}


