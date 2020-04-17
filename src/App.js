import React, {Component} from 'react';
import './App.css';
import Chart from "./component/chart";
import {MapWrapped} from "./component/mapGoogle";
 
class App extends Component {
  render(){  
    return (
      <>
        <div className="App">
          <div className="App-header">
            <MapWrapped 
              googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                process.env.REACT_APP_GOOGLE_KEY
              }`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <Chart />
        </div>
      </>
    );
  }
}
export default App;