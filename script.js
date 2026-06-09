const glow = document.querySelector(".glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
let flakes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 90; i++) {
  flakes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    s: Math.random() * 1.5 + 0.5
  });
}

function snow() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";

  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();

    f.y += f.s;
    f.x += Math.sin(f.y * 0.01);

    if (f.y > h) {
      f.y = -10;
      f.x = Math.random() * w;
    }
  });

  requestAnimationFrame(snow);
}

snow();