<template>
    <div class="shield-display">
        <span v-if="value == -1">
            <v-icon size="x-small" icon="mdi-shield" color="red"/>
        </span>
        <span v-else>
            <v-icon size="x-small" v-for="i in (value + 1)" icon="mdi-shield" color="blue"/>
        </span>
    </div>
</template>

<script lang="ts">

export default {
    props: {
        value: {type: Number, required: true },
    },
    data: () => ({}),
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