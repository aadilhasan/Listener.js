const Listener = require("./dist/Listener");

this.name = "test_user";
console.log(" running ", this);

Listener.on("test", function(data) {
  console.log(" test happend ", data, this.name);
});

Listener.on("test2", function(data) {
  console.log(" test2 hpd ", data, this.name);
});

setTimeout(() => {
  Listener.emit("test2", {}, this);

  Listener.broadcast(
    [
      "test2",
      {
        eventName: "test",
        data: {},
        context: {
          name: "broadcasting user"
        }
      },
      "test"
    ],
    {
      name: "aadil",
      test: "test obj 2"
    }
  );
}, 2000);
