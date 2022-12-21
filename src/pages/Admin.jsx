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

import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


// const rowData = [
//     { name: "Anom", entry: 1, token: 10001, number:80808080, date:"09-02-2022" },
//     { name: "Anom", entry: 1, token: 10002, number:80808080, date:"11-02-2022" },
//     { name: "Subham", entry: 2, token: 10003, number:80808080, date:"12-02-2022" },
//     { name: "Subham", entry: 2, token: 10004, number:80808080, date:"10-02-2022" },
// ]

const dateFilterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
    console.log(cellValue)
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('/');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
  };


const Admin = () => {


    const user= useSelector((state)=> state.user.user.username)

    const dispatch= useDispatch()

    const navigate= useNavigate()

    const [ data, setData ]= useState([])
    const [ rows, setRows ]= useState(data)

    useEffect(()=> {
        const getData= async () => {
            try {
                const res= await axios.get("https://login-auth-database-pdf.onrender.com/api/entry/")
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





    const [gridApi, setGridApi]= useState()
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const rowData = [
        { name: "Anom", entry: 1, token: 10001, number:80808080, date:"09-02-2022" },
        { name: "Anom", entry: 1, token: 10002, number:80808080, date:"11-02-2022" },
        { name: "Subham", entry: 2, token: 10003, number:80808080, date:"12-02-2022" },
        { name: "Subham", entry: 2, token: 10004, number:80808080, date:"10-02-2022" },
    ]

    const columns= [
        { headerName: "Entry", field: "entryNumber" },
        { headerName: "Name", field: "name" },
        { headerName: "Number", field: "number" },
        { headerName: "Token", field: "tokenNumber" },
        { headerName: "Token", field: "tokenNumber" },
        { headerName: "Date", field: "date", filter: 'agDateColumnFilter', filterParams: dateFilterParams}
    ]

    const defColumnDefs = { flex: 1, }

    const onGridReady = (params) => {
        setGridApi(params)
    }

    
    const getFilterType = () => {
        if (startDate !== '' && endDate !== '') return 'inRange';
        else if (startDate !== '') return 'greaterThan'
        else if (endDate !== '') return 'lessThan'
      };

      useEffect(() => {
        if (gridApi) {
            // console.log(startDate)
          if (startDate !== '' && endDate !== '' && startDate > endDate) {
            alert("Start Date should be before End Date")
            setEndDate('')
          } else {
            var dateFilterComponent = gridApi.api.getFilterInstance('date');
            dateFilterComponent.setModel({
              type: getFilterType(),
              dateFrom: startDate? startDate: endDate,
              dateTo: endDate,
            });
            gridApi.api.onFilterChanged();
          }
    
        }
        // console.log(startDate, endDate)
    
      }, [startDate, endDate])


   


    const Row = (props) => {
        const { number, name, entryNumber, tokenNumber } = props

        return (
            <tr>
                <td>{entryNumber}</td>
                <td>{name}</td>
                <td>{number}</td>
                <td>{tokenNumber}</td>
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
            <h3 style={{marginTop: "70px"}} >
                Hi {user}!
            </h3>
            
            <h5>Download all the data</h5>
            <PDFDownloadLink document={<PDFFiles rows={rows} />} fileName={user} >
                {({loading})=> (loading ? <button>Loading...</button> : <button>Donwload</button>)}
            </PDFDownloadLink>

            <br/>
            <p>Table to download separate PDFs</p>
            <p>Scroll down for Date range filter</p>
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
                    createdAt= {row.createdAt}
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
        <br/>
        <h5>Table to download separate PDFs</h5>
        <div className='ag-theme-alpine' style={{height: 400, width: "80vw", backgroundColor:"white"}} >
        From : <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        To : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <AgGridReact
                rowData={data}
                columnDefs={columns}
                defaultColDef={defColumnDefs}
                onGridReady={onGridReady}
            />
        </div>
	</div>
    
    // </div>
);
}

export default Admin;
