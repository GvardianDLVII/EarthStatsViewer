<template>
  <v-app>
    <v-main>
      <StatsViewer :theme="theme" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import StatsViewer from '@/components/StatsViewer.vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme();
</script>
