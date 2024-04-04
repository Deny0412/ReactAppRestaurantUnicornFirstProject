const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const kategorieFolderPath = path.join(__dirname, "storage", "kategorieList");

function get(kategorieId) {
  try {
    const filePath = path.join(kategorieFolderPath, `${kategorieId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadKategorie", message: error.message };
  }
}

// Method to write an kategorie to a file
function create(kategorie) {
  try {
    kategorie.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(kategorieFolderPath, `${kategorie.id}.json`);
    const fileData = JSON.stringify(kategorie);
    fs.writeFileSync(filePath, fileData, "utf8");
    return kategorie;
  } catch (error) {
    throw { code: "failedToCreateKategorie", message: error.message };
  }
}

// Method to update kategorie in a file
function update(kategorie) {
  try {
    const currentKategorie = get(kategorie.id);
    if (!currentKategorie) return null;
    const newKategorie = { ...currentKategorie, ...kategorie };
    const filePath = path.join(kategorieFolderPath, `${kategorie.id}.json`);
    const fileData = JSON.stringify(newKategorie);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newKategorie;
  } catch (error) {
    throw { code: "failedToUpdateKategorie", message: error.message };
  }
}

// Method to remove an kategorie from a file
function remove(kategorieId) {
  try {
    const filePath = path.join(kategorieFolderPath, `${kategorieId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveKategorie", message: error.message };
  }
}

// Method to list kategories in a folder
function list() {
  try {
    const files = fs.readdirSync(kategorieFolderPath);
    const kategorieList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(kategorieFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return kategorieList;
  } catch (error) {
    throw { code: "failedToListKategories", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
