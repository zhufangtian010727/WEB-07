
			var box = document.getElementById('box');
			var oNavlist = document.getElementById('nav').children;
			var slider = document.getElementById('slider');
			var left = document.getElementById('left');
			var right = document.getElementById('right');
			var note = document.getElementsByClassName('note')[0];
			var index = 1;
			var timer;
			var isMoving = false;
			function getStyle(obj,attr) {    
				if(obj.currentStyle)   
				{     
					return obj.currentStyle[attr];    
				}         
				else          
				{     
					return getComputedStyle(obj,null)[attr];    
				}   
			} 
			function note_1(){
				var timer = setInterval(function(){
					var now = parseInt(getStyle(note,'right'));
					if(now == 1000){
						note.style.right = '-410px';	
					}else{
						note.style.right = now + 10 + 'px';
					}
				},100);
			}
			note_1();
			function animate(obj,json,callback) {
			    clearInterval(obj.timer);
			    obj.timer = setInterval(function(){
			        var isStop = true;
			        for(var attr in json){
			            var now = 0;
			            if(attr == 'opacity'){
			                now = parseInt(getStyle(obj,attr)*100);
			            }else{
			                now = parseInt(getStyle(obj,attr));
			            }
			            var speed = (json[attr] - now)/6;
			            speed = speed>0?Math.ceil(speed):Math.floor(speed);
			            var current = now + speed;
			            if(attr == 'opacity'){
			                obj.style.opacity = current/100;
			            }else{
			                obj.style[attr] = current + "px";
			            }
			            if(json[attr] !== current){
			                isStop = false;
			            }
			        }
			        if(isStop){
			            clearInterval(obj.timer);
			            callback&&callback();
			        }
			    },30)
			}
			function next(){
				if(isMoving){
					return;
				}
				isMoving = true;
				index++;
				navChange();
				animate(slider,{left:-1200*index},function(){
					if(index > 5){
						slider.style.left  = "-1200px";
						index = 1;
					}
					isMoving = false;
				});
			}
			function prev(){
				if(isMoving){
					return;
				}
				isMoving = true;
				index--;
				navChange();
				animate(slider,{left:-1200*index},function(){
					if(index === 0){
						slider.style.left = -1200*5+"px";
						index = 5;
					}
					isMoving = false;
				});
			}
			var timer = setInterval(next,3000);
			box.onmouseover = function(){
				animate(left,{opacity:50});
				animate(right,{opacity:50});
				clearInterval(timer);
			}
			box.onmouseout = function(){
				animate(left,{opacity:0});
				animate(right,{opacity:0});
				timer = setInterval(next,3000);
			}
			right.onclick = next;
			left.onclick = prev;
			for(var i = 0;i < oNavlist.length;i++){
				oNavlist[i].idx = i;
				oNavlist[i].onclick = function(){
					index = this.idx + 1;
					navChange();
					animate(slider,{left:-1200*index});
				}
			}
			function navChange(){
				for(var i = 0;i < oNavlist.length;i++){
					oNavlist[i].className = '';
				}
				if(index > 5){
					oNavlist[0].className = 'active';
				}else if(index === 0){
					oNavlist[4].className = 'active';
				}else{
					oNavlist[index-1].className = 'active';
				}
			}
		
