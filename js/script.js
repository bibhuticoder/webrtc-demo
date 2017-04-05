var peer = new Peer({key: 'ox1c8v6019duc8fr'});

peer.on('open', function(id) {	
	$("#id").text(" Your id : "+ id);
 
});


//start connection
var conn;
var call;
var mediaStream;

//receive connection
peer.on('connection', function(conn) {

	conn.on('open', function() {
		// Receive messages
		conn.on('data', function(data) {
			$("#messages").append("<li class='other list-group-item'> Other : " + data + "</li>");
			console.log('Received', data);
		});		
	});

	console.log("Connection established");	
});

//receive call
peer.on('call', function(call) {
  // Answer the call, providing our mediaStream
  call.answer(mediaStream);
});





$("#connect").click(function(){
	conn = peer.connect($("#peerid").val().trim());	
})

$("#call").click(function(){
	call = peer.call($("#peerid").val().trim(), mediaStream);
	//stream call
	call.on('stream', function(stream) {
		otherVideo.src = window.URL.createObjectURL(stream);
	});
})

$("#send").click(function(){
	conn.send($("#message").val());
	$("#messages").append("<li class='mine list-group-item'> You :" + $("#message").val() + "</li>");
	$("#message").val("");
})


//video call
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

var mineVideo = document.getElementById("mine");
var otherVideo = document.getElementById("other");

function successCallback(stream) {
	mediaStream = stream;  
    mineVideo.src = window.URL.createObjectURL(stream);
    
 
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);