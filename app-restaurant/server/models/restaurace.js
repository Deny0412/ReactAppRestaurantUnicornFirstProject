const resaturaceAll = require("storage/restaurace.json");
class Restaurace {
  constructor(id, nazev, adresa, telefon, email, popis, otviraciHodiny) {
    this.id = id;
    this.nazev = nazev;
    this.adresa = adresa;
    this.telefon = telefon;
    this.email = email;
    this.popis = popis;
    this.otviraciHodiny = otviraciHodiny;
  }

  static restauraceList = restauraceAll;

  static createRestaurace(restaurace) {
    const id = this.restauraceList.length + 1;
    const newRestaurace = new Restaurace(
      id,
      restaurace.nazev,
      restaurace.adresa,
      restaurace.telefon,
      restaurace.email,
      restaurace.popis,
      restaurace.otviraciHodiny
    );
    this.restauraceList.push(newRestaurace);
    return newRestaurace;
  }

  static getAll() {
    return this.restauraceList;
  }

  static getRestaurace(id) {
    return this.restauraceList.find((restaurace) => restaurace.id === id);
  }

  static updateRestaurace(id, updatedData) {
    const index = this.restauraceList.findIndex((rest) => rest.id === id);
    if (index !== -1) {
      this.restauraceList[index] = {
        ...this.restauraceList[index],
        ...updatedData,
      };
      return this.restauraceList[index];
    }
    return null;
  }

  static deleteRestaurace(id) {
    const index = this.restauraceList.findIndex((rest) => rest.id === id);
    if (index !== -1) {
      return this.restauraceList.splice(index, 1);
    }
    return null;
  }
}

module.exports = { Restaurace };
