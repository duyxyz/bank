const container = document.getElementById("button-container");

// Load image list from GitHub
async function loadImagesFromGitHub() {
  const apiUrl = "https://api.github.com/repos/duyxyz/bank/contents/images";

  try {
    const res = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contents = await res.json();

    container.innerHTML = "";

    contents.forEach(item => {
      if (item.type === "file" && /\.(jpe?g|png|gif)$/i.test(item.name)) {
        const btn = document.createElement("button");
        btn.className = "classic-btn";
        btn.textContent = item.name.replace(/\.[^/.]+$/, "");
        btn.onclick = () => openImage(item.download_url);
        container.appendChild(btn);
      }
    });

    if (!container.hasChildNodes()) {
      container.textContent = "Không tìm thấy ảnh trong thư mục images.";
    }
  } catch (err) {
    container.textContent = "Lỗi khi tải ảnh.";
    console.error(err);
  }
}

function openImage(src) {
  document.getElementById("overlay-img").src = src;
  document.getElementById("overlay").style.display = "flex";
}

function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
}

loadImagesFromGitHub();

// Canvas background (stars + meteors)
const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');
let stars = [], meteors = [];
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars(Math.min(300, Math.floor(canvas.width * canvas.height / 5000)));
}
window.addEventListener('resize', resizeCanvas);
function createStars(count){
  stars.length = 0;
  for(let i=0;i<count;i++){
    stars.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*1.5 + 0.2,
      a: Math.random()*0.9 + 0.1,
      vy: Math.random()*0.3 + 0.05
    });
  }
}
function spawnMeteor(){
  const side = Math.random() < 0.5 ? 'left' : 'right';
  const y = Math.random() * canvas.height * 0.5;
  const length = Math.random() * 80 + 50;
  const speed = Math.random() * 4 + 3;
  meteors.push({
    x: side === 'left' ? -length : canvas.width + length,
    y,
    len: length,
    speedX: side === 'left' ? speed : -speed,
    speedY: speed * 0.5,
    alpha: 1
  });
}
setInterval(spawnMeteor, 1500);
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const s of stars){
    s.y += s.vy;
    if(s.y - s.r > canvas.height){ s.y = -s.r; s.x = Math.random()*canvas.width; }
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  for(const m of meteors){
    m.x += m.speedX;
    m.y += m.speedY;
    m.alpha *= 0.97;
    ctx.strokeStyle = `rgba(255,200,100,${m.alpha})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.speedX * 5, m.y - m.speedY * 5);
    ctx.stroke();
  }
  meteors = meteors.filter(m => m.alpha > 0.05);
  requestAnimationFrame(draw);
}
resizeCanvas();
draw();

// Update date & time
function updateDateTime(){
  const now = new Date();
  const daysVN = ["Chủ nhật","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];
  document.getElementById("datetime").textContent =
    `${daysVN[now.getDay()]}, ${now.toLocaleDateString("vi-VN")} - ${now.toLocaleTimeString("vi-VN")}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();
