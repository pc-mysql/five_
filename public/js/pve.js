var player = 1;

var downchesse = document.getElementsByTagName('audio')[1];
$('#board').click(function(e){
	player = 1;
	downchesse.play();
	let ans = xy(e);
	if(ans == true) {
		setTimeout(()=>{
			window.location.href = '../views/win.html';
		},1000);
	}
	$("#player").css('background','white');
	setTimeout(()=>{
		for(var i=0;i<16;i++){
			for(var j=0;j<16;j++){
				if(box[i][j] == 2){
					if(box[i+1][j] == 0 && x!=15) {
						robot(i+1,j,2);
						break;
					}
					else if(box[i-1][j] == 0 && x!=0) {
						robot(i-1,j,2);
						break;
					}
					else if(box[i][j+1] == 0 && j!=15){
						robot(i,j+1,2);
						break;
					} 
					else if(box[i][j-1] == 0 && j!=0){
						robot(i,j-1,2);
						break;
					} 
					else
						continue;
				}
			}
			if(j<16) break;
		}
		if(i==16 && j==16){
			for(var i=0;i<16;i++){
				for(var j=0;j<16;j++){
					if(box[i][j] == 1){
						if(box[i+1][j] == 0 && i!=15) {
							robot(i+1,j,2);
							break;
						}
						else if(box[i-1][j] == 0 && i!=0) {
							robot(i-1,j,2);
							break;
						}
						else if(box[i][j+1] == 0 && j!=15){
							robot(i,j+1,2);
							break;
						} 
						else if(box[i][j-1] == 0 && j!=0){
							robot(i,j-1,2);
							break;
						} 
						else
							continue;
					}
				}
				if(j<16) break;
			}
		}
	},2000)
	
})

function robot(a,b,player){
	downchesse.play();
	drawOne(a,b,player);
	$("#player").css('background','black');
	let bn = judge(a,b,player);
	if(bn == true){
		setTimeout(()=>{
			window.location.href = '../views/lose.html';
		},1000);
	}
}