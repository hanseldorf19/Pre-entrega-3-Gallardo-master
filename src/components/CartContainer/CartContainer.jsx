import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CartContainer.css'
import { useContext,useState } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from '../../utils/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom';


export const CartContainer = ()=>{

     // Muestra Productos
     const value = useContext(CartContext);

     const {prodCarrito, getTotalPrice, getTotalProducts,removeProduct, clear} = value;


     // Cupon descuento

     const [newPrice, setNewPrice]= useState(0)

    const [cuponDto, setCuponDto] = useState('');

     const aplicaCupon = (e)=>{
        e.preventDefault(); 
        if (cuponDto === 'Lan022') {

        const priceCuponDto = getTotalPrice() - (getTotalPrice() * 0.05);
        setNewPrice(priceCuponDto)
        console.log(priceCuponDto)
        
        } else if (cuponDto == '') {
            console.log('puede introducir un cupon')
            
        } else {

         console.log('Este cupon no tiene descuento')
        }
    }

    // Alerta Orden de Compra
    
    const Msg = () => (
        <div>
          <p>Muchas Gracias</p>
          {compraId && <p>Su compra fue realizada con el numero de orden {compraId}</p>}
          <Link to="/"><button className='mt-2 btn btn-primary' onClick={clear()}>Realizar Otra Compra</button></Link>
        </div>
      )

    const displayMsg = () => {
        toast(<Msg />, {position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
            }) 
      }

      const [compraId, setCompraId] = useState('');


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
            setCompraId(resultado.id)
           
        })

    }
    

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

                <form className='aplicaCupon d-block' >
                <label>Cupón Dto del 5%</label>
                    <input type='text' placeholder="Aplica Cupón Dto" onChange={(e)=>setCuponDto(e.target.value)}/>
                    <button type="submit" onClick={aplicaCupon} className='mt-2 mx-5 btn btn-dark'>Aplicar</button>
                </form>

                <p>Precio Final:</p> 
                    {
                    newPrice > 0 ? 
                    <div><p className='precioTachado'>{getTotalPrice()}</p> <p><stong>{newPrice}</stong></p>
                    </div> : <p>{getTotalPrice()}</p>
                }


                <form className='formCompra mt-3 mr-3' required= "required" onSubmit={SendOrder}>
                    <label>Nombre</label>
                    <input   type='text' placeholder="Nombre"  maxLength="45"/>
                    <label>Apellidos</label>
                    <input   type='text' placeholder="Apellidos"  maxLength="45"/>
                    <label>Dirección</label>
                    <input   type='text' placeholder="Dirección"  maxLength="100" />
                    <label>Codigo Postal</label>
                    <input   type='number' maxLength='5' placeholder="Código Postal"/>
                    <label>Teléfono</label>
                    <input   type='tel' maxLength="11" placeholder="Teléfono"/>
                    <label>Correo</label>
                    <input   type='mail' placeholder="Correo Electrónico"/>
                    <button className='d-block mt-5 mx-5 btn btn-dark text-center' type="Submit" onClick={displayMsg}>Comprar</button>
                </form>
                <ToastContainer />
            </div>

            : <p>No tione productos en el carrito</p>
        }

        </div>
        
        
    )
}
