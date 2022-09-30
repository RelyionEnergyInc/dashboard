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
import { Container } from "@mui/system";


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
                height: "100vh"

            }}>
                <h1 style={{alignSelf: 'flex-start', paddingLeft: '5%'}}>Data Samples List</h1>
            {currentDataSample ? (
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Data Sample: {currentDataSample.id}</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <label>
                                <strong>Date:</strong>
                            </label>{" "}
                            {currentDataSample.Time}
                        </TableRow>
                        <TableRow>
                            <label>
                                <strong>Frequency:</strong>
                            </label>{" "}
                            {currentDataSample.freq}
                            </TableRow>
                        </TableBody>
                    </Table>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Data Sample...</p>
                        </div>
                    )}

            <TableContainer component={Paper} sx={{maxHeight: "400px"}} >
                    <Table stickyHeader sx={{ 
                        width: "100%",
                        backgroundColor: "lightblue",
                        // border: "1px solid black",
                        borderCollapse: "collapse",
                        
                    }} >
                        <TableHead sx={{position: 'sticky'}}>
                            <TableRow>
                                <StyledTableCell>Time</StyledTableCell>
                                <StyledTableCell>Freq</StyledTableCell>
                                <StyledTableCell>Vab</StyledTableCell>
                                <StyledTableCell>Vbc</StyledTableCell>
                                <StyledTableCell>Vca</StyledTableCell>
                                <StyledTableCell>Van</StyledTableCell>
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
                                    <StyledTableCell>{dataSample.Time}</StyledTableCell>
                                    <StyledTableCell>{dataSample.freq}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Vab}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Vbc}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Vca}</StyledTableCell>
                                    <StyledTableCell>{dataSample.Van}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>


                    
                </TableContainer>
                </div>
        );
    }
}