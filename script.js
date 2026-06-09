const cursor = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h;
let dots = [];
let fireflies = [];

function resize(){
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}

resize();
addEventListener("resize", resize);

for(let i = 0; i < 120; i++){
  dots.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.6,
    vx: (Math.random() - 0.5) * 0.65,
    vy: (Math.random() - 0.5) * 0.65
  });
}

for(let i = 0; i < 35; i++){
  fireflies.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    a: Math.random(),
    s: Math.random() * 0.03 + 0.01
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
    ctx.fillStyle = "rgba(0,225,255,.75)";
    ctx.fill();

    for(let j = i + 1; j < dots.length; j++){
      const q = dots[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if(d < 110){
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(0,225,255,${(1 - d / 110) * 0.55})`;
        ctx.lineWidth = 0.35;
        ctx.stroke();
      }
    }
  });

  fireflies.forEach(f => {
    f.a += f.s;
    const glow = Math.abs(Math.sin(f.a));

    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r + glow * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,225,255,${0.15 + glow * 0.5})`;
    ctx.fill();

    f.y -= 0.12;
    f.x += Math.sin(f.a) * 0.25;

    if(f.y < -20){
      f.y = h + 20;
      f.x = Math.random() * w;
    }
  });

  requestAnimationFrame(animate);
}

animate();

const audio = document.getElementById("audio");
const btn = document.getElementById("playBtn");

btn.addEventListener("click", () => {
  if(audio.paused){
    audio.play();
    btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    audio.pause();
    btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
});
