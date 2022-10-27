import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext";
import { UserContext } from "../../../context/UserContext";
export const ComponenteB = ()=>{

    const value = useContext(ThemeContext);

    const perfil = useContext(UserContext);
    console.log(perfil)

    return(
        <div style={{padding: '1em', margin: '0.5em', border: '1px solid red'}}>
            <p>Componente B</p>
            {value.fontFamily}
            <h3>{perfil.nombre}</h3>
            <h4>Estas en {perfil.curso}</h4>
            <button onClick={()=>perfil.setCurso('Curso html')}>Cambiar Curso</button>
            {/*Si quiero pasarle parametros a una funcion, en este caso a la funcion setCurso, tenemos que pasarle antes un fun de tipo flecha*/}
        </div>
    )
}