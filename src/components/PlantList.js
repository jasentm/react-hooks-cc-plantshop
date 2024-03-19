import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants}) {
  const allPlants = plants.map(plant => <PlantCard plant={plant} key={plant.id} />)
  
  return (
    <ul className="cards">
      {allPlants}
    </ul>
  );
}

export default PlantList;
