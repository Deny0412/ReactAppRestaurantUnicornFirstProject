import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { RestauraceContext } from "../contexts/RestauraceContext";
function RestauraceProvider({ children }) {
  const [restauraceLoadObject, setRestauraceLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
    produkty: null,
  });
  const location = useLocation();

  useEffect(() => {
    handleLoadRestauraceInfoPlusProdukty();
  }, []);
  async function handleLoadRestauraceInfoPlusProdukty() {
    setRestauraceLoadObject((current) => ({ ...current, state: "pending" }));
    const responseData = await fetch(
      `http://localhost:8000/restaurace/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseProdukty = await fetch(
      `http://localhost:8000/produkt/listByRestaurant?restauraceId=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    console.log(responseProdukty);

    const responseDataJson = await responseData.json();
    const responseProduktyJson = await responseProdukty.json();
    if (responseData.status < 400) {
      setRestauraceLoadObject({
        state: "ready",
        data: responseDataJson,
        produkty: responseProduktyJson,
      });
      return responseDataJson;
    } else {
      setRestauraceLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseDataJson.error,
        produkty: current.produkty,
      }));
      throw new Error(JSON.stringify(responseDataJson, null, 2));
    }
  }

  const value = {
    state: restauraceLoadObject.state,
    restaurace: restauraceLoadObject.data,
    produkty: restauraceLoadObject.produkty,
  };
  return (
    <RestauraceContext.Provider value={value}>
      {children}
    </RestauraceContext.Provider>
  );
}

export default RestauraceProvider;
