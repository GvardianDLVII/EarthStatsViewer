<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title> {{ $t("unitStats.summary.title") }} </v-toolbar-title>
    </v-toolbar>
    <v-row class="mb-8 mx-4">
      <v-col cols="6">
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalDamageDealt") }} </v-col>
          <v-col cols="6"> {{ formatDamage(totalDamageDealt) }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.damageToUnits") }} </span></v-col>
          <v-col cols="6"> {{ formatDamage(damageToUnits) }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.damageToBuildings") }} </span></v-col>
          <v-col cols="6"> {{ formatDamage(damageToBuildings) }} </v-col>
        </v-row>
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalKills") }} </v-col>
          <v-col cols="6"> {{ formatInt(totalKills) }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.unitsKilled") }} </span></v-col>
          <v-col cols="6"> {{ formatInt(unitsKilled) }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.buildingsKilled") }} </span></v-col>
          <v-col cols="6"> {{ formatInt(buildingsKilled) }} </v-col>
        </v-row>
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalKillsDeaths") }} </v-col>
          <v-col cols="6"> {{ formatDecimal(totalKillsDeaths) }} </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalDamageTaken") }} </v-col>
          <v-col cols="6"> {{ formatDamage(totalDamageTaken) }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.damageFromUnits") }} </span></v-col>
          <v-col cols="6"> {{ formatDamage(damageFromUnits) }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.damageFromBuildings") }} </span></v-col>
          <v-col cols="6"> {{ formatDamage(unit.damageByBuildings) }} </v-col>
        </v-row>
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalDeaths") }} </v-col>
          <v-col cols="6"> {{ formatInt(totalDeaths) }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.killedByUnits") }} </span></v-col>
          <v-col cols="6"> {{ formatInt(killedByUnits) }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.killedByBuildings") }} </span></v-col>
          <v-col cols="6"> {{ formatInt(unit.killedByBuildings) }} </v-col>
        </v-row>
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalDamageRatio") }} </v-col>
          <v-col cols="6"> {{ formatDecimal(totalDamageRatio) }} </v-col>
        </v-row>
      </v-col>
    </v-row>
    <hr />
    <unit-combat-table :unit="unit" :template="template" :stats="stats" />
    <hr />
    <unit-ammo-damage-table :unit="unit" :template="template" :stats="stats" />
    <div v-if="numberOfWeapons > 1">
      <hr />
      <unit-weapons-table :unit="unit" :template="template" :stats="stats" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { GameStats, UnitStats, UnitTemplate } from './api';
import ShieldValueDisplay from './ShieldValueDisplay.vue';
import UnitCombatTable from './UnitCombatTable.vue';
import UnitAmmoDamageTable from './UnitAmmoDamageTable.vue';
import UnitWeaponsTable from './UnitWeaponsTable.vue';
import { formatDamage, formatDecimal, formatInt } from '@/code/common';

export default {
  components: {ShieldValueDisplay, UnitCombatTable, UnitAmmoDamageTable, UnitWeaponsTable},
  props: {
    unit: {type: Object as PropType<UnitStats>, required: true },
    template: {type: Object as PropType<UnitTemplate>, required: true },
    stats: {type: Object as PropType<GameStats>, required: true },
  },
  computed: {
    damageToUnits(): number {
      let dmg = 0;
      for (let i = 0; i < 8; i++) {
        for (const [key, value] of Object.entries(this.unit.weapons[i].unitsDamage)) {
          dmg += value;
        }
      }
      return dmg;
    },
    damageToBuildings(): number {
      let dmg = 0;
      for (let i = 0; i < 8; i++) {
        dmg += this.unit.weapons[i].buildingDamage;
      }
      return dmg;
    },
    unitsKilled(): number {
      let kills = 0;
      for (let i = 0; i < 8; i++) {
        for (const [key, value] of Object.entries(this.unit.weapons[i].unitsKilled)) {
          kills += value;
        }
      }
      return kills;
    },
    buildingsKilled(): number {
      let kills = 0;
      for (let i = 0; i < 8; i++) {
        kills += this.unit.weapons[i].buildingsKilled;
      }
      return kills;
    },
    totalDamageDealt(): number {
      return this.damageToUnits + this.damageToBuildings;
    },
    totalKills(): number {
      return this.unitsKilled + this.buildingsKilled;
    },
    damageFromUnits(): number {
      let dmg = 0;
      for (const [key, value] of Object.entries(this.unit.damageByUnits)) {
        dmg += value;
      }
      return dmg;
    },
    killedByUnits(): number {
      let deaths = 0;
      for (const [key, value] of Object.entries(this.unit.killedByUnits)) {
        deaths += value;
      }
      return deaths;
    },
    totalDamageTaken(): number {
      return this.damageFromUnits + this.unit.damageByBuildings;
    },
    totalDeaths(): number {
      return this.killedByUnits + this.unit.killedByBuildings;
    },
    totalKillsDeaths(): number {
      if (this.totalKills == 0 || this.totalDeaths == 0)
        return 0;
      return this.totalKills > this.totalDeaths
        ? this.totalKills / this.totalDeaths
        : -this.totalDeaths / this.totalKills;
    },
    totalDamageRatio(): number {
      if (this.totalDamageDealt == 0 || this.totalDamageTaken == 0)
        return 0;
      return this.totalDamageDealt > this.totalDamageTaken
        ? this.totalDamageDealt / this.totalDamageTaken
        : -this.totalDamageTaken / this.totalDamageDealt;
    },
    numberOfWeapons(): number {
      return this.unit.weapons.filter(w => w.buildingDamage > 0 || Object.entries(w.unitsDamage).length > 0).length;
    },
  },
  methods: {
    formatDamage,
    formatInt,
    formatDecimal,
  },
  data: () => ({}),
}
</script>