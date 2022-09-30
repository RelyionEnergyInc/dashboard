import React, { Component } from "react";
import DataSampleService from "../services/datasample.service";

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
            <div className="list row">
                <div className="col-md-6">
                    <h4>Data Samples List</h4>

                    <table style={{ 
                        margin: "10px",
                        width: "100%",
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        
                    }} >
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Freq</th>
                                <th>Vab</th>
                                <th>Vbc</th>
                                <th>Vca</th>
                                <th>Van</th>
                            </tr>
                        </thead>
                        <tbody >
                        {dataSamples &&
                            dataSamples.map((dataSample, index) => (
                                <tr 
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveDataSample(dataSample, index)}
                                    key={index}
                                >
                                    <td style={{justifyContent: "center",
                        alignItems: "center"}}>{dataSample.Time}</td>
                                    <td>{dataSample.freq}</td>
                                    <td>{dataSample.Vab}</td>
                                    <td>{dataSample.Vbc}</td>
                                    <td>{dataSample.Vca}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className="col-md-6">
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
                </div>
            </div>
        );
    }
}