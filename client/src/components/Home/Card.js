import './Card.css'
import React from 'react';
import { Link } from "react-router-dom";
import found from "../../images/found.jpg"

function Card(props) {
    const exam = props

    return (
        <div className="card-container">
            <div className='image-container'>
                <img src={found} alt="cardPictures"></img>
            </div>
            <div className='card-content'>
                <div className='card-title'>
                    <h4>{exam.patientId}</h4>
                </div>
                <div className='card-bod'>
                    <p>{exam.patientName}</p>
                    {exam.sex === 'M' ? <i className="fa-solid fa-mars fa-lg"></i> : <i className="fa-solid fa-venus fa-lg"></i>}
                    
                    <p className='mt-4'>Age: {exam.age} </p>
                </div>
            </div>

            <div className='btn border-top'>
                <button>
                    <Link to={"/details/" + exam.patientId}>
                        View More
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Card
