function formatTimeDifference(startTime, endTime) {
  const diff = Math.abs(startTime - endTime);

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(
    2,
    0
  )}:${String(seconds).padStart(2, 0)} hours`;
}

const shuffleArray = (array) => {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const imgageIds = [
  "bat-mario-1",
  "cart-mario-1",
  "dino-mario-1",
  "flying-turtle-1",
  "green-mario-1",
  "mush-1",
  "rhino-1",
  "turtle-1",
  "bat-mario-2",
  "cart-mario-2",
  "dino-mario-2",
  "flying-turtle-2",
  "green-mario-2",
  "mush-2",
  "rhino-2",
  "turtle-2",
];
