<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title> {{ $t("unitStats.combatTable.title") }} </v-toolbar-title>
    </v-toolbar>
    <v-data-table :items="items" :headers="headers" density="compact" itemsPerPage="-1" hideDefaultFooter>
      <template v-slot:item.unit="{ item }">
        <unit-stats-header :template="item.unit" />
      </template>
      <template v-slot:item.damageDealt="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalUnitDamage">({{formatNumber(100 * value / totalUnitDamage)}}%)</span>
      </template>
      <template v-slot:item.kills="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalUnitKills">({{formatNumber(100 * value / totalUnitKills)}}%)</span>
      </template>
      <template v-slot:item.damageTaken="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalDamageFromUnits">({{formatNumber(100 * value / totalDamageFromUnits)}}%)</span>
      </template>
      <template v-slot:item.killedBy="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalKilledByUnits">({{formatNumber(100 * value / totalKilledByUnits)}}%)</span>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { GameStats, UnitStats, UnitTemplate } from './api';
import UnitStatsHeader from './UnitStatsHeader.vue';

interface StatsRow {
  unit: UnitTemplate;
  damageDealt: number;
  damageTaken: number;
  kills: number;
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

      return identities.map(id => {
        let damageDealt = 0;
        let kills = 0;
        for (let i = 0; i < 8; i++) {
          damageDealt += (this.unit.weapons[i].unitsDamage as any)[id] ?? 0;
          kills += (this.unit.weapons[i].unitsKilled as any)[id] ?? 0;
        }

        return {
          unit: (this.stats.damageStats as any).identities[id],
          damageDealt: damageDealt,
          kills: kills,
          damageTaken: (this.unit.damageByUnits as any)[id] ?? 0,
          killedBy: (this.unit.killedByUnits as any)[id] ?? 0,
        };
      })
    },
    headers(): any {
      return [
        { key: "unit", title: this.$t("unitStats.combatTable.headers.unit"), sortable: false },
        { key: "damageDealt", title: this.$t("unitStats.combatTable.headers.damageDealt"), align: "end" },
        { key: "kills", title: this.$t("unitStats.combatTable.headers.kills"), align: "end" },
        { key: "damageTaken", title: this.$t("unitStats.combatTable.headers.damageTaken"), align: "end" },
        { key: "killedBy", title: this.$t("unitStats.combatTable.headers.killedBy"), align: "end" },
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
    formatNumber (num: number) {
      return num.toFixed(1)
    },
  },
  data: () => ({}),
}
</script>