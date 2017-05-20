
//note parseInt
//note stop


var opts = ['<img src="images/sony.png"/>','<img src="images/camara.png"/>'];




function go(){
	addSlots($("#slots_a .wrapper"));
	moveSlots($("#slots_a .wrapper"));
	addSlots($("#slots_b .wrapper"));
	moveSlots($("#slots_b .wrapper"));
	addSlots($("#slots_c .wrapper"));
	moveSlots($("#slots_c .wrapper"));
	
	$('#juego #boton').hide('fast');
}

$(document).ready(
function(){
	addSlots($("#slots_a .wrapper"));
	addSlots($("#slots_b .wrapper"));
	addSlots($("#slots_c .wrapper"));
	
}		
);


function addSlots(jqo){
	for(var i = 0; i < 15; i++){
		var ctr = Math.floor(Math.random()*opts.length);
		jqo.append("<div class='slot'>"+opts[ctr]+"</div>");

		
	}
}

function moveSlots(jqo){
		
		var n_slot = jqo.attr("title");
		
		//alert(n_slot);
		
		var time = 1700;
		time += Math.round(Math.random()*5000);
		jqo.stop(true,true);

		var marginTop = parseInt(jqo.css("margin-top"), 10)
		var alto = parseInt(jqo.css("height"));
		marginTop -= (20 * 300)
		
	
	jqo.animate({"margin-top":marginTop+"px"}, time, "easeOutElastic",function(){
		
		console.log('holi'+n_slot);
		
		if(n_slot=="3"){
			setTimeout(function(){
					$.mobile.changePage("#final", { transition: "flow"} );
					$('#final img').fadeIn(6000);
				},
			4000);
			
		}
		 
	});

}
