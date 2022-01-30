<template>
  <q-page class="flex flex-center">
    <div class="main">
      <Chart />
      <div class="flex flex-center">
        <q-btn @click="$pub()" color="green">start</q-btn>
        <q-btn @click="$pub()" color="red">stop</q-btn>
        <q-input
          @keydown.enter="
            $pub('/NH/tSpeed', tSpeed);
            this.$store.dispatch('tSpeedUpdate', tSpeed);
          "
          outlined
          v-model="tSpeed"
          placeholder="0"
          label="Target value"
        />
        <q-input
          @keydown.enter="$pub('/NH/kP', kP)"
          outlined
          v-model="kP"
          label="kP"
        />
        <q-input
          @keydown.enter="$pub('/NH/kI', kI)"
          outlined
          v-model="kI"
          label="kI"
        />
        <q-input
          @keydown.enter="$pub('/NH/kD', kD)"
          outlined
          v-model="kD"
          label="kD"
        />
        <q-input
          @keydown.enter="$pub('/NH/aSpeed', aSpeed)"
          outlined
          v-model="aSpeed"
          label="aSpeed"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import Chart from "components/Chart.vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    Chart
  },
  setup() {
    return {
      tSpeed: ref(""),
      kP: ref(""),
      kI: ref(""),
      kD: ref(""),
      aSpeed: ref("")
    };
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}
.main * {
  margin: 10px;
}
</style>
