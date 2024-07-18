import axios from "axios";

const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: "/api/proxy",
  headers: {
    "X-Auth-Token": apiToken,
  },
});

const routes = {
  competitions: () => "competitions",
  competitionIdMatches: (id) => `competitions/${id}/matches`,
  competitionIdDate: (id, dateFrom, dateTo) =>
    `competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
  commands: () => "teams",
  commandId: (id) => `teams/${id}`,
  commandIdMatches: (id) => `teams/${id}/matches`,
  commandIdDate: (id, dateFrom, dateTo) =>
    `teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
};

export { api, routes };
