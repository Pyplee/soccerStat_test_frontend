import axios from "axios";

const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  headers: {
    "X-Auth-Token": apiToken,
  },
});

const routes = {
  competitions: () => "http://api.football-data.org/v4/competitions/",
  competitionIdMatches: (id) =>
    `http://api.football-data.org/v4/competitions/${id}/matches`,
  competitionIdDate: (id, dateFrom, dateTo) =>
    `http://api.football-data.org/v4/competitions/${id}/matches?dateFrom=${dateFrom}dateTo=${dateTo}`, // yyyy-mm-dd
  commands: () => "https://api.football-data.org/v4/teams",
  commandIdMatches: (id) => `http://api.football-data.org/v4/teams/${id}`,
  commandIdDate: (id, dateFrom, dateTo) =>
    `https://api.football-data.org/v4/teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
};

export { api, routes };
