import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAssetInfo, fetchHistoricalData } from "../../../Api/api";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import HistoricalChart from "../HomeComponent/HistoricalChart";
import Data from "./description";
import CustomCard from "../../Share/Card";

function Overview() {
  const { name } = useParams();
  const [cryptoId, setCryptoId] = useState(name);
  const [assetInfo, setAssetInfo] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  const description = Data[cryptoId] || "Description not available.";

  useEffect(() => {
    fetchAssetInfo(cryptoId).then((response) =>
      setAssetInfo(response.data.data)
    );
    const end = Date.now();
    const start = end - 7 * 24 * 60 * 60 * 1000;
    fetchHistoricalData(cryptoId, "d1", start, end).then((response) =>
      setHistoricalData(response.data.data)
    );
  }, [cryptoId]);

  const cardDetails = [
    {
      title: "Coin Name",
      value: assetInfo?.symbol || "N/A",
      icon: faSackDollar,
    },
    {
      title: "Market Cap",
      value: assetInfo?.marketCapUsd
        ? `$${parseFloat(assetInfo.marketCapUsd).toFixed(2)}`
        : "N/A",
      icon: faSackDollar,
    },
    {
      title: "Total Supply",
      value: assetInfo?.supply
        ? `$${parseFloat(assetInfo.supply).toFixed(2)}`
        : "N/A",
      icon: faSackDollar,
    },
    {
      title: "Circulating Supply",
      value: assetInfo?.circulatingSupply
        ? `$${parseFloat(assetInfo.circulatingSupply).toFixed(2)}`
        : "N/A",
      icon: faSackDollar,
    },
    {
      title: "All-time High Price",
      value: assetInfo?.maxSupply
        ? `$${parseFloat(assetInfo.maxSupply).toFixed(2)}`
        : "N/A",
      icon: faSackDollar,
    },
    {
      title: "Rank",
      value: assetInfo?.rank ? `${assetInfo.rank}` : "N/A",
      icon: faSackDollar,
    },
  ];

  return (
    <div className="conatiner my-1 p-5">
      <div className="mb-5">
        <h4>
          {description}{" "}
          <a
            href={assetInfo?.explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-secondary my-2"
          >
            Explore More Information
          </a>
        </h4>
      </div>
      {assetInfo && (
        <div className="row">
          {cardDetails.map((detail, index) => (
            <div className="col-lg-4 col-md-12 col-sm-12" key={index}>
              <CustomCard
                icon={detail.icon}
                iconClass="text-success"
                title={detail.title}
                content={detail.value}
                cardClass="border-primary"
              />
            </div>
          ))}
        </div>
      )}
      <div className="card shadow-sm my-2">
        <div className="card-body">
          {historicalData.length > 0 ? (
            <HistoricalChart data={historicalData} />
          ) : (
            <p>Loading graph data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Overview;
