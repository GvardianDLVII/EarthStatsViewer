<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title> {{ $t("unitStats.ammoTable.title") }} </v-toolbar-title>
      <v-switch class="ml-4 d-flex" v-model="groupAmmo" :density="'compact'" :label="$t('unitStats.ammoTable.groupAmmo')" color="primary" />
      <v-spacer />
    </v-toolbar>
    <v-data-table :items="items" :headers="headers" density="compact" itemsPerPage="-1" hideDefaultFooter>
      <template v-slot:item.ammo="{ value }">
        {{ $t(`objectNames.ammo.${value}`) }}
      </template>
      <template v-slot:item.damageTaken="{ value }">
        {{ formatDamage(value) }}&nbsp;<span class="text-medium-emphasis" v-if="totalDamageFromAmmo">({{formatDecimal(100 * value / totalDamageFromAmmo)}}%)</span>
      </template>
      <template v-slot:item.killedBy="{ value }">
        {{ formatInt(value) }}&nbsp;<span class="text-medium-emphasis" v-if="totalKilledByAmmo">({{formatDecimal(100 * value / totalKilledByAmmo)}}%)</span>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { GameStats, UnitStats, UnitTemplate } from './api';
import UnitStatsHeader from './UnitStatsHeader.vue';
import { ammoGroupMap, formatDamage, formatDecimal, formatInt } from '@/code/common';

interface StatsRow {
  ammo: string;
  damageTaken: number;
  killedBy: number;
}

export default {
  components: {UnitStatsHeader},
  props: {
    unit: {type: Object as PropType<UnitStats>, required: true },
    template: {type: Object as PropType<UnitTemplate>, required: true },
    stats: {type: Object as PropType<GameStats>, required: true },
  },
  data: () => ({
    groupAmmo: true,
  }),
  computed: {
    items(): StatsRow[] {
      let ammos = [] as string[];
      for (const [key, value] of Object.entries(this.unit.damageByAmmo)) {
        if (ammos.indexOf(key) == -1)
        ammos.push(key);
      }

      let result = [] as StatsRow[];
      ammos.forEach(ammoName => {
        const actualKey: string = this.groupAmmo && (ammoGroupMap as any)[ammoName] ? (ammoGroupMap as any)[ammoName] : ammoName;
        const existingItem = result.findIndex(s => s.ammo == actualKey);
        if (existingItem != -1) {
          result[existingItem].damageTaken += (this.unit.damageByAmmo as any)[ammoName] ?? 0;
          result[existingItem].killedBy += (this.unit.killedByAmmo as any)[ammoName] ?? 0;
        }
        else {
          result.push({
            ammo: actualKey,
            damageTaken: (this.unit.damageByAmmo as any)[ammoName] ?? 0,
            killedBy: (this.unit.killedByAmmo as any)[ammoName] ?? 0,
          });
        }
      });
      return result;
    },
    headers(): any {
      return [
        { key: "ammo", title: this.$t("unitStats.ammoTable.headers.ammo"), sortable: false },
        { key: "damageTaken", title: this.$t("unitStats.ammoTable.headers.damageTaken"), align: "end" },
        { key: "killedBy", title: this.$t("unitStats.ammoTable.headers.killedBy"), align: "end" },
      ];
    },
    totalDamageFromAmmo(): number {
      let dmg = 0;
      this.items.forEach(i => {
        dmg += i.damageTaken;
      });
      return dmg;
    },
    totalKilledByAmmo(): number {
      let kills = 0;
      this.items.forEach(i => {
        kills += i.killedBy;
      });
      return kills;
    },
  },
  methods: {
    formatNumber (num: number) {
      return num.toFixed(1)
    },
    formatDamage,
    formatDecimal,
    formatInt,
  },
}
</script>