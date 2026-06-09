const cursor = document.querySelector('.cursor-glow');
const navLinks = document.querySelectorAll('.nav-link');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const progress = document.querySelector('.progress');
const musicStatus = document.querySelector('.music-status');

window.addEventListener('mousemove', (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

playBtn.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      progress.classList.add('playing');
      musicStatus.textContent = 'playing';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      progress.classList.remove('playing');
      musicStatus.textContent = 'paused';
    }
  } catch (error) {
    musicStatus.textContent = 'tap again';
  }
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let width;
let height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const total = window.innerWidth < 850 ? 75 : 145;

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      alpha: Math.random() * 0.65 + 0.25
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,234,255,${particle.alpha})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00eaff';
    ctx.fill();
    ctx.shadowBlur = 0;

    for (let j = index + 1; j < particles.length; j++) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 115) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(0,234,255,${(1 - distance / 115) * 0.34})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawParticles();
