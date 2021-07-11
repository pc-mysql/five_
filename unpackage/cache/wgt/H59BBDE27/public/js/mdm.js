var player = 1;
var audio2 = document.getElementsByTagName('audio')[1];
$('#board').click(function(e){
	audio2.play();
	let ans = xy(e);
	if(ans == true && player == 1) {
		setTimeout(()=>{
			window.location.href = '../views/win.html';
		},1000);
	}else if(ans == true && player == 2){
		setTimeout(()=>{
			window.location.href = '../views/lose.html';
		},1000);
	}
	if(player == 1) {
		if(box[x][y] == 1){
			player = 2;
			$("#player").css('background','white');
		}
	}else if(player == 2){
		if(box[x][y] == 2){
			player = 1;
			$("#player").css('background','black');
		}
	}
})