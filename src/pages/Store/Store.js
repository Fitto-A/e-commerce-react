import React, { useState, useEffect } from 'react'
import './styles.scss'
import { useHistory } from 'react-router-dom'
import VerticalNavStore from '../../components/VerticalNavStore/VerticalNavStore';
import SingleProduct from './SingleProduct';
import LoadMore from '../../components/LoadMore/LoadMore';
import { useGlobalContext} from '../../components/context/context';

const Store = () => {
    const { products, fetchProducts, fetchMore, noMoreProducts, setNoMoreProducts } = useGlobalContext();

    const history = useHistory();
    const [filtro, setFiltro] = useState('')
    // const [startAfterDoc, setStartAfterDoc] = useState(5)
    // const [persistProducts, setPersistProducts] = useState([])

    // const { productsArray, queryDoc } = products
    
    useEffect(() => {
        fetchProducts(filtro)
        setNoMoreProducts(false)
    }, [filtro])

    const handleFilter = e => {
        const newFilter = e.target.value;
        setFiltro(newFilter)
        history.push(`/tienda/${newFilter}`)
    };

    const configFilter = {
        defaultValue: filtro,
        options: [{
            name: 'Mostrar todos',
            value: ''
        }, {
            name: 'Memotest',
            value: 'Memotest'
        }, {
            name: 'Rompecabezas',
            value: 'Rompecabezas' 
        }],
        handleFilter
    }

    if(!Array.isArray(products)) return null;

    if(products.length < 1) {
        return (
            <div className='store-page'>
                <h2>No hay resultados en la búsqueda. </h2>
            </div>
        )
    }

    const handleLoadMore = () => {
        fetchMore(filtro)
        // setStartAfterDoc(queryDoc)
        // setPersistProducts(productsArray)
        // fetchProducts(filtro, startAfterDoc, persistProducts)
    }
    
    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    }

    console.log(products);

    return (
        <>
            <div className="vertical-nav-store">
                    <VerticalNavStore {...configFilter} />
            </div>
            <div className="products">

                <h1>
                    Buscador de productos
                </h1>

                <div className="products-grid">
                    {products.map((product, pos)=> {
                        const { productName, productImg, productDescription, productPrice, productID} = product
                        
                        const config = {
                            productName,
                            productImg,
                            productDescription,
                            productPrice,
                            productID
                        }
                        
                        return(
                            <SingleProduct key={pos} {...config}/>
                        )
                    })}

                </div>
                {!noMoreProducts && <LoadMore {...configLoadMore}/>}
            </div>
        
        </>
    )
}

export default Store
