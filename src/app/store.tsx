import { create } from "zustand";

interface Area {
  id: number;
  name: string;
}

interface Competition {
  id: number;
  name: string;
  emblemUrl: string | null;
  area: Area;
}

interface Team {
  id: number;
  name: string;
}

interface StoreState {
  competitions: Competition[];
  teams: Team[];
  setCompetitions: (competitions: Competition[]) => void;
  setTeams: (teams: Team[]) => void;
}

const useStore = create<StoreState>((set) => ({
  competitions: [],
  teams: [],
  setCompetitions: (competitions) => set({ competitions }),
  setTeams: (teams) => set({ teams }),
}));

export default useStore;
