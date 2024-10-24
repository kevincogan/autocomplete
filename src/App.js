import React, { useState } from 'react';
import Snowfall from 'react-snowfall'; 
import { Rain } from 'react-rainfall';
import axios from 'axios';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import FlightPredictorForm from './components/FlightPredictionForm/FlightPredictionForm.js';


function App() {

  var snowy_list = [71, 73, 75, 77, 85, 86]
  var rainy_list = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]
  var cloudy_list = [1, 2, 3]
  
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const [formData, setFormData] = useState({
    originLocation: '',
    destinationLocation: '',
    originWeatherCondition: 'clear',
    destinationWeatherCondition: 'clear',
    date: { dayOfWeek: 0, day: 0, month: 0, year: 0 },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target || event;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    setPrediction(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(formData);

    try {
      const AWS_LINK = "ec2-34-232-65-127";
      const responseId = await axios.get(`http://${AWS_LINK}.compute-1.amazonaws.com:8998/sessions`);
      console.log('Response from Livy:', responseId.data.sessions[0].id);

      console.log(`predict(${formData.originLocation},
        ${formData.originWeatherCondition},
        ${formData.destinationLocation},
        ${formData.destinationWeatherCondition},
        ${formData.date.dayOfWeek},
        ${formData.date.day},
        ${formData.date.month})`)

      const sessionID = responseId.data.sessions[0].id;
      const responseSession = await axios.post(`http://${AWS_LINK}.compute-1.amazonaws.com:8998/sessions/${sessionID}/statements`, {
        // "code": "predict(108,53,114,3,2,7,11)",
        "code": `predict(${formData.originLocation},
                          ${formData.originWeatherCondition},
                          ${formData.destinationLocation},
                          ${formData.destinationWeatherCondition},
                          ${formData.date.dayOfWeek},
                          ${formData.date.day},
                          ${formData.date.month})`,
        "kind": "pyspark"
      });

      console.log('Response from Livy:', responseSession.data.id);
      const taskID = responseSession.data.id;

      // Function to poll the server
      const pollServer = async () => {
        try {
          const responseJob = await axios.get(`http://${AWS_LINK}.compute-1.amazonaws.com:8998/sessions/${sessionID}/statements/${taskID}`);

          // Check if the response is ready
          if (responseJob.data.state === 'available') {
            console.log('Response from Livy:', responseJob.data.output.data["text/plain"]);

            
            const randomPrediction = JSON.parse(responseJob.data.output.data["text/plain"])[0] > 0.0 ? "Cancelled" : "OnTime";
            const predictionConfidence = JSON.parse(responseJob.data.output.data["text/plain"]);
            var predictionConfidenceOutput = Math.floor(predictionConfidence[1] * 100)
            
            console.log(JSON.parse(responseJob.data.output.data["text/plain"])[0])
            console.log(Math.floor(predictionConfidence[1] * 100))
            
            setPrediction({ status: randomPrediction, confidence: predictionConfidenceOutput });
            console.log(formData);
            setIsLoading(false);
          } else {
            // If the response is not ready, poll again after a delay
            setTimeout(pollServer, 1000);
          }

        } catch (error) {
          console.error('Error receiving response from Livy:', error);
          setIsLoading(false);
        }
      };

      pollServer();

    } catch (error) {
      console.error('Error sending request to Livy:', error);
      setIsLoading(false);
    }
  };


  return (
    <div className="App">
      {/* Render Snowfall component when weatherCondition is snowy */}
      {snowy_list.includes(formData.originWeatherCondition) && <Snowfall color='white' />}

      {/* Render Rainfall component when weatherCondition is rainy */}
      {rainy_list.includes(formData.originWeatherCondition) && (
        <div style={{ pointerEvents: 'none', position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
          <Rain dropletColor="rgb(3, 175, 255)" />
        </div>
      )}

      {/* Render clouds only if weatherCondition is not clear */}
      {cloudy_list.includes(formData.originWeatherCondition) && (
        <>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
        </>
      )}


      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>

      <div className="plane"></div>

      <Navbar />

      <FlightPredictorForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        prediction={prediction}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
