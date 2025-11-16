<template>
  <div>
    <v-toolbar flat color="transparent" class="d-flex">
      <v-toolbar-title> {{ $t("unitStats.combatTable.title") }} </v-toolbar-title>
      <v-switch class="ml-4 d-flex" v-model="groupChassis" :density="'compact'" :label="$t('unitStats.combatTable.groupChassis')" color="primary" />
      <v-spacer />
      <v-switch class="ml-4 d-flex" v-model="groupWeapons" :density="'compact'" :label="$t('unitStats.combatTable.groupWeapons')" color="primary" />
      <v-spacer />
      <v-switch class="ml-4 d-flex" v-model="groupShields" :density="'compact'" :label="$t('unitStats.combatTable.groupShields')" color="primary" />
      <v-spacer />
    </v-toolbar>
    <v-data-table
      :items="items"
      :headers="headers"
      density="compact"
      itemsPerPage="-1"
      hideDefaultFooter
      v-model:sort-by="sortBy"
      >
      <template v-slot:item.player="{ value }">
        <div class="d-flex">
          <player-label v-if="value != 255" :index="value" :name="(stats.players.find(i => i.index == value) as any).name" />
          <player-label v-else :index="15" :name="$t('unitStats.playerStats.combined')" />
        </div>
      </template>
      <template v-slot:item.unit="{ value }">
        <div class="d-flex">
          <unit-stats-header :template="value" />
        </div>
      </template>
      <template v-slot:item.damageDealt="{ value }">
        {{ formatDamage(value) }}&nbsp;<span class="text-medium-emphasis" v-if="totalUnitDamage">({{formatDecimal(100 * value / totalUnitDamage)}}%)</span>
      </template>
      <template v-slot:item.kills="{ value }">
        {{ formatInt(value) }}&nbsp;<span class="text-medium-emphasis" v-if="totalUnitKills">({{formatDecimal(100 * value / totalUnitKills)}}%)</span>
      </template>
      <template v-slot:item.damageTaken="{ value }">
        {{ formatDamage(value) }}&nbsp;<span class="text-medium-emphasis" v-if="totalDamageFromUnits">({{formatDecimal(100 * value / totalDamageFromUnits)}}%)</span>
      </template>
      <template v-slot:item.killedBy="{ value }">
        {{ formatInt(value) }}&nbsp;<span class="text-medium-emphasis" v-if="totalKilledByUnits">({{formatDecimal(100 * value / totalKilledByUnits)}}%)</span>
      </template>
      <template v-slot:item.damageRatio="{ value }">
        {{ formatDecimal(value) }}
      </template>
      <template v-slot:item.killsDeaths="{ value }">
        {{ formatDecimal(value) }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { GameStats, TemplatesEqual, UnitStats, UnitTemplate } from './api';
import UnitStatsHeader from './UnitStatsHeader.vue';
import { chassisGroupMap, formatDamage, formatDecimal, formatInt, weaponGroupMap } from '@/code/common';
import PlayerLabel from './PlayerLabel.vue';

interface StatsRow {
  player: number;
  unit: UnitTemplate;
  damageDealt: number;
  damageTaken: number;
  kills: number;
  killedBy: number;
  damageRatio: number;
  killsDeaths: number;
}

export default {
  components: {UnitStatsHeader, PlayerLabel},
  props: {
    unit: {type: Object as PropType<UnitStats>, required: true },
    template: {type: Object as PropType<UnitTemplate>, required: true },
    stats: {type: Object as PropType<GameStats>, required: true },
  },
  data: () => ({
    groupChassis: true,
    groupWeapons: true,
    groupShields: true,
    sortBy: [{ key: 'damageDealt', order: 'desc' }] as any[],
  }),
  computed: {
    items(): StatsRow[] {
      let identities = [] as number[];
      for (const [key, value] of Object.entries(this.unit.damageByUnits)) {
        const id = key as unknown as number;
        if (identities.indexOf(id) == -1)
          identities.push(id);
      }
      for (const [key, value] of Object.entries(this.unit.killedByUnits)) {
        const id = key as unknown as number;
        if (identities.indexOf(id) == -1)
          identities.push(id);
      }
      for (let i = 0; i < 8; i++) {
        for (const [key, value] of Object.entries(this.unit.weapons[i].unitsDamage)) {
          const id = key as unknown as number;
          if (identities.indexOf(id) == -1)
            identities.push(id);
        }
      }
      let grouppedIdentites = [] as UnitTemplate[];
      let identitiesMap: object = {};
      identities.forEach(id => {
        let identity = (this.stats.damageStats as any).identities[id] as UnitTemplate;
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
          playerIndex: this.template.playerIndex == 255 ? 255 : identity.playerIndex,
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
        (identitiesMap as any)[id] = item;
      });

      let result = [] as StatsRow[];

      identities.forEach(id => {
        let damageDealt = 0;
        let kills = 0;
        for (let i = 0; i < 8; i++) {
          damageDealt += (this.unit.weapons[i].unitsDamage as any)[id] ?? 0;
          kills += (this.unit.weapons[i].unitsKilled as any)[id] ?? 0;
        }
        let damageTaken = (this.unit.damageByUnits as any)[id] ?? 0;
        let killedBy = (this.unit.killedByUnits as any)[id] ?? 0;

        let mappedItem = (identitiesMap as any)[id] as UnitTemplate;
        let item = result.find(r => TemplatesEqual(mappedItem, r.unit, !this.groupShields));
        if (item == undefined) {
          result.push({
            player: mappedItem.playerIndex,
            unit: mappedItem,
            damageDealt: damageDealt,
            kills: kills,
            damageTaken: damageTaken,
            killedBy: killedBy,
            damageRatio: 0,
            killsDeaths: 0,
          });
        }
        else {
          item.damageDealt += damageDealt;
          item.kills += kills;
          item.damageTaken += damageTaken;
          item.killedBy += killedBy;
        }
      });

      result.forEach(r => {
        r.damageRatio = r.damageTaken ? r.damageDealt / r.damageTaken : 0;
        r.killsDeaths = r.killedBy ? r.kills / r.killedBy : 0;
        if (r.damageRatio < 1 && r.damageRatio > 0)
          r.damageRatio = -r.damageTaken / r.damageDealt;
        if (r.killsDeaths < 1 && r.killsDeaths > 0)
          r.killsDeaths = -r.killedBy / r.kills;
      });

      return result;
    },
    headers(): any {
      return [
        { key: "player", width: 10, sortable: false },
        { key: "unit", title: this.$t("unitStats.combatTable.headers.unit"), sortable: false },
        { key: "damageDealt", title: this.$t("unitStats.combatTable.headers.damageDealt"), align: "end" },
        { key: "kills", title: this.$t("unitStats.combatTable.headers.kills"), align: "end" },
        { key: "damageTaken", title: this.$t("unitStats.combatTable.headers.damageTaken"), align: "end" },
        { key: "killedBy", title: this.$t("unitStats.combatTable.headers.killedBy"), align: "end" },
        { key: "damageRatio", title: this.$t("unitStats.combatTable.headers.damageRatio"), align: "end" },
        { key: "killsDeaths", title: this.$t("unitStats.combatTable.headers.killsDeaths"), align: "end" },
      ];
    },
    totalUnitDamage(): number {
      let dmg = 0;
      this.items.forEach(i => {
        dmg += i.damageDealt;
      });
      return dmg;
    },
    totalUnitKills(): number {
      let kills = 0;
      this.items.forEach(i => {
        kills += i.kills;
      });
      return kills;
    },
    totalDamageFromUnits(): number {
      let dmg = 0;
      this.items.forEach(i => {
        dmg += i.damageTaken;
      });
      return dmg;
    },
    totalKilledByUnits(): number {
      let kills = 0;
      this.items.forEach(i => {
        kills += i.killedBy;
      });
      return kills;
    },
  },
  methods: {
    formatDamage,
    formatDecimal,
    formatInt,
  },
}
</script>

<style scoped>
</style>