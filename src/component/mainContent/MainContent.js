import React from 'react'
import productCard from '../../data/pro_data';
import "./mainContent.css";


const MainContent = () => {
  console.log(productCard);
  const ItemList = productCard.map((item) => (
    <div className="card" key={item.id}>
      <div className="img_card">
        <img src={item.thumb} alt={'tt'} />
      </div>

      <div className="header_card">
        <h2>{item.name_product}</h2>
        <p>{item.description}</p>
        <p className="price">{item.price}<span>{item.currency}</span></p>
        <div className="btn">Add to Card</div>

      </div>
    </div>
  )
    
  );
  return (
    <div className="content_main">
      <h3>HAT</h3>
      {ItemList}
    </div>
  )
}

export default MainContent;
