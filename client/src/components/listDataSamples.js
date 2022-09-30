import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataSampleService from "../services/datasample.service";
import { Container, width } from "@mui/system";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 18,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    },
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
}));

export default class ListDataSamples extends Component {
    constructor(props) {
        super(props);
        this.retrieveDataSamples = this.retrieveDataSamples.bind(this);
        
        this.state = {
            dataSamples: [],
            currentDataSample: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveDataSamples();
    }

    retrieveDataSamples() {
        DataSampleService.getAll()
            .then(response => {
                this.setState({
                    dataSamples: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshDataSampleList() {
        this.retrieveDataSamples();
        this.setState({
            currentDataSample: null,
            currentIndex: -1
        });
    }

    setActiveDataSample(dataSample, index) {
        this.setState({
            currentDataSample: dataSample,
            currentIndex: index
        });

    }


    render() {
        const { dataSamples, currentDataSample, currentIndex } = this.state;

        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100vh",
                width: "90vw"

            }}>
                <h1 style={{ alignSelf: 'flex-start' }}>Data Samples List</h1>
                                        <div style={{padding: '1%'}}>

            {currentDataSample ? (
                    <div>
                            <h4>Data Sample</h4>
                            <div>
                                <label>
                                    <strong>Date:</strong>
                                </label>{" "}
                                {currentDataSample.time}
                            </div>
                            <div>
                                <label>
                                    <strong>Frequency:</strong>
                                </label>{" "}
                                {currentDataSample.freq}
                            </div>
                            {/* <Link
                                to={"/datasamples/" + currentDataSample.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link> */}
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Data Sample...</p>
                        </div>
                    )}
            
            <TableContainer component={Paper} sx={{maxHeight: "70vh"}} >
                    <Table stickyHeader sx={{ 
                        width: "100%",
                        backgroundColor: "lightblue",
                        // border: "1px solid black",
                        borderCollapse: "collapse",
                        
                    }} >
                        <TableHead sx={{position: 'sticky'}}>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Time</StyledTableCell>
                                <StyledTableCell>Freq</StyledTableCell>
                                <StyledTableCell>Vab</StyledTableCell>
                                <StyledTableCell>Vbc</StyledTableCell>
                                <StyledTableCell>Vca</StyledTableCell>
                                <StyledTableCell>Van</StyledTableCell>
                                <StyledTableCell>Vbn</StyledTableCell>
                                <StyledTableCell>Vcn</StyledTableCell>
                                <StyledTableCell>pf</StyledTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {dataSamples &&
                            dataSamples.map((dataSample, index) => (
                                <StyledTableRow
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveDataSample(dataSample, index)}
                                    key={index}
                                >
                                    <StyledTableCell>{dataSample.id}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Time}</StyledTableCell>
                                    <StyledTableCell>{dataSample.freq}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Vab}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Vbc}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Vca}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Van}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Vbn}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Vcn}</StyledTableCell>
                                    <StyledTableCell>{dataSample.pf}</StyledTableCell>


                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>


                    
                </TableContainer>
                </div>
                </div>
        );
    }
}