<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title> {{ $t("unitStats.ammoTable.title") }} </v-toolbar-title>
    </v-toolbar>
    <v-data-table :items="items" :headers="headers" density="compact" itemsPerPage="-1" hideDefaultFooter>
      <template v-slot:item.ammo="{ value }">
        {{ $t(`objectNames.ammo.${value}`) }}
      </template>
      <template v-slot:item.damageTaken="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalDamageFromAmmo">({{formatNumber(100 * value / totalDamageFromAmmo)}}%)</span>
      </template>
      <template v-slot:item.killedBy="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalKilledByAmmo">({{formatNumber(100 * value / totalKilledByAmmo)}}%)</span>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { GameStats, UnitStats, UnitTemplate } from './api';
import UnitStatsHeader from './UnitStatsHeader.vue';

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
  computed: {
    items(): StatsRow[] {
      let ammos = [] as string[];
      for (const [key, value] of Object.entries(this.unit.damageByAmmo)) {
        if (ammos.indexOf(key) == -1)
        ammos.push(key);
      }

      return ammos.map(ammoName => {
        return {
          ammo: ammoName,
          damageTaken: (this.unit.damageByAmmo as any)[ammoName] ?? 0,
          killedBy: (this.unit.killedByAmmo as any)[ammoName] ?? 0,
        };
      })
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
  },
  data: () => ({}),
}
</script>