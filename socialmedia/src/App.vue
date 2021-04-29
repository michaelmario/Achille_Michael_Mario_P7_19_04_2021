<template>
<v-app>
  <Header />
    <div class="w3-center w3-margin-top">
      <router-view />
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Header from "@/components/Head";
import auth from './mixins/auth';

export default {
  name: "App",
  components: {
    Landing,
    Footer,
    Header
  },
  data: () => ({
    active: false,
    isLoggedIn: false,
    user:{}
  }),
  methods: {    
   
  },
  
  created() {
    this.getUserDetails;
  },
  mixins:[auth]
};
</script>
<style scoped>
#avatar {
  height: 33px;
  width: 33px;
}
</style>
