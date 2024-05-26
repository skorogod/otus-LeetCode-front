<script setup lang="ts">
    import { Doughnut } from 'vue-chartjs';
    import { defineProps } from 'vue';

    const props = defineProps<
        {
            id: string,
            chartOptions?: {},
            chartData: {
                labels: string[],
                datasets: [
                    {   
                        label?: string,
                        data: number[],
                        backgroudColor: string[],
                        hoverOffset: number
                    }
                ],
            },
        }
    >()
    
</script>

<template>
    <Doughnut
        :id="props.id",
        :options="props.chartOptions"
        :data="props.chartData"
    >
    </Doughnut>
</template>

<style>
</style>