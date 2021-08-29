import React, {useEffect} from 'react';
import './styles.scss'
import { useParams } from 'react-router'
import { useGlobalContext } from '../../components/context/context';

const ProductDetail = () => {
    const {products, productById, fetchProductById} = useGlobalContext();
    const { productID } = useParams();


    useEffect(() => {
        fetchProductById(productID)
        
    }, [])



    //HACERLO DINÁMICO Y BUSCAR DIRECTAMENTE EN FIRESTORE CON UN FETCH
    // const selectedProductById = products.find((item)=> item.productID == productID)
    // const { productName, productImg, productDescription, productPrice } = selectedProductById


    // const { productName, productImg, productDescription, productPrice } = productById
    console.log(productById);
    return (
        <div className='productId-container'>
            {/* <div className="productId-img">
                <img src={productImg} alt={productName} />
                <p>{productDescription}</p>
            </div>
            <div className="productId-details">
                <h1>{productName}</h1>
                <p>${productPrice}</p>
            </div> */}
        </div>
    )
}

export default ProductDetail
