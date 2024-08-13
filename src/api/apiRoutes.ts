import axios from 'axios';

const apiToken = import.meta.env.VITE_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: '/api/proxy',
  headers: {
    'X-Auth-Token': apiToken,
  },
});

const routes = {
  competitions: () => 'competitions',
  competitionId: (id: string) => `competitions/${id}`,
  competitionIdMatches: (id: string) => `competitions/${id}/matches`,
  competitionIdDate: (id: string, dateFrom: string, dateTo: string) =>
    `competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
  commands: () => 'teams',
  commandId: (id: string) => `teams/${id}`,
  commandIdMatches: (id: string) => `teams/${id}/matches`,
  commandIdDate: (id: string, dateFrom: string, dateTo: string) =>
    `teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
};

export { api, routes };
