import React, { useState } from 'react';
import './styles.scss';

import Modal from '../../components/Modal/Modal';
import FormSelect from '../../components/Forms/FormSelect';
import FormInput from '../../components/Forms/FormInput';
import Button from '../../components/Forms/Button';

const Admin = () => {

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

    const handleSubmit = e => {
        e.preventDefault();
    }

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

                        <Button  type='submit'>
                            Agregar Producto
                        </Button>

                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Admin
