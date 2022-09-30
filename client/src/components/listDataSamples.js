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


    render() {
        const { dataSamples, currentDataSample, currentIndex } = this.state;

        return (
            <TableContainer component={Paper}>
                    <h4>Data Samples List</h4>

                    <Table sx={{ 
                        width: "100%",
                        backgroundColor: "lightblue",
                        // border: "1px solid black",
                        borderCollapse: "collapse",
                    }} >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Time</StyledTableCell>
                                <StyledTableCell>Freq</StyledTableCell>
                                <StyledTableCell>Vab</StyledTableCell>
                                <StyledTableCell>Vbc</StyledTableCell>
                                <StyledTableCell>Vca</StyledTableCell>
                                <StyledTableCell>Van</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
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
            </TableContainer>
        );
    }
}