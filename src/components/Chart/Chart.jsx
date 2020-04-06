// useState is a Hook to allow ou to add React state to functional components
// useEffect lets you perform side effects (ex: data fetching) in function components
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    
  // declare a new state variable dailyData (same as this.state in a class)
  // pass initial state in useState() of empty object
  // useState returns current state (dailyData) and a function that updates it (same as this.state.dailyData, this.setState in class)
  const [dailyData, setDailyData] = useState({});

  // similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
}, []);

const barChart = (
  confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null
);

const lineChart = (
  dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [{
          data: dailyData.map((data) => data.confirmed),
          label: 'Infected',
          borderColor: '#3333ff',
          fill: true,
        }, {
          data: dailyData.map((data) => data.deaths),
          label: 'Deaths',
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          fill: true,
        },
        ],
      }}
    />
  ) : null
);

return (
  <div className={styles.container}>
    {country ? barChart : lineChart}
  </div>
);
};

export default Chart;