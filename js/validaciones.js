$(document).ready(function(){
	/*$("#nombre").focusin(function(){
		console.log("Seleccionado");
	});*/
	var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	var telRegex = /^\d{3}\d{7}$/;
	var dateRegex = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
	var timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
	var correo = "email@dominio.com";
	var password = "123456";
	$("#nombre").focusout(function(){
		if($(this).val() == ""){
			$("#spanNombre").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else{
			$("#spanNombre").html("<span></span>");
		}
	});
	$("#correo").focusout(function(){
		if($(this).val() == ""){
			$("#spanCorreo").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else if(!emailRegex.test($(this).val())){
			$("#spanCorreo").html("<span style='color:red;'>* Favor de introducir correo valido</span>")
		}else{
			$("#spanCorreo").html("<span></span>");
		}
	});
	$("#password").focusout(function(){
		if($(this).val() == ""){
			$("#spanPassword").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else if($(this).val().length > 0 && $(this).val().length <= 5){
			$("#spanPassword").html("<span style='color:red;'>* Contrasena muy corta</span>");
		}else{
			$("#spanPassword").html("<span></span>");
		}
	});
	$("#cpassword").focusout(function(){
		if($(this).val() == ""){
			$("#spanCPassword").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else if($(this).val() != $("#password").val()){
			$("#spanCPassword").html("<span style='color:red;'>* Contrasena no coincide</span>");
		}else{
			$("#spanCPassword").html("<span></span>");
		}
	});
	$("#telefono").focusout(function(){
		if($(this).val() == ""){
			$("#spanTelefono").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else if(!telRegex.test($(this).val())){
			$("#spanTelefono").html("<span style='color:red;'>* Favor de introducir telefono valido</span>")
		}else{
			$("#spanTelefono").html("<span></span>");
		}
	});
	$("#marca").focusout(function(){
		if($(this).val() == ""){
			$("#spanMarca").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else{
			$("#spanMarca").html("<span></span>");
		}
	});
	$("#modelo").focusout(function(){
		if($(this).val() == ""){
			$("#spanModelo").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else{
			$("#spanModelo").html("<span></span>");
		}
	});
	$("#color").focusout(function(){
		if($(this).val() == ""){
			$("#spanColor").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else{
			$("#spanColor").html("<span></span>");
		}
	});
	$("#placas").focusout(function(){
		if($(this).val() == ""){
			$("#spanPlacas").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else{
			$("#spanPlacas").html("<span></span>");
		}
	});
	$("#pasajero").focusout(function(){
		if($(this).val() == ""){
			$("#spanPasajero").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else{
			$("#spanPasajero").html("<span></span>");
		}
	});
	$("#pasajero").focusout(function(){
		if($(this).val() == ""){
			$("#spanPasajero").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else{
			$("#spanPasajero").html("<span></span>");
		}
	});
	$("#passwordActual").focusout(function(){
		if($(this).val() == ""){
			$("#spanPasswordA").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else if($(this).val() != password){
			$("#spanPasswordA").html("<span style='color:red;'>* Contrasena incorrecta</span>");
		}else{
			$("#spanPasswordA").html("<span></span>");
		}
	});
	$("#cpasswordActual").focusout(function(){
		if($(this).val() == ""){
			$("#spanCPasswordA").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else if($(this).val() != password){
			$("#spanCPasswordA").html("<span style='color:red;'>* Contrasena incorrecta</span>");
		}else{
			$("#spanCPasswordA").html("<span></span>");
		}
	});
	$("#fecha").focusout(function(){
		if($(this).val() == ""){
			$("#spanFecha").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else if(!dateRegex.test($(this).val())){
			$("#spanFecha").html("<span style='color:red;'>* Fecha incorrecta</span>");
		}else{
			$("#spanFecha").html("<span></span>");
		}
	});
	$("#hora").focusout(function(){
		if($(this).val() == ""){
			$("#spanHora").html("<span style='color:red;'>* Favor de llenar campo</span>");
		}else if(!timeRegex.test($(this).val())){
			$("#spanHora").html("<span style='color:red;'>* Hora incorrecta</span>");
		}else{
			$("#spanHora").html("<span></span>");
		}
	});
});