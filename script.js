let books = JSON.parse(localStorage.getItem("books")) || [];

/* TAB SWITCHING */
function showTab(event, tab) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  document.getElementById(tab).classList.add("active");

  document.querySelectorAll(".tabs button").forEach(b => {
    b.classList.remove("active");
  });

  event.target.classList.add("active");
}

/* SAVE */
function save() {
  localStorage.setItem("books", JSON.stringify(books));
  render();
  stats();
}

/* ADD BOOK */
function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const status = document.getElementById("status").value; // TBR / Reading / Finished
  const rating = Number(document.getElementById("rating").value);
  const cover = document.getElementById("cover").value.trim();

  if (!title || !author) {
    alert("Fill in title and author!");
    return;
  }

  books.push({
    id: Date.now(),
    title,
    author,
    notes,
    status,
    rating,
    cover,
    date: Date.now()
  });

  save();

  // reset form
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("notes").value = "";
  document.getElementById("cover").value = "";
  document.getElementById("rating").value = "0";
  document.getElementById("status").value = "TBR";
}

/* DELETE */
function del(id) {
  books = books.filter(b => b.id !== id);
  save();
}

/* MOVE BOOK */
function move(id, status) {
  books = books.map(b =>
    b.id === id ? { ...b, status } : b
  );
  save();
}

/* RENDER BOOKS */
function render() {
  const tbr = document.getElementById("tbrList");
  const reading = document.getElementById("readingList");
  const finished = document.getElementById("finishedList");

  tbr.innerHTML = "";
  reading.innerHTML = "";
  finished.innerHTML = "";

  books.forEach(b => {
    const el = document.createElement("div");
    el.className = "book";

    el.innerHTML = `
      ${b.cover ? `<img src="${b.cover}" alt="${b.title}">` : ""}
      <div>
        <h3>${b.title}</h3>
        <p>${b.author}</p>
        ${b.notes ? `<p>${b.notes}</p>` : ""}
        ${b.status === "Finished" ? `<p class="rating">⭐ ${"★".repeat(b.rating)}</p>` : ""}
        <button onclick="move(${b.id}, 'TBR')">TBR</button>
        <button onclick="move(${b.id}, 'Reading')">Reading</button>
        <button onclick="move(${b.id}, 'Finished')">Finished</button>
        <button onclick="del(${b.id})">Delete</button>
      </div>
    `;

    if (b.status === "TBR") tbr.appendChild(el);
    if (b.status === "Reading") reading.appendChild(el);
    if (b.status === "Finished") finished.appendChild(el);
  });
}

/* STATS */
function stats() {
  const box = document.getElementById("statsBox");
  const done = books.filter(b => b.status === "Finished");

  const months = {};

  done.forEach(b => {
    const m = new Date(b.date).toLocaleString("default", { month: "long" });
    months[m] = (months[m] || 0) + 1;
  });

  box.innerHTML = "";

  for (let m in months) {
    const div = document.createElement("div");
    div.textContent = `${m}: ${months[m]} books`;
    box.appendChild(div);
  }
}

/* INIT */
render();
stats();
