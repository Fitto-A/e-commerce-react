import React from 'react';
import './styles.scss'

const SingleProduct = ({ 
    productName,
    productImg,
    productDescription,
    productPrice,
    id       
 }) => {
    if(!productName || !productImg || typeof productPrice === 'undefined' ) return null;

    return (
        <div key={id} className="products-container">
            <div className="product-img">
                <img src={productImg} alt={productName} />
            </div>
            <div className="product-details">
                <h3>{productName}</h3>
                <span>{productDescription}</span>
                <p>${productPrice}</p>
            </div>
        </div>
    )
}

export default SingleProduct
