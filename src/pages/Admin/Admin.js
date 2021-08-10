import React, { useState, useEffect } from 'react';
import './styles.scss';

import { useGlobalContext } from '../../components/context/context';

import Modal from '../../components/Modal/Modal';
import FormSelect from '../../components/Forms/FormSelect';
import FormInput from '../../components/Forms/FormInput';
import Button from '../../components/Forms/Button';
import { FaRegTrashAlt } from "react-icons/fa";


const Admin = () => {
    const { handleAddNewProduct, products, deleteProduct } = useGlobalContext()

    const [hideModal, setHideModal] = useState(true)
    const [productCategory, setProductCategory] = useState('Memotest')
    const [productPrice, setProductPrice] = useState(0)
    const [productName, setProductName] = useState('')
    const [productImg, setProductImg] = useState('')


    const toggleModal = () => {
        setHideModal(!hideModal)
    }

    const configModal = {
        hideModal,
        toggleModal
    }
    // const addNewProduct = ( productCategory, productName, productImg, productPrice) => {
    //     dispatch({ type: 'ADD_NEW_PRODUCT', payload: productCategory, productName, productImg, productPrice})
    // } 
    const resetForms = () => {
        setProductCategory('Memotest')
        setProductImg('')
        setProductName('')
        setProductPrice(0)
    }

    const handleSubmit = e => {
        e.preventDefault();
        handleAddNewProduct( productCategory, productName, productImg, productPrice );
        resetForms();
        toggleModal();
    }

    useEffect(() => {
        console.log(products);
        
    }, [])

    return (
        <div className='admin-content'>
            <div className="admin-actions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Agregar nuevo producto
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className='addNewProduct'>
                    <form onSubmit={handleSubmit}>
                        <h2>
                            Agregar nuevo producto
                        </h2>

                        <FormSelect 
                            label= 'Categoria'
                            options= {[{
                                    value: 'Rompecabezas',
                                    name: 'Rompecabezas'
                                },{
                                    value: 'Memotest',
                                    name: 'Memotest'
                                }
                            ]}
                            handleChange={e =>  setProductCategory(e.target.value)}
                        />

                        <br />


                        <FormInput
                            type='text'
                            label='Nombre'
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                        />

                        
                        <FormInput
                            type='url'
                            label='Imagen del producto'
                            value={productImg}
                            handleChange={e => setProductImg(e.target.value)}
                        />

                        <FormInput
                            type='number'
                            label='Precio'
                            value={productPrice}
                            handleChange={e => setProductPrice(e.target.value)}
                        />

                        <Button  
                            type='submit' 
                            // onClick={() => handleAddNewProduct( productCategory, productName, productImg, productPrice )}
                        >
                            Agregar Producto
                        </Button>

                    </form>
                </div>
            </Modal>
            
            <div className="products-container">
                <table border='0' cellPadding='0' cellSpacing='0'>
                    <tbody>
                        <tr>
                            <th>
                                <h1>
                                    Manejo de productos
                                </h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className='results' border='0' cellPadding='10' cellSpacing='0'>
                                    <tbody>
                                        {products.map((product, index)=> {
                                            const {productName, productPrice, productImg, id} = product;
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <img className='product-img' src={productImg} alt="imagen de producto" />
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        ${productPrice}
                                                    </td>

                                                    <td>
                                                        <Button onClick={() => deleteProduct(id)}>
                                                            <FaRegTrashAlt />
                                                        </Button>
                                                    </td>
                                            
                                                </tr>
                                            )
                                        })}
        
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Admin