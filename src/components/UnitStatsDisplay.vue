<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title> {{ $t("unitStats.summary.title") }} </v-toolbar-title>
    </v-toolbar>
    <v-row class="mb-8 mx-4">
      <v-col cols="6">
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalDamageDealt") }} </v-col>
          <v-col cols="6"> {{ totalDamageDealt }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.damageToUnits") }} </span></v-col>
          <v-col cols="6"> {{ damageToUnits }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.damageToBuildings") }} </span></v-col>
          <v-col cols="6"> {{ damageToBuildings }} </v-col>
        </v-row>
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalKills") }} </v-col>
          <v-col cols="6"> {{ totalKills }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.unitsKilled") }} </span></v-col>
          <v-col cols="6"> {{ unitsKilled }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.buildingsKilled") }} </span></v-col>
          <v-col cols="6"> {{ buildingsKilled }} </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalDamageTaken") }} </v-col>
          <v-col cols="6"> {{ totalDamageTaken }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.damageFromUnits") }} </span></v-col>
          <v-col cols="6"> {{ damageFromUnits }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.damageFromBuildings") }} </span></v-col>
          <v-col cols="6"> {{ unit.damageByBuildings }} </v-col>
        </v-row>
        <v-row dense class="font-weight-bold">
          <v-col cols="6"> {{ $t("unitStats.summary.totalDeaths") }} </v-col>
          <v-col cols="6"> {{ totalDeaths }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.killedByUnits") }} </span></v-col>
          <v-col cols="6"> {{ killedByUnits }} </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"><span class="ml-4"> {{ $t("unitStats.summary.killedByBuildings") }} </span></v-col>
          <v-col cols="6"> {{ unit.killedByBuildings }} </v-col>
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
    numberOfWeapons(): number {
      return this.unit.weapons.filter(w => w.buildingDamage > 0 || Object.entries(w.unitsDamage).length > 0).length;
    },
  },
  data: () => ({}),
}
</script>