import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, deletePlant, updatePlantPrice}) {
  return (
    <ul className="cards">
      {/*using passed state of plants, return an array of PlantCards for each plant obj.
        Pass down whole plant obj as props as well as 
        helper functions to set state in parent (PlantPage) */}
      {plants.map(plant => {
        return <PlantCard 
            plant={plant} 
            key={plant.id} 
            deletePlant={deletePlant}
            updatePlantPrice={updatePlantPrice}/>
        }
      )}
    </ul>
  );
}

export default PlantList;
