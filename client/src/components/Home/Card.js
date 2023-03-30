import './Card.css'
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import found from "../../images/found.jpg"

function Card(props) {
    const exam = props
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if(exam.exams.length !== 0){
        const url =URL.createObjectURL(new Blob([exam.exams[0].image[0].data], { type: exam.exams[0].image[0].contentType }));
        exam && setImageUrl(url);
        console.log(url)
        console.log(exam.exams[0].image[0].contentType);
    }
    },[])


    return (
        <div className="card-container">
            <div className='image-container'>
                {
                    exam.exams.length !== 0 ? 
                     <img src={imageUrl} alt="cardPictures"></img> 
                    :<img src={found} alt="cardPictures"></img>
                }
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
