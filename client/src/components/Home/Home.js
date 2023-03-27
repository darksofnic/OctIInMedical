import React from 'react';
import Card from './Card'
import './Home.css'
import  { useState} from "react";
import Popup from '../Admin/Popup';

function Home({data}) {


  const [newPatient , setNewPatient] = useState(false);
  return (
    <div className="test-container">
      {
        data && (data.length === 0 ?     
        <Popup
          trigger={true} setTrigger={setNewPatient} pop={"00000001"}
        /> : 
        data.map(exam => {
          return (
            <div key={exam.patientId}>
                  <Card 
                    patientId = {exam.patientId}
                    patientName = {exam.patientName}
                    imageUrl = {exam.image}
                    age = {exam.age}
                    sex = {exam.sex}
                  />
                </div>
              )
              
            }))
      }

          
    </div>
  )
}

export default Home