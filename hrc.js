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
        "images/HRCFace.png"
  ])
  .load(setup);

var time, face, arrows;

function setup() {
  face  = new Sprite(resources["images/HRCFace.png"].texture);
  face.x = 250; face.y = 250;
  face.vx = 0; face.vy = 0;
  stage.addChild(face);

  arrows = [];
  time = 0;

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
    face.x += face.vx; 
    face.y += face.vy;

    if (time % 60 == 0) {
        spawnArrows();
    }

    for (i = 0; i < arrows.length; i++){
        arrows[i].rotation += 0.1;
        arrows[i].vy -= .03;
        arrows[i].y -= arrows[i].vy;
    }
}

function spawnArrows() {
  // TODO remove old arrows from the stage?

    var x = 0,
        y = 0;

  for (i = 0; i < 5; i++) {
      a = new Sprite(resources["images/HRCArrow.png"].texture);
      a.x = x; a.y = y; a.vx = 0; a.vy = 0;
      a.anchor.x = 0.5; a.anchor.y = 0.5;
      a.scale.x = 0.5; a.scale.y = 0.5;
      x += 150;
      arrows.push(a);
  }

  for (i = 0; i < arrows.length; i++) {
      stage.addChild(arrows[i]); 
  }
}

