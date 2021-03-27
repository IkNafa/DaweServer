$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
	$('.editUser').on('click', getUserForm);
});

function getUserForm(){
	fetch('/users/find/'+$(this).data('id')).then(resp => resp.json()).then(resp => {
		                console.log(resp);
		        });
}

function editUser(user){
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


