const Listener = require("../../dist/Listener");

Listener.on("dogBarks", function(data) {
  console.log(" run run ", data);
  console.log("===============");
});

Listener.on("kingArrives", function(data) {
  console.log(data);
  console.log("===============");
});

console.log(" in 2 second emit example should run");

setTimeout(() => {
  Listener.emit("dogBarks", "faster");
}, 2000);

console.log(" in 3 second broadcast example should run");
setTimeout(() => {
  Listener.broadcast([
    {
      eventName: "dogBarks",
      data: "run again"
    },
    {
      eventName: "kingArrives",
      data: "king arrrived, bow down"
    }
  ]);
}, 3000);

console.log(" in 4 second broadcast example with default data, should run");
setTimeout(() => {
  Listener.broadcast(["dogBarks", "kingArrives"], "keep running");
}, 4000);

console.log("===============");
