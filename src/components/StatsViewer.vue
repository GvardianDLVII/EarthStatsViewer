<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col sm="12" md="4" lg="3" xl="2">
        <v-card outlined :elevation="8" class="fill-height left-panel">
          <v-img src="/logo.png"></v-img>
          <v-card-title class="d-flex align-center">
            <span> {{ $t("main.title") }} </span>
            <v-spacer />
            <v-switch
              v-model="darkTheme"
              color="primary"
              density="compact"
              @update:model-value="updateTheme"
              hide-details
            ></v-switch>
            <v-icon class="ml-2" icon="mdi-weather-night" :color="darkTheme ? 'primary' : ''" />
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-file-input
              v-model="files"
              multiple
              density="compact"
              :label="$t('main.fileInput')"
              variant="outlined"
              @update:model-value="readFiles"
              :clearable="false"
              prepend-icon=""
              class="stats-file-input"
            />
            <v-switch v-model="showDetails" density="compact" :label="$t('options.showDetails')" :disabled="!canViewDetails" hide-details color="primary"></v-switch>
            <div v-if="!canViewDetails || !showDetails">
              <v-switch v-model="teamMode" density="compact" :label="$t('options.teamMode')" :disabled="!statsLoaded || multipleMode" hide-details color="primary"></v-switch>
              <v-virtual-scroll height="520" :items="metricTypes">
                <template v-slot:default="{ item }">
                  <v-btn
                    variant="outlined"
                    @click="select(item)"
                    width="100%"
                    :color="currentChart == item.id ? 'blue' : ''"
                    :disabled="!statsLoaded"
                  >
                    {{ item.name}}
                  </v-btn>
                </template>
              </v-virtual-scroll>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="8" lg="9" xl="10" id="chartCol">
        <v-card v-if="statsLoaded && !multipleMode && showDetails" :elevation="8" class="fill-height">
          <v-tabs v-model="tab">
            <v-tab v-for="player in singleStats.players.filter(p => !p.isSpectator)" :value="player.index">
              <player-label :index="player.index" :name="player.name" />
              {{ player.name }}
            </v-tab>
          </v-tabs>
          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item v-for="player in singleStats.players.filter(p => !p.isSpectator)" :value="player.index">
                <player-stats :player-index="player.index" :stats="singleStats" />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
        <v-card v-else-if="statsLoaded" outlined :elevation="8" class="fill-height">
          <v-card-title v-if="multipleMode">{{ $t("main.multipleFilesLoaded") }}</v-card-title>
          <v-card-title class="d-flex" v-else>
            <span>{{ singleStats.levelName }}</span>
            <v-spacer />
            <span>{{ singleStats.dateTime.toLocaleString() }}</span>
          </v-card-title>
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
            <v-spacer /><h2> {{ $t("main.noFileLoaded") }} </h2><v-spacer />
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Title, Legend } from 'chart.js'
import { GameStats, Player, PlayerStatsModel, StatsMetricModel } from './api';
import { createBackgroundPlugin } from '@/plugins/chartjs';
import { readStats } from './statsReader';
import UnitStatsHeader from './UnitStatsHeader.vue';
import { playerColors } from '@/code/common';
import PlayerLabel from './PlayerLabel.vue';
import PlayerStats from './PlayerStats.vue';
import { ThemeInstance } from 'vuetify'
import { PropType } from 'vue';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Title, Legend);

export default {
  components: { Line, UnitStatsHeader, PlayerLabel, PlayerStats },
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
        tooltip: {
          itemSort: (a: any, b: any) => {
            return b.raw - a.raw;
          },
          position: 'average',
          yAlign: 'center',
        },
      },
    } as any,
    plugin: createBackgroundPlugin(),

    files: [] as File[],
    gameStats: [] as GameStats[],
    currentChart: 1,
    teamMode: false,
    chartRange: [0, 0],
    races: {1: "UCS", 2: "ED", 3: "LC"} as any,
    showDetails: false,
    darkTheme: true,
    tab: 0,
  }),
  props: {
    theme: {type: Object as PropType<ThemeInstance>, required: true },
  },
  computed: {
    multipleStats(): PlayerStatsModel[] {
      let result = [] as PlayerStatsModel[];
      let index = 0;
      for (let i = 0; i < this.gameStats.length; i++) {
        for (let j = 0; j < this.gameStats[i].players.length; j++) {
          let p = this.gameStats[i].players[j];
          if (p.isSpectator)
            continue;
          result.push({
            displayName: `[G${i+1}-${p.index + 1}] ${p.name} [${this.races[p.race]}]`,
            name: p.name,
            isSpectator: false,
            color: playerColors[index % playerColors.length],
            team: index,

            currentMoney: this.gameStats[i].statsData.currentMoney[j].values,
            minedMoney: this.gameStats[i].statsData.minedMoney[j].values,
            spentMoney: this.gameStats[i].statsData.spentMoney[j].values,
            buildingsCost: this.gameStats[i].statsData.buildingsCost[j].values,
            buildingWeaponsCost: this.gameStats[i].statsData.buildingWeaponsCost[j].values,
            unitsCost: this.gameStats[i].statsData.unitsCost[j].values,
            researchesCost: this.gameStats[i].statsData.researchesCost[j].values,
            ammoCost: this.gameStats[i].statsData.ammoCost[j].values,
            researchesCount: this.gameStats[i].statsData.researchesCount[j].values,
            buildingsBuilt: this.gameStats[i].statsData.buildingsBuilt[j].values,
            buildingsLost: this.gameStats[i].statsData.buildingsLost[j].values,
            unitsBuilt: this.gameStats[i].statsData.unitsBuilt[j].values,
            unitsLost: this.gameStats[i].statsData.unitsLost[j].values,
            destroyedUnits: this.gameStats[i].statsData.destroyedUnits[j].values,
            destroyedBuildings: this.gameStats[i].statsData.destroyedBuildings[j].values,
            militaryUnits: this.gameStats[i].statsData.militaryUnits[j].values,
            unitsValue: this.gameStats[i].statsData.unitsValue[j].values,
            moneyTransferred: this.gameStats[i].statsData.moneyTransferred[j].values,
            unitsCaptured: this.gameStats[i].statsData.unitsCaptured[j].values,
            unitsTransferred: this.gameStats[i].statsData.unitsTransferred[j].values,
            damageDealt: this.gameStats[i].statsData.damageDealt[j].values,
            damageReceived: this.gameStats[i].statsData.damageReceived[j].values,
            commandsSent: this.gameStats[i].statsData.commandsSent[j].values,
            moneyFlow: this.gameStats[i].statsData.minedMoney[j].values.map((m, k) => m - (k < 60 ? 0 : this.gameStats[i].statsData.minedMoney[j].values[k - 60])),
            avgUnitsValue: this.gameStats[i].statsData.unitsValue[j].values.map((d, k) => d/(this.gameStats[i].statsData.militaryUnits[j].values[k] ? this.gameStats[i].statsData.militaryUnits[j].values[k] : 1)),
            killsDeaths: this.gameStats[i].statsData.destroyedUnits[j].values.map((d, k) => d/(this.gameStats[i].statsData.unitsLost[j].values[k] ? this.gameStats[i].statsData.unitsLost[j].values[k] : 1)),
            killsDeathsFiveMin: this.gameStats[i].statsData.destroyedUnits[j].values.map((d, k) => (d - (k < 300 ? 0 : this.gameStats[i].statsData.destroyedUnits[j].values[k - 300]))/((this.gameStats[i].statsData.unitsLost[j].values[k] - (k < 300 ? 0 : this.gameStats[i].statsData.unitsLost[j].values[k - 300]))? (this.gameStats[i].statsData.unitsLost[j].values[k] - (k < 300 ? 0 : this.gameStats[i].statsData.unitsLost[j].values[k - 300])) : 1)),
            commandsSentPerMin: this.gameStats[i].statsData.commandsSent[j].values.map((m, k) => m / k * 60),
            commandsSentLastMin: this.gameStats[i].statsData.commandsSent[j].values.map((m, k) => m - (k < 60 ? 0 : this.gameStats[i].statsData.commandsSent[j].values[k - 60])),
          });
          index++;
        }
      }
      return result;
    },
    playerStats(): PlayerStatsModel[] {
      return this.singleStats.players.map<PlayerStatsModel>((p, i) => { 
        return {
          displayName: `${this.teamPrefix(p)} ${p.name} [${this.races[p.race]}]`,
          name: p.name,
          isSpectator: p.isSpectator,
          color: playerColors[p.index],
          team: p.team,

          currentMoney: this.singleStats.statsData.currentMoney[i].values,
          minedMoney: this.singleStats.statsData.minedMoney[i].values,
          spentMoney: this.singleStats.statsData.spentMoney[i].values,
          buildingsCost: this.singleStats.statsData.buildingsCost[i].values,
          buildingWeaponsCost: this.singleStats.statsData.buildingWeaponsCost[i].values,
          unitsCost: this.singleStats.statsData.unitsCost[i].values,
          researchesCost: this.singleStats.statsData.researchesCost[i].values,
          ammoCost: this.singleStats.statsData.ammoCost[i].values,
          researchesCount: this.singleStats.statsData.researchesCount[i].values,
          buildingsBuilt: this.singleStats.statsData.buildingsBuilt[i].values,
          buildingsLost: this.singleStats.statsData.buildingsLost[i].values,
          unitsBuilt: this.singleStats.statsData.unitsBuilt[i].values,
          unitsLost: this.singleStats.statsData.unitsLost[i].values,
          destroyedUnits: this.singleStats.statsData.destroyedUnits[i].values,
          destroyedBuildings: this.singleStats.statsData.destroyedBuildings[i].values,
          militaryUnits: this.singleStats.statsData.militaryUnits[i].values,
          unitsValue: this.singleStats.statsData.unitsValue[i].values,
          moneyTransferred: this.singleStats.statsData.moneyTransferred[i].values,
          unitsCaptured: this.singleStats.statsData.unitsCaptured[i].values,
          unitsTransferred: this.singleStats.statsData.unitsTransferred[i].values,
          damageDealt: this.singleStats.statsData.damageDealt[i].values,
          damageReceived: this.singleStats.statsData.damageReceived[i].values,
          commandsSent: this.singleStats.statsData.commandsSent[i].values,
          moneyFlow: this.singleStats.statsData.minedMoney[i].values.map((m, j) => m - (j < 60 ? 0 : this.singleStats.statsData.minedMoney[i].values[j - 60])),
          avgUnitsValue: this.singleStats.statsData.unitsValue[i].values.map((d, j) => d/(this.singleStats.statsData.militaryUnits[i].values[j] ? this.singleStats.statsData.militaryUnits[i].values[j] : 1)),
          killsDeaths: this.singleStats.statsData.destroyedUnits[i].values.map((d, j) => d/(this.singleStats.statsData.unitsLost[i].values[j] ? this.singleStats.statsData.unitsLost[i].values[j] : 1)),
          killsDeathsFiveMin: this.singleStats.statsData.destroyedUnits[i].values.map((d, j) => (d - (j < 300 ? 0 : this.singleStats.statsData.destroyedUnits[i].values[j - 300]))/((this.singleStats.statsData.unitsLost[i].values[j] - (j < 300 ? 0 : this.singleStats.statsData.unitsLost[i].values[j - 300])) ? (this.singleStats.statsData.unitsLost[i].values[j] - (j < 300 ? 0 : this.singleStats.statsData.unitsLost[i].values[j - 300])) : 1)),
          commandsSentPerMin: this.singleStats.statsData.commandsSent[i].values.map((m, k) => m / k * 60),
          commandsSentLastMin: this.singleStats.statsData.commandsSent[i].values.map((m, j) => m - (j < 60 ? 0 : this.singleStats.statsData.commandsSent[i].values[j - 60])),
        };
      });
    },
    teamStats(): PlayerStatsModel[] {
      let teams = this.playerStats.filter(p => !p.isSpectator).map(p => p.team);
      let distinctTeams = teams.filter((t, i) => teams.indexOf(t) == i);
      return distinctTeams.map(t => {
        let teamPlayers = this.playerStats.filter(p => p.team == t);
        return {
          displayName: `[${t}] ${teamPlayers.map(tp => tp.name).join("/")}`,
          name: teamPlayers.map(tp => tp.name).join("/"),
          isSpectator: false,
          color: teamPlayers[0].color,
          team: t,
          currentMoney: teamPlayers[0].currentMoney.map((_v, i) => teamPlayers.map(tp => tp.currentMoney[i]).reduce((s, a) => s + a, 0)),
          minedMoney: teamPlayers[0].minedMoney.map((_v, i) => teamPlayers.map(tp => tp.minedMoney[i]).reduce((s, a) => s + a, 0)),
          spentMoney: teamPlayers[0].spentMoney.map((_v, i) => teamPlayers.map(tp => tp.spentMoney[i]).reduce((s, a) => s + a, 0)),
          buildingsCost: teamPlayers[0].buildingsCost.map((_v, i) => teamPlayers.map(tp => tp.buildingsCost[i]).reduce((s, a) => s + a, 0)),
          buildingWeaponsCost: teamPlayers[0].buildingWeaponsCost.map((_v, i) => teamPlayers.map(tp => tp.buildingWeaponsCost[i]).reduce((s, a) => s + a, 0)),
          unitsCost: teamPlayers[0].unitsCost.map((_v, i) => teamPlayers.map(tp => tp.unitsCost[i]).reduce((s, a) => s + a, 0)),
          researchesCost: teamPlayers[0].researchesCost.map((_v, i) => teamPlayers.map(tp => tp.researchesCost[i]).reduce((s, a) => s + a, 0)),
          ammoCost: teamPlayers[0].ammoCost.map((_v, i) => teamPlayers.map(tp => tp.ammoCost[i]).reduce((s, a) => s + a, 0)),
          researchesCount: teamPlayers[0].researchesCount.map((_v, i) => teamPlayers.map(tp => tp.researchesCount[i]).reduce((s, a) => s + a, 0)),
          buildingsBuilt: teamPlayers[0].buildingsBuilt.map((_v, i) => teamPlayers.map(tp => tp.buildingsBuilt[i]).reduce((s, a) => s + a, 0)),
          buildingsLost: teamPlayers[0].buildingsLost.map((_v, i) => teamPlayers.map(tp => tp.buildingsLost[i]).reduce((s, a) => s + a, 0)),
          unitsBuilt: teamPlayers[0].unitsBuilt.map((_v, i) => teamPlayers.map(tp => tp.unitsBuilt[i]).reduce((s, a) => s + a, 0)),
          unitsLost: teamPlayers[0].unitsLost.map((_v, i) => teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0)),
          destroyedUnits: teamPlayers[0].destroyedUnits.map((_v, i) => teamPlayers.map(tp => tp.destroyedUnits[i]).reduce((s, a) => s + a, 0)),
          destroyedBuildings: teamPlayers[0].destroyedBuildings.map((_v, i) => teamPlayers.map(tp => tp.destroyedBuildings[i]).reduce((s, a) => s + a, 0)),
          militaryUnits: teamPlayers[0].militaryUnits.map((_v, i) => teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)),
          unitsValue: teamPlayers[0].unitsValue.map((_v, i) => teamPlayers.map(tp => tp.unitsValue[i]).reduce((s, a) => s + a, 0)),
          moneyTransferred: teamPlayers[0].moneyTransferred.map((_v, i) => teamPlayers.map(tp => tp.moneyTransferred[i]).reduce((s, a) => s + a, 0)),
          unitsCaptured: teamPlayers[0].unitsCaptured.map((_v, i) => teamPlayers.map(tp => tp.unitsCaptured[i]).reduce((s, a) => s + a, 0)),
          unitsTransferred: teamPlayers[0].unitsTransferred.map((_v, i) => teamPlayers.map(tp => tp.unitsTransferred[i]).reduce((s, a) => s + a, 0)),
          damageDealt: teamPlayers[0].damageDealt.map((_v, i) => teamPlayers.map(tp => tp.damageDealt[i]).reduce((s, a) => s + a, 0)),
          damageReceived: teamPlayers[0].damageReceived.map((_v, i) => teamPlayers.map(tp => tp.damageReceived[i]).reduce((s, a) => s + a, 0)),
          commandsSent: teamPlayers[0].commandsSent.map((_v, i) => teamPlayers.map(tp => tp.commandsSent[i]).reduce((s, a) => s + a, 0)),
          moneyFlow: teamPlayers[0].moneyFlow.map((_v, i) => teamPlayers.map(tp => tp.moneyFlow[i]).reduce((s, a) => s + a, 0)),
          avgUnitsValue: teamPlayers[0].avgUnitsValue.map((_v, i) => teamPlayers.map(tp => tp.unitsValue[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) : 1),
          killsDeaths: teamPlayers[0].killsDeaths.map((_v, i) => teamPlayers.map(tp => tp.destroyedUnits[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0)) : 1),
          killsDeathsFiveMin: teamPlayers[0].killsDeathsFiveMin.map((_v, i) => (teamPlayers.map(tp => tp.destroyedUnits[i]).reduce((s, a) => s + a, 0) - (i < 300 ? 0 : teamPlayers.map(tp => tp.destroyedUnits[i - 300]).reduce((s, a) => s + a, 0))) / ((teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0) - (i < 300 ? 0 : teamPlayers.map(tp => tp.unitsLost[i - 300]).reduce((s, a) => s + a, 0))) ? (teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0) - (i < 300 ? 0 : teamPlayers.map(tp => tp.unitsLost[i - 300]).reduce((s, a) => s + a, 0))) : 1)),
          commandsSentPerMin: teamPlayers[0].commandsSentPerMin.map((_v, i) => teamPlayers.map(tp => tp.commandsSentPerMin[i]).reduce((s, a) => s + a, 0)),
          commandsSentLastMin: teamPlayers[0].commandsSentLastMin.map((_v, i) => teamPlayers.map(tp => tp.commandsSentLastMin[i]).reduce((s, a) => s + a, 0)),
        };
      });
    },
    multipleMode(): boolean {
      return this.files && this.files.length > 1;
    },
    singleStats(): GameStats {
      return this.gameStats[0];
    },
    allTicks(): number[] {
      if (!this.statsLoaded)
        return [];
      let maxTicks = 0;
      for (let i = 0; i < this.gameStats.length; i++)
        if (this.gameStats[i].statsData.ticks.length > this.gameStats[maxTicks].statsData.ticks.length)
          maxTicks = i;
      return this.gameStats[maxTicks].statsData.ticks;
    },
    statsLoaded(): boolean {
      return this.gameStats != undefined && this.gameStats.length > 0;
    },
    statsItems(): PlayerStatsModel[] {
      return this.multipleMode
        ? this.multipleStats
        : this.teamMode
          ? this.teamStats
          : this.playerStats;
    },
    metricTypes(): StatsMetricModel[] {
      return [
        {
          id: 1,
          name: this.$t('statsCharts.metrics.currentMoney.name'),
          description: this.$t('statsCharts.metrics.currentMoney.description'),
          getValue: (p, range) => p.currentMoney.slice(range[0], range[1])
        },
        {
          id: 2,
          name: this.$t('statsCharts.metrics.minedMoney.name'),
          description: this.$t('statsCharts.metrics.minedMoney.description'),
          getValue: (p, range) => p.minedMoney.slice(range[0], range[1])
        },
        {
          id: 3,
          name: this.$t('statsCharts.metrics.spentMoney.name'),
          description: this.$t('statsCharts.metrics.spentMoney.description'),
          getValue: (p, range) => p.spentMoney.slice(range[0], range[1])
        },
        {
          id: 4,
          name: this.$t('statsCharts.metrics.buildingsCost.name'),
          description: this.$t('statsCharts.metrics.buildingsCost.description'),
          getValue: (p, range) => p.buildingsCost.slice(range[0], range[1])
        },
        {
          id: 5,
          name: this.$t('statsCharts.metrics.buildingWeaponsCost.name'),
          description: this.$t('statsCharts.metrics.buildingWeaponsCost.description'),
          getValue: (p, range) => p.buildingWeaponsCost.slice(range[0], range[1])
        },
        {
          id: 6,
          name: this.$t('statsCharts.metrics.unitsCost.name'),
          description: this.$t('statsCharts.metrics.unitsCost.description'),
          getValue: (p, range) => p.unitsCost.slice(range[0], range[1])
        },
        {
          id: 7,
          name: this.$t('statsCharts.metrics.researchesCost.name'),
          description: this.$t('statsCharts.metrics.researchesCost.description'),
          getValue: (p, range) => p.researchesCost.slice(range[0], range[1])
        },
        {
          id: 8,
          name: this.$t('statsCharts.metrics.ammoCost.name'),
          description: this.$t('statsCharts.metrics.ammoCost.description'),
          getValue: (p, range) => p.ammoCost.slice(range[0], range[1])
        },
        {
          id: 22,
          name: this.$t('statsCharts.metrics.moneyTransferred.name'),
          description: this.$t('statsCharts.metrics.moneyTransferred.description'),
          getValue: (p, range) => p.moneyTransferred.slice(range[0], range[1])
        },
        {
          id: 21,
          name: this.$t('statsCharts.metrics.moneyFlow.name'),
          description: this.$t('statsCharts.metrics.moneyFlow.description'),
          getValue: (p, range) => p.moneyFlow.slice(range[0], range[1])
        },
        {
          id: 9,
          name: this.$t('statsCharts.metrics.researchesCount.name'),
          description: this.$t('statsCharts.metrics.researchesCount.description'),
          getValue: (p, range) => p.researchesCount.slice(range[0], range[1])
        },
        {
          id: 10,
          name: this.$t('statsCharts.metrics.buildingsBuilt.name'),
          description: this.$t('statsCharts.metrics.buildingsBuilt.description'),
          getValue: (p, range) => p.buildingsBuilt.slice(range[0], range[1])
        },
        {
          id: 11,
          name: this.$t('statsCharts.metrics.buildingsLost.name'),
          description: this.$t('statsCharts.metrics.buildingsLost.description'),
          getValue: (p, range) => p.buildingsLost.slice(range[0], range[1])
        },
        {
          id: 12,
          name: this.$t('statsCharts.metrics.unitsBuilt.name'),
          description: this.$t('statsCharts.metrics.unitsBuilt.description'),
          getValue: (p, range) => p.unitsBuilt.slice(range[0], range[1])
        },
        {
          id: 13,
          name: this.$t('statsCharts.metrics.unitsLost.name'),
          description: this.$t('statsCharts.metrics.unitsLost.description'),
          getValue: (p, range) => p.unitsLost.slice(range[0], range[1])
        },
        {
          id: 14,
          name: this.$t('statsCharts.metrics.destroyedUnits.name'),
          description: this.$t('statsCharts.metrics.destroyedUnits.description'),
          getValue: (p, range) => p.destroyedUnits.slice(range[0], range[1])
        },
        {
          id: 15,
          name: this.$t('statsCharts.metrics.destroyedBuildings.name'),
          description: this.$t('statsCharts.metrics.destroyedBuildings.description'),
          getValue: (p, range) => p.destroyedBuildings.slice(range[0], range[1])
        },
        {
          id: 16,
          name: this.$t('statsCharts.metrics.militaryUnits.name'),
          description: this.$t('statsCharts.metrics.militaryUnits.description'),
          getValue: (p, range) => p.militaryUnits.slice(range[0], range[1])
        },
        {
          id: 17,
          name: this.$t('statsCharts.metrics.unitsValue.name'),
          description: this.$t('statsCharts.metrics.unitsValue.description'),
          getValue: (p, range) => p.unitsValue.slice(range[0], range[1])
        },
        {
          id: 18,
          name: this.$t('statsCharts.metrics.avgUnitsValue.name'),
          description: this.$t('statsCharts.metrics.avgUnitsValue.description'),
          getValue: (p, range) => p.avgUnitsValue.slice(range[0], range[1])
        },
        {
          id: 19,
          name: this.$t('statsCharts.metrics.killsDeaths.name'),
          description: this.$t('statsCharts.metrics.killsDeaths.description'),
          getValue: (p, range) => p.killsDeaths.slice(range[0], range[1])
        },
        {
          id: 20,
          name: this.$t('statsCharts.metrics.killsDeathsFiveMin.name'),
          description: this.$t('statsCharts.metrics.killsDeathsFiveMin.description'),
          getValue: (p, range) => p.killsDeathsFiveMin.slice(range[0], range[1])
        },
        {
          id: 23,
          name: this.$t('statsCharts.metrics.unitsCaptured.name'),
          description: this.$t('statsCharts.metrics.unitsCaptured.description'),
          getValue: (p, range) => p.unitsCaptured.slice(range[0], range[1])
        },
        {
          id: 24,
          name: this.$t('statsCharts.metrics.unitsTransferred.name'),
          description: this.$t('statsCharts.metrics.unitsTransferred.description'),
          getValue: (p, range) => p.unitsTransferred.slice(range[0], range[1])
        },
        {
          id: 25,
          name: this.$t('statsCharts.metrics.damageDealt.name'),
          description: this.$t('statsCharts.metrics.damageDealt.description'),
          getValue: (p, range) => p.damageDealt.slice(range[0], range[1])
        },
        {
          id: 26,
          name: this.$t('statsCharts.metrics.damageReceived.name'),
          description: this.$t('statsCharts.metrics.damageReceived.description'),
          getValue: (p, range) => p.damageReceived.slice(range[0], range[1])
        },
        {
          id: 27,
          name: this.$t('statsCharts.metrics.commandsSent.name'),
          description: this.$t('statsCharts.metrics.commandsSent.description'),
          getValue: (p, range) => p.commandsSent.slice(range[0], range[1])
        },
        {
          id: 28,
          name: this.$t('statsCharts.metrics.commandsSentPerMin.name'),
          description: this.$t('statsCharts.metrics.commandsSentPerMin.description'),
          getValue: (p, range) => p.commandsSentPerMin.slice(range[0], range[1])
        },
        {
          id: 29,
          name: this.$t('statsCharts.metrics.commandsSentLastMin.name'),
          description: this.$t('statsCharts.metrics.commandsSentLastMin.description'),
          getValue: (p, range) => p.commandsSentLastMin.slice(range[0], range[1])
        }
      ];
    },
    chartData(): any {
      if(!this.statsLoaded) return {};
      return {
        labels: this.allTicks.slice(this.chartRange[0], this.chartRange[1]).map(i => new Date(i * 1000 / 20).toISOString().slice(11, 19)),
        datasets: this.statsItems.map(p => ({
          label: p.displayName, 
          data: this.metricTypes.find(m => m.id == this.currentChart)?.getValue(p, this.chartRange),
          backgroundColor: p.color,
          borderColor: p.color,
          borderWidth: 2,
          pointRadius: 0,
          hidden: p.isSpectator,
        })),
      };
    },
    currentChartDescription(): string | undefined {
      return this.metricTypes.find(m => m.id == this.currentChart)?.description;
    },
    maxRange(): number {
      return this.statsLoaded ? this.allTicks.length - 1 : 0;
    },
    canViewDetails(): boolean {
      return this.statsLoaded && !this.multipleMode && this.gameStats[0].apiVersion > 1;
    },
  },
  methods: {
    async readFiles() {
      if (!this.files || !this.files.length)
        return;

      this.gameStats = [];
      this.showDetails = false;
      this.teamMode = false;
      for(let i = 0; i < this.files.length; i++)
      {
        let gameStats = await readStats(this.files[i]);
        if (gameStats == undefined)
          return;
        this.gameStats.push(gameStats);
      }
      this.chartRange[0] = 0;
      this.chartRange[1] = this.allTicks.length - 1;
    },
    teamPrefix(player: Player): string {
      if (player.isSpectator)
        return "[" + this.$t("statsCharts.observerPrefix") + "]";
      return `[${player.team}]`;
    },
    select(item :StatsMetricModel): void {
      this.currentChart = item.id;
    },
    updateTheme() {
      this.theme.global.name.value = this.darkTheme ? 'dark' : 'light'
    }
  },
}

</script>
<style>
  #chartCol>div {
    height: 100%;
  }

  .stats-file-input .v-field__input {
    font-size: 13px;
    line-height: 24px;
  }
</style>
