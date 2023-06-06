export interface GameStats {
  apiVersion: number;
  levelName: string;
  dateTime: Date;
  players: Player[];
  statsData: StatsData;
}

export interface Player {
  index: number;
  name: string;
  race: number;
  alliances: boolean[];
  isSpectator: boolean;
  team: number;
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
  moneyTransferred: StatsMetric[];
  unitsCaptured: StatsMetric[];
  unitsTransferred: StatsMetric[];
}

export interface StatsMetric {
  values: number[];
}

export interface PlayerStatsModel {
  displayName: string;
  name: string,
  isSpectator: boolean;
  color: string;
  team: number;

  currentMoney: number[];
  minedMoney: number[];
  spentMoney: number[];
  buildingsCost: number[];
  buildingWeaponsCost: number[];
  unitsCost: number[];
  researchesCost: number[];
  ammoCost: number[];
  researchesCount: number[];
  buildingsBuilt: number[];
  buildingsLost: number[];
  unitsBuilt: number[];
  unitsLost: number[];
  destroyedUnits: number[];
  destroyedBuildings: number[];
  militaryUnits: number[];
  unitsValue: number[];
  moneyTransferred: number[];
  unitsCaptured: number[];
  unitsTransferred: number[];
  
  moneyFlow: number[];
  avgUnitsValue: number[];
  killsDeaths: number[];
  killsDeathsFiveMin: number[];
}

export interface StatsMetricModel {
  id: number;
  name: string;
  description: string;
  getValue(playerStats: PlayerStatsModel, range: number[]) : number[];
}
