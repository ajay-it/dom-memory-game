const memoryCardContainer = document.querySelector(".memory-card-container");
const statsContainer = document.querySelector(".stats-container");
const timer = document.getElementById("timer");
const moves = document.getElementById("moves");

let selectedImageId;
let matchFound = 0;
let totalMoves = 0;
let globalInterval;
let elapsedSeconds = 0;

const renderMemoryCards = () => {
  const imgIds = shuffleArray(imgageIds);
  imgIds.forEach((imgId) => {
    const memCard = document.createElement("div");
    memCard.classList.add("memory-card");
    const flipBox = document.createElement("div");
    flipBox.classList.add("flip-box");

    const imgOriginal = document.createElement("img");
    imgOriginal.classList.add("original-image");
    imgOriginal.src = `/images/${imgId.slice(0, imgId.length - 2)}.png`;
    imgOriginal.id = imgId;
    imgOriginal.alt = imgId.slice(0, imgId.length - 2);

    const imgFlipped = document.createElement("img");
    imgFlipped.classList.add("flipped-image");
    imgFlipped.src = "/images/question-mark.jpeg";
    imgFlipped.alt = "question-mark";
    flipBox.append(imgOriginal, imgFlipped);
    memCard.append(flipBox);
    memoryCardContainer.append(memCard);
  });
};

const handleTime = () => {
  if (globalInterval) return;
  globalInterval = globalInterval = setInterval(() => {
    elapsedSeconds++;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    timer.innerText = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }, 1000);
};

const handleMemoryCardClick = (event) => {
  const currentFlipBox = event.target.parentNode;

  if (event.target.classList[0] === "flipped-image") {
    handleTime();
    moves.innerText = ++totalMoves;
    const currentImageId = currentFlipBox.children[0].id;
    if (currentImageId === selectedImageId) {
      return;
    }
    currentFlipBox.style.transform = "rotateY(180deg)";

    if (selectedImageId) {
      const selectedFlipBox = document.querySelector(
        `#${selectedImageId}`
      ).parentNode;
      memoryCardContainer.style.pointerEvents = "none";

      if (
        selectedImageId.slice(0, selectedImageId.length - 2) ===
        currentImageId.slice(0, currentImageId.length - 2)
      ) {
        matchFound++;
        if (matchFound === 8 && globalInterval) {
          clearInterval(globalInterval);
          globalInterval = null;
        }

        setTimeout(() => {
          selectedFlipBox.style.backgroundColor = "green";
          currentFlipBox.style.backgroundColor = "green";
          selectedFlipBox.parentNode.style.opacity = "0.7";
          currentFlipBox.parentNode.style.opacity = "0.7";
          // selectedFlipBox.style.opacity = "0.8";
          // currentFlipBox.style.opacity = "0.8";
          selectedFlipBox.style.backgroundImage = `url("/images/${selectedImageId.slice(
            0,
            selectedImageId.length - 2
          )}.png")`;
          currentFlipBox.style.backgroundImage = `url("/images/${selectedImageId.slice(
            0,
            selectedImageId.length - 2
          )}.png")`;
          memoryCardContainer.style.pointerEvents = "auto";
          selectedImageId = null;
        }, 1000);
      } else {
        const selectedFlipBox = document.querySelector(
          `#${selectedImageId}`
        ).parentNode;

        setTimeout(() => {
          currentFlipBox.style.transform = "rotateY(0deg)";
          selectedFlipBox.style.transform = "rotateY(0deg)";
          memoryCardContainer.style.pointerEvents = "auto";
          selectedImageId = null;
        }, 1000);
      }
    } else {
      selectedImageId = currentFlipBox.children[0].id;
    }
  }
};

memoryCardContainer.addEventListener("click", handleMemoryCardClick);
document.addEventListener("DOMContentLoaded", renderMemoryCards);
