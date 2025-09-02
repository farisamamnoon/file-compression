const { gzip, ungzip } = require("node-gzip");
const { Files } = require("./db");

const decompressed = await ungzip(compressed);

const zipFile = async (file, fileId) => {
  const zippedFile = await gzip(file);

  Files.create({ zippedFile });
};

console.log(decompressed.toString());
