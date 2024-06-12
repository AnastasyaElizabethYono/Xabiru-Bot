import api from './api';

const getTopTrafficYearly = async (year: number) => {
  const response = await api.get(`/api/services/top-traffic?year=${year}`);
  return response.data;
};

const getTrafficCDN = async (
  category: string,
  year: number,
  month: number,
  type: number,
  length?: number
) => {
  if (length) {
    const response = await api.get(
      `/api/services/traffic-cdn?year=${year}&month=${month}&type=${type}&category=${category}&length=${length}`
    );
    return response.data;
  } else {
    const response = await api.get(
      `/api/services/traffic-cdn?year=${year}&month=${month}&type=${type}&category=${category}`
    );
    return response.data;
  }
};

const getCDNRevenue = async (
  category: string,
  year: number,
  month: number,
  type: number,
  length?: number
) => {
  if (length) {
    const response = await api.get(
      `/api/services/top-cdn?year=${year}&month=${month}&type=${type}&category=${category}&length=${length}`
    );
    return response.data;
  } else {
    const response = await api.get(
      `/api/services/top-cdn?year=${year}&month=${month}&type=${type}&category=${category}`
    );
    return response.data;
  }
};

const getRevenue = async (year: number, month: number, type: string) => {
  const response = api.get(
    `/api/services/new-cust-region/revenue/?year=${year}&month=${month}&type=${type}`
  );
  return (await response).data;
};

const getGrossProfit = async (year: number, month: number, type: string) => {
  const response = api.get(
    `/api/services/new-cust-region/gross-profit/?year=${year}&month=${month}&type=${type}`
  );
  return (await response).data;
};

export {
  getTopTrafficYearly,
  getTrafficCDN,
  getRevenue,
  getGrossProfit,
  getCDNRevenue,
};
