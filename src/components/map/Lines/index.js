import { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";

export default function MapLines({ mdevs }) {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (mdevs) {
      setCoordinates((currentValues) => [
        ...currentValues,
        ...mdevs.map((mdev) => [
          parseFloat(mdev.longitude),
          parseFloat(mdev.latitude),
        ]),
      ]);
    }
  }, [mdevs]);

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordinates,
    },
  };

  return (
    <Source id="polylineLayer" type="geojson" data={dataOne}>
      <Layer
        id="lineLayer"
        type="line"
        source="my-data"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "#00A367",
          "line-width": 5,
        }}
      />
    </Source>
  );
}
