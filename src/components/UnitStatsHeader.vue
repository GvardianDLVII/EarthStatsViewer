<template>
  <div class="d-flex">
    <shield-value-display :value="template.powerShield" />
    {{ $t(`objectNames.chassis.${template.chassis}`) }}
    <span v-for="i in 8">
      <v-tooltip v-if="template.weapons[i-1] && i % 2 == 1" :text="$t(`objectNames.weapons.full.${template.weapons[i-1]}`)" location="bottom">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="ml-3"> {{ $t(`objectNames.weapons.short.${template.weapons[i-1]}`) }} </span>
        </template>
      </v-tooltip>
      <v-tooltip v-if="template.weapons[i-1] && i % 2 == 0" :text="$t(`objectNames.weapons.full.${template.weapons[i-1]}`)" location="bottom">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="ml-1"> + {{ $t(`objectNames.weapons.short.${template.weapons[i-1]}`) }} </span>
        </template>
      </v-tooltip>
    </span>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { UnitTemplate } from './api';
import ShieldValueDisplay from './ShieldValueDisplay.vue';

export default {
  components: { ShieldValueDisplay },
  props: {
    template: { type: Object as PropType<UnitTemplate>, required: true },
  },
  data: () => ({}),
}
</script>