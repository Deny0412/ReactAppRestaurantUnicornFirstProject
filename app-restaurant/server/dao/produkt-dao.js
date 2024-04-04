const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const produktFolderPath = path.join(__dirname, "storage", "produktList");

function get(produktId) {
  try {
    const filePath = path.join(produktFolderPath, `${produktId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadProdukt", message: error.message };
  }
}

// Method to write an produkt to a file
function create(produkt) {
  try {
    produkt.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(produktFolderPath, `${produkt.id}.json`);
    const fileData = JSON.stringify(produkt);
    fs.writeFileSync(filePath, fileData, "utf8");
    return produkt;
  } catch (error) {
    throw { code: "failedToCreateProdukt", message: error.message };
  }
}

// Method to update produkt in a file
function update(produkt) {
  try {
    const currentProdukt = get(produkt.id);
    if (!currentProdukt) return null;
    const newProdukt = { ...currentProdukt, ...produkt };
    const filePath = path.join(produktFolderPath, `${produkt.id}.json`);
    const fileData = JSON.stringify(newProdukt);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newProdukt;
  } catch (error) {
    throw { code: "failedToUpdateProdukt", message: error.message };
  }
}

// Method to remove an produkt from a file
function remove(produktId) {
  try {
    const filePath = path.join(produktFolderPath, `${produktId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveProdukt", message: error.message };
  }
}

// Method to list produkts in a folder
function list() {
  try {
    const files = fs.readdirSync(produktFolderPath);
    const produktList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(produktFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return produktList;
  } catch (error) {
    throw { code: "failedToListProdukts", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
