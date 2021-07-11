var barshow = true;
window.onload = function(){
	if(barshow) {
		init();
	}
}

function init(){
	barshow = false;
	var bar = $('#bar');
	var len = 0;
	var barMove = setInterval(function(){
		len+=20;
		bar.css('width',len+'%');
		$('#barNum').text(len+'%');
		if(len == 100){
			clearInterval(barMove);
			setTimeout(function(){
				$('#barBox').css('display','none');
				$('.start_btn img,.start_btn span').css('display','block');
			},1000);
		} 
	},80);
}