const fs = require("fs");
const path = require("path");

const produktkategorieFolderPath = path.join(
  __dirname,
  "storage",
  "produktkategorieList"
);

// Method to read an produktkategorie from a file
function get(kategorieId, produktId) {
  try {
    const produktkategorieList = list();
    const produktkategorie = produktkategorieList.find(
      (a) => a.kategorieId === kategorieId && a.produktId === produktId
    );
    return produktkategorie;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadProduktKategorie", message: error.message };
  }
}

//Method to create a produktKategorie from a file
function create(produktkategorie) {
  try {
    const produktKategorie = get(
      produktkategorie.kategorieId,
      produktkategorie.produktId
    );
    if (Object.keys(produktkategorie).length === 0) {
      const filePath = path.join(
        produktkategorieFolderPath,
        `${produktkategorie.kategorieId}_${produktkategorie.produktId}_${produktkategorie.produktkategorie}.txt`
      );
      fs.writeFileSync(filePath, "", "utf8");
      return produktkategorie;
    } else {
      throw {
        code: "produktKategorieAlreadyExists",
        message: "produktKategorie already exists",
      };
    }
  } catch (error) {
    throw { code: "failedToCreateProduktKategorie", message: error.message };
  }
}

/* // Method to update produktkategorie in a file
function update(produktkategorie) {
  try {
    const currentProduktKategorie =
      get(produktkategorie.kategorieId, produktkategorie.produktId) || {};
    if (currentProduktKategorie.file) {
      const filePath = path.join(
        produktkategorieFolderPath,
        currentProduktKategorie.file
      );
      fs.unlinkSync(filePath);
    }
    const newProduktKategorie = {
      ...currentProduktKategorie,
      ...produktkategorie,
    };

    const filePath = path.join(
      produktkategorieFolderPath,
      `${newProduktKategorie.kategorieId}_${newProduktKategorie.produktId}_${newProduktKategorie.produktkategorie}.txt`
    );
    fs.writeFileSync(filePath, "", "utf8");
    return newProduktKategorie;
  } catch (error) {
    throw { code: "failedToUpdateProduktKategorie", message: error.message };
  }
} */

// Method to remove an produktkategorie from a file
function remove(kategorieId, produktId) {
  try {
    const produktkategorie = get(kategorieId, produktId);
    if (produktkategorie) {
      const filePath = path.join(
        produktkategorieFolderPath,
        produktkategorie.file
      );
      fs.unlinkSync(filePath);
    }
    return { message: "Produktkategorie succesfully removed" };
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveProduktKategorie", message: error.message };
  }
}

// Method to list produktkategories in a folder
function list() {
  try {
    const files = fs.readdirSync(produktkategorieFolderPath);
    const produktkategorieList = files.map((file) => {
      const produktkategorieData = file.replace(".txt", "").split("_");
      return {
        kategorieId: produktkategorieData[0],
        produktId: produktkategorieData[1],
        file,
      };
    });
    return produktkategorieList;
  } catch (error) {
    throw { code: "failedToListProduktKategories", message: error.message };
  }
}

function produktMap() {
  const produktkategorieList = list();
  const produktkategorieMap = {};
  produktkategorieList.forEach((produktkategorie) => {
    if (!produktkategorieMap[produktkategorie.produktId])
      produktkategorieMap[produktkategorie.produktId] = {};
    if (
      !produktkategorieMap[produktkategorie.produktId][
        produktkategorie.kategorieId
      ]
    )
      produktkategorieMap[produktkategorie.produktId][
        produktkategorie.kategorieId
      ] = {};
  });
  return produktkategorieMap;
}

function kategorieMap() {
  const produktkategorieList = list();
  const produktkategorieMap = {};
  produktkategorieList.forEach((produktkategorie) => {
    if (!produktkategorieMap[produktkategorie.kategorieId])
      produktkategorieMap[produktkategorie.kategorieId] = {};
    if (
      !produktkategorieMap[produktkategorie.kategorieId][
        produktkategorie.produktId
      ]
    )
      produktkategorieMap[produktkategorie.kategorieId][
        produktkategorie.produktId
      ] = {};
  });
  return produktkategorieMap;
}

module.exports = {
  get,
  remove,
  list,
  produktMap,
  kategorieMap,
};
