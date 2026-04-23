let books = JSON.parse(localStorage.getItem("books")) || [];

const backgrounds = {
  add: "url('images/add.jpg')",
  tbr: "url('images/tbr.jpg')",
  reading: "url('images/reading.jpg')",
  finished: "url('images/finished.jpg')",
  stats: "url('images/stats.jpg')"
};

function showTab(event, tab) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
    p.style.backgroundImage = "none";
  });

  const page = document.getElementById(tab);
  page.classList.add("active");
  page.style.backgroundImage = backgrounds[tab];

  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

function save() {
  localStorage.setItem("books", JSON.stringify(books));
  render();
  stats();
}

/* ✅ UPDATED FUNCTION */
function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const notes = document.getElementById("notes").value;
  const status = document.getElementById("status").value;
  const rating = +document.getElementById("rating").value;

  const coverInput = document.getElementById("cover").value;
  const cover = coverInput 
      ? "images/" + coverInput.trim().replaceAll(" ", "%20") 
     : "";

  if (!title || !author) return alert("Fill everything!");

  books.push({
    id: Date.now(),
    title,
    author,
    notes,
    status,
    rating,
    cover
  });

  save();
}

function del(id) {
  books = books.filter(b => b.id !== id);
  save();
}

function move(id, status) {
  books = books.map(b => b.id === id ? {...b, status} : b);
  save();
}

function render() {
  const tbr = document.getElementById("tbrList");
  const reading = document.getElementById("readingList");
  const finished = document.getElementById("finishedList");

  tbr.innerHTML = reading.innerHTML = finished.innerHTML = "";

  books.forEach(b => {
    const el = document.createElement("div");
    el.className = "book";

    el.innerHTML = `
      ${b.cover ? `<img src="${b.cover}">` : ""}
      <div>
        <h3>${b.title}</h3>
        <p>${b.author}</p>
        ${b.notes ? `<p>${b.notes}</p>` : ""}
        ${b.status === "Finished" ? `<p class="rating">${"★".repeat(b.rating)}</p>` : ""}
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

function stats() {
  const box = document.getElementById("statsBox");
  const done = books.filter(b => b.status === "Finished");

  const months = {};
  done.forEach(b => {
    const m = new Date(b.id).toLocaleString("default", {month:"long"});
    months[m] = (months[m] || 0) + 1;
  });

  box.innerHTML = "";
  for (let m in months) {
    const div = document.createElement("div");
    div.textContent = `${m}: ${months[m]} books`;
    box.appendChild(div);
  }
}

render();
stats();