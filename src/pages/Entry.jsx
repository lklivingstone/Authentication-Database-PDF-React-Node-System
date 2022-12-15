import React, {useState} from 'react';
import '../App.css';
import "../styles/Navbar.css"
import { entry } from "../redux/apiCalls"
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";


const Entry = ({entryNumber, name, number, tokenNumber}) => {

    const [data, setData]= useState([])
    const location= useLocation();
    const token= location.pathname.split("/")[2];
    console.log(token)
    useEffect(()=> {
        const getData= async () => {
            try {
                const res= await axios.get(`https://login-auth-database-pdf.onrender.com/api/entry/find/${token}`)
                setData(res.data)
            }catch(err) {

            }
        }
        getData()
    },[])

return (
    <div style={{position: "fixed", top: "0", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
        
        <h2>{data.entryNumber} - {data.tokenNumber} - {data.number} - {data.name} </h2>
    </div>
);
}

export default Entry;
