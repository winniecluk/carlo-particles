// var Bubble = function(positionObj, angle, speed, life, color){
//   this.position = {
//     x: positionObj.x,
//     y: positionObj.y
//   }

//   let angleInRad = angle * Math.PI / 180;
//   this.velocity = {
//     x: speed * Math.cos(angleInRad),
//     y: speed * Math.sin(angleInRad)
//   }

//   this.color = color;
// }

// Bubble.prototype.update = function(delta){
//   this.life -= delta;

//   if (this.life > 0){
//     this.position.x += this.velocity.x * dt;
//     this.position.y += this.velocity.y * dt;
//   }
// }

// var particlesArr = [];
// var lastTimestamp;

window.onload = function(){

  var canvas = new fabric.Canvas('canvas');
  canvas.setDimensions({width: 1000, height: 1000})
  var bubblesArr = [];

  function Bubble(radiusNum, colorStr, leftNum, topNum){
    this.radiusNum = radiusNum;
    this.colorStr = colorStr;
    this.leftNum = leftNum;
    this.topNum = topNum;
  }

  function randomNumber(startNum, endNum){
    return Math.floor(Math.random() * endNum) + startNum;
  }

  function randomColor (){
    var colors = ['#0C48FB', '#275DFF', '#507CFF', '#7799FF', '#A3BAFE'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // to control the paths of each circle that you make, create an array
  // of objects that contain the num key/value pairs

  function createCircles(num, arr, obj){
    let circlePromise = new Promise(function(resolve, reject){
      for (var i = 0; i < num; i++){
        arr.push(
          new obj(
            randomNumber(10, 20),
            randomColor(),
            0,
            0
          )
        );
      } // closes for loop in circlePromise
      resolve(arr);
    });


    circlePromise.then(
      function(arr){
        let circleArr = [];
        arr.forEach(function(el){
          var circle = new fabric.Circle({
            radius: el.radiusNum,
            fill: el.colorStr,
            left: el.leftNum,
            top: el.topNum
          })
          circleArr.push(circle);
        })
        return circleArr;
      }
    ).then(
      function(circleArr){
        circleArr.forEach(function(el){
          canvas.add(el);
          var duration = 1000 * randomNumber(1, 5);
          el.animate('left',
            randomNumber(100, 400),
            {
              onChange: canvas.renderAll.bind(canvas),
              duration: duration
            });
          el.animate('top',
            randomNumber(100, 400),
            {
              onChange: canvas.renderAll.bind(canvas),
              duration: duration
            });
        }); // finishes circleArr forEach
        console.log(circleArr);
      }
    ) // closes then
  }

  createCircles(30, bubblesArr, Bubble);

}
