const server = require("./server");
const mongooseDB = require("./db/config");

mongooseDB(() => {
  server.listen(3001, () => {
    console.log("listening on 3001");
  });
});
