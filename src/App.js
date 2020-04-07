import React from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';

import coronaImage from './images/image.png';
import StatesChart from './components/StatesChart/StatesChart';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log("handleCountryChange data", fetchedData)

    this.setState({ data: fetchedData, country: country});
  }

  render() {
    const { data, country } = this.state;
    let displayState = country === 'US' ? true : false
    console.log('country', country )
    console.log("displayState", displayState)
       

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> 
        { displayState ? <StatesChart /> : '' }
      </div>
    );
  }
}

export default App;