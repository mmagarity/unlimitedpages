export interface USState {
  name: string;
  abbreviation: string;
}

export interface USCity {
  name: string;
  state: string;
  stateName: string;
  population: number;
  rank: number;
}

export interface LocationCoverage {
  totalLocations: number;
  populationCovered: number;
  citiesCount: number;
  statesCount: number;
}