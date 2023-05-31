import { GameStats, Player, StatsMetric } from "./api";

export async function readStats(file: File): Promise<GameStats | undefined> {
    let buffer = await file.arrayBuffer();
      let dv = new DataView(buffer);
      let offset = 0;
      let fileApiVersion = dv.getUint32(offset, true);
      offset += 4;
      if (fileApiVersion > 1)
        return undefined; //todo: return Error
      let levelNameLength = dv.getUint32(offset, true);
      offset += 4;
      let levelName = new TextDecoder("utf-16").decode(new Uint16Array(buffer.slice(offset, offset + levelNameLength * 2)));
      offset += levelNameLength * 2;
      let players = [] as Player[];
      for(let i = 0; i< 16; i++) {
        let slotTaken = dv.getInt8(offset);
        offset++;
        if(!slotTaken)
          continue;
        
        let playerNameLength = dv.getUint32(offset, true);
        offset += 4;
        let playerName = new TextDecoder("utf-16").decode(new Uint16Array(buffer.slice(offset, offset + playerNameLength * 2)));
        offset += playerNameLength * 2;
        let race = dv.getUint32(offset, true);
        offset += 4;
        players.push({name: playerName, race: race});
      }

    let gameStats = {
        apiVersion: fileApiVersion,
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
        },
    };
    
    while (offset < dv.byteLength - 1)
    {
      offset += readLine(gameStats, dv, offset);
    }

    return gameStats;
};

function readLine(gameStats: GameStats, dv: DataView, offset: number): number {
    let localOffset = 0;
    gameStats.statsData.ticks.push(dv.getUint32(offset + localOffset, true));
    localOffset += 4;
    for (let i = 0; i < gameStats.players.length; i++)
    {
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
    }
    return localOffset;
  }
  