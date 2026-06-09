const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

const canvas=document.getElementById("stars");
const ctx=canvas.getContext("2d");

let w,h,stars=[];

function resize(){
  w=canvas.width=innerWidth;
  h=canvas.height=innerHeight;
}
resize();
addEventListener("resize",resize);

for(let i=0;i<180;i++){
  stars.push({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*2+1,
    s:Math.random()*1.5+.4
  });
}

function animate(){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="white";

  stars.forEach(star=>{
    ctx.beginPath();
    ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
    ctx.fill();

    star.x-=star.s;
    star.y+=star.s*.25;

    if(star.x<0){
      star.x=w;
      star.y=Math.random()*h;
    }
  });

  requestAnimationFrame(animate);
}
animate();

const music=document.getElementById("bgMusic");
const btn=document.getElementById("musicBtn");

btn.onclick=()=>{
  if(music.paused){
    music.play();
    btn.textContent="⏸ Pause Background Music";
  }else{
    music.pause();
    btn.textContent="▶ Play Background Music";
  }
};