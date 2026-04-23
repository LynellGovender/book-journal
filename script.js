let books = JSON.parse(localStorage.getItem("books")) || [
  {
    id: 1,
    title: "Twisted Lies",
    author: "Ana Huang",
    notes: "Going into this book i had high expectations yet i personally felt it wasn't what i expected. For a morally grey man and Fml sunshine characters they were that. I did enjoy the book however i do feel certain chapter or experience's that the Fml went through was dramatized wayy too much taking up 3 to 4 whole chapters yet when the real scary traumatic "experience" occurred the author brushed past it in a few pages which felt so odd.
      Overall it was a good read just wish it had more depth. In terms of steaminess 👀👀i give it 🌶️🌶️",
    status: "Finished",
    rating: 4,
    cover: "twisted-lies.jpg"
  },
  {
    id: 2,
    title: "Twisted Hate",
    author: "Ana Huang",
    notes: "Absolutely amazing😍😍 honestly could not have had a better Enemies to LOVERS book. the witty banter, inside jokes and overall sassiness. What more could you ask for . In terms of steaminess 👀👀i give it 🌶️🌶️🌶️🌶️",
    status: "finished",
    rating: 5,
    cover: "twisted-hate.jpg"
  },
  {
    id: 3,
    title: "King of Wrath",
    author: "Ana Huang",
    notes: "Ohh My Freaking Goodnesss. What an amazing read, especially after being let down with twisted lies this book was everything i could have imagined. Went into it with high expectations and i was absolutely not disappointed banter, The yearning. 
      The protective Ml and stubborn yet strong Fml. They just fused so well together. I especially enjoyed it after finishing the twisted series. Going into the King of Sin series where its a lot More mature and older character's i definitely felt the maturity in this book especially which their relationships, friendships and family dynamics. I was so refreshing . i thoroughly enjoyed this book. In terms of steaminess 👀👀i give it 🌶️🌶️🌶️🌶️",
    status: "finished",
    rating: 5,
    cover: "king-of-wrath.jpg"
  }
  {
    id: 4,
    title: "King of Pride",
    author: "Ana Huang",
    notes: "This book featured a forbidden love/romance trope. Two characters from different sides of the world(spoiler they might be more similar than they lead on).Polar opposites. Extrovert gf + Introvert bf. It was a new perspective and showed how sometimes what we feel we don't need is exactly what we need. Over all i enjoyed this book it was sweet, sassy, so amazing funny as well. 
      It was such a fun read i finished it in 5 days. In terms of steaminess 👀👀i give it 🌶️🌶️🌶️",
    status: "finished",
    rating: 5,
    cover: "king-of-pride.jpg"
  }
  {
    id: 3,
    title: "King of Greed",
    author: "Ana Huang",
    notes: "Honestly when i read the trope for this book Marriage trouble/ neglect and negligence. I automatically wasn't a fan and i assumed i wouldn't like it ,but.... I was soooo WRONG. i FREAKINGING loved this book. It honestly had everything. Emotionally mature characters whom deeply loved and stood by each other through good and bad. He worked on his empire always wanting more and more not realizing that all the time he neglected his wife whom he loved more than life itself always thinking he had all the time in the world to make it up to her until one day she decides to leave. The yearning, the groveling, banter and the way they both love and describe each other .It was so beautiful i couldn't get enough of it . You could understand what they both felt and their points of views. The fact they they never once lost love for each other. 
      I just loved this book so much. In terms of steaminess 👀👀i give it 🌶️🌶️🌶️",
    status: "finished",
    rating: 5,
    cover: "king-of-greed.jpg"
  }
  {
    id: 3,
    title: "King of Sloth",
    author: "Ana Huang",
    notes: "",
    status: "tbr",
    rating: 0,
    cover: "king-of-sloth.jpg"
  }
  {
    id: 3,
    title: "King of Envy",
    author: "Ana Huang",
    notes: "",
    status: "tbr",
    rating: 0,
    cover: "king-of-envy.jpg"
  }
  {
    id: 3,
    title: "King of Gluttony",
    author: "Ana Huang",
    notes: "",
    status: "tbr",
    rating: 0,
    cover: "king-of-gluttony.jpg"
  }
  {
    id: 3,
    title: "Beach Read",
    author: "Ana Huang",
    notes: "",
    status: "reading",
    rating: 0,
    cover: "beach-read.jpg"
  }
  {
    id: 3,
    title: "I Could Give You The Moon",
    author: "Ana Huang",
    notes: "",
    status: "tbr",
    rating: 0,
    cover: "i-could-give-you-the-moon.jpg"
  }
  {
    id: 3,
    title: "Whispers of the deep",
    author: "Ana Huang",
    notes: "",
    status: "tbr",
    rating: 0,
    cover: "whispers-of-the-deep.jpg"
  }
];

const backgrounds = {
  add: "url('add.jpg')",
  tbr: "url('tbr.jpg')",
  reading: "url('reading.jpg')",
  finished: "url('finished.jpg')",
  stats: "url('stats.jpg')"
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

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const status = document.getElementById("status").value;
  const rating = +document.getElementById("rating").value;
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
    cover
  });

  save();

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("notes").value = "";
  document.getElementById("cover").value = "";
  document.getElementById("rating").value = "0";
  document.getElementById("status").value = "TBR";
}

function del(id) {
  books = books.filter(b => b.id !== id);
  save();
}

function move(id, status) {
  books = books.map(b =>
    b.id === id ? { ...b, status } : b
  );
  save();
}

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

function stats() {
  const box = document.getElementById("statsBox");
  const done = books.filter(b => b.status === "Finished");

  const months = {};

  done.forEach(b => {
    const m = new Date(b.id).toLocaleString("default", { month: "long" });
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
