import React, { useEffect, useState } from "react";
import HistoricalChart from "./HistoricalChart";
import { fetchAssetInfo, fetchHistoricalData } from "../../../Api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faSackDollar,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [cryptoId, setCryptoId] = useState("bitcoin");
  const [assetInfo, setAssetInfo] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  const handleCardClick = () => {
    navigate(`/overview/${cryptoId}`);
  };

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

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <label htmlFor="crypto-select" className="form-label">
          Select Cryptocurrency:
        </label>
        <select
          id="crypto-select"
          className="form-select"
          value={cryptoId}
          onChange={(e) => setCryptoId(e.target.value)}
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="tether">Tether</option>
          <option value="cardano">Cardano</option>
          <option value="dogecoin">Dogecoin</option>
          <option value="solana">Solana</option>
          <option value="polkadot">Polkadot</option>
          <option value="litecoin">Litecoin</option>
          <option value="chainlink">Chainlink</option>
          <option value="stellar">Stellar (XLM)</option>
          <option value="uniswap">Uniswap</option>
          <option value="polygon">Polygon (MATIC)</option>
          <option value="shiba-inu">Shiba Inu</option>
          <option value="avalanche">Avalanche (AVAX)</option>
          <option value="tron">TRON</option>
        </select>
      </div>

      {assetInfo && (
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="card mb-4 shadow-sm border-primary text-white">
              <div className="card-body">
                <h4 className="card-text text-black">
                  <strong>
                    <FontAwesomeIcon
                      icon={faSackDollar}
                      className="me-2 text-success"
                    />
                    Price:
                  </strong>{" "}
                  ${parseFloat(assetInfo.priceUsd).toFixed(2)}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="card mb-4 shadow-sm border-primary">
              <div className="card-body">
                <h4 className="card-text text-back">
                  <strong>
                    <FontAwesomeIcon
                      icon={
                        parseFloat(assetInfo.changePercent24Hr) > 0
                          ? faArrowAltCircleUp
                          : faArrowAltCircleDown
                      }
                      className={`me-2 ${
                        parseFloat(assetInfo.changePercent24Hr) > 0
                          ? "text-success"
                          : "text-danger"
                      }`}
                    />
                    Change (24h):
                  </strong>{" "}
                  <span
                    className={
                      parseFloat(assetInfo.changePercent24Hr) > 0
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {parseFloat(assetInfo.changePercent24Hr).toFixed(2)}%
                  </span>
                </h4>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12">
            <div
              className="card mb-4 shadow-sm border-primary text-white animation-card"
              onClick={handleCardClick}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h4 className="card-text text-black animation-text">
                  <strong>
                    View Details {cryptoId}
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      className="ms-2 text-warning"
                    />
                  </strong>
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow-sm my-2">
        <div className="card-body">
          <h5 className="card-title">7-Day Price Trend</h5>
          {historicalData.length > 0 ? (
            <HistoricalChart data={historicalData} />
          ) : (
            <p>Loading graph data...</p>
          )}
        </div>
        <div className="d-flex justify-content-center my-2">
          <button className="btn btn-success" onClick={handleCardClick}>
            More Details
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="ms-2 text-warning"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
