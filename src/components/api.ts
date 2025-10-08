export interface GameStats {
  apiVersion: number;
  levelName: string;
  dateTime: Date;
  players: Player[];
  statsData: StatsData;

  damageStats?: DamageStats;
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
  damageDealt: StatsMetric[];
  damageReceived: StatsMetric[];
  commandsSent: StatsMetric[];
  researchCenters: StatsMetric[];
  buildingsUnderConstruction: StatsMetric[];
  activeMiningEntities: StatsMetric[];
  factories: StatsMetric[];
  builders: StatsMetric[];
  suppliers: StatsMetric[];
  totalExpLevel: StatsMetric[];
  banneredMilitaryUnits: StatsMetric[];
  shadowedMilitaryUnits: StatsMetric[];
  militaryUnitsInCombat: StatsMetric[];
  hpRepaired: StatsMetric[];
  crRepaired: StatsMetric[];
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
  damageDealt: number[];
  damageReceived: number[];
  commandsSent: number[];
  researchCenters: number[];
  buildingsUnderConstruction: number[];
  activeMiningEntities: number[];
  factories: number[];
  builders: number[];
  suppliers: number[];
  totalExpLevel: number[];
  banneredMilitaryUnits: number[];
  shadowedMilitaryUnits: number[];
  militaryUnitsInCombat: number[];
  hpRepaired: number[];
  crRepaired: number[];

  moneyFlow: number[];
  avgUnitsValue: number[];
  killsDeaths: number[];
  killsDeathsFiveMin: number[];
  commandsSentPerMin: number[];
  commandsSentLastMin: number[];
  recentDamage: number[];
  miningEfficiency: number[];
  bannerCoverage: number[];
  shadowCoverage: number[];
  averageExpLevel: number[];
  suppliersPerUnit: number[];
  militaryUnitsCombatEngagement: number[];
}

export interface StatsMetricModel {
  id: string;
  getValue(playerStats: PlayerStatsModel, range: number[]): number[];
}

export interface UnitTemplate {
  playerIndex: number;
  chassis: string;
  powerShield: number;
  weapons: string[];
}

export function TemplatesEqual(first: UnitTemplate, second: UnitTemplate, compareShields: boolean): boolean {
  return first.chassis == second.chassis
    && first.playerIndex == second.playerIndex
    && (!compareShields || first.powerShield == second.powerShield)
    && first.weapons[0] == second.weapons[0]
    && first.weapons[1] == second.weapons[1]
    && first.weapons[2] == second.weapons[2]
    && first.weapons[3] == second.weapons[3]
    && first.weapons[4] == second.weapons[4]
    && first.weapons[5] == second.weapons[5]
    && first.weapons[6] == second.weapons[6]
    && first.weapons[7] == second.weapons[7];
}

export interface WeaponStats {
  buildingDamage: number;
  buildingsKilled: number;
  unitsDamage: object;
  unitsKilled: object;
}

export interface UnitStats {
  identity: number;
  weapons: WeaponStats[];
  damageByUnits: object;
  killedByUnits: object;
  damageByBuildings: number;
  killedByBuildings: number;
  damageByAmmo: object;
  killedByAmmo: object;
  damageByMines: number;
  killedByMines: number;
}

export interface PlayerDamageStats {
  units: UnitStats[];
}

export interface DamageStats {
  identities: UnitTemplate[];
  players: PlayerDamageStats[];
}
