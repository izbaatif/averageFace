var imgs = [];
var avgImg;
var numOfImages = 30;

//For storing the randomly selected face
var faceNum = 0;

var mapX;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once

  //Loads all the images into the array
  for(var i=0; i<numOfImages;i++)
  {
    var img = loadImage('assets/' + i + '.jpg')
    imgs.push(img)
  }

}

//////////////////////////////////////////////////////////
function setup() {

    //Sets canvas size as double of the image
    createCanvas(imgs[faceNum].width *2 , imgs[faceNum].height);
  
    pixelDensity(1);
    
    //Creates a graphic of the same sizes as image
    avgImg = createGraphics(imgs[faceNum].width, imgs[faceNum].height);
   
}

function keyPressed()
{
  //Gets a random whole number between 0 and 29 and assigns it to faceNum and calls loop
  faceNum = round(random(29));
  loop();
}

function mouseMoved()
{
  //Assigns the mapX to get an amount for lerp and calls loop
  mapX = map(mouseX , 0, imgs[faceNum].width , 0, 1);
  loop();
}

//////////////////////////////////////////////////////////
function draw() {

    background(125);

    //Draws the randomly selected image on the left
    image(imgs[faceNum],0,0)
    
    //Loads pixels of each image in array
    for(var i=0; i<imgs.length; i++)
    {
      imgs[i].loadPixels();
    }

    //Loads the pixels of graphic
    avgImg.loadPixels();
    
    //Loops over the randomly selected image on the left
    for(x=0; x<imgs[faceNum].width; x++)
    {
      for(y=0; y<imgs[faceNum].height; y++)
      {
        //Gets the index for each pixel
        var index = ((imgs[faceNum].width * y) + x) * 4;
        
        var sumR = 0;
        var sumG = 0;
        var sumB = 0;
        
        //Loops over the pixel at position index of all the images and adds the sum
        for(var j=0; j<imgs.length; j++)
        {
          sumR += imgs[j].pixels[index];
          sumG += imgs[j].pixels[index+1];
          sumB += imgs[j].pixels[index+2];
        }
        
        //Calculates the average for each channel
        var avgR = sumR/imgs.length;
        var avgG = sumG/imgs.length;
        var avgB = sumB/imgs.length;

        //Stores the pixel values of randomly selected face
        var faceNumR = imgs[faceNum].pixels[index];
        var faceNumG = imgs[faceNum].pixels[index + 1];
        var faceNumB = imgs[faceNum].pixels[index + 2];

        //lerps between the randomly selected face and the average pixels based on mouseX
        var lerpR = lerp(faceNumR , avgR, mapX);
        var lerpG = lerp(faceNumG , avgG, mapX);
        var lerpB = lerp(faceNumB , avgB, mapX);
        
        //Assigns value to the avgImage pixel at position inex
        avgImg.pixels[index] = lerpR;
        avgImg.pixels[index + 1] = lerpG;
        avgImg.pixels[index + 2] = lerpB;
        avgImg.pixels[index + 3] = 255;

      }
    }
    
    //Updates the pixels
    avgImg.updatePixels();
    
    //Draws the new image on right
    translate(imgs[faceNum].width , 0);
    image(avgImg, 0, 0);
    
    noLoop();
}
