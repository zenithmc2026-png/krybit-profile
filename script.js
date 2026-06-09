const cursor = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
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

for(let i = 0; i < 95; i++){
  dots.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.55,
    vy: (Math.random() - 0.5) * 0.55,
    size: Math.random() * 3 + 1
  });
}

function animate(){
  ctx.clearRect(0,0,w,h);

  dots.forEach((dot, i) => {
    dot.x += dot.vx;
    dot.y += dot.vy;

    if(dot.x < 0 || dot.x > w) dot.vx *= -1;
    if(dot.y < 0 || dot.y > h) dot.vy *= -1;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,234,255,.8)";
    ctx.fill();

    for(let j = i + 1; j < dots.length; j++){
      const dx = dot.x - dots[j].x;
      const dy = dot.y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if(dist < 125){
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(0,234,255,${1 - dist / 125})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}

animate();
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

bgMusic.volume = 0.6;

musicBtn.addEventListener("click", async () => {
  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      musicBtn.classList.add("playing");
      musicBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    } else {
      bgMusic.pause();
      musicBtn.classList.remove("playing");
      musicBtn.innerHTML = `<i class="fa-solid fa-music"></i>`;
    }
  } catch (e) {
    alert("Safari blocked audio. Check if freedom.mp3 exists in your project folder.");
    console.log(e);
  }
});