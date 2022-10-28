
import './ProductDetailContainer.css'
import { useState,useEffect } from "react"
import { useParams } from 'react-router-dom'
import { ProductDetail } from '../ProductDetail/ProductDetail'
//firebase
import {db} from "../../utils/firebase";
import {doc,getDoc} from "firebase/firestore";

// /item/id
export const ProductDetailContainer = ()=>{
    const {id} = useParams();
    const [itemProduct, setItemProduct] = useState({});
 
    useEffect(()=>{
        const getProducto = async()=>{
           
            const queryRef = doc(db,"items",id);
          
            const response = await getDoc(queryRef);
            console.log(response)
            const newDoc = {
                ...response.data(),
                id:response.id
            }
        
            setItemProduct(newDoc)
        }
        getProducto();
    },[id])

    return(
        <div className="item-detail-container">
            <p style={{width:"100%", color: "white"}}>item detail container</p>
            <ProductDetail item={itemProduct}/>
        </div>
    )
}




















// export const ProductDetailContainer = ()=>{    

//     const [itemProduct, setItemProduct] = useState({});
   
//     const { id } = useParams();

//     useEffect(()=>{
//         const getProducto = async()=>{
    
//         const queryRef = doc((db, "items", id))
        
//          const response = await getDoc(queryRef);
         
//          const newDoc = {
//             ...response.data(),
//             id: response.id
//         }

//         setItemProduct(newDoc)
//         console.log(itemProduct)
//         }
//         getProducto();
//     },[id])


//     return(
//         <div className =''>
//             <p style={{width: '100%', color: 'white'}}>Product Detail Container</p>
//             <ProductDetail item = {itemProduct}/>

//         </div>
//     )
// } 