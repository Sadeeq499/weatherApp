import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
export default class App extends Component {
  constructor(){
    super();
    this.state = {
      result:[],
      day:'',
      date:'',
      time:''
    }    
  }
  async componentDidMount(){
    const url = "http://api.weatherapi.com/v1/current.json?key=3a3a8f43344e4b1899f132550230801&q=Peshawar";
    const {data} = await axios.get(url);
    this.setState({result:data})

    // Day
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];
    this.setState({day:dayName})
    // Date
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = months[d.getMonth()];
    var date = d.getDate();
    var year = d.getFullYear();
    var fullDate = month + ', ' + date + ' ' + year;
    this.setState({date:fullDate})

    // Time
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var time = hours + ':' + minutes + ' ' + ampm;
    this.setState({time:time})

  }
  render() {
    return (
      <div>
        <div className="wrapper">
        <div className="widget-container">
          <div className="top-left">
            {
              this.state.result.location && <h1 className="city" id="city">{this.state.result.location.name}</h1>
            }
            <h2 id="day">{this.state.day}</h2>
            <h3 id="date">{this.state.date}</h3>
            <h3 id="time">{this.state.time}</h3>
            <p className="geo" />
          </div>
          <div className="top-right">
            <h1 id="weather-status">Weather / Weather in Thall</h1>
            {
              this.state.result.current  &&
            <img className="weather-icon" src={this.state.result.current.condition.icon} />
            }
          </div>
          <div className="horizontal-half-divider" />
          <div className="bottom-left">
            {
              this.state.result.current && <h1 className="temperature" id="temperature">{this.state.result.current.temp_c}</h1>
            }
            <h2 id="celsius">°C</h2>
            <h2 id="temp-divider">/</h2>
            <h2 id="fahrenheit">°F</h2>
          </div>
          <div className="vertical-half-divider" />
          <div className="bottom-right">
            <div className="other-details-key">
              <p>Wind Speed</p>
              <p>Humidity</p>
              <p>Pressure</p>
              <p>Cloud</p>
              <p>Feels Like</p>
            </div>
            <div className="other-details-values">
              {
                this.state.result.current &&
                <div>
              <p className="windspeed">{this.state.result.current.wind_kph} Km/h</p>
              <p className="humidity">{this.state.result.current.humidity} %</p>
              <p className="pressure">{this.state.result.current.pressure_mb} mb</p>
              <p className="sunrise-time">{this.state.result.current.cloud} FEW</p>
              <p className="sunset-time">{this.state.result.current.feelslike_c}°C</p>
              </div>
            }
            </div>
          </div>
        </div>
      </div>      
      </div>
    )
  }
}
