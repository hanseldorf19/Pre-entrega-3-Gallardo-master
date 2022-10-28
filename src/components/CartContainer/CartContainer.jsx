import 'bootstrap/dist/css/bootstrap.min.css'
import './CartContainer.css'
import { useContext,useState } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from '../../utils/firebase'
import { collection, addDoc, doc } from 'firebase/firestore'

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


    return(
        <div>
        <div className='PrductCard'>
        {

        prodCarrito.map((producto)=>(
        <div style={{transform: 'scale(0.7)', margin: '1em',  border:'solid 1px brown'}}>
            <img src={producto.picUrl}/>
            <h3>{producto.title}</h3>
            <h4>Precio unidad {producto.price} €</h4>
            <p>Cantidad: {producto.quantity}</p>
            <p>Precio total: {producto.quantityPrice} € </p>
            <button className='mt-2 btn btn-dark' onClick={()=>removeProduct(producto.id)}>Eliminar</button>
        </div>
        ))

        }   
        <p><strong>Precio Total: </strong>{getTotalPrice()}</p>
        <p><strong>Productos: </strong>{getTotalProducts()}</p>

        {
            compraId && <p>Su compra fue realizada con el numero de orden {compraId}</p>
        }
        
         {
         
         prodCarrito.lenght > 0 ? 
         <div className='mt-3 ml-3'>
         <p>Facilite sus datos por favor</p>
        <form onSubmit={SendOrder}>
            <label>Nombre</label>
            <input type='text' placeholder="Nombre"/>
            <label>Télefono</label>
            <input type='tel' placeholder="Nombre"/>
            <label>Correo</label>
            <input type='mail' placeholder="Correo Electrónico"/>
            <button className='mt-2 btn btn-dark' type="Submit">Comprar</button>
        </form>
            </div>
        :

        <h4 className='mt-5 '>No tiene productos en su carrito de compra</h4>
        
        }
    
       </div>
       </div>
        
    )
}   