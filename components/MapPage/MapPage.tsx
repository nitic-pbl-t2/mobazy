"use client";
import React, { FC, useEffect, useState } from "react";
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
import { useAuth } from "@/Provider/AuthProvider";

// 場所は現在位置を取得するとブラウザに許可を求めなきゃいけないので、高専で固定
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
  const [isBorrowing, setIsBorrowing] = useState<boolean | null>(null);
  const { user } = useAuth();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDoa9ibpkzYfw3Gl5mAKPFYDvN64fxhw58",
  });

  const fetchStationStatus = async () => {
    // /api/station/statusを叩く　高専ステーションの状態を取得
    const response = await fetch("/api/station/status");
    if (response.ok) {
      const jsonStatus = await response.json();
      console.log(jsonStatus.stationStatus);
      return jsonStatus.stationStatus;
    }
  };

  useEffect(() => {
    const fetchIsBorrowing = async () => {
      if (user) {
        const response = await fetch(`/api/user/${user.email}/isBorrowing`);
        const jsonData = await response.json();
        setIsBorrowing(jsonData.isBorrowing);
        console.log("対象のユーザは現在、貸出中？: ", jsonData.isBorrowing);
      }
    };

    fetchIsBorrowing();
  }, [user]);

  const markerClicked = async () => {
    setStationStatus(await fetchStationStatus());
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
          {user ? (
            <div className="flex justify-center items-center p-3 text-lg font-bold ">
              {/* 貸出 */}
              {stationStatus && !isBorrowing && (
                <>
                  <div className="flex flex-row  items-center justify-between gap-3 p-3 w-[400px] rounded-md bg-slate-200">
                    <h1>{stationStatus.name}</h1>
                    <h2>
                      {stationStatus.availableBatteries} / {stationStatus.Ports}
                    </h2>
                    <Confirm option="borrow" />
                  </div>
                </>
              )}
              {!stationStatus && !isBorrowing && (
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
              {/* 返却 */}
              {stationStatus && isBorrowing && (
                <>
                  <div className="flex flex-row  items-center justify-between gap-3 p-3 w-[400px] rounded-md bg-slate-200">
                    <h1>{stationStatus.name}</h1>
                    <h2>
                      {stationStatus.Ports - stationStatus.availableBatteries} /{" "}
                      {stationStatus.Ports}
                    </h2>
                    <Confirm option="return" />
                  </div>
                </>
              )}
              {!stationStatus && isBorrowing && (
                <>
                  <div className="flex flex-row  items-center justify-between gap-6 p-3 w-[400px] rounded-md bg-slate-200">
                    <h1>ステーション</h1>
                    <h2>返却可能 / ポート数</h2>
                    <div className="h-10 px-4 py-2 opacity-75 bg-primary text-primary-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      返す
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center p-3 text-lg font-bold ">
              <div className="flex flex-row  items-center justify-center p-3 w-[400px] rounded-md bg-slate-200">
                ログインをしてください
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
