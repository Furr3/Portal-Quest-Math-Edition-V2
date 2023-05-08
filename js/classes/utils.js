//Bakgrund, en tilemap data har 16 rows så du gör en for loop som går igenom varje row,
Array.prototype.parse2D = function () {
  const rows = [];
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16));
  }

  return rows;
};

//Denna code fick jag ta från nätet, och det gör att man kan parse'a varje siffra (data för collisionblock) en och en,
//och därefter sätta dit en "kollisionblock" för den positionen där 292 ligger i en array.

Array.prototype.createObjectsFrom2D = function () {
  const objects = [];
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 292) {
        // push a new collision into collisionblocks array
        objects.push(
          new CollisionBlock({
            position: {
              x: x * 64,
              y: y * 64,
            },
          })
        );
      }
    });
  });

  return objects;
};
