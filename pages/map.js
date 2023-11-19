import {
  FullscreenControl,
  Map,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { withSession } from "../src/services/auth/session";
import { useEffect, useState } from "react";
import { tokenService } from "../src/services/auth/tokenService";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";
import ProfileButton from "../src/components/map/Profile/profileButton";

import PopupCard from "../src/components/map/PopUp/popup";

import DevicesTable from "../src/components/map/DevicesTable";
import CircleArea from "../src/components/map/CircleArea";
import MdevCardList from "../src/components/map/MdevList";
import MapLines from "../src/components/map/Lines";
import MarkerContent from "../src/components/map/MarkerContent";
import AdminButton from "../src/components/map/AdminButton/AdminButton";
import PeterAlert from "../src/components/PeterAlert/peterAlert";

export default function Mapa(ctx) {
  const [local, setLocal] = useState(7);
  const [mdevs, setMdev] = useState([]);
  const [locals, setLocals] = useState([]);
  const [popInfo, setPopupInfo] = useState(null);
  const [markerClicked, setMarkerClicked] = useState(null);

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locals/${local}/mdevs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setMdev(response.body.mdevs);
    });
  }, [local]);

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/institutions/${ctx.session.user.institution_id}/locals`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      setLocals(response.body.locals);
    });
  }, []);

  function handleLocalChange(event) {
    const fieldValue = event.target.value;

    if (fieldValue === "-1") return;

    setLocal(fieldValue);
  }

  if (!mdevs) return <p>Carregando...</p>;

  return (
    <div>
      <Map
        reuseMaps
        initialViewState={{
          longitude: -48.5652,
          latitude: -25.5856,
          zoom: 16,
          bearing: 0,
          pitch: 0,
        }}
        projection={"globe"}
        style={{ height: "100vh" }}
        //mapStyle="mapbox://styles/rocknatalino/cloxv6vwp00kg01nw7yid1vrb"
        mapStyle="mapbox://styles/rocknatalino/clozbzj6500u201qs3ffbh0lq"
        mapboxAccessToken="pk.eyJ1Ijoicm9ja25hdGFsaW5vIiwiYSI6ImNrcXB4cHFnZjFhdnAydXBlazh5MjA0aWMifQ.bms0uvJO7KHOquJHMI5j-w"
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />

        <MdevCardList
          mdevs={mdevs}
          locals={locals}
          handleLocal={handleLocalChange}
          local={local}
          user={ctx.session.user}
        />

        {markerClicked && (
          <div>
            <MapLines mdevs={mdevs} />
            <CircleArea mdev={markerClicked} />
            <DevicesTable
              mdev={markerClicked}
              user={ctx.session.user}
              onClose={(e) => {
                setMarkerClicked(null);
              }}
            />
          </div>
        )}

        {mdevs.map((mdev) => (
          <Marker
            key={mdev.id}
            longitude={parseFloat(mdev.longitude)}
            latitude={parseFloat(mdev.latitude)}
            anchor={"bottom"}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(mdev);
              setMarkerClicked(mdev);
            }}
          >
            <MarkerContent mdev={mdev} />
            {popInfo && popInfo.id == mdev.id && (
              <PopupCard
                mdev={popInfo}
                user={ctx.session.user}
                onClose={() => setPopupInfo(null)}
              />
            )}
          </Marker>
        ))}

        <AdminButton />
        <ProfileButton user={ctx.session.user} />
        {ctx.session.user.name.toLowerCase().includes("peter griffin") && (
          <PeterAlert />
        )}
      </Map>
      <style jsx>{``}</style>
    </div>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});
