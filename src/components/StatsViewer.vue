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
              <template v-for="item in metricTypes" :key="item.id">
                <v-radio :label="item.name" :value="item.id"></v-radio>
              </template>
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
          <v-card-subtitle class="d-flex align-center">
            <v-spacer /><h3>{{ currentChartDescription }}</h3><v-spacer />
          </v-card-subtitle>
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
import { GameStats, StatsMetricModel } from './api';
import { createBackgroundPlugin } from '@/plugins/chartjs';
import { readStats } from './statsReader';

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
          },
        },
      } as any,
      plugin: createBackgroundPlugin(),

      files: [] as File[],
      gameStats: undefined as unknown as GameStats,
      currentChart: 1,
      chartRange: [0, 0],
      races: {1: "UCS", 2: "ED", 3: "LC"} as any,
    }),
  computed: {
    metricTypes(): StatsMetricModel[] {
      return [
        { id: 1, name: "Current money", description: "Money [CR] over time", getValue: (gs, i, range) => { return gs.statsData.currentMoney[i].values.slice(range[0], range[1]); }},
        { id: 2, name: "Mined money", description: "Money [CR] mined over time", getValue: (gs, i, range) => { return gs.statsData.minedMoney[i].values.slice(range[0], range[1]); }},
        { id: 3, name: "Spent money", description: "Money [CR] spent over time", getValue: (gs, i, range) => { return gs.statsData.spentMoney[i].values.slice(range[0], range[1]); }},
        { id: 4, name: "Buildings cost", description: "Buildings cost [CR] over time", getValue: (gs, i, range) => { return gs.statsData.buildingsCost[i].values.slice(range[0], range[1]); }},
        { id: 5, name: "Building weapons cost", description: "Building weapons cost [CR] over time", getValue: (gs, i, range) => { return gs.statsData.buildingWeaponsCost[i].values.slice(range[0], range[1]); }},
        { id: 6, name: "Units cost", description: "Units cost [CR] over time", getValue: (gs, i, range) => { return gs.statsData.unitsCost[i].values.slice(range[0], range[1]); }},
        { id: 7, name: "Researches cost", description: "Researches cost [CR] over time", getValue: (gs, i, range) => { return gs.statsData.researchesCost[i].values.slice(range[0], range[1]); }},
        { id: 8, name: "Ammo cost", description: "Ammo cost [CR] over time", getValue: (gs, i, range) => { return gs.statsData.ammoCost[i].values.slice(range[0], range[1]); }},
        { id: 9, name: "Researches count", description: "Number of researches over time", getValue: (gs, i, range) => { return gs.statsData.researchesCount[i].values.slice(range[0], range[1]); }},
        { id: 10, name: "Buildings built", description: "Number of buildings built over time", getValue: (gs, i, range) => { return gs.statsData.buildingsBuilt[i].values.slice(range[0], range[1]); }},
        { id: 11, name: "Buildings lost", description: "Number of buildings lost over time", getValue: (gs, i, range) => { return gs.statsData.buildingsLost[i].values.slice(range[0], range[1]); }},
        { id: 12, name: "Units built", description: "Number of units built over time", getValue: (gs, i, range) => { return gs.statsData.unitsBuilt[i].values.slice(range[0], range[1]); }},
        { id: 13, name: "Units lost", description: "Number of units lost over time", getValue: (gs, i, range) => { return gs.statsData.unitsLost[i].values.slice(range[0], range[1]); }},
        { id: 14, name: "Destroyed units", description: "Number of units destroyed over time", getValue: (gs, i, range) => { return gs.statsData.destroyedUnits[i].values.slice(range[0], range[1]); }},
        { id: 15, name: "Destroyed buildings", description: "Number of buldings destroyed over time", getValue: (gs, i, range) => { return gs.statsData.destroyedBuildings[i].values.slice(range[0], range[1]); }},
        { id: 16, name: "Military units", description: "Number of military units alive (army size)", getValue: (gs, i, range) => { return gs.statsData.militaryUnits[i].values.slice(range[0], range[1]); }},
        { id: 17, name: "Units value", description: "Value [CR] of all alive military units", getValue: (gs, i, range) => { return gs.statsData.unitsValue[i].values.slice(range[0], range[1]); }},
        { id: 18, name: "Avg units value", description: "Avg value [CR] of military units", getValue: (gs, i, range) => { return gs.statsData.unitsValue[i].values.map((d, j) => d/gs.statsData.militaryUnits[i].values[j]).slice(range[0], range[1]); }},
        { id: 19, name: "K/D", description: "Destroyed to lost ratio of units", getValue: (gs, i, range) => { return gs.statsData.destroyedUnits[i].values.map((d, j) => d/gs.statsData.unitsLost[i].values[j]).slice(range[0], range[1]); }},
        { id: 20, name: "K/D 5min", description: "Destroyed to lost ratio of units in timespan of previous 5 minutes", getValue: (gs, i, range) => { return gs.statsData.destroyedUnits[i].values.map((d, j) => (d - (j < 300 ? 0 : gs.statsData.destroyedUnits[i].values[j - 300]))/(gs.statsData.unitsLost[i].values[j] - (j < 300 ? 0 : gs.statsData.unitsLost[i].values[j - 300]))).slice(range[0], range[1]); }},
        { id: 21, name: "Money flow", description: "Money mined in time span of previous 60 seconds", getValue: (gs, i, range) => { return gs.statsData.minedMoney[i].values.map((m, j) => m - (j < 60 ? 0 : gs.statsData.minedMoney[i].values[j - 60])).slice(range[0], range[1]); }},
      ]
    },
    chartData(): any {
      if(!this.gameStats) return {};
      return {
        labels: this.gameStats.statsData.ticks.slice(this.chartRange[0], this.chartRange[1]).map(i => new Date(i * 1000 / 20).toISOString().slice(11, 19)),
        datasets: this.gameStats.players.map((p, i) => ({
          label: `${p.name} [${this.races[p.race]}]`, 
          data: this.metricTypes.find(m => m.id == this.currentChart)?.getValue(this.gameStats, i, this.chartRange),
          backgroundColor: this.playerColors[i],
          borderColor: this.playerColors[i],
          borderWidth: 2,
          pointRadius: 0,
        })),
      };
    },
    currentChartDescription(): string | undefined {
      return this.metricTypes.find(m => m.id == this.currentChart)?.description;
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
    },
  },
  methods: {
    async readFile() {
      if (!this.files || !this.files.length)
        return;
      let gameStats = await readStats(this.files[0]);
      if (gameStats == undefined)
        return;
      this.gameStats = gameStats;
      this.chartRange[0] = 0;
      this.chartRange[1] = this.gameStats.statsData.ticks.length - 1;
    },
  },
}

</script>
<style scoped>
  #chartCol>div {
    height: 100%;
  }
</style>
