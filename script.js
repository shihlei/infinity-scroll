const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImagesCouldShow = 0;
let photosArray = [];

//Unsplash API
let inputVal;
let apiURL;
const count = 15;
const apikey = 'INDhetlfdw3rFu--_HDyRDD3HK4Tj77lBjpYlvvBj38';
//const searchQuery = 'lake tahoe';

// Check if all images were loaded. Call every time when loaded a image
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImagesCouldShow) {
       ready = true;
       //loader only show once when the page first run
       loader.hidden = true;
     }
  }

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to DOM
function displayphotos(){
    imagesLoaded = 0;
    totalImagesCouldShow = photosArray.length;

    // Run function for each object in photosArray to create html format
    photosArray.forEach((photo) => {

        // Create <a> to link to full photo
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photo from Unsplash api
async function getPhotos(){
    try{
        loader.hidden=false;
        inputVal = document.getElementById("myInput").value;
        apiURL = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}&query=${inputVal}`;
        const response = await fetch(apiURL);
        photosArray = await response.json();

        displayphotos();
        
    }catch(error){
        //catch error
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
    }
  });

//on load
//getPhotos();
