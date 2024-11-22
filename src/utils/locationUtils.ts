import type { Location, LocationStats, LocationFilter } from '../types';

export function calculateLocationStats(locations: Location[]): LocationStats {
  const stats: LocationStats = {
    totalCities: 0,
    totalPopulation: 0,
    citiesPerState: {},
    populationPerState: {},
  };

  locations.forEach(location => {
    stats.totalCities++;
    stats.totalPopulation += location.population || 0;

    if (!stats.citiesPerState[location.state]) {
      stats.citiesPerState[location.state] = 0;
      stats.populationPerState[location.state] = 0;
    }

    stats.citiesPerState[location.state]++;
    stats.populationPerState[location.state] += location.population || 0;
  });

  return stats;
}

export function filterLocations(
  locations: Location[],
  filter: LocationFilter,
  targetCount: number
): Location[] {
  let filtered = locations;

  // Filter by states if specified
  if (filter.states.length > 0) {
    filtered = filtered.filter(loc => filter.states.includes(loc.state));
  }

  // Filter by minimum population if specified
  if (filter.minPopulation) {
    filtered = filtered.filter(loc => (loc.population || 0) >= filter.minPopulation!);
  }

  // Sort by population (descending)
  filtered.sort((a, b) => (b.population || 0) - (a.population || 0));

  // Limit to max cities if specified
  if (filter.maxCities) {
    filtered = filtered.slice(0, filter.maxCities);
  }

  // If we need exactly targetCount cities, take the top ones
  if (targetCount > 0) {
    filtered = filtered.slice(0, targetCount);
  }

  return filtered;
}