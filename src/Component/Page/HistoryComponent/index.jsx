import React, { useEffect, useState, useCallback, useRef } from "react";

const History = () => {
  const [priceData, setPriceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [changedCurrencies, setChangedCurrencies] = useState(new Set());
  const socketRef = useRef(null);

  const generateSocketUrl = useCallback(() => {
    return `wss://ws.coincap.io/prices?assets=${priceData
      .map((value) => value.currency)
      .join(",")}`;
  }, [priceData]);

  console.log("priceData", changedCurrencies);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((resp) => {
        const initialData = resp.data.map((value) => ({
          currency: value.name.toLowerCase(),
          price: parseFloat(value.priceUsd).toFixed(2),
          updatedAt: new Date().toLocaleString(),
        }));
        setPriceData(initialData);
        setFilteredData(initialData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const updatePrices = useCallback((message) => {
    setPriceData((prevData) => {
      const updatedData = prevData.map((item) => {
        const newPrice = message[item.currency];
        if (newPrice && parseFloat(newPrice).toFixed(2) !== item.price) {
          return {
            ...item,
            price: parseFloat(newPrice).toFixed(2),
            updatedAt: new Date().toLocaleString(),
          };
        }
        return item;
      });

      const changed = Object.keys(message).filter(
        (currency) =>
          message[currency] !==
          prevData.find((item) => item.currency === currency)?.price
      );

      setChangedCurrencies((prevSet) => new Set([...prevSet, ...changed]));

      setTimeout(() => {
        setChangedCurrencies((prevSet) => {
          const newSet = new Set(prevSet);
          changed.forEach((currency) => newSet.delete(currency));
          return newSet;
        });
      }, 1000);

      return updatedData;
    });
  }, []);

  useEffect(() => {
    const socketUrl = generateSocketUrl();
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      updatePrices(message);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current.close();
    };
  }, [generateSocketUrl, updatePrices]);

  useEffect(() => {
    const filtered = priceData.filter((item) =>
      item.currency.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, priceData]);

  return (
    <div className="container mt-2">
      <h2 className="mb-4 text-center">Real-Time Cryptocurrency History</h2>
      <div className="card p-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a currency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div
          className="d-flex align-items-center font-weight-bold mb-2"
          style={{
            borderBottom: "2px solid #ddd",
            paddingBottom: "10px",
            marginBottom: "15px",
          }}
        >
          <div className="col-6">Currency</div>
          <div className="col-3">Price (USD)</div>
          <div className="col-3">Last Updated</div>
        </div>

        <div>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center py-2"
                style={{
                  backgroundColor: changedCurrencies.has(item.currency)
                    ? "cornflowerblue"
                    : "white",
                  borderBottom: "1px solid #ddd",
                  transition: "background-color 0.5s ease",
                }}
              >
                <div className="col-6">{item.currency.toUpperCase()}</div>
                <div className="col-3">${item.price}</div>
                <div className="col-3">{item.updatedAt}</div>
              </div>
            ))
          ) : (
            <div className="text-center">No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
