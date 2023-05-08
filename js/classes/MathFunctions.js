//Här ligger alla matte grejer, frågor etc och sen om mattematiken blir rätt från user så initialiseras resten av spelet, osv.

//Vad är roten ur 64 t.ex -rot frågor-
let Rotrandomizer = Math.round(Math.random() * Math.PI * 10);
let matte1 = Math.sqrt(Rotrandomizer); //User ska försöka avrunda
let mathResult = matte1.toString();

//Addition lösningar
//-------------------------

//-------------------------

console.log(Rotrandomizer + " Rotfrågan, Random rotfrågor");
console.log(matte1 + " Roten ur RotFrågan");
console.log(mathResult + " Resultatet i stringformat");

function DoorMathOverlay() {
  // Step 1: Create a new canvas element for the popup
  const doorCanvas = document.createElement("canvas");
  doorCanvas.height = 250;
  doorCanvas.width = 300;
  //yes
  doorCanvas.style.position = "absolute";
  doorCanvas.style.top = "50%";
  doorCanvas.style.left = "50%";
  doorCanvas.style.transform = "translate(-50%, -50%)";
  doorCanvas.style.zIndex = "999";

  const myCanvas = doorCanvas.getContext("2d");
  myCanvas.fillStyle = "white";
  myCanvas.fillRect(0, 0, doorCanvas.width, doorCanvas.height);
  myCanvas.fillStyle = "black";
  myCanvas.font = "20px Arial";
  myCanvas.textBaseline = "top";
  myCanvas.fillText("Vad är roten ur: " + Rotrandomizer, 65, 10, 500);

  doorCanvas.addEventListener("click", handleClick);

  function handleClick(event) {}

  document.body.appendChild(doorCanvas);

  function goToDoor() {
    //Initalized if function is called
    gsap.to(overlay, {
      opacity: 1,

      onComplete: () => {
        level++;
        if (level === 4) level = 1;
        levels[level].init();
        player.switchSprite("idleRight");
        player.preventInput = false;
        gsap.to(overlay, {
          opacity: 0,
        });
      },
    });

    doorCanvas.style.display = "block";
  }
}
