import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ImagenLogo from '../../assets/logo-mejor-horchata.png'
import { CardWidget } from '../CardWidget/CardWidjet';
import { Link, NavLink } from 'react-router-dom';

export const NavBar = ()=>{
    return( 
        <nav className='navigation '>
            <Link to="/"><img src={ImagenLogo} className='logoImg' alt="Mejor Horchata"></img></Link>
            <ul className='list mt-4 pt-1'>
                <li><NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} 
                to="category/horchatas">Horchatas</NavLink></li>
                <li><NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} 
                 to="category/fartons">Fartons</NavLink></li>
                 <li><NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} 
                to="category/chufadelight">Chufa Delights</NavLink></li>
                <li><NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} 
                to="category/frutossecos">Frutos Secos</NavLink></li>
                <li><NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} 
                to="category/bebidas-vegetales">Bebidas Vegetales</NavLink></li>
                <li><NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} 
                to="category/cacaoychoco">Cacao y Choco</NavLink></li>
                <li><NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} 
                to="category/coco">Coco</NavLink></li>
                 <li><NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} 
                to="category/mas-productos">...</NavLink></li>
            </ul>
            <NavLink className={({isActive})=>isActive === true ? 'claseActiva' : 'claseInActiva'} to='/cart'>
            <CardWidget/>
            </NavLink>
        </nav>
    )
}