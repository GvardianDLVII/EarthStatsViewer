export interface GameStats {
  apiVersion: number;
  levelName: string;
  players: Player[];
  statsData: StatsData;
}

export interface Player {
  name: string;
  race: number;
}

export interface StatsData {
  ticks: number[];
  currentMoney: StatsMetric[];
  minedMoney: StatsMetric[];
  spentMoney: StatsMetric[];
  buildingsCost: StatsMetric[];
  buildingWeaponsCost: StatsMetric[];
  unitsCost: StatsMetric[];
  researchesCost: StatsMetric[];
  ammoCost: StatsMetric[];
  researchesCount: StatsMetric[];
  buildingsBuilt: StatsMetric[];
  buildingsLost: StatsMetric[];
  unitsBuilt: StatsMetric[];
  unitsLost: StatsMetric[];
  destroyedUnits: StatsMetric[];
  destroyedBuildings: StatsMetric[];
  militaryUnits: StatsMetric[];
  unitsValue: StatsMetric[];
}

export interface StatsMetric {
  values: number[];
}

export interface StatsMetricModel {
  id: number;
  name: string;
  description: string;
  getValue(gameStats: GameStats, index: number, range: number[]) : number[];
}
