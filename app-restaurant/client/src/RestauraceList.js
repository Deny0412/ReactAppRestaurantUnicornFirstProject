import { useContext } from "react";
import { RestaurantListContext } from "./RestauraceListProvider.js";
import RestauraceCard from "./RestauraceCard.js";

function RestauraceList() {
  const { restauraceList } = useContext(RestaurantListContext);

  return (
    <div>
      {/* {restauraceList.forEach((element) => {
        <RestauraceCard key={element.id} restaurace={element} />;
      })} */}
      {/* {restauraceList.map((restaurace) => {
        return <RestauraceCard key={restaurace} restaurace={restaurace} />;
      })}
      ; */}
    </div>
  );
}

export default RestauraceList;
