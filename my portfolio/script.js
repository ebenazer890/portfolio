/* LOADER */
const loader = document.getElementById('loader');
const loaderNum = document.getElementById('loaderNum');
let n = 0;
const ti = setInterval(() => {
  n += Math.floor(Math.random() * 10) + 5;
  if (n >= 100) { n = 100; clearInterval(ti); }
  loaderNum.textContent = n;
}, 55);
setTimeout(() => {
  loader.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  loader.style.opacity = '0';
  loader.style.transform = 'translateY(-20px)';
  setTimeout(() => loader.style.display = 'none', 700);
  document.getElementById('nav').classList.add('visible');
  // trigger stat bars after load
  setTimeout(() => {
    document.querySelectorAll('.stat-bar-fill').forEach((f, i) => {
      setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 200 + i * 300);
    });
    ['s1','s2','s3'].forEach((id, i) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
      }, 400 + i * 300);
    });
  }, 500);
}, 1700);

/* CURSOR */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animC() {
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
  rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animC);
})();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '18px'; cursor.style.height = '18px'; cursor.style.background = 'var(--green3)'; }
    if (ring) { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = 'var(--green3)'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '10px'; cursor.style.height = '10px'; cursor.style.background = 'var(--green)'; }
    if (ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(10,54,34,0.35)'; }
  });
});

/* PARTICLES */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
const pts = Array.from({length: 50}, () => ({
  x: Math.random() * W, y: Math.random() * H,
  vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
  r: Math.random()*1.4+0.4, a: Math.random()*0.35+0.05
}));
(function draw() {
  ctx.clearRect(0,0,W,H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x<0) p.x=W; if (p.x>W) p.x=0;
    if (p.y<0) p.y=H; if (p.y>H) p.y=0;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(10,54,34,${p.a})`; ctx.fill();
  });
  pts.forEach((p,i) => pts.slice(i+1).forEach(q => {
    const d = Math.hypot(p.x-q.x, p.y-q.y);
    if (d<110) {
      ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
      ctx.strokeStyle = `rgba(10,54,34,${0.055*(1-d/110)})`; ctx.lineWidth=0.5; ctx.stroke();
    }
  }));
  requestAnimationFrame(draw);
})();

/* SCROLL REVEALS */
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('vis'), i * 85);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .section-tag').forEach(el => obs.observe(el));

/* SKILL BARS */
const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach((f, i) => {
        setTimeout(() => f.style.width = f.dataset.w + '%', i * 130);
      });
      skObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const sb = document.getElementById('skillBars');
if (sb) skObs.observe(sb);

/* PROCESS LIT */
const prObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.process-step').forEach((s, i) => {
        setTimeout(() => s.classList.add('lit'), i * 180);
      });
      prObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.process-steps').forEach(el => prObs.observe(el));
