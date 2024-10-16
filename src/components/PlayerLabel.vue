<template>
  <v-tooltip :text="name" location="bottom">
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" icon="mdi-square" :color="playerColors[index]"/>
      </template>
    </v-tooltip>
</template>

<script lang="ts">
import { playerColors } from '@/code/common';

export default {
  props: {
    index: {type: Number, required: true },
    name: {type: String, required: true },
  },
  data: () => ({playerColors}),
}
</script>