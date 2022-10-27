import { ThemeContext } from "../../../context/ThemeContext"
import { useState } from "react"

import { UserContext } from "../../../context/UserContext"

import { ComponenteA } from "../Componente A/ComponenteA"
import { ComponenteB } from "../Componente B/ComponenteB"

export const PaginaContexto = ()=>{

    const [curso, setCurso] = useState('');
    const [nombre, setNombre] = useState('');
    return(
        <div>
            <p>Pagina de Contexto</p>
            <UserContext.Provider value = {{nombre: nombre, setNombre: setNombre, edad: 25, curso: curso, setCurso: setCurso}}>
                <ThemeContext.Provider value={{backgroundTheme : 'blue',  fontFamily : 'Arial'}}>
                    <ComponenteA/>
                    <ComponenteB/>
                </ThemeContext.Provider>
            </UserContext.Provider>
        </div>
    )
}