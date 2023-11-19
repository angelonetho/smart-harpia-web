import { Layer, Source } from "react-map-gl";

export default function CircleArea({ mdev }) {
  const circleLayer = {
    id: "polygon",
    type: "fill",
    source: "polygon",
    layout: {},
    paint: {
      "fill-color": "#50C878",
      "fill-opacity": 0.3,
    },
  };

  function createGeoJSONCircle(center, radiusInKm, points) {
    if (!points) points = 64;

    var coords = {
      latitude: center[1],
      longitude: center[0],
    };

    var km = radiusInKm;

    var ret = [];
    var distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    var distanceY = km / 110.574;

    var theta, x, y;
    for (var i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);

      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [ret],
            },
          },
        ],
      },
    };
  }

  return (
    <Source
      id="polygon"
      type="geojson"
      data={
        createGeoJSONCircle(
          [parseFloat(mdev.longitude), parseFloat(mdev.latitude)],
          0.04
        ).data
      }
    >
      <Layer {...circleLayer} />
    </Source>
  );
}
