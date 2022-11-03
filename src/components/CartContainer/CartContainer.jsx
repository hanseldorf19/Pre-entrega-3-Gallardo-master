import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CartContainer.css'
import { useContext,useState } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from '../../utils/firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'


export const CartContainer = ()=>{

     // Cupon descuento

    const [cuponDto, setCuponDto] = useState('');

     const aplicaCupon = (cupon)=>{
        cupon.preventDefault()
        console.log(cupon)
        setCuponDto(cupon);
        
        if (cuponDto === 'Lan022') {

        const priceCuponDto = getTotalPrice() - (getTotalPrice() * 0.05);
        priceCuponDto = getTotalPrice();
        console.log(priceCuponDto)
        
        } else if (cuponDto == '') {
            console.log('puede introducir un cupon')

        } else {

         console.log('puede introducir un cupon')
        }
    }

    // Alerta Orden de Compra
    
    const Msg = () => (
        <div>
          {compraId && <p>Su compra fue realizada con el numero de orden {compraId}</p>}
          
         
        </div>
      )

    const displayMsg = () => {
        toast(<Msg />) 

      }

      const [compraId, setCompraId] = useState('');

    // Muestra Productos
    const value = useContext(CartContext);

    const {prodCarrito, getTotalPrice, getTotalProducts,removeProduct} = value;

    
    // Mandar Orden de Compra
    const SendOrder = (evt)=>{
        evt.preventDefault(); 
        const compra = {
            buyer: {
                name: evt.target[0].value,
                phone: evt.target[1].value,
                email: evt.target[2].value
            },
            items: prodCarrito,
            total: getTotalPrice()
        }  
      
        
        // Crear y subir a Firestore
        const queryRef = collection(db,'orders')
      
        addDoc(queryRef,compra).then((resultado)=>{
            console.log(resultado.id)
            setCompraId(resultado.id)
        })


       

        }

        
        // const getName = async()=>{

        //     const docRef = doc(db,"orders",compra.buyer);
        //     const docSnap = await getDoc(docRef);

        //     if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        //     } else {
        //     console.log("No such document!");
        //     }  

        // }
        // getName(); 
        

    

    return(

        <div className='CartContainer d-flex bd justify-content-center flex-row '>
            <div className='d-block mx-5'>
            

            {

                prodCarrito.map((producto)=>(
                    <div className='ProductCard'>
                        <div className='innerProd'>
                            <img src={producto.picUrl}/>
                            <h3>{producto.title}</h3>
                            <h4>Precio unidad {producto.price} €</h4>
                            <p className='mt-2'>Cantidad: <strong>{producto.quantity}</strong></p>
                            <button className='mt-2 mx-2 btn btn-outline-dark disabled'>{producto.quantity}</button>
                            <button className='mt-2 btn btn-dark' onClick={()=>removeProduct(producto.id)}>Eliminar</button>
                        </div>
                    </div>
                ))
            

            }  
        
            </div>
       
      
        {

        prodCarrito.length >= 1 ?
            
            <div className='mt-5 mx-5'>
                <p><strong>Precio Total: </strong>{getTotalPrice()}</p>
                <p><strong>Productos: </strong>{getTotalProducts()}</p>
                <p><strong>Finalizar Compra</strong></p>

                <form className='aplicaCupon d-block' onSubmit={aplicaCupon}>
                <label className='mx-3'>Cupón Dto del 5%</label>
                    <input type='text' placeholder="Aplica Cupón Dto"/>
                    <button type="Submit" className='d-block mt-2 mx-5 btn btn-dark'>Aplicar</button>
                </form>

                <p>Precio Final: {getTotalPrice()}</p>

                <form className='formCompra mt-3 mr-3' required= "required" onSubmit={SendOrder}>
                    <label>Nombre</label>
                    <input type='text' placeholder="Nombre" required maxlength="45"/>
                    <label>Apellidos</label>
                    <input type='text' placeholder="Apellidos" required maxlength="45"/>
                    <label>Dirección</label>
                    <input type='text' placeholder="Dirección" required maxlength="100" />
                    <label>Codigo Postal</label>
                    <input type='number' required maxlenght='5' placeholder="Código Postal"/>
                    <label>Teléfono</label>
                    <input type='tel' required maxlength="11" placeholder="Teléfono"/>
                    <label>Correo</label>
                    <input type='mail' placeholder="Correo Electrónico"/>
                    <button className='d-block mt-5 mx-5 btn btn-dark text-center' type="Submit" onClick={displayMsg}>Comprar</button>
                </form>
                <ToastContainer />
            </div>

            : <p>No tione productos en el carrito</p>
        }

        </div>
        
        
    )
}
