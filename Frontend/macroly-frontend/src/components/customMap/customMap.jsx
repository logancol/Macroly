import "./customMap.css";
import { Map, Marker } from "@vis.gl/react-google-maps";

function CustomMap(latitude, longitude) {
    const pin = {
        lat: latitude,
        lng: longitude
    }
    return (
        <div className="map-container">
            <Map
                style={{ borderRadius: "20px" }}
                defaultZoom={13}
                defaultCenter={pin}
                gestureHandling={"greedy"}
                disableDefaultUI
            >
                <Marker position={pin} />
            </Map>
        </div>
    )
}

export default CustomMap
