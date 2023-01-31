const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (req, res) => {
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
    try {
      let body = await requestBodyparser(req);
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
        req.items[index] = { id, ...body };
        writeToFile(req.items);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.items));
      }
    } catch (error) {
      console.log(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request Body is not Valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found" }));
  }
};
