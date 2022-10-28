import './ProductDetail.css';
import '../../App.css'
import { useContext } from 'react';
import { ItemCounter } from '../itemCounter/itemCounter';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useState } from 'react';



export const ProductDetail = ({item})=> {

    const [contador, setContador] = useState(0)
    const {addProduct} = useContext(CartContext)
   
    const agregarProducto = (quantity)=>{
        addProduct(item,quantity)
        setContador(quantity)
        console.log(quantity)
    }

    return(
        <div className="ProductContainer">
            <div className='imgLarge rounded'>
                <img src={item.picUrlLarge} alt={item.title}/>
            </div>
            <div className='descripContainer'>
            <h3>{item.title}</h3>
            <h5>{item.price}</h5>
            
            <ItemCounter initial={1} stock={5} onAdd={agregarProducto} />
          
                {
                    contador > 1 ? <NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} to='/cart'>
                        <button className='btn btn-dark'>Terminar Compra</button></NavLink> : ''
                }
            
            </div>
            
        </div>
    )
}

