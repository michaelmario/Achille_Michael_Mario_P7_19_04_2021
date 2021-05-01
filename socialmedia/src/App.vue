<template>  
     <v-app>
          <Header />
        <main>
         <router-view />
         </main>
         <Footer />
     </v-app>
 </template>

<script>
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Header from "@/components/Head";
import auth from "./mixins/auth";

export default {
  name: "App",
  components: {
    Landing,
    Footer,
    Header,
  },
  data: () => ({
    active: false,
    isLoggedIn: false,
    user: {},
  }),
  methods: {},

  created() {
    this.getUserDetails;
  },
  mixins: [auth],
};
</script>
<style scoped>
#avatar {
  height: 33px;
  width: 33px;
}
</style>
