
import './ProductDetailContainer.css'
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { arrayProducts } from '../baseDatos/baseDatos';
import { ProductDetail } from '../ProductDetail/ProductDetail';
//firebase
import { collection, doc, getDoc, query, where } from 'firebase/firestore'
import { db } from '../../utils/firebase'
export const ProductDetailContainer = ()=>{
    
  
    
    const [itemProduct, setItemProduct] = useState({});
   
    const { id } = useParams()

    useEffect(()=>{
        const getData = async()=>{
         //crear referencia del punto de acceso de la informacion.
    
        const queryRef = doc((db, "items", id))
        
         //obtener todos los documentos de la coleccion items/
         const response = await getDoc(queryRef);
         console.log('response',response)
         const producto = response.docs;
         console.log(producto)
         
        }
        getData();
    },[])

    

    // const promesa = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(arrayProducts)
    //     }, 2000);
    // })

    // useEffect(()=>{
    //     const getProduct = async()=> {
    //         const productos = await promesa; // remplaza a un .then
    //         console.log('productos', productos)
    //         const producto = productos.find(elemento=>elemento.id === parseInt(id)) 
    //         console.log(producto);
    //         setItemProduct(producto);
    //     }
    //     getProduct();
    // },[id])

    
    return(
        <div className =''>
            <p style={{width: '100%', color: 'white'}}>Product Detail Container</p>
            {/*<ProductDetail item = {itemProduct}/>*/}

        </div>
    )
} 