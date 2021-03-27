$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
	document.getElementById('editUser').onclick = edituser;
});

function editUser(evt){
	let user = evt.target.data('user');
	console.log(user);
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


