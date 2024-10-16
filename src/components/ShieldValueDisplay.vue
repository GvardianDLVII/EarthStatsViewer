<template>
  <div class="shield-display">
    <v-tooltip v-if="value == -1" :text="$t('common.shields.noShield')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" size="x-small" icon="mdi-shield-remove" color="red"/>
      </template>
    </v-tooltip>
    <v-tooltip v-else :text="shieldName" location="bottom">
      <template v-slot:activator="{ props }">
        <span v-bind="props">
          <v-icon size="x-small" v-for="i in (value + 1)" icon="mdi-shield" color="blue"/>
        </span>
      </template>
    </v-tooltip>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    value: {type: Number, required: true },
  },
  data: () => ({}),
  computed: {
    shieldName() {
      if (this.value == 0)
        return this.$t('common.shields.smallShield')
      if (this.value == 1)
        return this.$t('common.shields.mediumShield')
      if (this.value == 2)
        return this.$t('common.shields.largeShield')
    }
  }
}
</script>

<style scoped>
    .shield-display {
        width: 50px;
        display: flex;
        justify-content: center;
        margin-right: 10px;
    }
</style>