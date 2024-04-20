const keyboardContainer = document.getElementById("keyboard");
const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "⬅"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "⤶"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  [" "],
];
const ALL_KEYS = KEYS.flat();

const input = document.getElementById("input");

function createKeys(keys = KEYS) {
  keys.forEach((keyList, keyListIndex) => {
    const id = keyListIndex + "-row";
    let container;
    const foundRow = document.getElementById(id);

    if (foundRow) {
      container = foundRow;
    } else {
      container = document.createElement("div");
      container.id = id;
      container.className = "key-row";
    }

    for (const key of keyList) {
      const keyButton = document.createElement("button");
      if (key === " ") {
        keyButton.classList.add("space-bar");
      }
      if (key === "⬅" || key === "⤶") {
        keyButton.classList.add("backspace");
      }
      keyButton.id = key;
      keyButton.innerText = key;
      keyButton.classList.add("key");

      if (key === "⬅") {
        keyButton.innerHTML =
          '<i class="fa-solid fa-delete-left backspace-button"></i>';
      }

      if (key === "⤶") {
        keyButton.type = "submit";
        keyButton.innerHTML =
          "<i class='fa-solid fa-arrow-turn-down enter-button'></i>";
      }

      if (key === " ") {
        const spaceSound = new Audio("spacebar.mp3");

        keyButton.onclick = (e) => {
          e.preventDefault();
          keyButton.classList.add("click");
          input.value += key;
          spaceSound.play();
          spaceSound.addEventListener("ended", () =>
            keyButton.classList.remove("click")
          );
        };
      } else {
        const keySound = new Audio("key.mp3");

        keyButton.onclick = (e) => {
          e.stopPropagation();
          keyButton.classList.add("click");

          if (key !== "⤶") {
            e.preventDefault();
            if (key === "⬅") {
              input.value = removeValue(input);
            } else {
              input.value += key;
            }
          }

          keySound.play();
          keySound.addEventListener("ended", () =>
            keyButton.classList.remove("click")
          );
        };
      }

      container.append(keyButton);
    }

    keyboardContainer.append(container);
  });
}

if (window.screen.width > 765) {
  createKeys();
} else {
  const copyKeys = [...KEYS];
  const mobileKeys = [
    // remove enter key
    copyKeys[0].slice(0, copyKeys[0].length - 1),
    // remove backspace key
    copyKeys[1].slice(0, copyKeys[1].length - 1),

    ["⤶", ...copyKeys[2], "⬅"],
    copyKeys[3],
  ];

  createKeys(mobileKeys);
}

let disableKeypress = false;

function isOtherKey(e) {
  return e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}

addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    const keyButton = document.getElementById("⬅");
    keyButton.classList.add("click");
    keyButton.click();
  }

  if (isOtherKey(e)) {
    disableKeypress = true;
  }
});

addEventListener("keypress", (e) => {
  e.preventDefault();

  if (disableKeypress) {
    return;
  }

  const key = e.key.toUpperCase();
  if (ALL_KEYS.includes(key)) {
    const keyButton = document.getElementById(key);
    keyButton.classList.add("click");
    return keyButton.click();
  }

  if (e.key === "Enter") {
    const keyButton = document.getElementById("⤶");
    keyButton.classList.add("click");
    return keyButton.click();
  }
});

addEventListener("keyup", (e) => {
  e.preventDefault();

  if (isOtherKey(e)) {
    disableKeypress = false;
    return;
  }

  const key = e.key.toUpperCase();

  if (ALL_KEYS.includes(key)) {
    const keyButton = document.getElementById(key);
    keyButton.classList.remove("click");
  }
});

function removeValue(input) {
  const lastKeyIndex = input.value.length - 1;
  return input.value.slice(0, lastKeyIndex);
}

const hint = document.getElementById("hint");

function onFormSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const search = data.get("search")?.trim();
  if (search) {
    const foundResponse = responses[search];
    if (foundResponse) {
      hint.innerText = foundResponse;
    }
    const foundRedirect = pages[search];
    if (foundRedirect) {
      window.location.href = foundRedirect;
    }
  }
}

const form = document.getElementById("form");
form.onsubmit = onFormSubmit;

const responses = {
  YES: "Yup, in an alternate universe.",
  NO: "Nope, not even in my wildest dreams.",
  MAYBE: "Maybe... if pigs start flying.",
  WHY: "Why not? Oh yeah, because it's a terrible idea.",
  WOW: "Wow, that's impressively bad.",
  FINE: "Fine, if mediocrity is what we're aiming for.",
  HAHA: "Haha, very funny. Now let's get serious.",
  SURE: "Sure, if you want chaos to reign.",
  OK: "Ok, but only if we're playing a game of 'Let's Make Terrible Decisions.'",
  WELL: "Well, that's an idea, but let's not.",
  STOP: "Stop right there, we're not doing that.",
  HUH: "Huh, interesting. But still no.",
  UGH: "Ugh, do I really have to say no?",
  YAY: "Yay... not.",
  MEH: "Meh, that's a hard pass.",
  OOPS: "Oops, did you actually think I'd say yes?",
  SIGH: "Sigh... no.",
  YAY: "Yay, if you enjoy disappointment.",
  EWW: "Eww, that's a hard no.",
  OUCH: "Ouch, that's gonna be a no from me.",
  OOPS: "Oops, no thanks.",
  DOH: "D'oh, not happening.",
  UH: "Uh, no way.",
  AWKWARD: "Awkward... nope.",
  REALLY: "Really? Absolutely not.",
  LATER: "Later, when hell freezes over.",
  ASAP: "As soon as pigs start flying.",
  NAH: "Nah, not even close.",
  ALRIGHT: "Alright, but only if sanity takes a vacation.",
  CAM: "That's me",
  CAN: "That's not me and never will be.",
  CAMERON: "I see we're professional.",
  "CAMERON PAVAO": "What are you, the government?",
  "CAMERON VICTOR PAVAO": "Hi mom!",
  ANDRA: "Hello my sweet!",
  POOP: "Ok now we're talking",
  SHIT: "You think I would stoop so low as to accept this?",
  BUTT: "A classic",
  ":)": "😃",
  ":(": "😟",
  YOU: "Me?",
  "YES YOU": "I don't know, I mean we only just met...",
  "DO YOU HAVE GAMES ON YOUR PHONE": "Begone child",
  HELP: "Let me guess, trapped in the computer?",
  PORN: "Not here I'm afraid... unless? 😳",
  HI: "Hello",
  "HOW ARE YOU":
    "I'm maybe the best I've ever been physically, which isn't saying much. How are you?",
  FINE: "Then why did you say it like that.",
  THANKS: "No problem",
  "I LOVE YOU": "I love you too",
  ZOOTIE: "Welcome Princess",
  BYE: "See ya! Come back soon",
  GOODBYE: "See ya! Come back soon",
  TTYL: "See ya! Hit me back on AIM",
  ROFL: "I like that you like to have a good time",
  LOL: "Lmao",
  LMAO: "Lol",
};

const pages = {
  PROJECTS: "projects.html",
  FAILURES: "projects.html",
  SUCCESSES: "projects.html",
  ABOUT: "about.html",
  CAREER: "about.html",
  "WHO IS THIS GUY": "about.html",
  "WHAT IS THIS": "about.html",
  "NUMBER ONE HATER": "about.html",
  WHAT: "about.html",
  // Hidden
  WTF: "about.html",
};

const ALL_PAGES = Object.keys(pages);
const randomIndex = Math.floor(Math.random() * (ALL_PAGES.length - 1));
const randomPage = ALL_PAGES[randomIndex];
input.placeholder = randomPage;

input.classList.toggle("cursor-blink");
