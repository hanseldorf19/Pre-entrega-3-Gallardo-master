import 'bootstrap/dist/css/bootstrap.min.css'

import { useContext,useState } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from '../../utils/firebase'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'

export const CartContainer = ()=>{


    const value = useContext(CartContext);
    // desdestructuramos el value en diferentes valores value.prodCArrito
    const {prodCarrito, getTotalPrice, getTotalProducts,removeProduct} = value;

    const [compraId, setCompraId] = useState('');
    //Asi ya podemos mostrar la compra al usuario para finalizar la compra

    //console.log('prodCarrito', prodCarrito)
    const SendOrder = (evt)=>{
        evt.preventDefault(); // Como los formularios hacen que se reacrgen la pagina, esta función lo previente (evt es el envento de submit)
        //console.log(evt.target[0].value);  
        const compra = {
            buyer: {
                name: evt.target[0].value,
                phone: evt.target[1].value,
                email: evt.target[2].value
            },
            items: prodCarrito,
            totla: getTotalPrice()
        }  
        //console.log('compra',compra)
        
        // Al llamar la metodos Va a crear la colleccion orders en mi bd de Firebase donde voy a guardar los datos
        const queryRef = collection(db,'orders')
        // agregar la información (como vamos a solicitar esa conexion se procesa una PROMESA)
        addDoc(queryRef,compra).then((resultado)=>{
            console.log(resultado.id) 
            setCompraId(resultado.id)
        })

    }

    const updateProduct = ()=> {
        //Primero creamos la referencia del producto que vamos a actualizar
        const queryRef = doc(db,'items', 'U7tYXKbz46JxqetaL3h8');
        //actualizamos el documento // nos devulve una promesa, que no nos da un dato, nos da si se realizo o no
        // el primer elemento es el doc que vamos a actualizar y el segundo la propiedad de ese doc
        updateDoc(queryRef,{price:120}).then(()=>console.log('actualizado correctamente'))
        .catch(()=>console.log('hubo un error'));
    }

    return(
        
        <div style={{width: '800px'}}>
        {

        prodCarrito.map((producto)=>(
        <div style={{transform: 'scale(0.7)', margin: '1em',  border:'solid 1px brown'}}>
            <img src={producto.picUrl}/>
            <h3>{producto.title}</h3>
            <h4>Precio unidad {producto.price} €</h4>
            <p>Cantidad: {producto.quantity}</p>
            <p>Precio total: {producto.quantityPrice} € </p>
            <button onClick={()=>removeProduct(producto.id)}>Eliminar</button>
        </div>
        ))

        }   
        <p><strong>Precio Total: </strong>{getTotalPrice()}</p>
        <p><strong>Productos: </strong>{getTotalProducts()}</p>

        {
            compraId && <p>SU compra fue realizada con el numero de orden {compraId}</p>
        }
        
         {//   prodCarrito.lenght > 0 ?  :
         }
        
        <form onSubmit={SendOrder}>
            <label>Nombre</label>
            <input type='text' placeholder="Nombre"/>
            <label>Télefono</label>
            <input type='tel' placeholder="Nombre"/>
            <label>Correo</label>
            <input type='mail' placeholder="Correo Electrónico"/>
            <button type="Submit">Enviar Orden</button>
        </form>

        <h4 className='mt-5'>No tiene productos en su carrito de compra</h4>
        <button onClick={updateProduct}>Actualizar Producto</button>
       </div>
        
    )
}   