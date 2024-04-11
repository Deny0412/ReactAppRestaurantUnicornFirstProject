const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const restauraceFolderPath = path.join(__dirname, "storage", "restauraceList");

function get(restauraceId) {
  try {
    const filePath = path.join(restauraceFolderPath, `${restauraceId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadRestaurace", message: error.message };
  }
}

// Method to write an restaurace to a file
function create(restaurace) {
  try {
    restaurace.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(restauraceFolderPath, `${restaurace.id}.json`);
    const fileData = JSON.stringify(restaurace);
    fs.writeFileSync(filePath, fileData, "utf8");
    return restaurace;
  } catch (error) {
    throw { code: "failedToCreateRestaurace", message: error.message };
  }
}

// Method to update restaurace in a file
function update(restaurace) {
  try {
    const currentRestaurace = get(restaurace.id);
    if (!currentRestaurace) return null;
    const newRestaurace = { ...currentRestaurace, ...restaurace };
    const filePath = path.join(restauraceFolderPath, `${restaurace.id}.json`);
    const fileData = JSON.stringify(newRestaurace);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newRestaurace;
  } catch (error) {
    throw { code: "failedToUpdateRestaurace", message: error.message };
  }
}

// Method to remove an restaurace from a file
function remove(restauraceId) {
  try {
    const filePath = path.join(restauraceFolderPath, `${restauraceId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveRestaurace", message: error.message };
  }
}

// Method to list restauraces in a folder
function list() {
  try {
    const files = fs.readdirSync(restauraceFolderPath);
    const restauraceList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(restauraceFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return restauraceList;
  } catch (error) {
    throw { code: "failedToListRestauraces", message: error.message };
  }
}
module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
