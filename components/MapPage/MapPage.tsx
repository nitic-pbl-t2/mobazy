"use client";
import React, { FC, useState } from "react";
import { GoogleMapStyle } from "./GoogleMapStyle";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link/Link";

const containerStyle = {
  height: "90vh",
  width: "100%",
  borderRadius: "rounded",
};

// 高専にしかステーションが存在しないので、静的に設定してます
const stationNiticStatus: stationStatusType = {
  name: "茨城高専",
  availableBatteries: 1,
  Ports: 3,
};

const locationNitic = {
  lat: 36.39963661269642,
  lng: 140.550973405102,
};

//

type stationStatusType = {
  //   lat: number;
  //   lng: number;
  name: string;
  availableBatteries: number;
  Ports: number;
} | null;

export const MapPage: FC = () => {
  const [stationStatus, setStationStatus] = useState<stationStatusType>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDoa9ibpkzYfw3Gl5mAKPFYDvN64fxhw58",
    // libraries: ["geometry", "drawing"],
  });

  const fetchStationStatus = () => {
    return stationNiticStatus;
  };

  const markerClicked = () => {
    setStationStatus(fetchStationStatus());
  };

  return (
    <div>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={{
              height: "70vh",
              width: "100%",
              borderRadius: "rounded",
            }}
            center={locationNitic}
            zoom={17}
          >
            <MarkerF
              position={locationNitic}
              onClick={() => {
                markerClicked();
              }}
            />
            {/* {selectedMarker &&
                  selectedMarker.lat === marker.lat &&
                  selectedMarker.lng === marker.lng && (
                    <InfoWindow position={marker}>
                      <p className="text-black font-bold text-center">
                        {marker.availableBattery}/{marker.maxBattery}
                      </p>
                    </InfoWindow>
                  )} */}
          </GoogleMap>

          {stationStatus ? (
            <>
              <div className="flex justify-center items-center mx-10 px-10 py-2 bg-slate-100">
                <div className="flex flex-row  items-center justify-between gap-6">
                  <h1>{stationStatus.name}</h1>
                  <h2>{stationStatus.availableBatteries}</h2>
                  <h2>{stationStatus.Ports}</h2>
                  <Button>借りる</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-lg font-bold p-3">
                ピンをタップして選択してください
              </h1>
              {/* <SkeletonBattery /> */}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
