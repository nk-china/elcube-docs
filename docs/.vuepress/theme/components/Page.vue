<template>
    <main class="page">
        <slot name="top" />

        <Content class="theme-default-content" />
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />

        <div class="opensource-info">

        </div>
    </main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue'
import PageNav from '@parent-theme/components/PageNav.vue'

export default {
    components: { PageEdit, PageNav },
    props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
    display block
    .theme-default-content,.page-edit,.page-nav
        max-width 1200px
    .opensource-info
        //background-color black
        //height 300px
        height 2em

</style>
