/*
 * Turn based social game on HTML5 canvas
 * Client side
 * author: asci
 * e-mail: asci@yandex.ru
 */
$(function(){


	dem.Game = (function (argument) {
		var canvas, 
			canvasCtx, 
			buffer, 
			ctx,
			field, 
			interactiveSprites, 
			user,
			instance,
			stats,
			me;

		function Game(id, w, h) {
			if (instance) {
				return instance;
			} else {
				instance = this;
			}
    		this.width = w,
			this.height = h;
			canvas = document.getElementById('game');
			canvas.width =this. width;
 			canvas.height = this.height;
			canvasCtx = canvas.getContext("2d"); 		
			buffer = document.createElement("canvas");
			buffer.width = this.width;
			buffer.height = this.height;
			ctx = buffer.getContext('2d');
			me = this;
			this.zoom = 1.0;
			dem.game = this;
	
			document.onselectstart = function () {
				return false;
			}	

			stats = new Stats();
			stats.setMode(0);
		    document.body.appendChild( stats.domElement );
			// Align top-left
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.left = '0px';
			stats.domElement.style.top = '20px';

			field = this.field = new dem.Field();
			field.generateMap(50, 500);
			field.generateUnits();


			$('#game').mousemove(function (e){
				e.x = e.clientX - this.offsetLeft;
				e.y = e.clientY - this.offsetTop;
				field.onmousemove(e, me.width, me.height, me.zoom);
			});
			
			$('#game').mousedown(function (e) {
				e.x = e.clientX - this.offsetLeft;
				e.y = e.clientY - this.offsetTop;
				field.onmousedown(e, me.zoom);
			});
			
			$('#game').mouseup(function (e){				
				e.x = e.clientX - this.offsetLeft;
				e.y = e.clientY - this.offsetTop;
				field.onmouseup(e, me.zoom);
			});

			$("#shopBtn").click(function () {
				field.startMoveBuilding();
			});
		}
		Game.prototype.setZoom = function (val) {
			if (me.zoom + val <= 1 && me.zoom + val >= 0.5) {
				TweenLite.to(me, 0.5, {zoom:me.zoom + val});				
			}
		}

		Game.prototype.render = function  () {
			stats.begin();
			canvasCtx.save();
			canvasCtx.scale(me.zoom, me.zoom);

			field.draw(canvasCtx, me.width, me.height, me.zoom);

			canvasCtx.restore();
			stats.end();

			window.requestAnimationFrame(Game.prototype.render);
		}

		return Game;
	}());
	$("#zoomin").click(function () {
		game.setZoom(0.25);
	});
	$("#zoomout").click(function () {
		game.setZoom(-0.25);
	});
	
	$('#open_map').click( function () {

	});
	
	$("#fullscreen").click(function () {

	});
	$(window).keydown(function (e) {
		if (e.keyCode == 122) {
			app.fullscreen();
		}
	});
	var game = new dem.Game('game', 811, 750);
	game.render();
});
