<template>
  <div class="white elevation-2">
    <v-app-bar flat dense class="cyan" dark>
      <v-app-bar-title>{{title}}</v-app-bar-title>
      <slot name="action" />
    </v-app-bar>

    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        No slot content defined.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
</style>
