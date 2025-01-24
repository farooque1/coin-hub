import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coincap.io/v2",
  headers: {
    Authorization: "Bearer 6f07c6bc-7d9a-4b7d-b879-39edd5c8984e",
  },
});

export const fetchMarketsInfo = () => apiClient.get("/markets");

export const fetchAssetInfo = (cryptoId) =>
  apiClient.get(`/assets/${cryptoId}`);

export const fetchHistoricalData = (cryptoId, interval = "d1", start, end) => {
  return apiClient.get(`/assets/${cryptoId}/history`, {
    params: {
      interval,
      start,
      end,
    },
  });
};

export const fetchTopAssets = () => apiClient.get("/assets");

export const fetchRates = () => apiClient.get("/rates");

export const fetchExchangesInfo = () => apiClient.get("/exchanges");

export const fetchExchangeDetails = (exchangeId) =>
  apiClient.get(`/exchanges/${exchangeId}`);

export const fetchMarketDetails = (marketId) =>
  apiClient.get(`/markets/${marketId}`);

export const fetchGlobalMarketData = () => apiClient.get("/global");
