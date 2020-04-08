import React, { useState, useEffect } from 'react';
import { fetchStates } from '../../api';
import { HorizontalBar } from 'react-chartjs-2';

import styles from './StatesChart.module.css';

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

    const stackedBarChart = (
        displayStates ? (
    <HorizontalBar
       

    data={

        {
            labels: statesData.map(data => data.state),
           
  

            datasets: [

 

                    {
                        barThickness: 11,
                        label: 'Confirmed',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        data: statesData.map(state => state.positive),
                    },
    
                    {
                        barThickness: 11,
                        label: 'Recovered',
                        backgroundColor: 'rgba(0, 255, 0, 0.8)',
                        data: statesData.map(state => state.recovered ? state.recovered : 0),
                    },

                    {
                        barThickness: 11,
                        label: 'Currently Hospitalized',
                        backgroundColor: 'rgba(255, 255, 0, 0.8)',
                        data: statesData.map(state => state.hospitalizedCurrently ? state.hospitalizedCurrently : 0),
                    },



                    {
                        barThickness: 11,
                        label: 'On Ventilator',
                        backgroundColor: 'rgba(255, 165, 0, 0.8)',
                        data: statesData.map(state => state.onVentilatorCurrently ? state.onVentilatorCurrently : 0),
                    },
    

                    {
                        barThickness: 11,
                        label: 'Currently in ICU',
                        backgroundColor: 'rgba(255, 99, 71, 0.8)',
                        data: statesData.map(state => state.inIcuCurrently ? state.inIcuCurrently : 0),
                    },

                    {
                        barThickness: 11,
                        label: 'Deaths',
                        backgroundColor: 'rgba(255, 0, 0, 0.8)',
                        data: statesData.map(state => state.death),
                    },

                ],

                

                
            
            

        }

         


        
    }

      options={{
        maintainAspectRatio: false,
        title: { display: true, text: `United States COVID-19 Cases` },


        scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    fontSize: 9,
                    lineHeight: 1.6,
                    beginAtZero: true

                },

            }]
          }
      }}
      
    />
        ) : ''

    )


    return (
        <div className={styles.container}>

            {stackedBarChart}
             
        </div>
    )
}

export default StatesChart;