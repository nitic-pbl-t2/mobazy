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
import { Image } from "@/components/Image/Image";
import NiticLogo from "@/public/logo/nitic.png";
import Confirm from "@/components/Confirm/Confirm";

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

//  静的データはここまで

type stationStatusType = {
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
    <>
      {isLoaded && (
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
            {stationStatus && (
              <InfoWindow position={locationNitic}>
                <Image src={NiticLogo} alt={"Niticのロゴ"} />
              </InfoWindow>
            )}
          </GoogleMap>

          <div className="flex justify-center items-center p-3 text-lg font-bold ">
            {stationStatus ? (
              <>
                <div className="flex flex-row  items-center justify-between gap-3 p-3 w-[400px] rounded-md bg-slate-200">
                  <h1>{stationStatus.name}</h1>
                  <h2>
                    {stationStatus.availableBatteries} / {stationStatus.Ports}
                  </h2>
                  <Confirm />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row  items-center justify-between gap-6 p-3 w-[400px] rounded-md bg-slate-200">
                  <h1>ステーション</h1>
                  <h2>利用可能 / ポート数</h2>
                  <div className="h-10 px-4 py-2 opacity-75 bg-primary text-primary-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    借りる
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
