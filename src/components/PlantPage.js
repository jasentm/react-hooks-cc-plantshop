import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

/* component responsible for fetch GET of plant data from db.json and displaying PlantList,
Search, and NewPlantForm */

function PlantPage() {
  {/*States for data from db.json (plants) and making Search a controllled component */}
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState('')
  
  {/*fetch GET request with blank dependency array to run only on render - 
    set state of plants with data */}
  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(res => {
      if(res.ok){
        return (res.json())
      }else{
        return (console.error("Something went wrong..."))
      }
    })
    .then(plantData => setPlants(plantData))
  }, [])

  {/*helper functions that change state to be passed down to descendents */}
  {/*adds a new plant by copying previous array state and adding POSTed data to end */}
  const addNewPlant = (newPlant) => {
    setPlants(prev => [...prev, newPlant])
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  {/*deletes plant from array by returning new array with all but the plant that matches 
    the passed id (and updates state)*/}
  const deletePlant = (id) => {
    setPlants(plants.filter(plant => plant.id !== id))
  }
  
  {/*creates new const to .map over to render PlantCards in PlantList; 
    returns new array if the name of a plant has includes what was searched (using state) */}
  const filteredPlants = plants.filter(plant => {
    if(plant.name.toLowerCase().includes(search.toLowerCase())){
      return true
    }else {
      return false
    }
  })

  {/*returns a new array with updated plant object if the id in the original plants array 
    matches the passed in POSTed plant id (and updates state)*/}
  const updatePlantPrice = (updatedPlant) => {
    setPlants(plants.map(plant => {
      if(plant.id === updatedPlant.id){
        return updatedPlant
      }else{
        return plant;
      }
    }))
  }

  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant}/>
      <Search search={search} handleSearch={handleSearch}/>
      <PlantList 
        plants={filteredPlants} 
        deletePlant={deletePlant} 
        updatePlantPrice={updatePlantPrice}/>
    </main>
  );
}

export default PlantPage;
