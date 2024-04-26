import { useContext } from "react";
import { RestaurantListContext } from "./RestauraceListProvider.js";
import RestauraceCard from "./RestauraceCard.js";

function RestauraceList() {
  const { restauraceList } = useContext(RestaurantListContext);
  console.log(restauraceList);
  return (
    <div className="card-list">
      {restauraceList.map((restaurace) => {
        return <RestauraceCard key={restaurace} restaurace={restaurace} />;
      })}
    </div>
  );
}

export default RestauraceList;
