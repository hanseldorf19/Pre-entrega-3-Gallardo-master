import React, {useState, createContext} from "react"


export const CartContext = createContext()

export const CartProvider = ({children})=>{
// creamos unn componente que retorna un provider de este contexto
    const [prodCarrito, setProdCarrito] = useState([]);
    //verificamos si el producto ya existe o no
    const isInCart = (id)=>{
        // podriasmo usar filte o finde, el que mas lo hace es some
        // si uno de los elemento cumple una condición me retorna un true
        const prodExist = prodCarrito.some((elemento)=>elemento.id === id);
        // some va a buscar todos los elementos si uno solo cumple la condición, some me retorna true
        return prodExist;
    }
    
    const addProduct = (item, quantity)=>{
        const productosCartCopy = [...prodCarrito];
        //si el producto ya existe, modificamos quantity
        const newProduct= {
            ...item, 
            quantity: quantity,
            quantityPrice: item.price * quantity,
            };
       
        if(isInCart(item.id)) {
            const posProduct = productosCartCopy.findIndex((elemento)=> elemento.id === item.id)
            productosCartCopy[posProduct].quantity += quantity;
            productosCartCopy[posProduct].quantityPrice = productosCartCopy[posProduct].quantity * 
            productosCartCopy[posProduct].price;

            setProdCarrito(productosCartCopy);
        } else {
         // sino agrego el nuevo producto al arreglo
         
        productosCartCopy.push(newProduct)
        setProdCarrito(productosCartCopy)
        }
        // item.title item.price... en vez de eso ...item spread operator
       
        //se suele usar una copia para no trabajar con la variable e estado
        
       
    }

    const getTotalPrice = ()=>{
        // reduce es un metodo que nos permite ir acumulando valores en una variable, y esa variable es el
        //valor de esta operación, la forma tradicional sera un for
        /*
        for (let i=0; i<array.lenght; i++) {
            acc = acc + array[i].quantityPrice
        }*/

        const precioTotal = prodCarrito.reduce((acc,curr)=>acc + curr.quantityPrice,0)
        // acumulaodr y curr current Price
        return precioTotal;
    }

    const getTotalProducts = ()=>{
        const totalProducts = prodCarrito.reduce((acc, curr)=>acc + curr.quantity,0)
        return totalProducts;
    }

    const removeProduct = (id)=>{
        const newProducts = prodCarrito.filter((elemento)=>elemento.id !== id)
        setProdCarrito(newProducts)

    }
    return(

        <CartContext.Provider value={{prodCarrito, addProduct, getTotalPrice, getTotalProducts, removeProduct}}>
            {children} 
        </CartContext.Provider>

    )
}