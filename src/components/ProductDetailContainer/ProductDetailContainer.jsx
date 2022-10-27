
import './ProductDetailContainer.css'
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { arrayProducts } from '../baseDatos/baseDatos';
import { ProductDetail } from '../ProductDetail/ProductDetail';

export const ProductDetailContainer = ()=>{
    //const {id} = useParams();  destructuracion
    const id = useParams().id;

    const [itemProduct, setItemProduct] = useState({});

    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(arrayProducts)
        }, 2000);
    })

    useEffect(()=>{
        const getProduct = async()=> {
            const productos = await promesa; // remplaza a un .then
            console.log('productos', productos)
            const producto = productos.find(elemento=>elemento.id === parseInt(id)) 
            console.log(producto);
            setItemProduct(producto);
        }
        getProduct();
    },[id])

    
    return(
        <div className =''>
            <p style={{width: '100%', color: 'white'}}>Product Detail Container</p>
            <ProductDetail item = {itemProduct}/>

        </div>
    )
} 