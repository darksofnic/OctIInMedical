import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import ExamsMaker from './Detail/ExamsMaker';
import Popup from './Admin/Popup';
import './details.css';


function ExamDetails() {
    const { patientId } = useParams();
    // function to set the data
    const [data, setData] = useState(null);
    const [examInfo, setExInfo] = useState(false);
    const [singlePatient, setSinglePatient] = useState(null);
    const [defaultID, setDefaultID] = useState("");
    const [showMore, setShowMore] = useState(false);
    const numToShow = showMore ? singlePatient.exams.length : 3;
    const [goTo, setGoto] = useState(0);
    const [isValidBack, setValidB] = useState(false);
    const [isValidFoward, setValidF] = useState(true);
    const back = -6;
    const foward = 6;


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
        singlePatient && setDefaultID("Exam-AR-" + (parseInt(singlePatient.exams.length) + 1).toString().padStart(6, "0"));
        setExInfo(true);
    }

    const CardExam = ({ exam, action }) => (
        <div className="card_exam" onClick={action(exam)}>
            <label>Exam ID: <span>{exam.examID}</span></label>
            <label>Note: <span>{exam.note}</span></label>
            <label>Brixia: <span>{exam.brixia}</span></label>
            <label>Created: <span>{exam.createdOn}</span></label>
        </div>


    );

    const handleExamClick = exam => (e) => {
        console.log(exam.examID)
    }

    const handlePagination = (moving) => (e) => {
        const maxIndex = singlePatient.exams.length - 1;
        const minIndex = 0;
        const newGoTo = goTo + moving;

        if (newGoTo < minIndex) {
            setValidB(false);
            setValidF(true);
            setGoto(minIndex);
        } else if (newGoTo > maxIndex - 2) {
            setValidB(true);
            setValidF(false);
            setGoto(maxIndex - 1);
        } else {
            setValidB(true);
            setValidF(true);
            setGoto(newGoTo);
        }
    };

    return (
        <>
            <div className='container'>
                {
                    singlePatient &&
                    <div >
                        <div className="return">
                            <Link to={"/"}>
                                <i className="fa-solid fa-arrow-left fa-2xl"></i>
                            </Link>
                        </div>
                        <br />
                        <br />
                        <br />
                        <h1 className='display-1'>{singlePatient.patientId}</h1>
                        <div className="detail_container">
                            <div>
                                <h3>Age: {singlePatient.age}</h3>
                                <h3>Sex: {singlePatient.sex}</h3>
                                <h3>Zip Code: {singlePatient.zipCode}</h3>
                                <h3>BMI: {singlePatient.bmi}</h3>
                            </div>



                            <div className="exams_container">
                                <div className='examLabel'>
                                    <label className='examsLabel'>Exams:</label>
                                    <button className="add_btn" onClick={handleClick}>add</button>
                                </div>
                                <div className="exams_table">
                                    <button className="prev" onClick={handlePagination(back)} disabled={!isValidBack} >&#x276E;</button>
                                    {singlePatient.exams.length !== 0 ?
                                        <>
                                            <div className="table_left">
                                                {singlePatient && singlePatient.exams.slice(goTo, goTo + 3).map((exam, index) => (
                                                    <CardExam className="card_container" key={index}
                                                        exam={exam}
                                                        action={handleExamClick} />
                                                ))}
                                            </div>

                                            <div className="table_right">
                                                {singlePatient && singlePatient.exams.slice(goTo + 3, goTo + 6).map((exam, index) => (
                                                    <CardExam className="card_container" key={index}
                                                        exam={exam}
                                                        action={handleExamClick} />
                                                ))}
                                            </div>
                                        </> : <p>No exams found.</p>
                                    }
                                    <button className="next" onClick={handlePagination(foward)} disabled={!isValidFoward}>&#10095;</button>
                                </div>


                                {//singlePatient.exams.length > 6 && (
                                    //   <div className="view_more">
                                    //       <button onClick={() => setShowMore(!showMore)}>
                                    //           {showMore ? "View Less" : "View More"}
                                    //       </button>
                                    //   </div>)

                                }
                            </div>
                        </div>
                    </div>
                }
                <ExamsMaker
                    trigger={examInfo} setTrigger={setExInfo} singlePatient={singlePatient} defaultID={defaultID}
                />
            </div>
        </>
    )
}

export default ExamDetails
