import { create } from "zustand";

interface Area {
  id: number;
  name: string;
}

interface Competition {
  id: number;
  name: string;
  emblem: string | null;
  area: Area;
}

interface Team {
  id: number;
  name: string;
}

interface Score {
  fullTime: {
    home: number | null;
    away: number | null;
  };
  halfTime: {
    home: number | null;
    away: number | null;
  };
}

interface Match {
  utcDate: string;
  status:
    | "SCHEDULED"
    | "LIVE"
    | "IN_PLAY"
    | "PAUSED"
    | "FINISHED"
    | "POSTPONED"
    | "SUSPENDED"
    | "CANCELED";
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  score: Score;
}

interface StoreState {
  competitions: Competition[];
  teams: Team[];
  matches: Match[];
  setCompetitions: (competitions: Competition[]) => void;
  setTeams: (teams: Team[]) => void;
  setMatches: (matches: Match[]) => void;
}

const useStore = create<StoreState>((set) => ({
  competitions: [],
  teams: [],
  matches: [],
  setCompetitions: (competitions) => set({ competitions }),
  setTeams: (teams) => set({ teams }),
  setMatches: (matches) => set({ matches }),
}));

export default useStore;
