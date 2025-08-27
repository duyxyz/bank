// 📌 Chỉ cần thêm tên file ảnh mới vào mảng này
const images = [
  "Agribank.jpg",
  "Vietcombank.jpg"
  // ví dụ thêm ảnh mới: "BIDV.jpg"
];

const container = document.getElementById("button-container");

// Tạo nút cho từng ảnh
images.forEach(img => {
  const btn = document.createElement("button");
  btn.className = "classic-btn";
  btn.textContent = img.replace(/\.[^/.]+$/, ""); // bỏ đuôi .jpg
  btn.onclick = () => openImage(img);
  container.appendChild(btn);
});

// Hàm mở ảnh
function openImage(src) {
  document.getElementById("overlay-img").src = src;
  document.getElementById("overlay").style.display = "flex";
}

// Hàm đóng overlay
function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
}
