import { firestore } from "../../firebase/utils";

export const handleAddProduct = product => {
    return new Promise ((resolve, reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    })
} 




// export const handleFetchProducts = async () => {
//     await firestore
//             .collection('products')
//             .onSnapshot((querySnapshot)=> {
//                 const productsArray = [];
//                 querySnapshot.forEach((doc)=> {
//                     productsArray.push({...doc.data(), id: doc.id})
//                 })
//                 return productsArray
//             })
// }


// export const handleFetchProducts = () => {
//         return new Promise ((resolve, reject) => {
//             firestore
//                 .collection('products')
//                 .get()
//                 .then((snapshot) => {
//                     const productsArray = [];
//                     snapshot.docs.forEach(doc => {
//                         productsArray.push({...doc.data(), id: doc.id})
//                     });
//                     resolve(productsArray)
//                 })
//                 .catch(err => {
//                     reject(err);
//                 })
//         })
// }