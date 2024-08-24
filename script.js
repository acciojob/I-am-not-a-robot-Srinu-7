//your code here
const images = ['img1', 'img2', 'img3', 'img4', 'img5'];

let selectedImages = [];
let selectedIndices = [];

// Function to shuffle images
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to render images
function renderImages() {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = ''; // Clear any existing images

  // Randomly pick one image to repeat
  const repeatIndex = Math.floor(Math.random() * images.length);
  const repeatedImage = images[repeatIndex];
  const imagesToDisplay = [...images, repeatedImage];
  
  shuffle(imagesToDisplay); // Shuffle images

  imagesToDisplay.forEach((className, index) => {
    const img = document.createElement('img');
    img.className = className;
    img.addEventListener('click', () => handleImageClick(index, className));
    imageContainer.appendChild(img);
  });
}

// Function to handle image click
function handleImageClick(index, className) {
  if (selectedImages.length === 2) return;

  if (!selectedIndices.includes(index)) {
    selectedImages.push(className);
    selectedIndices.push(index);

    document.getElementsByClassName(className)[index].classList.add('selected');
  }

  if (selectedImages.length === 1) {
    document.getElementById('reset').style.display = 'block';
  }

  if (selectedImages.length === 2) {
    document.getElementById('verify').style.display = 'block';
  }
}

// Function to reset the game
function resetGame() {
  selectedImages = [];
  selectedIndices = [];
  document.getElementById('reset').style.display = 'none';
  document.getElementById('verify').style.display = 'none';
  document.getElementById('para').textContent = '';
  renderImages();
}

// Function to verify the selected images
function verifySelection() {
  document.getElementById('verify').style.display = 'none';
  const para = document.getElementById('para');
  if (selectedImages[0] === selectedImages[1]) {
    para.textContent = 'You are a human. Congratulations!';
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
}

// Initial rendering
renderImages();

document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('verify').addEventListener('click', verifySelection);
