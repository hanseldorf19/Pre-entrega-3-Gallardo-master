import 'bootstrap/dist/css/bootstrap.min.css';
//import { arrayProducts } from '../baseDatos/baseDatos';
import { ProductList } from '../ProductList/ProductList'
// import { categoryId } from '../Apps.js'
import { useState, useEffect } from 'react';
// import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//firebase
import { collection, doc, getDoc, getDocs, query, where, limit } from 'firebase/firestore'
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

    // para entender

//     console.log('contenido',documents[0].data())
//     console.log('id doc', documents[0].id)

//     const newDoc = {
//         ...documents[0].data(),
//         id: documents[0].id,
//     }
//     console.log('newDoc',newDoc)

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
    const queryRef = query(collection(db, "items"), where('categoria','==',categoryId));
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

/*
const categoryId = useParams().categoryId;
console.log(useParams());  
    
const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(documents)
        }, 2000);
    })


    useEffect(()=>{
        promesa.then((response)=>
        {   
            if (categoryId){
                // vamos a filtrar por categoria
                const productsFilter = response.filter(elemento=>elemento.categoria === categoryId)
                setProductos(productsFilter)
            } else {
                // vamos a ver todos los prodcutos
                setProductos(response)
            }
        }
        )
           
        },[categoryId])
    
*/


//Obtener un documento

useEffect(()=>{
    const getData = async()=>{
     //crear referencia del punto de acceso de la informacion.
    const queryRef = query(db,'items','U7tYXKbz46JxqetaL3h8');
     //obtener todos los documentos de la coleccion items/
     const response = await getDoc(queryRef);
     console.log(response);
     // docs es el array de la bd donde estan los productos(items) de la collecion items
     
     const documents = response.docs;
 
     const results =
            {
                ...response.data(),
                id: response.id,
        }; 
        
    console.log('results', results)
    }

},[])


    return (
        <div className='text-center mt-5 ml-5'>
        <h3 >Lista de Productos</h3>
        <ProductList items={productos}/>
        </div>
    )
}