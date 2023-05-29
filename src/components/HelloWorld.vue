<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col cols="2">
        <v-card outlined>
          <v-card-title>Options</v-card-title>
          <v-card-text>
            <v-file-input
              v-model="files"
              dense
              label="File input"
              variant="outlined"
              @update:model-value="readFile"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col id="chartCol">
        <v-card outlined>
          <Line v-if="gameStats"
            id="chart-id"
            :data="chartData"
            :options="chartOptions"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Title, Legend} from 'chart.js'
import { GameStats, Player, StatsMetric } from './api';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Title, Legend);



export default {
  components: { Line },
  data () {
    return {
      chartOptions: {
        responsive: true,
      },
      files: [] as File[],
      gameStats: undefined as unknown as GameStats,
    };
  },
  computed: {
    chartData(): any {
      if(!this.gameStats) return {};
      return {
        labels: this.gameStats.statsData.ticks,
        datasets: this.gameStats.players.map((p, i) => ({
          label: p.name, 
          data: this.gameStats.statsData.currentMoney[i].values,
          backgroundColor: this.playerColors[i],
          borderColor: this.playerColors[i],
        })),
      };
    },
    playerColors(): string[] {
      return [
        "#FFFF3C",
        "#FF423D",
        "#3CFF4B",
        "#3C43FF",
        "#FF9E3C",
        "#5DFFFF",
        "#E51B5F",
        "#EF3CFF",
        "#FFFFFF",
        "#AAAAAA",
        "#585858",
        "#B0AE2F",
        "#FFE79E",
        "#E0FFD0",
        "#FFE4FF",
        "#B7BBFF",
      ]
    }
  },
  methods: {
    async readFile() {
      if (!this.files || !this.files.length)
        return;
      let buffer = await this.files[0].arrayBuffer();
      let dv = new DataView(buffer);
      let offset = 0;
      let fileApiVersion = dv.getUint32(offset, true);
      offset += 4;
      if (fileApiVersion > 1)
        return; //todo: return Error
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

      this.gameStats = {
        apiVersion: fileApiVersion,
        levelName: levelName,
        players: players,
        statsData: {
          ticks: [],
          currentMoney: players.map<StatsMetric>(p => ({values: []})),
          minedMoney: players.map<StatsMetric>(p => ({values: []})),
          spentMoney: players.map<StatsMetric>(p => ({values: []})),
          buildingsCost: players.map<StatsMetric>(p => ({values: []})),
          buildingWeaponsCost: players.map<StatsMetric>(p => ({values: []})),
          unitsCost: players.map<StatsMetric>(p => ({values: []})),
          researchesCost: players.map<StatsMetric>(p => ({values: []})),
          ammoCost: players.map<StatsMetric>(p => ({values: []})),
          researchesCount: players.map<StatsMetric>(p => ({values: []})),
          buildingsBuilt: players.map<StatsMetric>(p => ({values: []})),
          buildingsLost: players.map<StatsMetric>(p => ({values: []})),
          unitsBuilt: players.map<StatsMetric>(p => ({values: []})),
          unitsLost: players.map<StatsMetric>(p => ({values: []})),
          destroyedUnits: players.map<StatsMetric>(p => ({values: []})),
          destroyedBuildings: players.map<StatsMetric>(p => ({values: []})),
          militaryUnits: players.map<StatsMetric>(p => ({values: []})),
          unitsValue: players.map<StatsMetric>(p => ({values: []})),
        },
      };
      while (offset < dv.byteLength - 1)
      {
        offset += this.readLine(dv, offset);
      }
    },
    readLine(dv: DataView, offset: number): number {
      let localOffset = 0;
      this.gameStats.statsData.ticks.push(dv.getUint32(offset + localOffset, true));
      localOffset += 4;
      for (let i = 0; i < this.gameStats.players.length; i++)
      {
        this.gameStats.statsData.currentMoney[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
        this.gameStats.statsData.minedMoney[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
        this.gameStats.statsData.spentMoney[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
        this.gameStats.statsData.buildingsCost[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
        this.gameStats.statsData.buildingWeaponsCost[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
        this.gameStats.statsData.unitsCost[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
        this.gameStats.statsData.researchesCost[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
        this.gameStats.statsData.ammoCost[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
        this.gameStats.statsData.researchesCount[i].values.push(dv.getUint16(offset + localOffset, true));
        localOffset += 2;
        this.gameStats.statsData.buildingsBuilt[i].values.push(dv.getUint16(offset + localOffset, true));
        localOffset += 2;
        this.gameStats.statsData.buildingsLost[i].values.push(dv.getUint16(offset + localOffset, true));
        localOffset += 2;
        this.gameStats.statsData.unitsBuilt[i].values.push(dv.getUint16(offset + localOffset, true));
        localOffset += 2;
        this.gameStats.statsData.unitsLost[i].values.push(dv.getUint16(offset + localOffset, true));
        localOffset += 2;
        this.gameStats.statsData.destroyedUnits[i].values.push(dv.getUint16(offset + localOffset, true));
        localOffset += 2;
        this.gameStats.statsData.destroyedBuildings[i].values.push(dv.getUint16(offset + localOffset, true));
        localOffset += 2;
        this.gameStats.statsData.militaryUnits[i].values.push(dv.getUint16(offset + localOffset, true));
        localOffset += 2;
        this.gameStats.statsData.unitsValue[i].values.push(dv.getUint32(offset + localOffset, true));
        localOffset += 4;
      }
      return localOffset;
    },
  },
}

</script>
<style scoped>
  #chartCol>div {
    height: 100%;
  }
</style>
