//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(800, 800);
document.body.appendChild(renderer.view);

//load an image and run the `setup` function when it's done
loader
  .add(["images/HRCArrow.png",
        "images/HRCFace.png"])
  .load(setup);

var time, face, arrows, faceSpeed;

function setup() {
  face  = new Sprite(resources["images/HRCFace.png"].texture);
  face.x = 250; face.y = 250;
  face.vx = 0; face.vy = 0;
  stage.addChild(face);

  arrows = [];
  time = 0;
  faceSpeed = 2;

   var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function() {

    //Change the face's velocity when the key is pressed
    face.vx = -5;
    face.vy = 0;
  };

  //Left 
  left.release = function() {
    if (!right.isDown && face.vy === 0) {
      face.vx = 0;
    }
  };

  //Up
  up.press = function() {
    face.vy = -5; face.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && face.vx === 0) {
      face.vy = 0;
    }
  };

  //Right
  right.press = function() {
    face.vx = 5; face.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && face.vy === 0) {
      face.vx = 0;
    }
  };

  //Down
  down.press = function() {
    face.vy = 5; face.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && face.vx === 0) {
      face.vy = 0;
    }
  };

  gameLoop();
}

var state = play;

function gameLoop() {
  
  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  state();

  //Render the stage to see the animation
  renderer.render(stage);
}

function play() {
    time += 1;
    face.x += face.vx * faceSpeed; 
    face.y += face.vy * faceSpeed;

    if (time % 60 == 0) {
        spawnArrows();
    }

    for (i = 0; i < arrows.length; i++) {
        arrows[i].rotation += arrows[i].rotationSpeed;
        arrows[i].vy -= .03;
        arrows[i].y -= arrows[i].vy;
    }

    detectCollisions();
}

function detectCollisions() {
  var collision = false;
  for (i = 0; i < arrows.length; i++) {
    if (isIntersecting(arrows[i], face)) {
      console.log("collision");
      collision = true;
    }
  }

  return collision;
}

function isIntersecting(r1, r2) {
  return !(r2.x > (r1.x + r1.width) ||
             (r2.x + r2.width) < r1.x ||
             r2.y > (r1.y + r1.height) ||
             (r2.y + r2.height) < r1.y);
}

function spawnArrows() {
  // TODO remove old arrows from the stage?

    var x = 50,
        y = 0;

  for (i = 0; i < randomInt(2,7); i++) {
      a = new Sprite(resources["images/HRCArrow.png"].texture);
      a.x = x; a.y = y; a.vx = 0; a.vy = 0;
      a.anchor.x = 0.5; a.anchor.y = 0.5;
      a.rotationSpeed = 1 / (5*randomInt(2,10));
      scale = 1 / randomInt(1,5);
      a.scale.x = scale; a.scale.y = scale;
      x += randomInt(100, 300);
      arrows.push(a);
  }

  for (i = 0; i < arrows.length; i++) {
      stage.addChild(arrows[i]); 
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
