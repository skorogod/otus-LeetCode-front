<script setup lang="ts">
</script>

<template>
    <div class="filter">
        <slot/>
    </div>
</template>

<style>
.filter {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem
}
</style>