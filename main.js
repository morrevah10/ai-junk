let imgElement = document.createElement('img');
    imgElement.style.display = 'none';
    document.body.appendChild(imgElement);

    let gallery = document.querySelector('.gallery');
    let fileInput = document.getElementById('fileInput');
    let canvasOutput = document.getElementById('canvasOutput');
    let uploadButton = document.getElementById('uploadButton');
    let rotateRightButton = document.getElementById('rotateRightButton');
    let rotateLeftButton = document.getElementById('rotateLeftButton');
    let angleInput = document.getElementById('angleInput');
    let selectedImage = null;

    function displayImage(imageUrl) {
      let newImage = document.createElement('img');
      newImage.src = imageUrl;
      newImage.style.width = '100px';
      newImage.style.margin = '5px';
      gallery.appendChild(newImage);
      newImage.addEventListener('click', () => {
        selectedImage = newImage;
        rotateRightButton.disabled = false;
        rotateLeftButton.disabled = false;
      });
    }

    fileInput.addEventListener('change', (e) => {
      for (let file of e.target.files) {
        let imageUrl = URL.createObjectURL(file);
        displayImage(imageUrl);
      }
    }, false);

    imgElement.onload = function () {
      let mat = cv.imread(imgElement);
      cv.imshow(canvasOutput, mat);
      mat.delete();
    };

    uploadButton.addEventListener('click', () => {
      fileInput.click();
    });

    rotateRightButton.addEventListener('click', () => {
      let angle = parseFloat(angleInput.value);
      if (selectedImage) {
        selectedImage.style.transform = `rotate(${angle}deg)`;
      }
    });

    rotateLeftButton.addEventListener('click', () => {
      let angle = parseFloat(angleInput.value);
      if (selectedImage) {
        selectedImage.style.transform = `rotate(-${angle}deg)`;
      }
    });

    var Module = {
      onRuntimeInitialized() {
        document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
      }
    };