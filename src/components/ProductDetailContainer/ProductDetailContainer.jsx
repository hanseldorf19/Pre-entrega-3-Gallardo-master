
import './ProductDetailContainer.css'
import { useState,useEffect } from "react"
import { useParams } from 'react-router-dom'
import { ProductDetail } from '../ProductDetail/ProductDetail'
//firebase
import {  doc, getDoc  } from 'firebase/firestore'
import { db } from '../../utils/firebase'

export const ProductDetailContainer = ()=>{    

    const [itemProduct, setItemProduct] = useState({});
   
    const { id } = useParams();

    useEffect(()=>{
        const getProducto = async()=>{
    
        const queryRef = doc((db, "items", id))
        
         const response = await getDoc(queryRef);
         
         const newDoc = {
            ...response.data(),
            id: response.id
        }

        setItemProduct(newDoc)
        console.log(itemProduct)
        }
        getProducto();
    },[id])


    return(
        <div className =''>
            <p style={{width: '100%', color: 'white'}}>Product Detail Container</p>
            <ProductDetail item = {itemProduct}/>

        </div>
    )
} 