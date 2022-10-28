import 'bootstrap/dist/css/bootstrap.min.css';

import { ProductList } from '../ProductList/ProductList'

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

//firebase
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../utils/firebase'


  // Productos
export const ProdListContainer = ()=> {

    
  const [productos, setProductos] = useState([]);

  
//Obtener docs - Conexión DB - Firebase

  useEffect(()=>{
   const getData = async()=>{
    //crear referencia del punto de acceso de la informacion.
   const queryRef = collection(db, "items");
    //obtener todos los documentos de la coleccion items/
    const response = await getDocs(queryRef);
    console.log(response);
    // docs es el array de la bd donde estan los productos(items) de la collecion items
    
    const documents = response.docs;

        const results = documents.map(elemento=>{
            return({
                ...elemento.data(),
                id: elemento.id,
            });
            
        })
        console.log('results', results)
        setProductos(results)
    }

    getData();
  },[])

// Obtener docs - Conexión DB - Firebase + Filtros direct db

const { categoryId } = useParams();

useEffect(()=>{
    const getData = async()=>{
     //crear referencia del punto de acceso de la informacion.
    const queryRef = query(collection(db, "items"), where('categoria','==', categoryId));
     //obtener todos los documentos de la coleccion items/
     const response = await getDocs(queryRef);
     console.log(response);
     // docs es el array de la bd donde estan los productos(items) de la collecion items
     
     const documents = response.docs;
 
     const results = documents.map(elemento=>{
        return({
            ...elemento.data(),
            id: elemento.id,
        })
        
    });
    console.log('results', results);
    setProductos(results);
}

getData();
},[])





    return (
        <div className='text-center mt-5 ml-5'>
        <h3 >Lista de Productos</h3>
        <ProductList items={productos}/>
        </div>
    )
}