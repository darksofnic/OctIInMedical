import React, { useRef, useState, useEffect } from 'react'
import './ExamsMaker.css'
import Found from '../../images/found.jpg'
export default function ExamsMaker(props) {



    const [editFormData, setEditFormData] = useState({
        patientId: "",
        age: "",
        sex: "",
        zipCode: "",
        bmi: "",
        exams: [{
          examID: "",
          image: [{
            name: "",
            data: "",
            contentType: "image/jpe"
          }],
          note: "",
          brixia: "",
        }]
    });



    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
       
    }
    
    
    const newExam = {
      
      examID:   (editFormData.ExamID !== undefined && editFormData.ExamID !== ""  ? editFormData.ExamID : props.defaultID ),
      image: {
        name: (editFormData.Image !== "" ? editFormData.Image : props.singlePatient.exams),
        data: (editFormData.Image !== "" ? editFormData.Image : "../../images/found.jpg"),
      },
      note: editFormData.Note ,
      brixia: editFormData.Brixia 
    };
    

    //Adds input data to database with the API as a json form
    
    const handleEditFormSubmit = (event) => {
        
        event.preventDefault();
        fetch('http://localhost:9000/exams/' + props.singlePatient._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                exams: [...props.singlePatient.exams, newExam]
            })
        })
            .then(res => window.location.reload(false))
            .catch(err => console.log(err));
    }


    return (props.trigger) ? (

            <div className='popup'>
                <div className='popup-inner'>
                    <button className='close-btn' onClick={() => props.setTrigger(false)}>X</button>
                    <h1>Administrative Actions</h1>
                    <form className="form" onSubmit={handleEditFormSubmit}>
                        <div className='form-group'>
                            <label>ExamID</label>
                            <input
                                type="text"
                                name="ExamID"
                                title="ExamID"
                                defaultValue={props.defaultID}
                                placeholder="ExamID"
                                onChange={handleEditFormChange}>
                            </input>
                        </div>
                        <div className='form-group'>
                            <label>Image</label>
                            <input
                                type="number"
                                name="Image"
                                title="Image"
                                defaultValue={props.singlePatient.exams.Image}
                                placeholder="Image"
                                onChange={handleEditFormChange}>
                            </input>
                        </div>
                        <div className='form-group'>
                            <label>note</label>
                            <input
                                type="text"
                                name="Note"
                                defaultValue={props.singlePatient.exams.note}
                                placeholder="Key Findings"
                                
                                onChange={handleEditFormChange}
                                required>
                            </input>
                        </div>

                        <div className='form-group'>
                            <label>brixia</label>
                            <input
                                type="text"
                                name="Brixia"
                                defaultValue={props.singlePatient.exams.brixia}
                                placeholder="Brixia"
                                onChange={handleEditFormChange}>
                            </input>
                        </div>

                        <br />
                        <div className="btn-group">
                            <button className="update-btn" type="submit">add</button>     
                        </div>
                    </form>

                </div>
            </div >

        ) : "";

}
