import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, deletePlant, updatePlantPrice}) {
  const allPlants = plants.map(plant => {
    return <PlantCard 
            plant={plant} 
            key={plant.id} 
            deletePlant={deletePlant}
            updatePlantPrice={updatePlantPrice}/>
          })
  
  return (
    <ul className="cards">
      {allPlants}
    </ul>
  );
}

export default PlantList;
