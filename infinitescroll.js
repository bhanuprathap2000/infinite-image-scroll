const count=10; //number of images per request
const imageContainer=document.getElementById('image-container'); 
const apiKey=API_KEY;
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let ready=false;
let imagesLoaded=0;
let totalImages=0;
//photos array which we will populate
let photosArray=[]


// check if all images are loaded

function imageLoaded(){
    console.log(imagesLoaded);
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        loader.hidden=true; //intially when loading
        ready=true;
       
    }

}

//in order to not to repeat setAtrributes we will use this helper function
function setAtrributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//creating the markup for showing using the photosArray
function displayPhotos(){
    totalImages=photosArray.length;
    imagesLoaded=0;
    

    //creating individual image elements from fetched data
    photosArray.forEach((photo)=>{

        const item=document.createElement('a'); //creating anchoe tag
        // item.setAttribute('href',photo.links.html); //setting attributes
        // item.setAttribute('target','-blank'); //setting attributes
        setAtrributes(item,{'href':photo.links.html})

        const img=document.createElement('img');//craeting image tag
        // img.setAttribute('src',photo.urls.regular);//setting attributes
        // img.setAttribute('alt',photo.alt_description);//setting attributes
        // img.setAttribute('title',photo.alt_description);//setting attributes
        setAtrributes(img,{'src':photo.urls.regular,'alt':photo.alt_description,'title':photo.alt_description});
        img.addEventListener('load',imageLoaded);
        item.appendChild(img);//making img as child of a tag
        imageContainer.appendChild(item);//making image container as parent of a tag



    })
}


//async function because we are making a network request
async function getPhotos(){
     
    try{

        const response = await fetch(apiUrl);//fetching the data from unsplashApi
        photosArray=await response.json();//converting the fetched data into object we need to use await because resposne is not yet fetched.
        displayPhotos();//This function is resposible for showing the images 

    }
    catch(err){
        console.log(err);

    }

}

window.addEventListener('scroll',()=>{

    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        getPhotos();
        ready=false;

    }
});

getPhotos()