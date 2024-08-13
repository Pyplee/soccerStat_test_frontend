import { create } from 'zustand';

interface Competition {
  id: number;
  name: string;
  emblem: string | null;
  area: {
    id: number;
    name: string;
  };
}

interface Team {
  id: number;
  name: string;
}

interface Match {
  id: number;
  name: string;
  emblem: string | null;
  utcDate: string;
  status: string | null;
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  score: {
    winner: string | null;
    duration: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
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
