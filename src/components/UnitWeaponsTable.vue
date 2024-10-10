<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title> {{ $t("unitStats.weaponsTable.title") }} </v-toolbar-title>
    </v-toolbar>
    <v-data-table :items="items" :headers="headers" density="compact" itemsPerPage="-1" hideDefaultFooter>
      <template v-slot:item.weapon="{ value }">
        {{ $t(`objectNames.weapons.full.${value}`) }}
      </template>
      <template v-slot:item.damageDealt="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalUnitDamage">({{formatNumber(100 * value / totalUnitDamage)}}%)</span>
      </template>
      <template v-slot:item.kills="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalUnitKills">({{formatNumber(100 * value / totalUnitKills)}}%)</span>
      </template>
      <template v-slot:item.buildingDamage="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalBuildingDamage">({{formatNumber(100 * value / totalBuildingDamage)}}%)</span>
      </template>
      <template v-slot:item.buildingsKilled="{ value }">
        {{ value }}&nbsp;<span class="text-medium-emphasis" v-if="totalBuildingsKilled">({{formatNumber(100 * value / totalBuildingsKilled)}}%)</span>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { GameStats, UnitStats, UnitTemplate } from './api';
import UnitStatsHeader from './UnitStatsHeader.vue';

interface StatsRow {
  index: number;
  weapon: string;
  damageDealt: number;
  kills: number;
  buildingDamage: number;
  buildingsKilled: number;
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
      let weaponIndexes = this.template.weapons.map((w, i) => {
        return {
          name: w,
          index: i
        };
      }).filter(i => i.name).map(i => i.index);
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

      return weaponIndexes.map(id => {
        let damageDealt = 0;
        let kills = 0;

        for (const [key, value] of Object.entries(this.unit.weapons[id].unitsDamage)) {
          damageDealt += value;
        }
        for (const [key, value] of Object.entries(this.unit.weapons[id].unitsKilled)) {
          kills += value;
        }

        for (let i = 0; i < 8; i++) {
          damageDealt += (this.unit.weapons[id].unitsDamage as any)[id] ?? 0;
          kills += (this.unit.weapons[id].unitsKilled as any)[id] ?? 0;
        }

        return {
          index: id,
          weapon: this.template.weapons[id],
          damageDealt: damageDealt,
          kills: kills,
          buildingDamage: this.unit.weapons[id].buildingDamage,
          buildingsKilled: this.unit.weapons[id].buildingsKilled,
        };
      }).filter(i => i.damageDealt > 0 || i.buildingDamage > 0)
    },
    headers(): any {
      return [
        { key: "weapon", title: this.$t("unitStats.weaponsTable.headers.weapon"), sortable: false },
        { key: "damageDealt", title: this.$t("unitStats.weaponsTable.headers.damageDealt"), align: "end" },
        { key: "kills", title: this.$t("unitStats.weaponsTable.headers.kills"), align: "end" },
        { key: "buildingDamage", title: this.$t("unitStats.weaponsTable.headers.buildingDamage"), align: "end" },
        { key: "buildingsKilled", title: this.$t("unitStats.weaponsTable.headers.buildingsKilled"), align: "end" },
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
    totalBuildingDamage(): number {
      let dmg = 0;
      this.items.forEach(i => {
        dmg += i.buildingDamage;
      });
      return dmg;
    },
    totalBuildingsKilled(): number {
      let kills = 0;
      this.items.forEach(i => {
        kills += i.buildingsKilled;
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