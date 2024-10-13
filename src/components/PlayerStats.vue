<template>
  <div>
    <v-toolbar flat color="transparent" class="d-flex">
      <v-toolbar-title> {{ $t("unitStats.playerStats.title") }} </v-toolbar-title>
      <v-switch class="ml-4 d-flex" v-model="groupChassis" :density="'compact'" :label="$t('unitStats.playerStats.groupChassis')" color="primary" @update:model-value="onFiltersChanged" />
      <v-spacer />
      <v-switch class="ml-4 d-flex" v-model="groupWeapons" :density="'compact'" :label="$t('unitStats.playerStats.groupWeapons')" color="primary" @update:model-value="onFiltersChanged" />
      <v-spacer />
      <v-switch class="ml-4 d-flex" v-model="groupShields" :density="'compact'" :label="$t('unitStats.playerStats.groupShields')" color="primary" @update:model-value="onFiltersChanged" />
      <v-spacer />
    </v-toolbar>
    <v-expansion-panels v-model="selection">
      <v-expansion-panel
        v-for="unit in items"
        :key="unit.stats.identity"
      >
        <v-expansion-panel-title class="unit-stats-header">
          <template v-slot:default>
            <unit-stats-header :template="unit.template" />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <unit-stats-display :template="unit.template" :unit="unit.stats" :stats="stats" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { GameStats, TemplatesEqual, UnitStats, UnitTemplate } from './api';
import UnitStatsDisplay from './UnitStatsDisplay.vue';
import UnitStatsHeader from './UnitStatsHeader.vue';
import { chassisGroupMap, weaponGroupMap } from '@/code/common';

interface StatsRow {
  template: UnitTemplate,
  stats: UnitStats,
}

export default {
  components: { UnitStatsDisplay, UnitStatsHeader },
  props: {
    stats: { type: Object as PropType<GameStats>, required: true },
    playerIndex: { type: Number, required: true },
  },
  data: () => ({
    groupChassis: true,
    groupWeapons: true,
    groupShields: true,
    selection: undefined,
  }),
  computed: {
    items(): StatsRow[] {
      if (!this.stats.damageStats)
        return [];

      let grouppedIdentites = [] as UnitTemplate[];
      let identitiesMap: object = {};
      this.stats.damageStats.players[this.playerIndex].units.forEach(u => {
        let identity = (this.stats.damageStats as any).identities[u.identity] as UnitTemplate;
        let actualChassis = this.groupChassis && (chassisGroupMap as any)[identity.chassis]
          ? (chassisGroupMap as any)[identity.chassis]
          : identity.chassis;

        let actualWeapons = [
          this.groupWeapons && (weaponGroupMap as any)[identity.weapons[0]] ? (weaponGroupMap as any)[identity.weapons[0]] : identity.weapons[0],
          this.groupWeapons && (weaponGroupMap as any)[identity.weapons[1]] ? (weaponGroupMap as any)[identity.weapons[1]] : identity.weapons[1],
          this.groupWeapons && (weaponGroupMap as any)[identity.weapons[2]] ? (weaponGroupMap as any)[identity.weapons[2]] : identity.weapons[2],
          this.groupWeapons && (weaponGroupMap as any)[identity.weapons[3]] ? (weaponGroupMap as any)[identity.weapons[3]] : identity.weapons[3],
          this.groupWeapons && (weaponGroupMap as any)[identity.weapons[4]] ? (weaponGroupMap as any)[identity.weapons[4]] : identity.weapons[4],
          this.groupWeapons && (weaponGroupMap as any)[identity.weapons[5]] ? (weaponGroupMap as any)[identity.weapons[5]] : identity.weapons[5],
          this.groupWeapons && (weaponGroupMap as any)[identity.weapons[6]] ? (weaponGroupMap as any)[identity.weapons[6]] : identity.weapons[6],
          this.groupWeapons && (weaponGroupMap as any)[identity.weapons[7]] ? (weaponGroupMap as any)[identity.weapons[7]] : identity.weapons[7],
        ];
        
        let tempIdentity: UnitTemplate = {
          chassis: actualChassis,
          playerIndex: identity.playerIndex,
          powerShield: identity.powerShield,
          weapons: actualWeapons,
        };

        let item = grouppedIdentites.find(existing => TemplatesEqual(tempIdentity, existing, !this.groupShields));
        if (item == undefined) {
          grouppedIdentites.push(tempIdentity);
          item = tempIdentity;
        }
        if (item.powerShield < tempIdentity.powerShield)
          item.powerShield = tempIdentity.powerShield;
        (identitiesMap as any)[u.identity] = item;
      });

      let result = [] as StatsRow[];

      this.stats.damageStats.players[this.playerIndex].units.forEach(u => {
        let mappedItem = (identitiesMap as any)[u.identity] as UnitTemplate;
        let item = result.find(r => TemplatesEqual(mappedItem, r.template, !this.groupShields));
        if (item == undefined) {
          let stats: UnitStats = {
            identity: -1,
            damageByAmmo: {},
            damageByBuildings: 0,
            damageByUnits: {},
            killedByAmmo: {},
            killedByBuildings: 0,
            killedByUnits: {},
            weapons: [
              { buildingDamage: 0, buildingsKilled: 0, unitsDamage: {}, unitsKilled: {} },
              { buildingDamage: 0, buildingsKilled: 0, unitsDamage: {}, unitsKilled: {} },
              { buildingDamage: 0, buildingsKilled: 0, unitsDamage: {}, unitsKilled: {} },
              { buildingDamage: 0, buildingsKilled: 0, unitsDamage: {}, unitsKilled: {} },
              { buildingDamage: 0, buildingsKilled: 0, unitsDamage: {}, unitsKilled: {} },
              { buildingDamage: 0, buildingsKilled: 0, unitsDamage: {}, unitsKilled: {} },
              { buildingDamage: 0, buildingsKilled: 0, unitsDamage: {}, unitsKilled: {} },
              { buildingDamage: 0, buildingsKilled: 0, unitsDamage: {}, unitsKilled: {} },
            ],
          };

          item = {
            template: mappedItem,
            stats: stats,
          };
          result.push(item);
        }

        for (const [key, value] of Object.entries(u.damageByAmmo)) {
          const map = (item.stats.damageByAmmo as any);
          map[key] = map[key] != undefined ? map[key] + value : value;
        }
        item.stats.damageByBuildings += u.damageByBuildings;
        for (const [key, value] of Object.entries(u.damageByUnits)) {
          const map = (item.stats.damageByUnits as any);
          map[key] = map[key] != undefined ? map[key] + value : value;
        }
        for (const [key, value] of Object.entries(u.killedByAmmo)) {
          const map = (item.stats.killedByAmmo as any);
          map[key] = map[key] != undefined ? map[key] + value : value;
        }
        item.stats.killedByBuildings += u.killedByBuildings;
        for (const [key, value] of Object.entries(u.killedByUnits)) {
          const map = (item.stats.killedByUnits as any);
          map[key] = map[key] != undefined ? map[key] + value : value;
        }
        for (let i = 0; i < 8; i++) {
          item.stats.weapons[i].buildingDamage += u.weapons[i].buildingDamage;
          item.stats.weapons[i].buildingsKilled += u.weapons[i].buildingsKilled;
          for (const [key, value] of Object.entries(u.weapons[i].unitsDamage)) {
            const map = (item.stats.weapons[i].unitsDamage as any);
            map[key] = map[key] != undefined ? map[key] + value : value;
          }
          for (const [key, value] of Object.entries(u.weapons[i].unitsKilled)) {
            const map = (item.stats.weapons[i].unitsKilled as any);
            map[key] = map[key] != undefined ? map[key] + value : value;
          }
        }
      });

      return result;
    },
  },
  methods: {
    onFiltersChanged() {
      this.selection = undefined;
    },
  },
}
</script>

<style scoped>
.unit-stats-header {
  background-color: #89d8fb26;
}
</style>
