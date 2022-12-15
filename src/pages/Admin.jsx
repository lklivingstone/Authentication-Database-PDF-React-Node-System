import React, { useState} from 'react';
import '../App.css';
import "../styles/Navbar.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/userRedux";
import { useEffect } from 'react';
import axios from 'axios';

// const data = [
//     { name: "Anom", entry: 1, token: 10001 },
//     { name: "Anom", entry: 1, token: 10002 },
//     { name: "Subham", entry: 2, token: 10003 },
//     { name: "Subham", entry: 2, token: 10004 },
// ]

const Admin = () => {
    const user= useSelector((state)=> state.user.user.username)

    const dispatch= useDispatch()

    const navigate= useNavigate()

    const [data, setData]= useState([])
    const [ rows, setRows ]= useState(data)

    useEffect(()=> {
        const getData= async () => {
            try {
                const res= await axios.get("http://localhost:5000/api/entry/")
                setData(res.data)
                setRows(res.data)
            }catch(err) {

            }
        }
        getData()
    },[])

	const handleClick=(e)=>{
	    e.preventDefault();
        dispatch(logOut())

        navigate("/")
	}   

    const handlePDF = async (e) => {
        // console.log(e)
        try {
            window.open(`http://localhost:5000/api/pdf/?target=http://localhost:3000/entry/${e}`, '_blank', 'noopener,noreferrer');
            const res= await axios.get(`http://localhost:5000/api/pdf/?target=http://localhost:3000/entry/${e}`)
        } catch(err) {

        }
    }


    const Row = (props) => {
        const { number, name, entryNumber, tokenNumber } = props
        // console.log(number)
        return (
            
            <tr>
                <td>{entryNumber}</td>
                <td>{name}</td>
                <td>{number}</td>
                <td>{tokenNumber}</td>
                <td><button onClick={() => handlePDF(tokenNumber)}>click</button></td>
            </tr>
        )
    }

    // const openInNewTab = url => {
    //     window.open(url, '_blank', 'noopener,noreferrer');
    //   };

    const Table = (props) => {
        const { newData }= props 
        return (
            <>
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
                            <button style={{backgroundColor: "white", padding: "10px 25px", fontSize: "16px"}} onClick={handleClick} >Logout</button>
                            {/* <a href="/admin">logout</a> */}
                        </li>
                    </ul>
                </div>
            </nav>
            <h3>
                Hi {user}!
            </h3>
            {/* <button onClick={()=> openInNewTab('https://google.com')}></button> */}
            <table>
                <tbody>
                <tr>
                    <th>Entry</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Token</th>
                    <th>pdf</th>
                </tr>
                </tbody>
                <tbody>
                {newData.map(row=> 
                    <Row 
                    key={row.tokenNumber}
                    entryNumber= {row.entryNumber}
                    name={row.name}
                    number={row.number}
                    tokenNumber= {row.tokenNumber}
                    />
                    )}
                </tbody>
            </table>
                    </>
        )
    }


return (
    // <div >
	<div className="App">
        <header>
            Table
        </header>



        
        <Table newData = {rows} />

	</div>
    
    // </div>
);
}

export default Admin;
