import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

import Button from '../../components/Forms/Button';

const SingleProduct = ({ 
    productName,
    productImg,
    productDescription,
    productPrice,
    productID
 }) => {

    if(!productName || !productImg || typeof productPrice === 'undefined' ) return null;

    const configAddToCartBtn = {
        type: 'button'
    }



    return (
        <div key={productID} className="products-container">
            <div className="product-img">
                <img src={productImg} alt={productName} />
            </div>
            <div className="product-details">
                <Link to={`/product/${productID}`}>
                    <h3>{productName}</h3>
                </Link>
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
