let books = JSON.parse(localStorage.getItem("books")) || [
  {
    id: 1,
    title: "Twisted Lies",
    author: "Ana Huang",
    notes: "Going into this book i had high expectations yet i personally felt it wasn't what i expected. For a morally grey man and Fml sunshine characters they were that. I did enjoy the book however i do feel certain chapter or experience's that the Fml went through was dramatized wayy too much taking up 3 to 4 whole chapters yet when the real scary traumatic "experience" occurred the author brushed past it in a few pages which felt so odd. Overall it was a good read just wish it had more depth. In terms of steaminess 👀👀i give it 🌶️🌶️",
    status: "Finished",
    rating: 3,
    cover: "twisted-lies.jpg"
  },
  {
    id: 2,
    title: "Beach Read",
    author: "Emily Henry",
    notes: " summer romance",
    status: "Reading",
    rating: 0,
    cover: "beach-read.jpg"
  },
  {
    id: 3,
    title: "King of Wrath",
    author: "Ana Huang",
    notes: "Ohh My Freaking Goodnesss. What an amazing read, especially after being let down with twisted lies this book was everything i could have imagined. Went into it with high expectations and i was absolutely not disappointed banter, The yearning. The protective Ml and stubborn yet strong Fml. They just fused so well together. I especially enjoyed it after finishing the twisted series. Going into the King of Sin series where its a lot More mature and older character's i definitely felt the maturity in this book especially which their relationships, friendships and family dynamics. I was so refreshing . i thoroughly enjoyed this book. In terms of steaminess 👀👀i give it 🌶️🌶️🌶️🌶️",
    status: "Finished",
    rating: 5,
    cover: "king-of-wrath.jpg"
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

