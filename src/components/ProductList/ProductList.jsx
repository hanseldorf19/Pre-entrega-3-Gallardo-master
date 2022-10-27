import {Product} from '../Product/Product'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css'

export const ProductList = ({items})=>{ 
// destructuracion obtener la propiedades de un objeto
// const { items, otraPropiedad} = props; tomamos esa propiedad de props
// Se utiliza la edstructuracion directamente en los parametros de la función
// POr eso podemos poner export const ProductList = ({items})=>console.log(props);
// Asi no hay que estar haciendo props.Propiedad1, props.Propiedad2, ...
return(
    <div className='w-75 girdPosition'>
        
        <div className='productsGird  d-flex flex-row mt-2 p-1 mx-2'>
        
       
            {
                // Por cada elemento voy a crear un componente
                // key es una propiedad de map  
                
                items.map(producto=>(<Product key={producto.id} item={producto}/>))

            }
       

        </div>
    </div>
)

}

/* Explicacion del map
Pasa por cada objeto y crea un componente con las propiedades iguales a las de cada elemento del objeto


const Arreglo = [
    {id: 1, name: 'Pedro'},
    {id: 2, name: 'Juan'}
]

Arreglo.map(elemento=>(
    <Component propiedad={elemento}/>
))
*/