const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  console.log("data to write to file ", data);
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "items.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (error) {
    console.log(error);
  }
};
