$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
	$('.editUser').on('click', getUserForm);
});

function getUserForm(){
	fetch('/users/find/'+$(this).data('id')).then(resp => resp.json()).then(resp => {
		var user = resp[0];

		$('input[name="first_name"]').val(user.first_name);
		$('input[name="last_name"]').val(user.last_name);
		$('input[name="email"]').val(user.email);
		$('input[name="id"]').val(user._id);

		$('#formEdit').show();
		console.log($('#formEdit').attr('action'));
		$('#formEdit').get(0).setAttribute('action', `/users/edit/${user._id}`)
		$('#form').hide();

	});
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


