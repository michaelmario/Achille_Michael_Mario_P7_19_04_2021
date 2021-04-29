<template>
 <div class="connect">
    <FormRegister />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Connect",
  components: {
    FormRegister: () => import("@/components/FormRegister.vue"),
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>