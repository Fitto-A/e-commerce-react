import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from "../../redux/User/user.actions";

import { firestore, auth, handleUserProfile } from "../../firebase/utils";
import { handleAddProduct, handleFetchProducts } from '../../components/Products/Products.helper';


const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const dispatch = useDispatch();

    const initialState = {
        currentUser: null
    }

    const [isLogIn, setIsLogIn] = useState(initialState)
    const [products, setProducts] = useState([])
    const [lastDoc, setLastDoc] = useState();
    const [noMoreProducts, setNoMoreProducts] = useState(false)
    const [productById, setProductById] = useState([])

    var authListeneer = null;

    const handleLog = () => {
        authListeneer = auth.onAuthStateChanged( async userAuth => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot(snapshot => {
                    dispatch(setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    }))
                })
            }
            dispatch(setCurrentUser(userAuth))
        })
    }


    //PRODUCTS

    const handleAddNewProduct = (productCategory, productName, productImg, productDescription, productPrice) => {
        try {
            const timestamp = new Date();
            const dateID = Date.now();
            handleAddProduct({
                productCategory,
                productName,
                productImg,
                productDescription,
                productPrice,
                productAdminUserUID: auth.currentUser.uid,
                createdDate: timestamp,
                productID: dateID
            })
            
        } catch (error) {
            
     
       }
    }

    let productsRef = firestore.collection('products').orderBy('createdDate')
    const pageSize = 6;
    
    const fetchProducts = async (filtro) => {
        if (filtro) productsRef = productsRef.where('productCategory', '==', filtro);

        productsRef
            .limit(pageSize)
            .get()
            .then((collections)=> {
                const totalCount = collections.size;
                const isCollectionEmpty = totalCount < 2;
                if(!isCollectionEmpty){
                const newProducts = collections.docs.map((product) => product.data());
                const lastDoc = collections.docs[collections.docs.length - 1];
                setProducts(newProducts);
                setLastDoc(lastDoc)
                } else {
                    setNoMoreProducts(true)
                }

            })
    }



    const fetchMore = (filtro) => {
        if (filtro) productsRef = productsRef.where('productCategory', '==', filtro);
        
        productsRef
        .startAt(lastDoc)
        .limit(pageSize)            
        .get()
        .then((collections)=> {
            const totalCount = collections.size;
            const isCollectionEmpty = totalCount < 2;
            
                if(!isCollectionEmpty){
                    const newProducts = collections.docs.map((product) => product.data());
                    const lastDoc = collections.docs[collections.docs.length - 1];
                    setProducts((products) => [...products, ...newProducts] );
                    setLastDoc(lastDoc)
                } else {
                    setNoMoreProducts(true);
                }
        })
    }


    const fetchProductById = (id) => {
        if (id) productsRef = productsRef.where('productID', '==', id)

        productsRef
            .get()
            .then((collections)=> {
                const selectedProducts = collections.docs.map((product) => product.data());
                // const selectedItem = collections.docs.find((product)=> product.productID == id)
                setProductById((products) => [...products, ...selectedProducts])
            })
    }

    const deleteProduct = async(productId) =>{
        try {
            if (window.confirm('Seguro deseas eliminar el producto?')) {
                await firestore
                    .collection('products')
                    .doc(productId)
                    .delete();
            }

        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        handleLog();
        fetchProducts();
    },[])



    return <AppContext.Provider
        value={{
            isLogIn,
            setIsLogIn,
            handleAddNewProduct,
            products,
            deleteProduct,
            fetchProducts,
            fetchMore,
            noMoreProducts,
            setNoMoreProducts,
            fetchProductById,
            setProductById,
            productById
        }}
        >
        { children }
    </AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }