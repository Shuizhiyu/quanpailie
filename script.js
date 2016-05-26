var n;
function Getnnn()
{  
    var n=document.getElementById("nnn").value;
	for(var i=1;i<=n;i++)
	{
		var ID=new Array('b',i);
		ID=ID.join("");
        document.getElementById(ID).style.display="";
	}
}
var num=new Array;
var result=   new Array();
var used=   new Array();         //记录已经使用过的数
var sx=1;
var s=new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
function start1()
{
	for(var i=1;i<=5;i++){
		for(var j=0;j<121;j++)
		{
			s[i][j]=0;
		}
	}
}
function start2(){
	for(var i=1;i<=5;i++)
	{
		used[i]=0;             
	}
}
function rserve()
{
	n=document.getElementById("nnn").value;
	for(var i=1;i<=n;i++)
	{
		s[i][sx]=result[i];	   //=i,不是num[i]
	}
	sx++;
}
function proc(step)    
{
	n=document.getElementById("nnn").value;
	var i;
	if(step>n)     //完成了一次排列
		rserve();         //在一侧输出数字
	else
	{
		for(i=1;i<=n;i++)  
		{
			if(!used[i])  //没有使用过
			{
				used[i]=1; 
				result[step]=i; 
				proc(step+1); 
				used[i]=0;   
			}
		}
	}
}

function Root()
{
	n=document.getElementById("nnn").value;
	if(n>3)
	{
        var cans = document.getElementById("all").getContext('2d');
            cans.beginPath();
            cans.arc(500,25,20,0,Math.PI*2,false);
            cans.closePath();
            cans.lineWidth = 3;
            cans.strokeStyle = 'red';
            cans.stroke();
            cans.font = "17px Georgia";
            cans.fillText("#", 495, 25);
	}
	else if(n<4)
	{
        var cans = document.getElementById("all").getContext('2d');
            cans.beginPath();
            cans.arc(105,25,20,0,Math.PI*2,false);
            cans.closePath();
            cans.lineWidth = 3;
            cans.strokeStyle = 'red';
            cans.stroke();
            cans.font = "17px Georgia";
            cans.fillText("#", 100, 25);		
	}
}
var indexi=1;  //记录当前分支数 1——120
var indexj=1;             //12345
var p=0;           //标出 这是否是本支第一个节点
var Y= new Array();
var times=0;
function run()
{
	times++;
	if(indexi>=sx) return;
	if(indexi==1)
	{
		var cans = document.getElementById("all").getContext('2d');
            cans.beginPath();
            cans.arc(25,indexj*100,20,0,Math.PI*2,false);
			Y[indexj]=25;
            cans.closePath();
            cans.lineWidth = 3;
            cans.strokeStyle = 'red';
            cans.stroke();
            cans.font = "17px Georgia";
            cans.fillText(num[s[indexj][indexi]], 22,indexj*100);
			if(indexj==1)
			{
				if(n>3)cans.moveTo(500,45);
				else if(n<4) cans.moveTo(105,45);
				cans.lineTo(25,80);
				cans.stroke();
			}
			else
			{
				cans.moveTo(25,(indexj-1)*100+20);
				cans.lineTo(25,indexj*100-20);
				cans.stroke();
			}
	}
	else
	{
		if(indexj==1)
		{   p=1;
			while(s[indexj][indexi]==s[indexj][indexi-1]) {indexj++;p++;}
			if(p>1) {
				for(var l=indexj;l<=n;l++)
				{
					Y[l]=indexi*40-15;
				}
			}
		}
		    var cans = document.getElementById("all").getContext('2d');
            cans.beginPath();
            cans.arc(indexi*40-15,indexj*100,20,0,Math.PI*2,false);
            cans.closePath();
            cans.lineWidth = 3;
            cans.strokeStyle = 'red';
            cans.stroke();
            cans.font = "17px Georgia";
            cans.fillText(num[s[indexj][indexi]], indexi*40-12,indexj*100 );
			if(indexj==1)
			{
				if(n>3)cans.moveTo(500,45);
				else if(n<4) cans.moveTo(105,45);
				cans.lineTo(indexi*40-15,indexj*100-20);
				cans.stroke();
				p=0;
				for(var k=1;k<n;k++)
				{
					Y[k]=indexi*40-15;
				}
			}
			else if(p!=0)
			{
				cans.moveTo(Y[indexj-1],indexj*100-80);
				cans.lineTo(indexi*40-15,indexj*100-20);
				cans.stroke();
				p=0;
			}
			else if(p==0)
			{
				cans.moveTo(indexi*40-15,indexj*100-80);
				cans.lineTo(indexi*40-15,indexj*100-20);
				cans.stroke();
			}
	}//else
	indexj++;
	if(indexj>n) 

		{
		indexi++;
		indexj=1;
	}
}//run()
start1();
start2();
var v;                   //类似于调用函数的速度
function Getnumber()
{
	n=document.getElementById("nnn").value;
	for(var i=1;i<=n;i++)
	{
		var ID=new Array('b',i);
		ID=ID.join("");
        num[i]=document.getElementById(ID).value;
	}
	proc(1);
}
function Begin()
{
	var w;
	Root();
	v=700;
	w=setInterval(run,v);
	Pause=function(){
		clearInterval(w);
		Next=function(){                //下一步：执行一次run
			run();
		}
		Pre=function()                      //上一步：记录了运行run的次数为times,直接初始化后调用run函数times-1次
		{
			var cans = document.getElementById("all").getContext('2d');
			cans.clearRect(0,0,4800,600);
			Root();
			var k;
			k=times;
			start2();
			indexi=1;
			indexj=1;
			p=0;
			times=0;
			for(var j=1;j<k;j++)
			{
				run();
			}
		}
	}
	Incre=function()                    //加速，先停止，在以新速度调用
	{
		if(v<=100) return;             //700,500,300,100
		else{
			v-=200;
			clearInterval(w);
			w=setInterval(run,v);
		}
	}
	Decre=function()                      //减速，类似加速
	{
		if(v>=2000) return;                 //7，9，11，13,,,2000
		else{
			v+=200;
			clearInterval(w);
			w=setInterval(run,v);
		}
	}
	return;
}
function Pre(){                      //上一步：记录了运行run的次数为times,直接初始化后调用run函数times-1次
			var cans = document.getElementById("all").getContext('2d');
			cans.clearRect(0,0,4800,600);
			Root();
			var k;
			k=times;
			start2();
			indexi=1;
			indexj=1;
			p=0;
			times=0;
			for(var j=1;j<k;j++)
			{
				run();
			}
}
