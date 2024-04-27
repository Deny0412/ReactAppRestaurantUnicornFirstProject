import { useEffect, useState } from "react";
import { useContext } from "react";
import { KategorieListContext } from "./KategorieListContext";

const KategorieListProvider = ({ children }) => {
  const [kategorieLoadObject, setKategorieLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setKategorieLoadObject((current) => ({ ...current, state: "pending" }));

    const response = await fetch(`http://localhost:8000/kategorie/list`, {
      method: "GET",
    });

    const responseJson = await response.json();
    if (response.status < 400) {
      setKategorieLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setKategorieLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  const value = {
    state: kategorieLoadObject.state,
    kategorieList: kategorieLoadObject.data,
  };
  return (
    <KategorieListContext.Provider value={value}>
      {children}
    </KategorieListContext.Provider>
  );
};

export default KategorieListProvider;
