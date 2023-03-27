import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import './details.css'


function ExamDetails() {
    const { patientId } = useParams();
    const [record, setrecord] = useState();
    // function to set the data
    const [data, setData] = useState(null);
    const imgApi = "https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/"



    // This doesnt work, need urgent care!!!
    useEffect(() => {
        const url = 'https://czi-covid-lypffhkrzry4q-uc.a.run.app/api/exams' + patientId
        fetch(url)
            .then((response) => {
                return response.json
            })
            .then((data) => {
                setrecord(data)
            })

    }, []);



    //Fetching the data from the database
    useEffect(() => {
        fetch('http://localhost:9000/exams')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);
    return (
        <div className='container'>
            {
                data && data.filter(record => record.patientId === patientId)
                    .map(record =>
                        <div >
                            <div className="return">
                                <Link to={"/"}>
                                    <i class="fa-solid fa-arrow-left fa-2xl"></i>
                                </Link>
                            </div>
                                <br />
                                <br />
                                <br />
                                <h1 className='display-1'>{record.patientId}</h1>

                                <div className='row'>
                                    <div className='col row position-relative'>


                                        <div className='col-6'>
                                            <h3 className='mt-5 mb-5'>Age: {record.age}</h3>
                                            <h3 className='mt-5 mb-5'>Sex: {record.sex}</h3>
                                            <h3 className='mt-5 mb-5'>Zip Code: {record.zipCode}</h3>
                                            <h3 className='mt-5 mb-5'>BMI: {record.bmi}</h3>
                                        </div>

                                        <div className='col'>
                                            <img className='ms-5 mt-3 rounded' width={625} src={imgApi + record.exams.image} alt="chest x-ray"
                                                onClick={() => window.open(imgApi + record.exams.image)}>
                                            </img>
                                        </div>

                                        <h3>Exams: {record.exams}</h3>
                                        <div className="exams_container">
                                            <div className="exams_table"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        )
            }
        </div>
    )
}

export default ExamDetails
