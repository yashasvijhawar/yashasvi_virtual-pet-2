var dog,happydog;
var database;
var foodS;
var foodStock;

var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 800);

  dog = createSprite(250,250,20,20);
  dog.addImage("label",dogImg);
  dog.addImage("label1",happydogImg);
  dog.scale = 0.5;
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodObj = createSprite(80,100,20,20);

  feed  = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
 background(46, 139, 87);

// if(keyWentDown(UP_ARROW)){
   //WriteStock(foods);
   //dog.changeImage("label1",happydogImg);
 //}

 function feedTime(){
   fedTime = database.ref('FeedTime');
   fedTime.on("value",function(data){
     lastFed = data.val();
   });
 }

  drawSprites();
  foodObj.display()
  text("Remaining food : "+foodS,170,200)
  //add styles here

fill("black");
textSize(15)
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12," PM",350,30);
}
else if(lastFed==0){
  text("Last Feed : 12 AM",350,30)
}
else{
  text("Last Feed : "+ lastFed + "AM",350,30)
}
}
function readStock(data){
 foodS = data.val()
 foodObj.updateFoodStcok(foodS)
}

function WriteStock(x){
  if(x<=0){
     x=0;
     }

     else{ 
       x=x-1;
      }
   database.ref('/').update({ 
     food:x })
  
}

function addFoods(){
  foodS++
  database.ref('/').update({
     food:foodS
  })
}

function feedDog(){
  dog.addImage(happydog)

  foodObj.updateFoodStcok(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



