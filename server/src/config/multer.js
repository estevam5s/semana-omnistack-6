const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp"),
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "tmp"));
    },
    filename: (request, file, callback) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) {
          callback(error);
        }

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, file.key);
      });
    },
  }),
};
