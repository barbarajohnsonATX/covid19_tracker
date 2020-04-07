import React, { useState, useEffect } from 'react';
import { fetchStates } from '../../api';
import { Bar } from 'react-chartjs-2';


const StatesChart = () => {

    const [statesData, setStatessData] = useState({});

    useEffect(() => {
        const fetchStatesAPI = async () => {
          const states = await fetchStates();
         // console.log("states", states)
    
          setStatessData(states);
        };
    
        fetchStatesAPI();
    }, []);

    
    console.log("statesData", statesData )
    if(statesData.length) {
        let UsStates = statesData.map( obj => obj.state)
        console.log(UsStates)

    }

    let displayStates = statesData.length ? true : false


    return (
        <div>
            <ul>
            { statesData.length ? statesData.map( (obj, i) => <li key={i}>{obj.state} Postive: {obj.positive} Recovered: {obj.recovered} Deaths: {obj.death} </li> ) : ''}
            </ul>
        </div>
    )
}

export default StatesChart;