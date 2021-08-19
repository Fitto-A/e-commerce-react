import React from 'react';
import './styles.scss'

import Button from '../../components/Forms/Button';

const SingleProduct = ({ 
    productName,
    productImg,
    productDescription,
    productPrice,
    id
 }) => {

    if(!productName || !productImg || typeof productPrice === 'undefined' ) return null;

    const configAddToCartBtn = {
        type: 'button'
    }

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
            <div className="add-to-cart">
                <Button {...configAddToCartBtn}>
                    Agregar al carro
                </Button>
            </div>
        </div>
    )
}

export default SingleProduct
