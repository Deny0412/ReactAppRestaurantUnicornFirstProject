import { useState } from "react";
import { FilterContext } from "./FilterContext";

const FilterProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [categories, setCategories] = useState([]);

  return (
    <FilterContext.Provider
      value={{ city, setCity, categories, setCategories }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterProvider };
