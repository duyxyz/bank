const container = document.getElementById("button-container");

async function loadImagesFromGitHub() {
  const apiUrl = "https://api.github.com/repos/duyxyz/bank/contents/images";

  try {
    const res = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contents = await res.json();

    container.innerHTML = ""; // xóa loading text

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
