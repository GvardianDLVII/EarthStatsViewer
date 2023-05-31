<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col cols="2">
        <v-card outlined :elevation="8" class="fill-height">
          <v-img src="/logo.png"></v-img>
          <v-card-title>Stats viewer</v-card-title>
          <v-divider />
          <v-card-text>
            <v-file-input
              v-model="files"
              :density="'compact'"
              label="File input"
              variant="outlined"
              @update:model-value="readFile"
              :clearable="false"
            />
            <v-radio-group v-model="currentChart" :density="'compact'">
              <v-radio label="Current money" :value="1"></v-radio>
              <v-radio label="Mined money" :value="2"></v-radio>
              <v-radio label="Spent money" :value="3"></v-radio>
              <v-radio label="Buildings cost" :value="4"></v-radio>
              <v-radio label="Bld weapon cost" :value="5"></v-radio>
              <v-radio label="Units cost" :value="6"></v-radio>
              <v-radio label="Researches cost" :value="7"></v-radio>
              <v-radio label="Ammo cost" :value="8"></v-radio>
              <v-radio label="Researches count" :value="9"></v-radio>
              <v-radio label="Buildings built" :value="10"></v-radio>
              <v-radio label="Buildings lost" :value="11"></v-radio>
              <v-radio label="Units built" :value="12"></v-radio>
              <v-radio label="Units lost" :value="13"></v-radio>
              <v-radio label="Destroyed units" :value="14"></v-radio>
              <v-radio label="Destroyed buildings" :value="15"></v-radio>
              <v-radio label="Military units" :value="16"></v-radio>
              <v-radio label="Units value" :value="17"></v-radio>
              <v-radio label="Avg units value" :value="18"></v-radio>
              <v-radio label="K/D" :value="19"></v-radio>
              <v-radio label="K/D 5min" :value="20"></v-radio>
              <v-radio label="Money flow" :value="21"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col id="chartCol">
        <v-card v-if="gameStats" outlined :elevation="8" class="fill-height">
          <v-card-title>{{ gameStats.levelName }}</v-card-title>
          <v-divider />
          <v-card-text>
            <Line id="chart-id"
              :data="chartData"
              :options="chartOptions"
              :plugins="[plugin]"
            />
            <v-range-slider
              v-model="chartRange"
              :max="maxRange"
              thumb-label="always"
              strict
              :step="1"
              class="px-4"
            >
              <template #thumb-label="{ modelValue }: any">
                {{ new Date(modelValue * 1000).toISOString().slice(11, 19) }}
              </template>
            </v-range-slider>
          </v-card-text>
        </v-card>
        <v-card v-else :elevation="8" class="fill-height">
          <v-card-subtitle class="d-flex align-center fill-height">
            <v-spacer /><h2>No stats file loaded</h2><v-spacer />
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Title, Legend } from 'chart.js'
import { GameStats, Player, StatsMetric } from './api';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Title, Legend);



export default {
  components: { Line },
  data: () => ({
      chartOptions: {
        responsive: true,
        animation: false,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          customCanvasBackgroundColor: {
            color: '#c1cbe3',
          }
        },
      } as any,
      plugin: {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart: any, args: any, options: any) => {
          const {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#99ffff';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },

      files: [] as File[],
      gameStats: undefined as unknown as GameStats,
      currentChart: 1,
      chartRange: [0, 0],
    }),
  computed: {
    chartData(): any {
      if(!this.gameStats) return {};
      return {
        labels: this.gameStats.statsData.ticks.slice(this.chartRange[0], this.chartRange[1]).map(i => new Date(i * 1000 / 20).toISOString().slice(11, 19)),
        datasets: this.gameStats.players.map((p, i) => ({
          label: p.name, 
          data:
            this.currentChart == 1 ? this.gameStats.statsData.currentMoney[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 2 ? this.gameStats.statsData.minedMoney[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 3 ? this.gameStats.statsData.spentMoney[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 4 ? this.gameStats.statsData.buildingsCost[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 5 ? this.gameStats.statsData.buildingWeaponsCost[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 6 ? this.gameStats.statsData.unitsCost[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 7 ? this.gameStats.statsData.researchesCost[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 8 ? this.gameStats.statsData.ammoCost[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 9 ? this.gameStats.statsData.researchesCount[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 10 ? this.gameStats.statsData.buildingsBuilt[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 11 ? this.gameStats.statsData.buildingsLost[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 12 ? this.gameStats.statsData.unitsBuilt[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 13 ? this.gameStats.statsData.unitsLost[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 14 ? this.gameStats.statsData.destroyedUnits[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 15 ? this.gameStats.statsData.destroyedBuildings[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 16 ? this.gameStats.statsData.militaryUnits[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 17 ? this.gameStats.statsData.unitsValue[i].values.slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 18 ? this.gameStats.statsData.unitsValue[i].values.map((d, j) => d/this.gameStats.statsData.militaryUnits[i].values[j]).slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 19 ? this.gameStats.statsData.destroyedUnits[i].values.map((d, j) => d/this.gameStats.statsData.unitsLost[i].values[j]).slice(this.chartRange[0], this.chartRange[1])
              : this.currentChart == 20 ? this.gameStats.statsData.destroyedUnits[i].values.map((d, j) => (d - (j < 300 ? 0 : this.gameStats.statsData.destroyedUnits[i].values[j - 300]))/(this.gameStats.statsData.unitsLost[i].values[j] - (j < 300 ? 0 : this.gameStats.statsData.unitsLost[i].values[j - 300]))).slice(this.chartRange[0], this.chartRange[1])
              : this.gameStats.statsData.minedMoney[i].values.map((m, j) => m - (j < 60 ? 0 : this.gameStats.statsData.minedMoney[i].values[j - 60])).slice(this.chartRange[0], this.chartRange[1]),
          backgroundColor: this.playerColors[i],
          borderColor: this.playerColors[i],
          borderWidth: 2,
          pointRadius: 0,
        })),
      };
    },
    maxRange(): number {
      return this.gameStats ? this.gameStats.statsData.ticks.length - 1 : 0;
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
      this.chartRange[0] = 0;
      this.chartRange[1] = this.gameStats.statsData.ticks.length - 1;
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
