import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext"
import { UserContext } from "../../../context/UserContext"

export const ComponenteA = ()=>{

    const value = useContext(ThemeContext)
    const perfil = useContext(UserContext);

    console.log(perfil)

    console.log(value)

    return(
        <div style={{padding: '1em', margin: '0.5em', border: '1px solid red'}}>
            <p>Componente A</p>
            <p>Hola {perfil.nombre}</p>
            {value.backgroundTheme}
            <button onClick={()=>perfil.setNombre('Pepe')}>Cambiar nombre</button>
        </div>
    )
}