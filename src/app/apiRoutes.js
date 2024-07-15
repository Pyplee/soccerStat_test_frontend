import axios from "axios";

const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  headers: {
    "X-Auth-Token": apiToken,
  },
});

const routes = {
  competitions: () => "https://api.football-data.org/v4/competitions/",
  competitionIdMatches: (id) =>
    `https://api.football-data.org/v4/competitions/${id}/matches`,
  competitionIdDate: (id, dateFrom, dateTo) =>
    `https://api.football-data.org/v4/competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
  commands: () => "https://api.football-data.org/v4/teams",
  commandId: (id) => `https://api.football-data.org/v4/teams/${id}`,
  commandIdMatches: (id) =>
    `https://api.football-data.org/v4/teams/${id}/matches`,
  commandIdDate: (id, dateFrom, dateTo) =>
    `https://api.football-data.org/v4/teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
};

export { api, routes };
