import React, { useState, useEffect, useContext } from "react";
import { firestore, auth, handleUserProfile } from "../../firebase/utils";
import { handleAddProduct, handleFetchProducts } from '../../components/Products/Products.helper';


const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const initialState = {
        currentUser: null
    }

    const [isLogIn, setIsLogIn] = useState(initialState)
    const [products, setProducts] = useState([])
    const [lastDoc, setLastDoc] = useState();
    const [noMoreProducts, setNoMoreProducts] = useState(false)

    var authListeneer = null;

    const handleLog = () => {
        authListeneer = auth.onAuthStateChanged( async userAuth => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot(snapshot => {
                    setIsLogIn({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    })
                })
            }
            setIsLogIn(initialState)
        })
    }


    //PRODUCTS

    const handleAddNewProduct = (productCategory, productName, productImg, productDescription, productPrice) => {
        try {
            const timestamp = new Date();
            handleAddProduct({
                productCategory,
                productName,
                productImg,
                productDescription,
                productPrice,
                productAdminUserUID: auth.currentUser.uid,
                createdDate: timestamp
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
                const newProducts = collections.docs.map((product) => product.data());
                const lastDoc = collections.docs[collections.docs.length - 1];
                setProducts(newProducts);
                setLastDoc(lastDoc)
            })
    }



    const fetchMore = (filtro) => {
        if (filtro) productsRef = productsRef.where('productCategory', '==', filtro);

        productsRef
            .startAt(lastDoc)
            .limit(pageSize)            
            .get()
            .then((collections)=> {
                if(!noMoreProducts){
                    const newProducts = collections.docs.map((product) => product.data());
                    const lastDoc = collections.docs[collections.docs.length - 1];
                    setProducts((products) => [...products, ...newProducts] );
                    setLastDoc(lastDoc)
                } else {
                    setNoMoreProducts(true)
                }
            })
    }

    //OPCION 2
    // const fetchProducts = async (filtro, startAfterDoc, persistProducts) => {
    //     const pageSize = 6;

    //     let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

    //     if (filtro) ref = ref.where('productCategory', '==', filtro);
    //     if(startAfterDoc) ref = ref.startAfter(startAfterDoc);

    //     ref
    //         .onSnapshot((querySnapshot)=> {
    //             const totalCount = querySnapshot.size;
    //             const productsArray = [];

    //             querySnapshot.forEach((doc) => {
    //                 productsArray.push({
    //                     ...doc.data(),
    //                     id: doc.id
    //                 })
    //             })
    //             setProducts({
    //                 ...persistProducts,
    //                 productsArray,
    //                 queryDoc: querySnapshot.docs[totalCount - 1],
    //                 isLastPage: totalCount < 1
    //             })
    //         })
    // }

    //OBTENER DATOS DE FIRESTORE

    // const fetchProducts = async (filtro) => {
    //     const pageSize = 6;

    //     let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

    //     if (filtro) ref = ref.where('productCategory', '==', filtro);

    //     ref
    //         .onSnapshot((querySnapshot)=> {
    //             const productsArray = [];
    //             querySnapshot.forEach((doc) => {
    //                 productsArray.push({...doc.data(), id: doc.id})
    //             })
    //             setProducts(productsArray)
    //         })
    // }


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
            noMoreProducts
        }}
        >
        { children }
    </AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }