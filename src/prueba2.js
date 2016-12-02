angular.module("productos",[])
	.controller("traerProductos", function($scope, $http){
			$scope.posts= [];
			$scope.newPost = {};
			$scope.solicitudes= [];
			$scope.newSolicitud= {};
			$scope.borrar= {};
			$http.get("http://localhost:3001/api/product")
				.success(function (data){
					console.log(data);
					$scope.posts= data.products;
				})
				.error(function(err){
					console.log(err);
				});
			$http.get("http://localhost:3001/api/solicitud")
				.success(function (data){
					console.log(data);
					$scope.solicitudes= data.products;
				})
				.error(function(err){
					console.log(err);
				});
			$scope.addPost = function(){
				$http.post("http://localhost:3001/api/product",{
					nombre: $scope.newPost.nombre,
					imagen: $scope.newPost.imagen,
					descripcion: $scope.newPost.descripcion
				})
				.success(function(data,status,headers,config){
					alert("Se ha creado un nuevo servicio");	
					$scope.posts.push($scope.newPost);
					$scope.newPost = {};
					document.location.href= "menuAdm.html";
				})
				.error(function(error,status,headers,config){
					console.log(error);
				});
			}
			$scope.addSolicitud = function(){
				$http.post("http://localhost:3001/api/solicitud",{
					nombre: $scope.newSolicitud.nombre,
					direccion:$scope.newSolicitud.direccion,
					descripcion: $scope.newSolicitud.descripcion
				})
				.success(function(data,status,headers,config){
					$scope.solicitudes.push($scope.newPost);
					$scope.newSolicitud = {};
					alert("Solicitud realizada con exito.");
					document.location.href="menu.html";
				})
				.error(function(error,status,headers,config){
					console.log(error);
				});
			}
			$scope.deleteService = function(){
				$http.delete("http://localhost:3001/api/product/"+$scope.borrar.id)
				.success(function(data,status,headers,config){
					alert("Servicio con Id: "+$scope.borrar.id+" Ha sido eliminado.");
					$scope.borrar.id= {};
					document.location.href= "menuAdm.html";
				})
				.error(function(error,status,headers,config){
					console.log(error);
				});
			}
			$scope.modificarServicio= function(){
				$http.put("http://localhost:3001/api/product/"+$scope.borrar.id,{
					nombre: $scope.newPost.nombre,
					imagen: $scope.newPost.imagen,
					descripcion: $scope.newPost.descripcion
				})
				.success(function(data,status,headers,config){
					alert("Se ha modificado el servicio con id: "+$scope.borrar.id);	
					$scope.borrar.id= {};
					document.location.href= "menuAdm.html";
				})
				.error(function(error,status,headers,config){
					console.log(error);
				});
			}
			$scope.selecionarSolicitud = function(){
				var seleccion = $scope.solicitudes;
				var num = $scope.borrar.id;
				for (var i = 0; i <= $scope.solicitudes.length-1; i++){
					if ($scope.solicitudes[i]._id == num) {
						num = i;
					}
				}
				console.log(num);
				$http.post("http://localhost:3001/api/seleccion",{
					_id: seleccion[num]._id,
					nombre: seleccion[num].nombre,
					direccion: seleccion[num].direccion,
					descripcion: seleccion[num].descripcion
				})
				.success(function(data,status,headers,config){
					$http.delete("http://localhost:3001/api/solicitud/"+$scope.borrar.id)
					.success(function(data,status,headers,config){
					$scope.borrar.id= {};
					document.location.href= "menuDomic.html";
				})
				.error(function(error,status,headers,config){
					console.log(error);
				});
				alert("servicio con Id: "+$scope.borrar.id+" Seleccionado.");
				//window.location.href= "menuDomic.html";

				})
				.error(function(error,status,headers,config){
					console.log(error);
				});
			}
			$scope.eliminarSolicitud = function(){
				
			}

			$scope.get_loc = function(dir) {
       			if (navigator.geolocation) {
          			navigator.geolocation.getCurrentPosition(coordenadas);
       			}else{
          			alert('Este navegador es algo antiguo, actualiza para usar el API de localización');                
          		}
			}

			function coordenadas (position){
				var seleccion = $scope.solicitudes;
				var num = $scope.borrar.id;

				for (var i = 0; i <= $scope.solicitudes.length-1; i++){
					if ($scope.solicitudes[i]._id == num) {
						num = i;
					}
				}

				  var lat = position.coords.latitude;
			    	  var lon = position.coords.longitude;	
			    	  
			      map = new google.maps.Map(document.getElementById('map'), {
			    	center: {lat: lat, lng: lon},
			    	zoom: 16
			  	});

			    var geocoder = new google.maps.Geocoder();
			    var address = seleccion[num].direccion;
			    console.log(address);
			    var resultados = []
			    geocoder.geocode({'address': address}, function(results, status) {
				    if (status === google.maps.GeocoderStatus.OK) {
				      map.setCenter(results[0].geometry.location);
				      var directionsDisplay = new google.maps.DirectionsRenderer();
					  var directionsService = new google.maps.DirectionsService();
					  var lat = position.coords.latitude;
			    	  var lon = position.coords.longitude;
					  var pos = new google.maps.LatLng(lat, lon);
					  var request = {
					  	origin: pos,
					 	destination: results[0].geometry.location,
						travelMode: google.maps.DirectionsTravelMode["DRIVING"],
						unitSystem: google.maps.DirectionsUnitSystem["METRIC"],
						provideRouteAlternatives: true
					};
						directionsService.route(request, function(response, status) {
						    if (status == google.maps.DirectionsStatus.OK) {
						        directionsDisplay.setMap(map);
						        directionsDisplay.setDirections(response);
						    } else {
						            alert("No existen rutas entre ambos puntos");
						    }
						});
				    } else {
				      alert('Geocode was not successful for the following reason: ' + status);
				    }
			  	});
			}
				
	});

angular.module("login",[])
	.controller("traerUsuarios", function($scope, $http){
		$scope.usuarios= [];
		$scope.newUsuario= {};
		$http.get("http://localhost:3001/api/users")
			.success(function (data){
				console.log(data);
				$scope.usuarios= data.products;
			})
			.error(function(err){
				console.log(err);
			})
		$scope.addUsuario = function(){
			$http.post("http://localhost:3001/api/users",{
				nombre: $scope.newUsuario.nombre,
				celular: $scope.newUsuario.celular,
				email: $scope.newUsuario.email,
				password: $scope.newUsuario.password,
				tipo: "2"
			})
			.success(function(data,status,headers,config){
				$scope.usuarios.push($scope.newUsuario);
				$scope.newUsuario= {};
				document.location.href= "menu.html";
			})
			.error(function(error,status,headers,config){
					console.log(error);
			})
		}

		$scope.addUsuario2 = function(){
			$http.post("http://localhost:3001/api/users",{
				nombre: $scope.newUsuario.nombre,
				celular: $scope.newUsuario.celular,
				email: $scope.newUsuario.email,
				password: $scope.newUsuario.password,
				tipo: "3"
			})
			.success(function(data,status,headers,config){
				$scope.usuarios.push($scope.newUsuario);
				$scope.newUsuario= {};
				document.location.href= "menuDomic.html";
			})
			.error(function(error,status,headers,config){
					console.log(error);
			})
		}
		
		$scope.compararIngreso = function(){
			var usuarioss = $scope.usuarios;
			var usuario = $scope.usuario, password = $scope.pass, cPass, cUser;
			var validate = false, numero=0;
			console.log(usuarioss);
			for( i=0;  i <= usuarioss.length-1; i++){
				cUser = usuarioss[i].email;
				cPass = usuarioss[i].password;
				console.log(usuarioss[i].email);
				console.log(usuarioss[i].password);
				if(cUser == usuario){
					if (cPass == password ) {
						validate= true;
						numero= i;
					};
				}
			}

			if (validate) {
				alert("Bienvenido");
				if(usuarioss[numero].tipo == 1){
					document.location.href= "menuAdm.html";
				}else if(usuarioss[numero].tipo == 2){
					document.location.href= "menu.html";
				}else if (usuarioss[numero].tipo == 3) {
					document.location.href= "menuDomic.html";
				};

			}else{
				alert("incorrecto, intentalo de nuevo");
			}
		}
	})