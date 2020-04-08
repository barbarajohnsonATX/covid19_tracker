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
                        label: 'Confirmed',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        data: statesData.map(state => state.positive),
                    },
    
                    {
                        label: 'Recovered',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        data: statesData.map(state => state.recovered ? state.recovered : 0),
                    },

                    {
                        label: 'Currently Hospitalized',
                        backgroundColor: 'rgba(120, 10, 0, 0.5)',
                        data: statesData.map(state => state.hospitalizedCurrently ? state.hospitalizedCurrently : 0),
                    },
    
                    {
                        label: 'Deaths',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        data: statesData.map(state => state.death),
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
        <div className={styles.container}>

            {stackedBarChart}
             
        </div>
    )
}

export default StatesChart;