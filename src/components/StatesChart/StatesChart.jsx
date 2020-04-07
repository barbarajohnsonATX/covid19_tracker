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


    let stateDataSets = () => {
        let test = []
    
        debugger
        return test
    }
 
    


    let displayStates = statesData.length ? true : false

    const stackedBarChart = (
        displayStates ? (
    <Bar
       
    data={
        
        {
            labels: [statesData[0].state],
            datasets: [
            {
                label: 'Confirmed',
                backgroundColor: ['rgba(0, 0, 255, 0.5)'],
                data: [statesData[0].positive,]
            },

            {
                label: 'Recovered',
                backgroundColor: ['rgba(0, 255, 0, 0.5)'],
                data: [statesData[0].recovered,],
            },

            {
                label: 'Deaths',
                backgroundColor: ['rgba(255, 0, 0, 0.5)'],
                data: [statesData[0].death,],
            },
            ],
        }, 

        {
            labels: [statesData[1].state],
            datasets: [
            {
                label: 'Confirmed',
                backgroundColor: ['rgba(0, 0, 255, 0.5)'],
                data: [statesData[1].positive,]
            },

            {
                label: 'Recovered',
                backgroundColor: ['rgba(0, 255, 0, 0.5)'],
                data: [statesData[1].recovered,],
            },

            {
                label: 'Deaths',
                backgroundColor: ['rgba(255, 0, 0, 0.5)'],
                data: [statesData[1].death,],
            },
            ],
        }
        
    }

      options={{
        scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
          }
      }}
      
    />
        ) : ''

    )


    return (
        <div>
            {stackedBarChart}
            <ul>
            { statesData.length ? statesData.map( (obj, i) => <li key={i}>{obj.state} Postive: {obj.positive} Recovered: {obj.recovered} Deaths: {obj.death} </li> ) : ''}
            </ul>
        </div>
    )
}

export default StatesChart;