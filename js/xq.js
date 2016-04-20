function wheel(event){
     var delta=0;
     if(!event){
       event=window.event;
     }
     if(event.wheelDelta){
       delta = event.wheelDelta/120; 
       if(window.opera){
         delta = -delta;//Opera浏览器方向相反
       }
     }else if (event.detail) {
       delta = -event.detail/3;//FireFox浏览器判断鼠标滚动方向的属性为event.detail，也相反
     }

     if(delta){
       mouseWheel(delta);
     }
}
function mouseWheel(delta){
    var dir=delta>0?"up":"down";
    var actived=$(".active");
    var activeIndex=parseInt(actived.attr("index"));
    var numOfChildren=$("#side_btn_ul").children().length;
    if(dir=="down"&&activeIndex<numOfChildren&&canRoll){//向下滚动
        jumpPage(false);
    }
    else if(dir=="up"&&activeIndex>1&&canRoll){//向上滚动
        jumpPage(true);
    }
         
}
//显示上一个||下一个div
function jumpPage(up) {
  var $actived = $(".active");
  var activeIndex = parseInt($actived.attr("index"));
  showPage(activeIndex + (up?-1:1));
} 
var curIndex=1;//当前显示的页面
var canRoll=true;
function showPage(index){
     if(curIndex==index){
          return;
     }
     if(!canRoll){
          return;
     }
     $("#s"+curIndex).removeClass("show").addClass("disappear");
     $("#s"+index).css("display","block").removeClass("disappear").addClass("show");
     setTimeout((function(i){
      return function(){
        $("#s"+i).css("display","none");
      };
     })(curIndex),1000);

     setTimeout(function(){
      canRoll = true;
     },1000);

     curIndex=index;
     $("#side_btn_ul li").removeClass("active");
     $("#l"+index).addClass("active");
}

function marry(){
	 window.removeEventListener("DOMMouseScroll",wheel,false);
   $("#side_btn_ul").fadeOut("normal",function(){
       $(this).remove();
   });
   $("#s7").removeClass("show").addClass("disappear");
   $("#s8").css("display","block").removeClass("disappear").addClass("show");
     setTimeout("timeCount()",1000);
     setTimeout((function(i){
      return function(){
        $(".sayPage").remove();
      };
     })(curIndex),1500);

}
var startDate=new Date("2015/01/13 00:00:00");
var time=0;
var year=2015;
var month=1;
var day=1;
var hour=1;
var minute=1;
var second=1;
function timeCount(){
  var curDate=new Date();
  var time=parseInt((curDate-startDate)/1000);

  year=parseInt(time/(3600*24*365));
  time=time%(3600*24*365);

  month=parseInt(time/(3600*24*30));
  time=time%(3600*24*30);

  day=parseInt(time/(3600*24));
  time=time%(3600*24);

  hour=parseInt(time/3600);
  time=time%3600;

  minute=parseInt(time/60);
  second=parseInt(time%60);

  $("#year").html(year);
  $("#month").html(month);
  $("#day").html(day);
  $("#hour").html(hour);
  $("#minute").html(minute);
  $("#second").html(second);
  setTimeout("timeCount()",1000);
}

var winHeight=0;
var winWidth=0;
var dots=[];
var radius=100;
var offset=55;
var dotCount=1000;
var colors=[51,133,255,244,45,188,247,102,89,184, 89, 247];
var statements=["相遇","相知","相爱","相守"];
var delay=50;
var gap=100;
var drawTag=0;
var st=0;//绘制文本的第几条
var preSt=0;
var stAlpha=0;//文本透明度
var animReadyStop=false;
var isAnimStop=false;
window.onload = function(){
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");    
context.font="30px Courier New";   
init();
initDots(radius,dotCount,offset);     
}
function init(){
    window.requestAnimationFrame=window.RequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame
        ||window.mozRequestAnimationFrame||window.oRequestAnimationFrame;
      if (window.innerWidth){
    winWidth = window.innerWidth;
    }
    else if ((document.body) && (document.body.clientWidth)){
    winWidth = document.body.clientWidth;
    }
    // 获取窗口高度
    if (window.innerHeight){
    winHeight = window.innerHeight;
    }
    else if ((document.body) && (document.body.clientHeight)){
    winHeight = document.body.clientHeight;
    }
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
    }
    canvas = document.getElementById("canvas");
    canvas.style.marginTop=(winHeight>canvas.height?winHeight-canvas.height:canvas.height-winHeight)/2+"px";
} 

function initDots(radius,count,offset){
  centerX=winWidth/2-canvas.offsetLeft;
  centerY=winHeight/2-canvas.offsetTop;
  angle=0;
  for(var i=0;i<count;i++){
    x=centerX+Math.cos(angle*Math.PI/180)*(Math.random()*offset+radius);
    y=centerY+Math.sin(angle*Math.PI/180)*(Math.random()*offset+radius);                           
    angle=angle%360;
    alpha=Math.random();
    _ownPath=Math.sqrt(Math.abs(centerX-x)*Math.abs(centerX-x)+Math.abs(centerY-y)*Math.abs(centerY-y));
    dots.push(new Dot(x,y,1,angle,alpha,_ownPath)); 
    angle++;             
 }
 animate();
}
function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);         
    drawText();         
    for(var i in dots){ 
         dots[i].paint();
         dots[i].changePosition();                     
    }
    if(!isAnimStop){//加载显示页面
      requestAnimationFrame(animate);
    }
    else{//显示正文
        $("#loading").remove();
        $("#container").css("display","block");
    }

}

function drawText(){
  if(animReadyStop){
     return;
  }
  drawTag++;
  if(drawTag>delay){//开始绘制文字
    st=Math.ceil((drawTag-delay)/gap)-1;
    if(((drawTag-delay)%gap)<=gap/2){//逐渐显示
       if(stAlpha<=1){
         stAlpha+=2/gap;
       }
       else{
         stAlpha=1;
       }
      
    }
    else{//逐渐隐藏
       if(stAlpha>=0){
         stAlpha-=2/gap;
       }
       else{
         stAlpha=0;
       }
    }

    if(st>=statements.length){
        animReadyStop=true;
        st=0; 
        drawTag=0;
        stAlpha=0;                 
    }
    context.save();
    context.fillStyle="rgba("+colors[st*3]+","+colors[st*3+1]+","+colors[st*3+2]+","+stAlpha+")";
    context.fillText(statements[st],centerX-context.measureText(statements[st]).width/2,centerY);
    context.restore();
}
}
/**
*originX:粒子最初横坐标
*originY:粒子最初纵坐标
*x:在圆环上面偏移的横坐标
*y:在圆环上面偏移的纵坐标
*r:粒子半径
*ownPath:radius+偏移
*/
function Dot(x,y,r,angle,alpha,ownPath){
  this.curX=centerX;
  this.curY=centerY;
  this.x=x;
  this.y=y;
  this.r=r;
  this.owAngle=angle;
  this.alpha=alpha;
  this.ownPath=ownPath;
  this.direction=1;
  this.colorType=1;
} 

Dot.prototype={
  paint:function(){
    if(animReadyStop&&this.alpha<=0){
       return;
    }
    context.save();
    context.beginPath();
    context.arc(this.curX,this.curY,this.r,0,Math.PI*2);
    context.closePath();
    context.fillStyle="rgba("+colors[st*3]+","+colors[st*3+1]+","+colors[st*3+2]+","+this.alpha+")";
    context.fill();
    context.restore();
  },
  changePosition:function(){
     this.owAngle+=0.2; 
     if(animReadyStop){
      st=statements.length-1;
      drawTag++; 
      if(dotCount*100>drawTag){
         this.alpha-=0.01;
      }
      else{
         isAnimStop=true;
      }
     }
     else{
       this.alpha=this.alpha<1?this.alpha+0.03:0.1;
     }
     if(this.direction==1){//向外
           if(this.ownPath<radius+offset){
            this.ownPath+=0.1;            
       }
       else{
        this.direction=-1;
        this.alpha=0.1;
       }
     }
     else{
        if(this.ownPath>radius){
            this.ownPath-=0.1;            
        }
        else{
           this.direction=1;
           this.alpha=0.1;
        }
     }
     this.curX=centerX+Math.cos(this.owAngle*Math.PI/180)*this.ownPath;
     this.curY=centerY+Math.sin(this.owAngle*Math.PI/180)*this.ownPath;
     this.owAngle=this.owAngle%360;   
  }
}