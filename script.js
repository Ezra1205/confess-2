const ADMIN_PASSWORD = "bayardulu"; // ganti password kamu

// SIMPAN CONFESS
function saveConfess() {
  const input = document.getElementById("confessInput");
  const text = input.value.trim();

  if (text === "") {
    showNotif("Confess tidak boleh kosong ❌", true);
    return;
  }

  let confesses = JSON.parse(localStorage.getItem("confesses")) || [];

  confesses.push({
    text: text,
    reactions: {
      love: 0,
      laugh: 0,
      sad: 0,
      wow: 0,
      like: 0
    }
  });

  localStorage.setItem("confesses", JSON.stringify(confesses));
  input.value = "";
  showNotif("Confess berhasil dikirim 💖");
}

// LOGIN ADMIN
function login() {
  const pass = document.getElementById("adminPass").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("adminPanel").style.display = "block";
    showConfesses();
  } else {
    alert("Password salah!");
  }
}

// TAMPILKAN CONFESS
function showConfesses() {
  const list = document.getElementById("confessList");
  list.innerHTML = "";

  let confesses = JSON.parse(localStorage.getItem("confesses")) || [];

  confesses.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${item.text}</div>
      <div class="reactions">
        <span class="reaction" onclick="react(${index}, 'love')">❤️ ${item.reactions.love}</span>
        <span class="reaction" onclick="react(${index}, 'laugh')">😂 ${item.reactions.laugh}</span>
        <span class="reaction" onclick="react(${index}, 'sad')">😢 ${item.reactions.sad}</span>
        <span class="reaction" onclick="react(${index}, 'wow')">😮 ${item.reactions.wow}</span>
        <span class="reaction" onclick="react(${index}, 'like')">👍 ${item.reactions.like}</span>
      </div>
    `;
    list.appendChild(li);
  });
}

// TAMBAH REACTION
function react(index, type) {
  let confesses = JSON.parse(localStorage.getItem("confesses"));
  confesses[index].reactions[type]++;
  localStorage.setItem("confesses", JSON.stringify(confesses));
  showConfesses();
}

// NOTIFIKASI
function showNotif(message, error = false) {
  const notif = document.getElementById("notif");
  notif.textContent = message;
  notif.style.background = error
    ? "linear-gradient(135deg, #ff416c, #ff4b2b)"
    : "linear-gradient(135deg, #43cea2, #185a9d)";
  notif.classList.add("show");
  setTimeout(() => notif.classList.remove("show"), 2500);
}
