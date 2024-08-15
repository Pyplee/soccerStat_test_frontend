export interface ICompetition {
  id: number;
  name: string;
  emblem: string | null;
  area: {
    id: number;
    name: string;
  };
}
