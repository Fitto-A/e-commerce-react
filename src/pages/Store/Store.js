import React, { useEffect } from 'react'
import './styles.scss'

import SingleProduct from './SingleProduct';
import { useGlobalContext} from '../../components/context/context';

const Store = () => {
    const { products } = useGlobalContext();

    useEffect(() => {
        
    }, [])


    if(!Array.isArray(products)) return null;


    if(products.length < 1) {
        return (
            <div className='store-page'>
                <h2>No hay resultados en la búsqueda. </h2>
            </div>
        )
    }

    return (
        <div className="products">
            <h1>
                Buscador de productos
            </h1>
            <div className="products-grid">
                {products.map((product, pos)=> {
                    const { productName, productImg, productDescription, productPrice, id} = product
                    
                    const config = {
                        productName,
                        productImg,
                        productDescription,
                        productPrice,
                        id                    
                    }
                    
                    return(
                        <SingleProduct key={pos} {...config}/>
                    )
                })}

            </div>
        </div>
    )
}

export default Store
