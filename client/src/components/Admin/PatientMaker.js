import React, { useState } from "react";
import Tooltip from "../util/Tooltip";
import './Popup.css'

//function for adding new patients to the database
export default function PatientMaker(props) {

    /**creating a variable and mutator to hold the new
     * patient's data
     */
    const [addFormData, setAddFormData] = useState({
        patientId: "placeholder",
        age: "",
        sex: "",
        zipCode: "",
        bmi: "",
        exams: {
            examID: "",
            image: {
              name: "",
              data: "",
              contentType: "image/jpe"
            },
            note: "",
            brixia: "",
          }

    });

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);

    }


    //Adds input data to database with the API as a json form
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        

        const newPatient ={
            patientId: "COVID-19-AR-"+(parseInt(props.lastID) +1).toString().padStart(props.lastID.length, "0"),
            age: addFormData.age,
            sex: addFormData.sex,
            zipCode: addFormData.zipCode,
            bmi: addFormData.bmi,
        }

        fetch('http://localhost:9000/exams', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPatient)
        })
            .then(res => {
                if(!res.ok)
                    throw new Error("Failed to create new patient")
                window.location.reload(false)
                return res.json();
                }).then(data => console.log("New patient created: ", data))
            .catch(err => console.log(err));
    }

    //returns a table of input fields to enter new patient's data
    return (
        <div className="form-grou"><center>
            <h1>Add a Patient</h1>
            <form onSubmit={handleAddFormSubmit}>
            
                <Tooltip text="Age">
                <label>Age</label><input
                    type="number"
                    name="age"
                    required="required"
                    placeholder="Age..."
                    onChange={handleAddFormChange}
                />
                </Tooltip>
                <Tooltip text="Gender(M/F)">
                <label>Sex</label><input
                    type="text"
                    name="sex"
                    required="required"
                    placeholder="Sex..."
                    pattern="[mfMF]"
                    onChange={handleAddFormChange}
                />
                </Tooltip>
                <Tooltip text="ZipCode">
                <label>ZipCode</label><input
                    type="text"
                    name="zipCode"
                    required="required"
                    placeholder="Zip Code..."
                    onChange={handleAddFormChange}
                />
                </Tooltip>
                <Tooltip text="BMI">
                <label>BMI</label><input
                    type="numberic"
                    name="bmi"
                    required="required"
                    placeholder="BMI..."
                    onChange={handleAddFormChange}
                />
                </Tooltip>
                
                <br />
                <button className="add-pop"  type="submit"><span>Add</span></button>
                
            </form></center>
        </div >
    );
};
