<template>
  <div class="create">
    <div class="create__introduction">
      <h1>Welcome to flatfair!</h1>
      <p>
        To create your personal flatbond, we need some information about your
        new home:
      </p>
    </div>
    <CreateFlatbondForm />
  </div>
</template>

<script>
import CreateFlatbondForm from "@/components/CreateFlatbondForm.vue";

export default {
  name: "create",
  components: {
    CreateFlatbondForm
  }
};
</script>

<style scoped>
.create {
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

.create__introduction {
  margin-bottom: 25px;
}
</style>
