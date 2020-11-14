import React from 'react';
//import L from 'leaflet';
import MapApp from './Map';
//import MapDup from './MapDup';
import '../scss/App.scss';


export default function App() {
    return (
        <div className="App">
            <header className="App-header">
            <img src="https://d3n8a8pro7vhmx.cloudfront.net/greenbelt/pages/9664/attachments/original/1537812131/Screen_Shot_2018-09-24_at_2.00.41_PM.png?1537812131" width="200" alt="image" />

                <p>
                    Indigeneous Community Consultation Map
                </p>
                <MapApp></MapApp>

                <p>
                    Email us at &nbsp;
                    
                    <a
                    className="App-link"
                    href="mailto:admin@shared_path.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                admin@sharedpath.ca
                </a> 
                &nbsp;to add your community's information to this consultation map.
                </p>

                <a
                    className="App-link"
                    href="http://sharedpath.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                Shared Path Website
                </a> 

            </header>

            

        </div>
    );
}
