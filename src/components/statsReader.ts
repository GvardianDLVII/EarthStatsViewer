import { GameStats, Player, PlayerDamageStats, StatsMetric, UnitStats, UnitTemplate, WeaponStats } from "./api";

export async function readStats(file: File): Promise<GameStats | undefined> {
  let buffer = await file.arrayBuffer();
  let dv = new DataView(buffer);
  let offset = 0;
  let fileApiVersion = dv.getUint32(offset, true);
  offset += 4;
  if (fileApiVersion > 7)
    return undefined; //todo: return Error
  let levelNameLength = dv.getUint32(offset, true);
  offset += 4;
  let levelName = new TextDecoder("utf-16").decode(new Uint16Array(buffer.slice(offset, offset + levelNameLength * 2)));
  offset += levelNameLength * 2;
  let timeStr = new TextDecoder("utf-8").decode(new Uint8Array(buffer.slice(offset, offset + 14)));
  let time = new Date(timeStr.substring(0, 4) + "-" + timeStr.substring(4, 6) + "-" + timeStr.substring(6, 8) + "T" + timeStr.substring(8, 10) + ":" + timeStr.substring(10, 12) + ":" + timeStr.substring(12, 14) + "+00:00");
  offset += 14;
  let players = [] as Player[];
  for (let i = 0; i < 16; i++) {
    let slotTaken = dv.getInt8(offset);
    offset++;
    if (!slotTaken)
      continue;

    let playerNameLength = dv.getUint32(offset, true);
    offset += 4;
    let playerName = new TextDecoder("utf-16").decode(new Uint16Array(buffer.slice(offset, offset + playerNameLength * 2)));
    offset += playerNameLength * 2;
    let race = dv.getUint32(offset, true);
    offset += 4;
    players.push({ index: i, name: playerName, race: race, alliances: [], isSpectator: false, team: 0 });
  }

  let gameStats = {
    apiVersion: fileApiVersion,
    dateTime: time,
    levelName: levelName,
    players: players,
    statsData: {
      ticks: [],
      currentMoney: players.map<StatsMetric>(p => ({ values: [] })),
      minedMoney: players.map<StatsMetric>(p => ({ values: [] })),
      spentMoney: players.map<StatsMetric>(p => ({ values: [] })),
      buildingsCost: players.map<StatsMetric>(p => ({ values: [] })),
      buildingWeaponsCost: players.map<StatsMetric>(p => ({ values: [] })),
      unitsCost: players.map<StatsMetric>(p => ({ values: [] })),
      researchesCost: players.map<StatsMetric>(p => ({ values: [] })),
      ammoCost: players.map<StatsMetric>(p => ({ values: [] })),
      researchesCount: players.map<StatsMetric>(p => ({ values: [] })),
      buildingsBuilt: players.map<StatsMetric>(p => ({ values: [] })),
      buildingsLost: players.map<StatsMetric>(p => ({ values: [] })),
      unitsBuilt: players.map<StatsMetric>(p => ({ values: [] })),
      unitsLost: players.map<StatsMetric>(p => ({ values: [] })),
      destroyedUnits: players.map<StatsMetric>(p => ({ values: [] })),
      destroyedBuildings: players.map<StatsMetric>(p => ({ values: [] })),
      militaryUnits: players.map<StatsMetric>(p => ({ values: [] })),
      unitsValue: players.map<StatsMetric>(p => ({ values: [] })),
      moneyTransferred: players.map<StatsMetric>(p => ({ values: [] })),
      unitsCaptured: players.map<StatsMetric>(p => ({ values: [] })),
      unitsTransferred: players.map<StatsMetric>(p => ({ values: [] })),
      damageDealt: players.map<StatsMetric>(p => ({ values: [] })),
      damageReceived: players.map<StatsMetric>(p => ({ values: [] })),
      commandsSent: players.map<StatsMetric>(p => ({ values: [] })),
      researchCenters: players.map<StatsMetric>(p => ({ values: [] })),
      buildingsUnderConstruction: players.map<StatsMetric>(p => ({ values: [] })),
      activeMiningEntities: players.map<StatsMetric>(p => ({ values: [] })),
      factories: players.map<StatsMetric>(p => ({ values: [] })),
      builders: players.map<StatsMetric>(p => ({ values: [] })),
      suppliers: players.map<StatsMetric>(p => ({ values: [] })),
      totalExpLevel: players.map<StatsMetric>(p => ({ values: [] })),
      banneredMilitaryUnits: players.map<StatsMetric>(p => ({ values: [] })),
      shadowedMilitaryUnits: players.map<StatsMetric>(p => ({ values: [] })),
      militaryUnitsInCombat: players.map<StatsMetric>(p => ({ values: [] })),
      hpRepaired: players.map<StatsMetric>(p => ({ values: [] })),
      crRepaired: players.map<StatsMetric>(p => ({ values: [] })),
    },
  };

  while (offset < dv.byteLength - 1) {
    offset += readLine(gameStats, dv, offset);
  }
  recalculateTeams(gameStats);

  return gameStats;
};

function readLine(gameStats: GameStats, dv: DataView, offset: number): number {
  let localOffset = 0;
  let firstField = dv.getInt32(offset + localOffset, true);
  if (firstField == -1) {//is footer
    return 4 + readFooter(gameStats, dv, offset + 4)
  }
  gameStats.statsData.ticks.push(firstField);
  localOffset += 4;
  for (let i = 0; i < gameStats.players.length; i++) {
    gameStats.statsData.currentMoney[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.minedMoney[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.spentMoney[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.buildingsCost[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.buildingWeaponsCost[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.unitsCost[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.researchesCost[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.ammoCost[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.researchesCount[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.buildingsBuilt[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.buildingsLost[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.unitsBuilt[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.unitsLost[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.destroyedUnits[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.destroyedBuildings[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.militaryUnits[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.unitsValue[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.moneyTransferred[i].values.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    gameStats.statsData.unitsCaptured[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    gameStats.statsData.unitsTransferred[i].values.push(dv.getUint16(offset + localOffset, true));
    localOffset += 2;
    if (gameStats.apiVersion >= 2) {
      gameStats.statsData.damageDealt[i].values.push(dv.getUint32(offset + localOffset, true));
      localOffset += 4;
      gameStats.statsData.damageReceived[i].values.push(dv.getUint32(offset + localOffset, true));
      localOffset += 4;
    }
    else {
      gameStats.statsData.damageDealt[i].values.push(0);
      gameStats.statsData.damageReceived[i].values.push(0);
    }
    if (gameStats.apiVersion >= 3) {
      gameStats.statsData.commandsSent[i].values.push(dv.getUint32(offset + localOffset, true));
      localOffset += 4;
    }
    else {
      gameStats.statsData.commandsSent[i].values.push(0);
    }
    if (gameStats.apiVersion >= 4) {
      gameStats.statsData.researchCenters[i].values.push(dv.getUint8(offset + localOffset));
      localOffset += 1;
      gameStats.statsData.buildingsUnderConstruction[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
      gameStats.statsData.activeMiningEntities[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
    }
    else {
      gameStats.statsData.researchCenters[i].values.push(0);
      gameStats.statsData.buildingsUnderConstruction[i].values.push(0);
      gameStats.statsData.activeMiningEntities[i].values.push(0);
    }
    if (gameStats.apiVersion >= 6) {
      gameStats.statsData.factories[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
      gameStats.statsData.builders[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
      gameStats.statsData.suppliers[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
      gameStats.statsData.totalExpLevel[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
      gameStats.statsData.banneredMilitaryUnits[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
      gameStats.statsData.shadowedMilitaryUnits[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
      gameStats.statsData.militaryUnitsInCombat[i].values.push(dv.getUint16(offset + localOffset, true));
      localOffset += 2;
    }
    else {
      gameStats.statsData.factories[i].values.push(0);
      gameStats.statsData.builders[i].values.push(0);
      gameStats.statsData.suppliers[i].values.push(0);
      gameStats.statsData.totalExpLevel[i].values.push(0);
      gameStats.statsData.banneredMilitaryUnits[i].values.push(0);
      gameStats.statsData.shadowedMilitaryUnits[i].values.push(0);
      gameStats.statsData.militaryUnitsInCombat[i].values.push(0);
    }
    if (gameStats.apiVersion >= 7) {
      gameStats.statsData.hpRepaired[i].values.push(dv.getUint32(offset + localOffset, true));
      localOffset += 4;
      gameStats.statsData.crRepaired[i].values.push(dv.getUint32(offset + localOffset, true));
      localOffset += 4;
    }
    else {
      gameStats.statsData.hpRepaired[i].values.push(0);
      gameStats.statsData.crRepaired[i].values.push(0);
    }
  }
  return localOffset;
}

function readFooter(gameStats: GameStats, dv: DataView, offset: number): number {
  let localOffset = 0;
  let allianceMasks = [] as number[];
  for (let i = 0; i < 16; i++) {
    allianceMasks.push(dv.getUint16(offset + i * 2, true));
  }
  for (let i = 0; i < gameStats.players.length; i++) {
    let index = 0x1;
    let playersMask = allianceMasks[gameStats.players[i].index];
    for (let j = 0; j < 16; j++) {
      gameStats.players[i].alliances.push((playersMask & index) ? true : false);
      index = index << 1;
    }
  }
  localOffset += 32;
  if (gameStats.apiVersion < 2)
    return localOffset;

  let identities = [] as UnitTemplate[];
  let identitiesCount = dv.getUint32(offset + localOffset, true);
  localOffset += 4;
  for (let i = 0; i < identitiesCount; i++) {
    let playerIndex = dv.getUint32(offset + localOffset, true);
    localOffset += 4;
    let chassisNameLength = dv.getUint32(offset + localOffset, true);
    localOffset += 4;
    let chassisName = new TextDecoder("utf-8").decode(new Uint8Array(dv.buffer.slice(offset + localOffset, offset + localOffset + chassisNameLength)));
    localOffset += chassisNameLength;
    let powerShield = dv.getInt32(offset + localOffset, true);
    localOffset += 4;
    let weapons = [] as string[];
    for (let j = 0; j < 8; j++) {
      let weaponNameLength = dv.getInt32(offset + localOffset, true);
      localOffset += 4;
      if (weaponNameLength == -1) {
        weapons.push('');
        continue;
      }
      weapons.push(new TextDecoder("utf-8").decode(new Uint8Array(dv.buffer.slice(offset + localOffset, offset + localOffset + weaponNameLength))));
      localOffset += weaponNameLength;
    }
    identities.push({
      playerIndex: playerIndex,
      chassis: chassisName,
      powerShield: powerShield,
      weapons: weapons
    });
  }

  let players = [] as PlayerDamageStats[];
  for (let i = 0; i < 16; i++) {
    let units = [] as UnitStats[];
    let unitsCount = dv.getUint32(offset + localOffset, true);
    localOffset += 4;
    for (let j = 0; j < unitsCount; j++) {
      let idIndex = dv.getUint32(offset + localOffset, true);
      localOffset += 4;

      let weapons = [] as WeaponStats[];
      for (let k = 0; k < 8; k++) {
        let buildingDamage = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        let buildingsKilled = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        let unitsDamageMapSize = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        let damageMap = {} as any;
        for (let l = 0; l < unitsDamageMapSize; l++) {
          let targetId = dv.getUint32(offset + localOffset, true);
          localOffset += 4;
          let damage = dv.getUint32(offset + localOffset, true);
          localOffset += 4;
          damageMap[targetId] = damage;
        }
        let unitsKilledMapSize = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        let killsMap = {} as any;
        for (let l = 0; l < unitsKilledMapSize; l++) {
          let targetId = dv.getUint32(offset + localOffset, true);
          localOffset += 4;
          let kills = dv.getUint32(offset + localOffset, true);
          localOffset += 4;
          killsMap[targetId] = kills;
        }
        weapons.push({
          buildingDamage: buildingDamage,
          buildingsKilled: buildingsKilled,
          unitsDamage: damageMap,
          unitsKilled: killsMap
        });
      }
      let damageByUnitsMapSize = dv.getUint32(offset + localOffset, true);
      localOffset += 4;
      let damageByUnitsMap = {} as any;
      for (let l = 0; l < damageByUnitsMapSize; l++) {
        let instigatorId = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        let damage = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        damageByUnitsMap[instigatorId] = damage;
      }
      let killedByUnitsMapSize = dv.getUint32(offset + localOffset, true);
      localOffset += 4;
      let killedByUnitsMap = {} as any;
      for (let l = 0; l < killedByUnitsMapSize; l++) {
        let instigatorId = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        let kills = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        killedByUnitsMap[instigatorId] = kills;
      }
      let damageByBuildings = dv.getUint32(offset + localOffset, true);
      localOffset += 4;
      let killedByBuildings = dv.getUint32(offset + localOffset, true);
      localOffset += 4;

      let damageByAmmoMapSize = dv.getUint32(offset + localOffset, true);
      localOffset += 4;
      let damageByAmmoMap = {} as any;
      for (let l = 0; l < damageByAmmoMapSize; l++) {
        let ammoNameLength = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        let ammoName = new TextDecoder("utf-8").decode(new Uint8Array(dv.buffer.slice(offset + localOffset, offset + localOffset + ammoNameLength)));
        localOffset += ammoNameLength;
        let damage = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        damageByAmmoMap[ammoName] = damage;
      }
      let killedByAmmoMapSize = dv.getUint32(offset + localOffset, true);
      localOffset += 4;
      let killedByAmmoMap = {} as any;
      for (let l = 0; l < killedByAmmoMapSize; l++) {
        let ammoNameLength = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        let ammoName = new TextDecoder("utf-8").decode(new Uint8Array(dv.buffer.slice(offset + localOffset, offset + localOffset + ammoNameLength)));
        localOffset += ammoNameLength;
        let kills = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        killedByAmmoMap[ammoName] = kills;
      }

      let damageByMines = 0;
      let killedByMines = 0;
      if (gameStats.apiVersion >= 5) {
        damageByMines = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
        killedByMines = dv.getUint32(offset + localOffset, true);
        localOffset += 4;
      }
      if (damageByMines) {
        damageByAmmoMap["MINE"] = damageByMines;
        killedByAmmoMap["MINE"] = killedByMines;
      }

      units.push({
        identity: idIndex,
        weapons: weapons,
        damageByUnits: damageByUnitsMap,
        killedByUnits: killedByUnitsMap,
        damageByBuildings: damageByBuildings,
        killedByBuildings: killedByBuildings,
        damageByAmmo: damageByAmmoMap,
        killedByAmmo: killedByAmmoMap,
        damageByMines: damageByMines,
        killedByMines: killedByMines,
      });
    }
    players.push({
      units: units,
    });
  }

  gameStats.damageStats = {
    identities: identities,
    players: players,
  };

  return localOffset;
}

function recalculateTeams(gameStats: GameStats): void {
  for (let i = 0; i < gameStats.players.length; i++) {
    if (gameStats.statsData.currentMoney[i].values[0] == 0) {
      gameStats.players[i].isSpectator = true;
    }
  }
  let lastTeam = 0;
  for (let i = 0; i < gameStats.players.length; i++) {
    if (gameStats.players[i].isSpectator || gameStats.players[i].team != 0) continue;
    lastTeam++;
    gameStats.players[i].team = lastTeam;
    for (let j = i + 1; j < gameStats.players.length; j++) {
      if (gameStats.players[j].isSpectator || gameStats.players[j].team != 0) continue;
      if (gameStats.players[j].alliances[gameStats.players[i].index] && gameStats.players[i].alliances[gameStats.players[j].index]) {
        gameStats.players[j].team = lastTeam;
      }
    }
  }
}
