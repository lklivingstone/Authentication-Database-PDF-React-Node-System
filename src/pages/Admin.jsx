import React, { useState} from 'react';
import '../App.css';
import "../styles/Navbar.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/userRedux";
import { useEffect } from 'react';
import axios from 'axios';
import PDFFile from '../components/PDFFile';
import PDFFiles from '../components/PDFFiles';
import { PDFDownloadLink } from '@react-pdf/renderer';



// const rowData = [
//     { name: "Anom", entry: 1, token: 10001, number:80808080, date:"09-02-2022" },
//     { name: "Anom", entry: 1, token: 10002, number:80808080, date:"11-02-2022" },
//     { name: "Subham", entry: 2, token: 10003, number:80808080, date:"12-02-2022" },
//     { name: "Subham", entry: 2, token: 10004, number:80808080, date:"10-02-2022" },
// ]




const Admin = () => {


    const user= useSelector((state)=> state.user.user.username)

    const dispatch= useDispatch()

    const navigate= useNavigate()

    const [ data, setData ]= useState([])
    const [ entries, setEntries ]= useState([])

    

    useEffect(()=> {
        const getData= async () => {
            try {
                const res= await axios.get("https://login-auth-database-pdf.onrender.com/api/entry/")
                setData(res.data)
                setEntries(res.data)
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





    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');





   

    useEffect(() => {
        if (data.length!==0) {
            if (startDate==='' && endDate==='') {
                setEntries(data)
            }
            else if (startDate !=='' && endDate==='') {
                const result= data.filter(singleEntry => {
                    const startDates = startDate.split('-');
                    const entryDates= singleEntry.date.split('/')
                    // console.log(entryDates)
                    // console.log(startDates)
                    if (entryDates[2]>=startDates[0] && entryDates[1]>=startDates[1] && entryDates[0]>=startDates[2]) {
                        return true
                    }
                })
                setEntries(result)
                // console.log(result)
            }
            else if (startDate ==='' && endDate !=='') {
                const result= data.filter(singleEntry => {
                    const endDates = endDate.split('-');
                    const entryDates= singleEntry.date.split('/')
                    // console.log(entryDates)
                    // console.log(startDates)
                    if (entryDates[2]<=endDates[0] && entryDates[1]<=endDates[1] && entryDates[0]<=endDates[2]) {
                        return true
                    }
                })
                setEntries(result)
                // console.log(result)
            }
            else if (startDate !=='' && endDate !=='') {
                const result= data.filter(singleEntry => {
                    const endDates = endDate.split('-');
                    const startDates = startDate.split('-');
                    const entryDates= singleEntry.date.split('/')
                    // console.log(entryDates)
                    // console.log(startDates)
                    if ((entryDates[2]<=endDates[0] && entryDates[2]>=startDates[0]) && (entryDates[1]<=endDates[1] && entryDates[1]>=startDates[1]) && (entryDates[0]<=endDates[2] && entryDates[0]>=startDates[2])) {
                        return true
                    }
                })
                setEntries(result)
                // console.log(result)
            }
        }
        
    }, [startDate, endDate])


   


    const Row = (props) => {
        const { date, number, name, entryNumber, tokenNumber } = props

        return (
            <tr>
                <td>{entryNumber}</td>
                <td>{name}</td>
                <td>{number}</td>
                <td>{tokenNumber}</td>
                <td>{date}</td>
                <td><PDFDownloadLink document={<PDFFile entryNumber={entryNumber} name={name} number={number} tokenNumber={tokenNumber}  />} fileName={name} >
                {({loading})=> (loading ? <button>Loading...</button> : <button>Download</button>)}
            </PDFDownloadLink></td>
            </tr>
        )
    }



    const Table = (props) => {
        const { newData }= props 
        return (
            <>
            <table>
                <tbody>
                <tr>
                    <th>Entry</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Token</th>
                    <th>Date</th>
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
                    date={row.date}
                    createdAt= {row.createdAt}
                    />
                    )}
                </tbody>
            </table>
                    </>
        )
    }


return (
	<div className="App">
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

                        </li>
                    </ul>
                </div>
            </nav>
            <h3 style={{marginTop: "80px"}} >
                Hi {user}!
            </h3>
            
            <h5>Download the entries for the selected days</h5>
            <PDFDownloadLink document={<PDFFiles rows={entries} />} fileName={user} >
                {({loading})=> (loading ? <button>Loading...</button> : <button>Download</button>)}
            </PDFDownloadLink>

        <h2>Table:</h2>

        From : <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        To : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <Table newData = {entries} />
        <br />

	</div>
);
}

export default Admin;
