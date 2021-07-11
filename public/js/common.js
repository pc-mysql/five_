// 静音与取消静音
$('#sound').click(()=>{
	var audio = document.getElementsByTagName('audio')[0];
	if(audio.paused){
		audio.play();
	}else{
		audio.pause();
	}
})

// 返回主菜单
$('#back').click(function(){
	window.location.href = '../index.html';
})
// 悔棋
$("#regret").click(()=>regret());
// 重开
$("#again").click(()=>cleanBoard());
// 函数
$(function(){
	getCanvas();
	drawCheeseBoard();
})

var x,y;//鼠标坐标
var cheese = document.getElementById("board");
var ctx = cheese.getContext('2d');
var width = $("#cheeseBoard").width();
var len = width/15;

var box = [];
for(var i=0;i<16;i++){
	box[i] = [];
	for(var j=0;j<16;j++){
		box[i][j] = 0;
	}
}

//使canvas尺寸等于棋盘尺寸
function getCanvas(){
	let width = $("#cheeseBoard").width();
	let height = $("#cheeseBoard").height();
	document.getElementById("board").width = width;
	document.getElementById('board').height = height;
}

//绘制棋盘
function drawCheeseBoard(){
	ctx.strokeStyle = "#666";
	ctx.lineWidth = 3;
	for(var i=0;i<15;i++){
		ctx.moveTo(i*len,0);
		ctx.lineTo(i*len,width);//垂直方向画15根线，距离30px
		ctx.stroke();
		ctx.moveTo(0,i*len);
		ctx.lineTo(width,i*len);//水平方向画15根线，距离30px
		ctx.stroke();
	}
}

//画一个棋子
function drawOne(x,y,player){
	box[x][y] = player;
	ctx.beginPath();
	if(player == 1){
		ctx.fillStyle = '#000000';
	}else if(player == 2){
		ctx.fillStyle = '#fff';
	}
	ctx.arc(x*len,y*len,len/2.2,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

//悔棋
function regret(){
	let play = $("#player");
	if(player == 1 && box[x][y] != 0) {
		play.css('background','white');
		player = 2;
	}else if(player == 2 && box[x][y] != 0){
		play.css('background','black');
		player = 1;
	}
	
	getCanvas();
	drawCheeseBoard();
	box[x][y] = 0;
	for(var i=0;i<16;i++){
		for(var j=0;j<16;j++){
			if(box[i][j] == 1){
				drawOne(i,j,1);
			}else if(box[i][j] == 2){
				drawOne(i,j,2);
			}
		}
	}
}
//清空棋盘
function cleanBoard(){
	// 清空记录数组
	for(var i=0;i<16;i++){
		box[i] = [];
		for(var j=0;j<16;j++){
			box[i][j] = 0;
		}
	}
	getCanvas();
	drawCheeseBoard();
}

//获取当前鼠标的坐标
function xy(e){
	let xx = e.offsetX;//相对于棋盘左上角的x坐标
	let yy = e.offsetY;//相对于棋盘左上角的y坐标
	let xox = xx/len;
	let yoy = yy/len;
	x = Math.round(xox);
	y = Math.round(yoy);
	// 记录当前位置的棋子数据
	if(box[x][y] == 0){
		drawOne(x,y,player);
		if(player == 1)	{
			box[x][y]=1;
		}
		else{
			box[x][y]=2;
		}
		if(judge(x,y,player)){
			return true;
		}else {
			return false;
		}
		
	}
}

function judge(x,y,player){
	let n1 = left_down_right_up(x,y,player);
	let n2 = left_right(x,y,player);
	let n3 = up_down(x,y,player);
	let n4 = left_up_right_down(x,y,player);
	if(Math.max(n1,n2,n3,n4) > 5){
		return true;
	}else{
		return false;
	}
}
// 判断左右
function left_right(x,y,player){
	var cout=0;
	for(var i=x;i<16;i++){
		if(i==15) break;
		if(box[i][y] == player) cout++;
		else break;
	}
	for(var i=x;i>=0;i--){
		if(i==0) break;
		if(box[i][y] == player) cout++;
		else break;
	}
	return cout;
}
// 判断上下
function up_down(x,y,player){
	var cout=0;
	for(var i=y;i<16;i++){
		if(i==15) break;
		if(box[x][i] == player) cout++;
		else break;
	}
	for(var i=y;i>=0;i--){
		if(i==0) break;
		if(box[x][i] == player) cout++;
		else break;
	}
	return cout;
}
// 判断左上至右下
function left_up_right_down(x,y,player){
	var cout=0;
	for(var i=x,j=y;i<16;i++,j++){
		if(i==15) break;
		if(j==15) break;
		if(box[i][j] == player) cout++;
		else break;
	}
	for(var i=x,j=y;i<16;i--,j--){
		if(i==0) break;
		if(j==0) break;
		if(box[i][j] == player) cout++;
		else break;
	}
	return cout;
}	
// 判断左下至右上
function left_down_right_up(x,y,player){
	var cout=0;
	for(var i=x,j=y;i<16;i++,j--){
		if(j==0) break;
		if(i==15) break;
		if(box[i][j] == player) cout++;
		else break;
	}
	for(var i=x,j=y;i<16;i--,j++){
		if(i==0) break;
		if(j==15) break;
		if(box[i][j] == player) cout++;
		else break;
	}
	return cout;
}