const cursor = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h;
let dots = [];

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

for(let i = 0; i < 55; i++){
  dots.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35
  });
}

function animate(){
  ctx.clearRect(0, 0, w, h);

  dots.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if(p.x < 0 || p.x > w) p.vx *= -1;
    if(p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,225,255,.55)";
    ctx.fill();

    for(let j = i + 1; j < dots.length; j++){
      const q = dots[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if(d < 120){
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(0,225,255,${0.35 - d / 350})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}

animate();
const sidebar = document.getElementById("chatSidebar");
const btn = document.getElementById("collapseBtn");
const icon = document.getElementById("collapseIcon");

btn.addEventListener("click", () => {

    sidebar.classList.toggle("closed");

    if(sidebar.classList.contains("closed")){
        icon.className = "fa-solid fa-angles-right";
    } else {
        icon.className = "fa-solid fa-panel-left";
    }

});