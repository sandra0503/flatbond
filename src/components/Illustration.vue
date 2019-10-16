<template>
  <div class="illustration" :style="alignment">
    <img :src="imageSrc" />
  </div>
</template>

<script>
export default {
  name: "Illustration",
  props: {
    imageSrc: {
      type: String
    },
    position: {
      type: String
    }
  },
  computed: {
    alignment() {
      return {
        ...(this.position === "left" && { left: 0 }),
        ...(this.position === "right" && { right: 0 })
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.illustration {
  position: absolute;
  bottom: 0;
  width: 35%;
  min-width: 300px;
  max-width: 400px;
  height: auto;
  opacity: 0.9;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
