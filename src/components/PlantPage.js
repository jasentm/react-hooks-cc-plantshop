import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState('')
  
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

  const addNewPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  
  const filteredPlants = plants.filter(plant => {
    if(plant.name.toLowerCase().includes(search.toLowerCase())){
      return true
    }else {
      return false
    }
  })

  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant}/>
      <Search search={search} handleSearch={handleSearch}/>
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
