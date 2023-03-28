import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import ExamsMaker from './Detail/ExamsMaker';
import Popup from './Admin/Popup';
import './details.css';


function ExamDetails() {
    const { patientId } = useParams();
    const [record, setrecord] = useState();
    // function to set the data
    const [data, setData] = useState(null);
    const [examInfo, setExInfo] = useState(false);
    const [singlePatient, setSinglePatient] = useState(null);
    const [listSize, setSize] = useState(0);


    //Fetching the data from the database
    useEffect(() => {
        fetch('http://localhost:9000/exams')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data)
                setSinglePatient(data.find(patient => patient.patientId === patientId))
                
            })
            .catch(error => console.error(error));
    }, []);

    function handleClick() {
        data && setSize(data.length-1)
        console.log(listSize)
        setExInfo(true);
    }
    return (
        <>

            



            <div className='container'>


                {
                    singlePatient &&
                            <div >
                                <div className="return">
                                    <Link to={"/"}>
                                        <i class="fa-solid fa-arrow-left fa-2xl"></i>
                                    </Link>
                                </div>
                                <br />
                                <br />
                                <br />
                                <h1 className='display-1'>{singlePatient.patientId}</h1>

                                <div className='row'>
                                    <div className='col row position-relative'>


                                        <div className='col-6'>
                                            <h3 className='mt-2 mb-2'>Age: {singlePatient.age}</h3>
                                            <h3 className='mt-2 mb-2'>Sex: {singlePatient.sex}</h3>
                                            <h3 className='mt-2 mb-2'>Zip Code: {singlePatient.zipCode}</h3>
                                            <h3 className='mt-2 mb-2'>BMI: {singlePatient.bmi}</h3>
                                        </div>

                                        <div className='col'>
                                           
                                        </div>

                                        <h3>Exams:</h3>
                                        <button className="add_btn" onClick={handleClick}>add</button>
                                        <div className="exams_container">
                                            <div className="exams_table">

                                                {singlePatient.exams.map((exam) => {



                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                }
                <ExamsMaker
                    trigger={examInfo} setTrigger={setExInfo} singlePatient={singlePatient} listSize={listSize}
                    />
            </div>
        </>
    )
}

export default ExamDetails
