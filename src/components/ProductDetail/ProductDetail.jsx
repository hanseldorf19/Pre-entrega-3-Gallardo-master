import './ProductDetail.css';
import '../../App.css'
import { useContext } from 'react';
import { ItemCounter } from '../itemCounter/itemCounter';
import { CardWidget } from '../CardWidget/CardWidjet';
import { CartContext } from '../../context/CartContext';



export const ProductDetail = ({item})=> {

    
    const {addProduct} = useContext(CartContext)
   
    const agregarProducto = (quantity)=>{
        addProduct(item,quantity)
        console.log(quantity)
    }

    /*const addProducts = (quantity)=>{
        console.log('counter',quantity)
        setContador(quantity)
        value.agregarProducto({title: 'fartons', price: 20, cantidad: quantity })
        
    }*/


    return(
        <div className="ProductContainer">
            <div className='imgLarge'>
                <img src={item.picUrlLarge} alt={item.title}/>
            </div>
            <div className='descripContainer'>
            <h3>{item.title}</h3>
            <h5>{item.price}</h5>
            
            <ItemCounter initial={1} stock={5} onAdd={agregarProducto} />
            {/*
                contador > 1 ? <button>Terminar Compra</button> : ''
            */}
            </div>
            
        </div>
    )
}

