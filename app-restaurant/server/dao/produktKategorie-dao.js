const fs = require("fs");
const path = require("path");
const { isObject } = require("util");

const produktkategorieFolderPath = path.join(
  __dirname,
  "storage",
  "produktKategorieList"
);

// Method to read an produktkategorie from a file
function get(kategorieId, produktId) {
  try {
    const produktkategorieList = list();
    //console.log(produktkategorieList);
    if (produktkategorieList) {
      const produktkategorie = produktkategorieList.find(
        (item) =>
          item.kategorieId === kategorieId && item.produktId === produktId
      );
      return produktkategorie;
    }
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadProduktKategorie", message: error.message };
  }
}

//Method to create a produktKategorie from a file
function create(produktkategorie) {
  try {
    const produktKategorieExists = get(
      produktkategorie.kategorieId,
      produktkategorie.produktId
    );
    if (
      produktKategorieExists === null ||
      produktKategorieExists === undefined
    ) {
      const filePath = path.join(
        produktkategorieFolderPath,
        `${produktkategorie.kategorieId}_${produktkategorie.produktId}.txt`
      );
      fs.writeFileSync(filePath, "", "utf8");
      return (message = "Produktkategorie created");
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

//---------------------------------------------------------------bad try
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
} ----------------------------------------------------------------------------------------------*/

// Method to remove an produktkategorie from a file
function remove(kategorieId, produktId) {
  try {
    const produktkategorie = get(kategorieId, produktId);
    const filePath = path.join(
      produktkategorieFolderPath,
      produktkategorie.kategorieId + "_" + produktkategorie.produktId + ".txt"
    );
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveProduktKategorie", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(produktkategorieFolderPath);

    const produktKatFinalList = files.map((file) => {
      const produktkategorieData = file.replace(".txt", "").split("_");
      return {
        kategorieId: produktkategorieData[0],
        produktId: produktkategorieData[1],
      };
    });

    return produktKatFinalList;
  } catch (error) {
    throw { code: "failedToListProduktKategories", message: error.message };
  }
}

//not used
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
//not used
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
  create,
  get,
  remove,
  list,
};
