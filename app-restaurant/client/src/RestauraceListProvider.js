import { createContext, useEffect, useState } from "react";

export const RestaurantListContext = createContext();

const RestaurantListProvider = ({ children }) => {
  const [restauraceLoadObject, setRestauraceLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setRestauraceLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/restaurace/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setRestauraceLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setRestauraceLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: restauraceLoadObject.state,
    restauraceList: restauraceLoadObject.data || [],
  };
  return (
    <RestaurantListContext.Provider value={value}>
      {children}
    </RestaurantListContext.Provider>
  );
};

export default RestaurantListProvider;