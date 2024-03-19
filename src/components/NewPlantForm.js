import React, {useState} from "react";

function NewPlantForm({addNewPlant}) {
  const initialForm = {
    name: '',
    image: '',
    price: ''
  }
  const [form, setForm] = useState(initialForm)
  
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handlePlantSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({
        name: form.name,
        image: form.image,
        price: parseInt(form.price)
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
