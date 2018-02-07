var el = document.getElementById("name");

Listener.on("changeName", function(data) {
  el.innerHTML = data;
});

Listener.on("changeFriend1", function(newName) {
  friend1.innerHTML = newName;
});

Listener.on("changeFriend2", function(newName) {
  friend2.innerHTML = newName;
});

setTimeout(() => {
  Listener.emit("changeName", "Eddie");
}, 3000);

setTimeout(() => {
  console.log(" broacast example running");
  Listener.broadcast([
    { eventName: "changeFriend1", data: "Jason" },
    { eventName: "changeFriend2", data: "Smith" }
  ]);
}, 4000);
