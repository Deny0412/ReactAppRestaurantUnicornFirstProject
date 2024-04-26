import { useState } from "react";
import { useContext } from "react";
import { FilterContext } from "./FilterContext";
import api from "../../utils/api";

function Filter() {
  const { city, categories, setCity, setCategories } =
    useContext(FilterContext);
  const [restaurants, setRestaurants] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.fetchRestaurants({ city, categories });
      setRestaurants(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">Město:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={city}
        onChange={(event) => {
          const { value } = event.target;
          setCity(value);
        }}
      />

      <label htmlFor="categories">Kategorie:</label>
      <input
        type="text"
        id="categories"
        name="categories"
        value={categories}
        onChange={(event) => {
          const { value } = event.target;
          setCategories(value);
        }}
      />

      <button type="submit">Filtrovat</button>

      {restaurants.length > 0 && (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default Filter;
