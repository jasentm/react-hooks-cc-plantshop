import React, {useState} from "react";

function PlantCard({plant, deletePlant, updatePlantPrice}) {
  {/*destructure plant obj */}
  const {name, image, price, id} = plant

  {/*states to hide/reveal in stock or out of stock button, 
    to hide/reveal edit price form, to make edit price form controlled,
    and for PATCH request to update plant price respectively */}
  const [inStock, setInStock] = useState(true)
  const [editPrice, setEditPrice] = useState(false)
  const [newPrice, setNewPrice] = useState('')

  {/* sets state of inStock and hides/reveals button type on click */}
  const handleClick = () => {
    setInStock(prev => !prev)
  }

  {/*DELETE request that passes id of deleted plant to helper function
    to set state of plants in PlantPage */}
  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(res.ok){
        return (res.json())
      }else {
        return (console.error("Something went wrong..."))
      }
    })
    .then(() => deletePlant(id))
    .catch(error => console.error(error))
  }

  {/* PATCH request that passes updated plant obj to passed in helper function to 
    updated state in PlantPage*/}
  const handleUpdatePrice = (e) => {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        price: newPrice
      })
    })
    .then(res => {
      if(res.ok){
        return (res.json())
      }else{
        return (console.error('Something went wrong...'))
      }
    })
    .then(updatedPlantData => {
      updatePlantPrice(updatedPlantData)
      {/* returns edit form to display placeholder text on submit*/}
      setNewPrice('')
    })
    .catch(error => console.error(error))
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>
      {/* display edit price form (or nothing) based on boolean of editPrice state*/}
      {editPrice ? (
        <form onSubmit={handleUpdatePrice}>
        <input 
          type="text" 
          name="price" 
          placeholder={`$${price}`} 
          onChange={(e) => setNewPrice(e.target.value)}
          value={newPrice} ></input>
        <button type="submit">Submit</button>
      </form>
      ) : (
        null 
      )}
      {/* change button text and class name based on boolean of inStock state;
        change state based on click*/}
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <br></br>
      {/* change state of editPrice on click*/}
      <button 
        style={{backgroundColor: "rgb(193, 193, 193"}} 
        onClick={() => setEditPrice(prev => !prev)}>
          Edit Price
        </button>
      {/* delete button*/}
      <button style={{backgroundColor: "rgb(243, 42, 42"}} onClick={handleDelete} >Delete</button>
    </li>
  );
}

export default PlantCard;
