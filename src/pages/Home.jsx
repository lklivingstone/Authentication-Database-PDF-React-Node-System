import React, {useState} from 'react';
import '../App.css';
import "../styles/Navbar.css"
import { entry } from "../redux/apiCalls"

const Home = () => {

	const [name , setName] = useState('');
	const [number , setNumber] = useState('');

	const handleChange =(e)=>{
	    setName(e.target.value);
	}
	
	const handleNumber =(e)=>{
	    setNumber(e.target.value);
	}
	const handleSubmit=(e)=>{
        // console.log("run")
	    entry({ name, number })

	}

   



return (
    // <div >
	<div className="App">
        {/* <Navbar /> */}
        <nav className="navigation">
            <a href="/" className="brand-name">
                ST
            </a>
        
            <div className="navigation-menu">
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/admin">Admin</a>
                    </li>
                </ul>
            </div>
        </nav>
        <header>
            Assignment
        </header>
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <br/>
            <label >
                Name:
            </label><br/>
            <input type="text" value={name} required onChange={(e)=> {handleChange(e)}} /><br/>
            
            <label>
                Number:
            </label><br/>
            <input type="number" value={number} required onChange={(e)=> {handleNumber(e)}} /><br/>
                
            <button type="submit" >Submit</button>
        </form>

	</div>
    
    // </div>
);
}

export default Home;
