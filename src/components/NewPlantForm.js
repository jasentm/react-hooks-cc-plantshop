import React, {useState} from "react";

function NewPlantForm({addNewPlant}) {
  {/*blank form used to clear form and set initial state */}
  const initialForm = {
    name: '',
    image: '',
    price: ''
  }

  {/*state to make component controlled */}
  const [form, setForm] = useState(initialForm)
  
  {/*function to make component controlled, update state of form based on user input */}
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  {/*POST request to add new plant that passes new plant obj to passed helper funtion to change
    state of plants in PlantPage */}
  const handlePlantSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {'Content-Type': "Application/JSON"},
      body: JSON.stringify({
        name: form.name,
        image: form.image,
        price: form.price
      })
    })
    .then(res => {
      if(res.ok){
        return (res.json())
      }else{
        return (console.error('Something went wrong...'))
      }
    })
    .then(newPlantData => {
      addNewPlant(newPlantData)
      {/*clear form on submit */}
      setForm(initialForm)
    })
    .catch(error => console.error(error))
    }
  

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handlePlantSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          onChange={handleFormChange} 
          value={form.name}
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          onChange={handleFormChange} 
          value={form.image}
        />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price"
          onChange={handleFormChange} 
          value={form.price} 
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
