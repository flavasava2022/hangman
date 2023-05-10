// html elements
const letters = "abcdefghijklmnopqrstuvwxyz";
const guessLetters = document.querySelector(".guess-letters");
const img = document.querySelector("img");
// create letters
const lettersArray = Array.from(letters);
const lettersContainer = document.querySelector(".letters");
// show letters
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.className = "letter";
  let theletter = document.createTextNode(letter);
  span.appendChild(theletter);
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
const keys = Object.keys(words);

let keynum = Math.floor(Math.random() * keys.length);
// the category
let category = keys[keynum];
let wordnum = Math.floor(Math.random() * words[keys[keynum]].length);
//  the word
let word = words[keys[keynum]][wordnum].toLowerCase();
// show categery
document.querySelector(".categery span").textContent = category;
// show the right guessed letters
let guessboxes = Array.from(word);
guessboxes.forEach((letter) => {
  let span = document.createElement("span");
  span.className = "guessed-letter";
  let theletter = document.createTextNode("");
  if (letter === " ") theletter = document.createTextNode("-");
  span.appendChild(theletter);
  guessLetters.appendChild(span);
});
const guessLettersboxes = document.querySelectorAll(".guess-letters span");
let attempts = 0;
let won = Array.from([{ length: word.length }, () => 0]);

lettersContainer.addEventListener("click", function (e) {
  if (e.target.className === "letter") {
    e.target.classList.add("clicked");
    if (!guessboxes.includes(e.target.textContent)) {
      attempts++;
      document.getElementById("fail").play();
      img.style.right = `${attempts * 75}px`;
    }
    guessboxes.forEach((letter, n) => {
      if (e.target.textContent === letter) {
        e.target.classList.add("right");
        document.getElementById("success").play();
        won[n] = letter;
        guessLettersboxes.forEach((box, index) => {
          if (index === n) {
            box.textContent = letter;
          }
        });
      }
    });
  }
  let nero = won.join("");
  if (nero === word) {
    lettersContainer.style.pointerEvents = "none";
    let messege = document.querySelector(".guess-letters");
    messege.textContent = `You Won The Word Is "${word}"`;
  }
  if (attempts === 6) {
    lettersContainer.style.pointerEvents = "none";
    let messege = document.querySelector(".guess-letters");
    messege.textContent = `You Lost The Word Is "${word}"`;
  }
});
