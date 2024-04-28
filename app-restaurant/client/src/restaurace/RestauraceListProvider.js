import { createContext, useEffect, useState } from "react";

export const RestaurantListContext = createContext();

const RestaurantListProvider = ({ children }) => {
  const [restauraceLoadObject, setRestauraceLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const [filterState, setFilter] = useState({
    mesto: "",
    kategorieId: "",
  });

  useEffect(() => {
    handleLoad();
  }, [filterState]);

  async function handleLoad() {
    console.log("handleLoad");
    let response;
    if (!filterState.mesto && !filterState.kategorieId) {
      setRestauraceLoadObject((current) => ({ ...current, state: "pending" }));
      response = await fetch(`http://localhost:8000/restaurace/listByFilters`, {
        method: "GET",
      });
    } else {
      if (!filterState.mesto) {
        response = await fetch(
          `http://localhost:8000/restaurace/listByFilters?kategorieId=${filterState.kategorieId}`,
          {
            method: "GET",
          }
        );
      }
      if (!filterState.kategorieId) {
        response = await fetch(
          `http://localhost:8000/restaurace/listByFilters?mesto=${filterState.mesto}`,
          {
            method: "GET",
          }
        );
      }
      if (filterState.mesto && filterState.kategorieId) {
        response = await fetch(
          `http://localhost:8000/restaurace/listByFilters?${new URLSearchParams(
            filterState
          )}`,
          {
            method: "GET",
          }
        );
      }
      console.log(response);
    }
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
  console.log(restauraceLoadObject.data);
  const value = {
    state: restauraceLoadObject.state,
    restauraceList: restauraceLoadObject.data || [],
    /* mesto: filterState.mesto,
    kategorieId: filterState.kategorieId, */
    setFilter,
  };
  return (
    <RestaurantListContext.Provider value={value}>
      {children}
    </RestaurantListContext.Provider>
  );
};

export default RestaurantListProvider;
