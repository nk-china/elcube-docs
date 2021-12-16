<template>
    <div class="tb">
        <div :class="'tb-'+leftWidth">
            <slot name="l"/>
        </div>
        <div v-if="$slots.m" :class="'tb-'+middWidth">
            <slot name="m"/>
        </div>
        <div v-if="$slots.r" :class="'tb-'+rightWidth">
            <slot name="r"/>
        </div>


    </div>
</template>

<script>
    export default {
        name: "NkTable.vue",
        props:{
            leftWidth:Number,
            middWidth:Number,
            rightWidth:Number
        }

    }
</script>

<style scoped lang="stylus">
    .tb
        display flex
        .tb-8
            width 33.3333%
        .tb-16
            width 66.6666%
        .tb-12
            width 50%

</style>