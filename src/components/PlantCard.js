import React, {useState} from "react";

function PlantCard({plant, deletePlant, updatePlantPrice}) {
  const {name, image, price, id} = plant

  const [inStock, setInStock] = useState(true)
  const [editPrice, setEditPrice] = useState(true)
  const [newPrice, setNewPrice] = useState('')

  const handleClick = () => {
    setInStock(prev => !prev)
  }

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
  }

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
      setNewPrice('')
    })
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>
      {editPrice ? (
        null 
      ) : (
        <form onSubmit={handleUpdatePrice}>
          <input 
            type="text" 
            name="price" 
            placeholder={`$${price}`} 
            onChange={(e) => setNewPrice(e.target.value)}
            value={newPrice} ></input>
          <button type="submit">Submit</button>
        </form>
      )}
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <br></br>
      <button style={{backgroundColor: "rgb(193, 193, 193"}} onClick={() => setEditPrice(prev => !prev)}>Edit Price</button>
      <button style={{backgroundColor: "rgb(243, 42, 42"}} onClick={handleDelete} >Delete</button>
    </li>
  );
}

export default PlantCard;
