import React, { useEffect, useState } from "react";

const AutoSuggestion = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (searchText) => {
    setSearchInput(searchText);
  };

  const [itemList, setItemList] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([])
  useEffect(() => {
    fetchItems();
  }, [searchInput]);

  const fetchItems = async () => {
    try{
    const response = await fetch(
        `https://api.frontendeval.com/fake/food/${searchInput}`
        );
        const data = await response.json();
        setItemList(data);
    }catch(err){
        setItemList([]);
    }
  };
  const handleAddCart = (item)=>{
    let copyCart = [...shoppingCart]
    copyCart.push({item:item,id:new Date().getTime(),completed:false});
    setShoppingCart(copyCart);
    setSearchInput("");
    setItemList([]);
  }
  const handleDeleteCart = (item)=>{
   let filteredCart = [...shoppingCart].filter(cart => cart.id !== item.id)
    setShoppingCart(filteredCart);
  }
  const addComplete = (item)=>{
    let copyCart = [...shoppingCart].map(cart => cart.id === item.id? {...cart,completed:!item.completed}: cart)
     setShoppingCart(copyCart);
   }
  return (
    <div>
      <div>
        <h1>My Shopping List</h1>
      </div>
      <div className="dropdown-container">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchInput(e.target.value)}
          placeholder="Search for items"
        />
        {itemList.length >0 && (
          <div className="suggestion-list">
            {itemList.map((item,index) => (
              <div>
                <button onClick={()=>handleAddCart(item,index)} className="item-btn">{item}</button>
              </div>
            ))}
          </div>
        )}
      </div>
        <div className="shopping-cart">
            {
                shoppingCart.length > 0 && (
                    <div className="cart">
                        <h2>Shopping Cart</h2>
                        {shoppingCart.map((item) => (
                            <div className="flex-around">
                                <div className="flex-around">
                                <span onClick={()=>addComplete(item)} >✅ </span>  <div className={item.completed ? 'text-strikethrough' : ''} >{item.item}</div><span onClick={()=>handleDeleteCart(item)} >❌</span>
                                </div>
                            </div>
                        
                        ))}
                    </div>
                )
            }
        </div>
    </div>
  );
};

export default AutoSuggestion;
