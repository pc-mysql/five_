const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const db = require('./model/db.txt')
const md5 = require('md5')
const {socket} = require('dgram')

app.use(express.static('../five_chesse'));

// 处理post和get参数的模块
const bodyParser = require('body-parser');
const {urlencoded} = require('express');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use('/',express.static('./public'));

app.use('/',(req,res)=>{
	res.send('404');
})

io.on('connection',(socket)=>{
	console.log('connection');
	//chat接受客户端数据
	socket.on('chat',(msg)=>{
		io.emit('send',msg);
	})
})

//端口
http.listen('8989');