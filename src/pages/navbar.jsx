import { TbCoffee } from "react-icons/tb";
import { BiSolidCoffeeTogo } from "react-icons/bi";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import '../assets/global.css'
import { useGiraf } from "../giraff";
const NavBar = () => {
    const { gHead, addGHead } = useGiraf()
    return (
        <div className="nav-bar">
            <div className="nav-box" style={{
                color: gHead.level == 'beginner' && '#803300'
            }} onClick={()=>{
                addGHead('level', 'beginner')
            }}>
                <TbCoffee className="icon" style={{
                    color: gHead.level == 'beginner' && '#803300'
                }} />
                <p>Beginner</p>
            </div>
            <div className="nav-box" style={{
                color: gHead.level == 'intermediate' && '#803300'
            }} onClick={()=>{
                addGHead('level', 'intermediate')
            }}>
                <BiSolidCoffeeTogo className="icon"style={{
                color: gHead.level == 'intermediate' && '#803300'
            }} />
                <p>Intermediate</p>
            </div>
            <div className="nav-box" style={{
                color: gHead.level == 'advance' && '#803300'
            }} onClick={()=>{
                addGHead('level', 'advance')
            }}>
                <MdOutlineCoffeeMaker className="icon" style={{
                color: gHead.level == 'advance' && '#803300'
            }}/>
                <p>Advance</p>
            </div>

        </div>
    )
}

export default NavBar