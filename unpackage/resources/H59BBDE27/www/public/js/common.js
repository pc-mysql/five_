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
// 下棋
$("#board").click((e)=>xy(e));

// 函数
$(function(){
	getCanvas();
	drawCheeseBoard();
})


var player = 'p2';
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
	ctx.beginPath();
	ctx.arc(x*len,y*len,len/2.2,0,2*Math.PI);
	//棋子的渐变色效果
	if(player == 'p1'){
		ctx.strokeStyle = '#000000';
	}else{
		ctx.strokeStyle = '#fff';
	}
	ctx.fill();
	ctx.closePath();
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
		if(player == 'p1')	box[x][y]=1;
		else	box[x][y]=2;
	}
}

//悔棋
function regret(){
	//消除当前棋子
	ctx.strokeStyle = "#D2B48C";
	ctx.clearRect(x*width+4,y*width+4,width-4,width-4);
	ctx.stroke();
	//填补被抹去的棋盘
	ctx.beginPath();
	ctx.strokeStyle = "#d6d1d1";
	ctx.moveTo(x*width,y*width-len/2);
	ctx.lineTo(x*width,y*width+len/2);
	ctx.stroke();
	ctx.moveTo(x*40-len/2,y*width);
	ctx.lineTo(x*40+len/2,y*width);
	ctx.stroke();
	//记录当前节点的数组为0,当前下棋玩家不变
	box[x][y] = 0;
}
//清空棋盘
function cleanBoard(){
	// 清空记录数组
	for(var i=0;i<15;i++){
		box[i] = [];
		for(var j=0;j<15;j++){
			box[i][j] = 0;
		}
	}
	ctx.strokeStyle = "d2b48c";
	ctx.clearRect(0,0,width,width);
	ctx.stroke();
}
