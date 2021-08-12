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

    const fetchProducts = async () => {

        firestore.collection('products')
            .orderBy('createdDate')
            .onSnapshot((querySnapshot)=> {
                const productsArray = [];
                querySnapshot.forEach((doc) => {
                    productsArray.push({...doc.data(), id: doc.id})
                })
                setProducts(productsArray)
            })


        // try {
        //     const newProducts = handleFetchProducts();
        //     console.log(products);
        //     setProducts(newProducts);
        // } catch (err) {
        //     // console.log(err);
        // }
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
            deleteProduct
        }}
        >
        { children }
    </AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }