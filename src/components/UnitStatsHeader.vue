<template>
    <div class="d-flex">
        <shield-value-display :value="template.powerShield" />
        {{ $t(`objectNames.chassis.${template.chassis}`) }}
        <span v-for="i in 8">
            <span class="ml-3" v-if="template.weapons[i-1] && i % 2 == 1"> {{ $t(`objectNames.weapons.short.${template.weapons[i-1]}`) }} </span>
            <span class="ml-1" v-if="template.weapons[i-1] && i % 2 == 0"> + {{ $t(`objectNames.weapons.short.${template.weapons[i-1]}`) }} </span>
        </span>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { UnitTemplate } from './api';
import ShieldValueDisplay from './ShieldValueDisplay.vue';

export default {
    components: {ShieldValueDisplay},
    props: {
        template: {type: Object as PropType<UnitTemplate>, required: true },
    },
    data: () => ({}),
}
</script>