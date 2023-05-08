var runAudio1 = new Audio("./Sound/Running.mp3");
var runAudio2 = new Audio("./Sound/Running.mp3");

//Eventlistener har jag fått från google, vi hade inte lärt oss detta. Länk : https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
window.addEventListener("keydown", (event) => {
  if (player.preventInput) return;
  switch (event.key) {
    case "w":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          setTimeout(() => {
            var audio = new Audio("./Sound/doorOpen.mp3");
            audio.play();
          }, 200);

          setTimeout(() => {
            player.velocity.x = 0;
            player.velocity.y = 0;
            player.preventInput = true;
            player.switchSprite("enterDoor");
            door.play();
          }, 500);

          return;
        }
      }

      if (player.velocity.y === 0) {
        player.velocity.y = -10;

        var audio = new Audio("./Sound/JumpSound.mp3");
        var audio1 = new Audio("./Sound/JumpSound2.mp3");

        var random = Math.random();

        var sound = random < 0.5 ? audio1 : audio;

        sound.play();
      }
      break;

    case "a":
      var runAudio = new Audio("./Sound/Running.mp3");

      //Vänster
      keys.a.pressed = true;
      runAudio1.play();
      break;
    case "d":
      keys.d.pressed = true;
      runAudio2.play();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      //Vänster
      keys.a.pressed = false;
      runAudio1.pause();
      runAudio1.currentTime = 0;
      break;
    case "d":
      runAudio2.pause();
      runAudio2.currentTime = 0;
      keys.d.pressed = false;
      break;
  }
});
