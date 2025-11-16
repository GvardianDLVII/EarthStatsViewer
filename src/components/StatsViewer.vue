<template>
  <v-container class="fill-height">
    <v-row class="fill-height" style="max-width: 100% !important;">
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
          <v-card-text class="px-0">
            <div class="px-3">
              <v-file-input
                v-model="files"
                multiple
                density="compact"
                :label="$t('main.fileInput.title')"
                :hint="$t('main.fileInput.placeholder')"
                persistent-hint
                variant="outlined"
                @update:model-value="readFiles"
                :clearable="false"
                prepend-icon=""
                class="stats-file-input mb-2"
              />
              <v-divider />
              <v-btn-toggle
                v-model="statsMode"
                :disabled="!statsLoaded || multipleMode"
                rounded="0"
                density="compact"
                group
                mandatory
                color="primary"
              >
                <v-btn value="chart">
                  Charts
                </v-btn>
                <v-btn value="details">
                  Details
                </v-btn>
              </v-btn-toggle>
            </div>
            <div v-if="!canViewDetails || statsMode == 'chart'">
              <v-card variant="outlined" border="sm" class="mx-3 pt-1">
                <v-card-subtitle>{{ $t('options.header') }}</v-card-subtitle>
                <v-card-text class="py-0">
                  <v-switch v-model="teamMode" density="compact" :label="$t('options.teamMode')" :disabled="!statsLoaded || multipleMode" hide-details color="primary"></v-switch>
                </v-card-text>
              </v-card>
              <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-icon icon="mdi-star-outline" class="mr-3"></v-icon>
                    General
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="px-0">
                    <v-btn
                      v-for="id in ['currentMoney', 'minedMoney', 'spentMoney', 'moneyFlow', 'buildingsBuilt', 'buildingsLost', 'unitsBuilt', 'unitsLost', 'militaryUnits', 'killsDeaths', 'commandsSentPerMin']" :key="id"
                      variant="outlined"
                      @click="currentChart = id"
                      width="100%"
                      :color="currentChart == id ? 'blue' : ''"
                      :disabled="!statsLoaded"
                      density="comfortable"
                    >
                      {{ $t(`statsCharts.metrics.${id}.name`) }}
                    </v-btn>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-icon icon="mdi-finance" class="mr-3"></v-icon>
                    Economy
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-btn
                      v-for="id in ['currentMoney', 'minedMoney', 'spentMoney', 'moneyFlow', 'activeMiningEntities', 'buildingsCost', 'buildingWeaponsCost', 'unitsCost', 'researchesCost', 'ammoCost', 'moneyTransferred', 'miningEfficiency']" :key="id"
                      variant="outlined"
                      @click="currentChart = id"
                      width="100%"
                      :color="currentChart == id ? 'blue' : ''"
                      :disabled="!statsLoaded"
                      density="comfortable"
                    >
                      {{ $t(`statsCharts.metrics.${id}.name`) }}
                    </v-btn>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-icon icon="mdi-factory" class="mr-3"></v-icon>
                    Buildings
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-btn
                      v-for="id in ['buildingsBuilt', 'buildingsLost', 'buildingsCost', 'buildingsUnderConstruction', 'factories', 'builders']" :key="id"
                      variant="outlined"
                      @click="currentChart = id"
                      width="100%"
                      :color="currentChart == id ? 'blue' : ''"
                      :disabled="!statsLoaded"
                      density="comfortable"
                    >
                      {{ $t(`statsCharts.metrics.${id}.name`) }}
                    </v-btn>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-icon icon="mdi-truck-outline" class="mr-3"></v-icon>
                    Units
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-btn
                      v-for="id in ['unitsBuilt', 'unitsLost', 'unitsCost', 'militaryUnits', 'unitsValue', 'avgUnitsValue', 'builders', 'suppliers', 'unitsCaptured', 'unitsTransferred']" :key="id"
                      variant="outlined"
                      @click="currentChart = id"
                      width="100%"
                      :color="currentChart == id ? 'blue' : ''"
                      :disabled="!statsLoaded"
                      density="comfortable"
                    >
                      {{ $t(`statsCharts.metrics.${id}.name`) }}
                    </v-btn>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-icon icon="mdi-tank" class="mr-3"></v-icon>
                    Military
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-btn
                      v-for="id in ['militaryUnits', 'destroyedUnits', 'unitsLost', 'killsDeaths', 'killsDeathsFiveMin', 'damageDealt', 'damageReceived', 'recentDamage', 'bannerCoverage', 'shadowCoverage', 'averageExpLevel', 'suppliersPerUnit', 'militaryUnitsCombatEngagement']" :key="id"
                      variant="outlined"
                      @click="currentChart = id"
                      width="100%"
                      :color="currentChart == id ? 'blue' : ''"
                      :disabled="!statsLoaded"
                      density="comfortable"
                    >
                      {{ $t(`statsCharts.metrics.${id}.name`) }}
                    </v-btn>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-icon icon="mdi-cog" class="mr-3"></v-icon>
                    Misc
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-btn
                      v-for="id in ['commandsSent', 'commandsSentPerMin', 'commandsSentLastMin', 'researchesCount', 'researchCenters', 'suppliersPerUnit', 'hpRepaired', 'crRepaired']" :key="id"
                      variant="outlined"
                      @click="currentChart = id"
                      width="100%"
                      :color="currentChart == id ? 'blue' : ''"
                      :disabled="!statsLoaded"
                      density="comfortable"
                    >
                      {{ $t(`statsCharts.metrics.${id}.name`) }}
                    </v-btn>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <div v-else>
              <p class="ma-4">Use panel on the right side to browse detailed stats of each unit by each player.</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="8" lg="9" xl="10" id="chartCol">
        <v-card v-if="statsLoaded && !multipleMode && statsMode == 'details'" :elevation="8" class="fill-height">
          <v-tabs v-model="tab">
            <v-tab v-for="player in singleStats.players.filter(p => !p.isSpectator)" :value="player.index">
              <player-label :index="player.index" :name="player.name" />
              {{ player.name }}
            </v-tab>
            <v-tab value="15">
              <player-label :index="15" :name="$t('unitStats.playerStats.combined')" />
              {{ $t("unitStats.playerStats.combined") }}
            </v-tab>
          </v-tabs>
          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item v-for="player in singleStats.players.filter(p => !p.isSpectator)" :value="player.index">
                <player-stats :player-index="player.index" :stats="singleStats" />
              </v-tabs-window-item>
              <v-tabs-window-item value="15">
                <player-stats :player-index="255" :stats="singleStats" />
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
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Title, Legend, scales } from 'chart.js'
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
      scales: {
        x: {
          grid: {
            color: '#2a2a2a'
          },
          ticks: {
            color: '#888888',
          },
        },
        y: {
          grid: {
            color: '#2a2a2a',
          },
          ticks: {
            color: '#888888',
          },
        },
      },
      plugins: {
        customCanvasBackgroundColor: {
          color: '#222222',
        },
        tooltip: {
          itemSort: (a: any, b: any) => {
            return b.raw - a.raw;
          },
          position: 'average',
          yAlign: 'center',
        },
        legend: {
          labels: {
            color: '#cccccc'
          }
        }
      },
    } as any,
    plugin: createBackgroundPlugin(),

    files: [] as File[],
    gameStats: [] as GameStats[],
    currentChart: "currentMoney",
    teamMode: false,
    chartRange: [0, 0],
    races: {1: "UCS", 2: "ED", 3: "LC"} as any,
    showDetails: false,
    statsMode: "chart",
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
            researchCenters: this.gameStats[i].statsData.researchCenters[j].values,
            buildingsUnderConstruction: this.gameStats[i].statsData.buildingsUnderConstruction[j].values,
            activeMiningEntities: this.gameStats[i].statsData.activeMiningEntities[j].values,
            factories: this.gameStats[i].statsData.factories[j].values,
            builders: this.gameStats[i].statsData.builders[j].values,
            suppliers: this.gameStats[i].statsData.suppliers[j].values,
            totalExpLevel: this.gameStats[i].statsData.totalExpLevel[j].values,
            banneredMilitaryUnits: this.gameStats[i].statsData.banneredMilitaryUnits[j].values,
            shadowedMilitaryUnits: this.gameStats[i].statsData.shadowedMilitaryUnits[j].values,
            militaryUnitsInCombat: this.gameStats[i].statsData.militaryUnitsInCombat[j].values,
            hpRepaired: this.gameStats[i].statsData.hpRepaired[j].values,
            crRepaired: this.gameStats[i].statsData.crRepaired[j].values,

            moneyFlow: this.gameStats[i].statsData.minedMoney[j].values.map((m, k) => m - (k < 60 ? 0 : this.gameStats[i].statsData.minedMoney[j].values[k - 60])),
            avgUnitsValue: this.gameStats[i].statsData.unitsValue[j].values.map((d, k) => d/(this.gameStats[i].statsData.militaryUnits[j].values[k] ? this.gameStats[i].statsData.militaryUnits[j].values[k] : 1)),
            killsDeaths: this.gameStats[i].statsData.destroyedUnits[j].values.map((d, k) => d/(this.gameStats[i].statsData.unitsLost[j].values[k] ? this.gameStats[i].statsData.unitsLost[j].values[k] : 1)),
            killsDeathsFiveMin: this.gameStats[i].statsData.destroyedUnits[j].values.map((d, k) => (d - (k < 300 ? 0 : this.gameStats[i].statsData.destroyedUnits[j].values[k - 300]))/((this.gameStats[i].statsData.unitsLost[j].values[k] - (k < 300 ? 0 : this.gameStats[i].statsData.unitsLost[j].values[k - 300]))? (this.gameStats[i].statsData.unitsLost[j].values[k] - (k < 300 ? 0 : this.gameStats[i].statsData.unitsLost[j].values[k - 300])) : 1)),
            commandsSentPerMin: this.gameStats[i].statsData.commandsSent[j].values.map((m, k) => k < 60 ? m : m / k * 60),
            commandsSentLastMin: this.gameStats[i].statsData.commandsSent[j].values.map((m, k) => m - (k < 60 ? 0 : this.gameStats[i].statsData.commandsSent[j].values[k - 60])),
            recentDamage: this.gameStats[i].statsData.damageDealt[j].values.map((m, k) => m - (k < 60 ? 0 : this.gameStats[i].statsData.damageDealt[j].values[k - 60])),
            miningEfficiency: this.gameStats[i].statsData.minedMoney[j].values.map((m, k) => k < 60
              ? (m / (this.gameStats[i].statsData.activeMiningEntities[j].values[k] ? this.gameStats[i].statsData.activeMiningEntities[j].values[k] : 1))
              : ((m - this.gameStats[i].statsData.minedMoney[j].values[k - 60]) / (Math.max(this.gameStats[i].statsData.activeMiningEntities[j].values[k], this.gameStats[i].statsData.activeMiningEntities[j].values[k - 60]) ? Math.max(this.gameStats[i].statsData.activeMiningEntities[j].values[k], this.gameStats[i].statsData.activeMiningEntities[j].values[k - 60]) : 1))),
            bannerCoverage: this.gameStats[i].statsData.banneredMilitaryUnits[j].values.map((d, k) => 100 * d/(this.gameStats[i].statsData.militaryUnits[j].values[k] ? this.gameStats[i].statsData.militaryUnits[j].values[k] : 1)),
            shadowCoverage: this.gameStats[i].statsData.shadowedMilitaryUnits[j].values.map((d, k) => 100 * d/(this.gameStats[i].statsData.militaryUnits[j].values[k] ? this.gameStats[i].statsData.militaryUnits[j].values[k] : 1)),
            averageExpLevel: this.gameStats[i].statsData.totalExpLevel[j].values.map((d, k) => d/(this.gameStats[i].statsData.militaryUnits[j].values[k] ? this.gameStats[i].statsData.militaryUnits[j].values[k] : 1)),
            suppliersPerUnit: this.gameStats[i].statsData.suppliers[j].values.map((d, k) => d/(this.gameStats[i].statsData.militaryUnits[j].values[k] ? this.gameStats[i].statsData.militaryUnits[j].values[k] : 1)),
            militaryUnitsCombatEngagement: this.gameStats[i].statsData.militaryUnitsInCombat[j].values.map((d, k) => 100 * d/(this.gameStats[i].statsData.militaryUnits[j].values[k] ? this.gameStats[i].statsData.militaryUnits[j].values[k] : 1)),
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
          researchCenters: this.singleStats.statsData.researchCenters[i].values,
          buildingsUnderConstruction: this.singleStats.statsData.buildingsUnderConstruction[i].values,
          activeMiningEntities: this.singleStats.statsData.activeMiningEntities[i].values,
          factories: this.singleStats.statsData.factories[i].values,
          builders: this.singleStats.statsData.builders[i].values,
          suppliers: this.singleStats.statsData.suppliers[i].values,
          totalExpLevel: this.singleStats.statsData.totalExpLevel[i].values,
          banneredMilitaryUnits: this.singleStats.statsData.banneredMilitaryUnits[i].values,
          shadowedMilitaryUnits: this.singleStats.statsData.shadowedMilitaryUnits[i].values,
          militaryUnitsInCombat: this.singleStats.statsData.militaryUnitsInCombat[i].values,
          hpRepaired: this.singleStats.statsData.hpRepaired[i].values,
          crRepaired: this.singleStats.statsData.crRepaired[i].values,

          moneyFlow: this.singleStats.statsData.minedMoney[i].values.map((m, j) => m - (j < 60 ? 0 : this.singleStats.statsData.minedMoney[i].values[j - 60])),
          avgUnitsValue: this.singleStats.statsData.unitsValue[i].values.map((d, j) => d/(this.singleStats.statsData.militaryUnits[i].values[j] ? this.singleStats.statsData.militaryUnits[i].values[j] : 1)),
          killsDeaths: this.singleStats.statsData.destroyedUnits[i].values.map((d, j) => d/(this.singleStats.statsData.unitsLost[i].values[j] ? this.singleStats.statsData.unitsLost[i].values[j] : 1)),
          killsDeathsFiveMin: this.singleStats.statsData.destroyedUnits[i].values.map((d, j) => (d - (j < 300 ? 0 : this.singleStats.statsData.destroyedUnits[i].values[j - 300]))/((this.singleStats.statsData.unitsLost[i].values[j] - (j < 300 ? 0 : this.singleStats.statsData.unitsLost[i].values[j - 300])) ? (this.singleStats.statsData.unitsLost[i].values[j] - (j < 300 ? 0 : this.singleStats.statsData.unitsLost[i].values[j - 300])) : 1)),
          commandsSentPerMin: this.singleStats.statsData.commandsSent[i].values.map((m, k) => k < 60 ? m : m / k * 60),
          commandsSentLastMin: this.singleStats.statsData.commandsSent[i].values.map((m, j) => m - (j < 60 ? 0 : this.singleStats.statsData.commandsSent[i].values[j - 60])),
          recentDamage: this.singleStats.statsData.damageDealt[i].values.map((m, j) => m - (j < 60 ? 0 : this.singleStats.statsData.damageDealt[i].values[j - 60])),
          miningEfficiency: this.singleStats.statsData.minedMoney[i].values.map((m, k) => k < 60
            ? (m / (this.singleStats.statsData.activeMiningEntities[i].values[k] ? this.singleStats.statsData.activeMiningEntities[i].values[k] : 1))
            : ((m - this.singleStats.statsData.minedMoney[i].values[k - 60]) / (Math.max(this.singleStats.statsData.activeMiningEntities[i].values[k], this.singleStats.statsData.activeMiningEntities[i].values[k - 60]) ? Math.max(this.singleStats.statsData.activeMiningEntities[i].values[k], this.singleStats.statsData.activeMiningEntities[i].values[k - 60]) : 1))),
          bannerCoverage: this.singleStats.statsData.banneredMilitaryUnits[i].values.map((d, j) => 100 * d/(this.singleStats.statsData.militaryUnits[i].values[j] ? this.singleStats.statsData.militaryUnits[i].values[j] : 1)),
          shadowCoverage: this.singleStats.statsData.shadowedMilitaryUnits[i].values.map((d, j) => 100 * d/(this.singleStats.statsData.militaryUnits[i].values[j] ? this.singleStats.statsData.militaryUnits[i].values[j] : 1)),
          averageExpLevel: this.singleStats.statsData.totalExpLevel[i].values.map((d, j) => d/(this.singleStats.statsData.militaryUnits[i].values[j] ? this.singleStats.statsData.militaryUnits[i].values[j] : 1)),
          suppliersPerUnit: this.singleStats.statsData.suppliers[i].values.map((d, j) => d/(this.singleStats.statsData.militaryUnits[i].values[j] ? this.singleStats.statsData.militaryUnits[i].values[j] : 1)),
          militaryUnitsCombatEngagement: this.singleStats.statsData.militaryUnitsInCombat[i].values.map((d, j) => 100 * d/(this.singleStats.statsData.militaryUnits[i].values[j] ? this.singleStats.statsData.militaryUnits[i].values[j] : 1)),
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
          researchCenters: teamPlayers[0].researchCenters.map((_v, i) => teamPlayers.map(tp => tp.researchCenters[i]).reduce((s, a) => s + a, 0)),
          buildingsUnderConstruction: teamPlayers[0].buildingsUnderConstruction.map((_v, i) => teamPlayers.map(tp => tp.buildingsUnderConstruction[i]).reduce((s, a) => s + a, 0)),
          activeMiningEntities: teamPlayers[0].activeMiningEntities.map((_v, i) => teamPlayers.map(tp => tp.activeMiningEntities[i]).reduce((s, a) => s + a, 0)),
          factories: teamPlayers[0].factories.map((_v, i) => teamPlayers.map(tp => tp.factories[i]).reduce((s, a) => s + a, 0)),
          builders: teamPlayers[0].builders.map((_v, i) => teamPlayers.map(tp => tp.builders[i]).reduce((s, a) => s + a, 0)),
          suppliers: teamPlayers[0].suppliers.map((_v, i) => teamPlayers.map(tp => tp.suppliers[i]).reduce((s, a) => s + a, 0)),
          totalExpLevel: teamPlayers[0].totalExpLevel.map((_v, i) => teamPlayers.map(tp => tp.totalExpLevel[i]).reduce((s, a) => s + a, 0)),
          banneredMilitaryUnits: teamPlayers[0].banneredMilitaryUnits.map((_v, i) => teamPlayers.map(tp => tp.banneredMilitaryUnits[i]).reduce((s, a) => s + a, 0)),
          shadowedMilitaryUnits: teamPlayers[0].shadowedMilitaryUnits.map((_v, i) => teamPlayers.map(tp => tp.shadowedMilitaryUnits[i]).reduce((s, a) => s + a, 0)),
          militaryUnitsInCombat: teamPlayers[0].militaryUnitsInCombat.map((_v, i) => teamPlayers.map(tp => tp.militaryUnitsInCombat[i]).reduce((s, a) => s + a, 0)),
          hpRepaired: teamPlayers[0].hpRepaired.map((_v, i) => teamPlayers.map(tp => tp.hpRepaired[i]).reduce((s, a) => s + a, 0)),
          crRepaired: teamPlayers[0].crRepaired.map((_v, i) => teamPlayers.map(tp => tp.crRepaired[i]).reduce((s, a) => s + a, 0)),

          moneyFlow: teamPlayers[0].moneyFlow.map((_v, i) => teamPlayers.map(tp => tp.moneyFlow[i]).reduce((s, a) => s + a, 0)),
          avgUnitsValue: teamPlayers[0].avgUnitsValue.map((_v, i) => teamPlayers.map(tp => tp.unitsValue[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) : 1),
          killsDeaths: teamPlayers[0].killsDeaths.map((_v, i) => teamPlayers.map(tp => tp.destroyedUnits[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0)) : 1),
          killsDeathsFiveMin: teamPlayers[0].killsDeathsFiveMin.map((_v, i) => (teamPlayers.map(tp => tp.destroyedUnits[i]).reduce((s, a) => s + a, 0) - (i < 300 ? 0 : teamPlayers.map(tp => tp.destroyedUnits[i - 300]).reduce((s, a) => s + a, 0))) / ((teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0) - (i < 300 ? 0 : teamPlayers.map(tp => tp.unitsLost[i - 300]).reduce((s, a) => s + a, 0))) ? (teamPlayers.map(tp => tp.unitsLost[i]).reduce((s, a) => s + a, 0) - (i < 300 ? 0 : teamPlayers.map(tp => tp.unitsLost[i - 300]).reduce((s, a) => s + a, 0))) : 1)),
          commandsSentPerMin: teamPlayers[0].commandsSentPerMin.map((_v, i) => teamPlayers.map(tp => tp.commandsSentPerMin[i]).reduce((s, a) => s + a, 0)),
          commandsSentLastMin: teamPlayers[0].commandsSentLastMin.map((_v, i) => teamPlayers.map(tp => tp.commandsSentLastMin[i]).reduce((s, a) => s + a, 0)),
          recentDamage: teamPlayers[0].damageDealt.map((_v, i) => teamPlayers.map(tp => tp.damageDealt[i]).reduce((s, a) => s + a, 0)),
          miningEfficiency: teamPlayers[0].miningEfficiency.map((_v, i) => teamPlayers.map(tp => tp.moneyFlow[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.activeMiningEntities[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.activeMiningEntities[i]).reduce((s, a) => s + a, 0)) : 1),
          bannerCoverage: teamPlayers[0].bannerCoverage.map((_v, i) => teamPlayers.map(tp => 100 * tp.banneredMilitaryUnits[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) : 1),
          shadowCoverage: teamPlayers[0].shadowCoverage.map((_v, i) => teamPlayers.map(tp => 100 * tp.shadowedMilitaryUnits[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) : 1),
          averageExpLevel: teamPlayers[0].averageExpLevel.map((_v, i) => teamPlayers.map(tp => tp.totalExpLevel[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) : 1),
          suppliersPerUnit: teamPlayers[0].suppliersPerUnit.map((_v, i) => teamPlayers.map(tp => tp.suppliers[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) : 1),
          militaryUnitsCombatEngagement: teamPlayers[0].militaryUnitsCombatEngagement.map((_v, i) => teamPlayers.map(tp => 100 * tp.militaryUnitsInCombat[i]).reduce((s, a) => s + a, 0) / (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) ? (teamPlayers.map(tp => tp.militaryUnits[i]).reduce((s, a) => s + a, 0)) : 1),
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
    metricLookup(): { [k: string]: StatsMetricModel; } {
      return Object.fromEntries(
        this.metricTypes.map(e => [e.id, e])
      );
    },
    metricTypes(): StatsMetricModel[] {
      return [
        {
          id: "currentMoney",
          getValue: (p, range) => p.currentMoney.slice(range[0], range[1])
        },
        {
          id: "minedMoney",
          getValue: (p, range) => p.minedMoney.slice(range[0], range[1])
        },
        {
          id: "spentMoney",
          getValue: (p, range) => p.spentMoney.slice(range[0], range[1])
        },
        {
          id: "buildingsCost",
          getValue: (p, range) => p.buildingsCost.slice(range[0], range[1])
        },
        {
          id: "buildingWeaponsCost",
          getValue: (p, range) => p.buildingWeaponsCost.slice(range[0], range[1])
        },
        {
          id: "unitsCost",
          getValue: (p, range) => p.unitsCost.slice(range[0], range[1])
        },
        {
          id: "researchesCost",
          getValue: (p, range) => p.researchesCost.slice(range[0], range[1])
        },
        {
          id: "ammoCost",
          getValue: (p, range) => p.ammoCost.slice(range[0], range[1])
        },
        {
          id: "moneyTransferred",
          getValue: (p, range) => p.moneyTransferred.slice(range[0], range[1])
        },
        {
          id: "moneyFlow",
          getValue: (p, range) => p.moneyFlow.slice(range[0], range[1])
        },
        {
          id: "researchesCount",
          getValue: (p, range) => p.researchesCount.slice(range[0], range[1])
        },
        {
          id: "buildingsBuilt",
          getValue: (p, range) => p.buildingsBuilt.slice(range[0], range[1])
        },
        {
          id: "buildingsLost",
          getValue: (p, range) => p.buildingsLost.slice(range[0], range[1])
        },
        {
          id: "unitsBuilt",
          getValue: (p, range) => p.unitsBuilt.slice(range[0], range[1])
        },
        {
          id: "unitsLost",
          getValue: (p, range) => p.unitsLost.slice(range[0], range[1])
        },
        {
          id: "destroyedUnits",
          getValue: (p, range) => p.destroyedUnits.slice(range[0], range[1])
        },
        {
          id: "destroyedBuildings",
          getValue: (p, range) => p.destroyedBuildings.slice(range[0], range[1])
        },
        {
          id: "militaryUnits",
          getValue: (p, range) => p.militaryUnits.slice(range[0], range[1])
        },
        {
          id: "unitsValue",
          getValue: (p, range) => p.unitsValue.slice(range[0], range[1])
        },
        {
          id: "avgUnitsValue",
          getValue: (p, range) => p.avgUnitsValue.slice(range[0], range[1])
        },
        {
          id: "killsDeaths",
          getValue: (p, range) => p.killsDeaths.slice(range[0], range[1])
        },
        {
          id: "killsDeathsFiveMin",
          getValue: (p, range) => p.killsDeathsFiveMin.slice(range[0], range[1])
        },
        {
          id: "unitsCaptured",
          getValue: (p, range) => p.unitsCaptured.slice(range[0], range[1])
        },
        {
          id: "unitsTransferred",
          getValue: (p, range) => p.unitsTransferred.slice(range[0], range[1])
        },
        {
          id: "damageDealt",
          getValue: (p, range) => p.damageDealt.slice(range[0], range[1])
        },
        {
          id: "damageReceived",
          getValue: (p, range) => p.damageReceived.slice(range[0], range[1])
        },
        {
          id: "recentDamage",
          getValue: (p, range) => p.recentDamage.slice(range[0], range[1])
        },
        {
          id: "commandsSent",
          getValue: (p, range) => p.commandsSent.slice(range[0], range[1])
        },
        {
          id: "commandsSentPerMin",
          getValue: (p, range) => p.commandsSentPerMin.slice(range[0], range[1])
        },
        {
          id: "commandsSentLastMin",
          getValue: (p, range) => p.commandsSentLastMin.slice(range[0], range[1])
        },
        {
          id: "researchCenters",
          getValue: (p, range) => p.researchCenters.slice(range[0], range[1])
        },
        {
          id: "buildingsUnderConstruction",
          getValue: (p, range) => p.buildingsUnderConstruction.slice(range[0], range[1])
        },
        {
          id: "activeMiningEntities",
          getValue: (p, range) => p.activeMiningEntities.slice(range[0], range[1])
        },
        {
          id: "miningEfficiency",
          getValue: (p, range) => p.miningEfficiency.slice(range[0], range[1])
        },
        {
          id: "factories",
          getValue: (p, range) => p.factories.slice(range[0], range[1])
        },
        {
          id: "builders",
          getValue: (p, range) => p.builders.slice(range[0], range[1])
        },
        {
          id: "suppliers",
          getValue: (p, range) => p.suppliers.slice(range[0], range[1])
        },
        {
          id: "bannerCoverage",
          getValue: (p, range) => p.bannerCoverage.slice(range[0], range[1])
        },
        {
          id: "shadowCoverage",
          getValue: (p, range) => p.shadowCoverage.slice(range[0], range[1])
        },
        {
          id: "averageExpLevel",
          getValue: (p, range) => p.averageExpLevel.slice(range[0], range[1])
        },
        {
          id: "suppliersPerUnit",
          getValue: (p, range) => p.suppliersPerUnit.slice(range[0], range[1])
        },
        {
          id: "militaryUnitsCombatEngagement",
          getValue: (p, range) => p.militaryUnitsCombatEngagement.slice(range[0], range[1])
        },
        {
          id: "hpRepaired",
          getValue: (p, range) => p.hpRepaired.slice(range[0], range[1])
        },
        {
          id: "crRepaired",
          getValue: (p, range) => p.crRepaired.slice(range[0], range[1])
        },
      ];
    },
    chartData(): any {
      if(!this.statsLoaded) return {};
      return {
        labels: this.allTicks.slice(this.chartRange[0], this.chartRange[1]).map(i => new Date(i * 1000 / 20).toISOString().slice(11, 19)),
        datasets: this.statsItems.map(p => ({
          label: p.displayName, 
          data: this.metricLookup[this.currentChart]?.getValue(p, this.chartRange),
          backgroundColor: p.color,
          borderColor: p.color,
          borderWidth: 2,
          pointRadius: 0,
          hidden: p.isSpectator,
        })),
      };
    },
    currentChartDescription(): string | undefined {
      return this.$t(`statsCharts.metrics.${this.currentChart}.description`);
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
      this.statsMode = "chart";
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
        return "[" + this.$t("statsCharts.observerPrefix") + `-${player.index + 1}]`;
      return `[${player.team}-${player.index + 1}]`;
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
  .v-expansion-panel-title--active {
    min-height: auto !important;
  }
  .v-switch__track {
    height: 11px;
    min-width: 30px;
  }
  .v-switch__thumb {
    height: 18px;
    width: 18px;
  }

</style>
