const writeToFile = require("../util/write-to-file");
module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);

  let id = req.url.split("/")[3];
  //To validate a UUID
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i
  );
  if (!regexV4.test(id)) {
    console.log(regexV4.test(id));
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not Valid",
      })
    );
  } else if (baseUrl === "/api/items/" && regexV4.test(id)) {
    const index = req.items.findIndex((item) => {
      return item.id === id;
    });
    if (index === id) {
      res.statuCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Item Not Found" })
      );
      res.end();
    } else {
      req.items.splice(index, 1);
      writeToFile(req.items);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.items));
    }
  }
};
