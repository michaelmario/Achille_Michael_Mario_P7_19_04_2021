<template>
      <v-app-bar app color="#071c72" dark>   
       <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/images/icon/icon-left-font-monochrome-white.svg"
          transition="scale-transition"
          width="250"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src=""
          width="100"
        />
        </div>           
        <v-spacer></v-spacer>
        <div v-if="!isLoggedIn">      
        <v-btn text to="/" class="mr-2" exact> ACCUEIL </v-btn>
        <v-btn to="/connect" exact text class="mr-2">
          <div class="w3-bar-item">
            <i class="fa fa-sign-in-alt"></i> CONNEXION
          </div>
        </v-btn>
     </div>   
      <div v-else> 
        <v-spacer></v-spacer>       
         <div class="w3-dropdown-hover w3-hide-small">
          <button class="w3-button w3-padding-large" title="Notifications">
            <v-icon>notifications</v-icon
            ><span class="w3-badge w3-right w3-small w3-green">3</span>
          </button>
          <div
            class="w3-dropdown-content w3-card-4 w3-bar-block"
            style="width: 300px"
          >
            <a href="#" class="w3-bar-item w3-button">One new friend request</a>
            <a href="#" class="w3-bar-item w3-button"
              >John Doe posted on your wall</a
            >
            <a href="#" class="w3-bar-item w3-button">Jane likes your post</a>
          </div>
        </div>       
         
        <v-btn text to="/" class="mr-2" exact>
         <v-icon> home</v-icon> ACCUEIL
         </v-btn>
         <v-btn text to="/SocialMediaHome" class="mr-2" exact>
        <v-icon large color="red darken-2">chat</v-icon>Social Page 
         </v-btn>
        <v-btn text to="#" class="mr-2" exact @click="logOut">
         <v-icon>logout</v-icon> SE DECONNECTER
        </v-btn>
        <v-btn :to="'/:'+user.id" class="mr-2" exact>
          <div class="w3-bar-item">
            <img
              :src="user.avatarUrl"
              class="w3-circle"
              id="avatar"
              alt="Avatar"
            />
            {{user.name}}
            </div>
        </v-btn>
      </div>     
    </v-app-bar>
</template>
<script>
import auth from '../mixins/auth';
export default {
  name: "Head",
  data() {
    return {
      active: false,
      isLoggedIn:false,
      user: {},      
      token:""
    };
  },
  mounted() {
    this.$parent.$on("toggleNav", () => {
      this.active = !this.active;
    });
   
  },

  methods: {
    toggleNav() {
      this.$parent.$emit("toggleNav");
    },
    close() {
      this.active = !this.active;
    },
    
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/connect");
      this.isLoggedIn = false;
    },
  },
  created(){
  this.getUserDetails;
  },
 
  mixins:[auth]
  
};
</script>
<style scoped>
.bgBlue {
  background-color: #071c72;
}
a {
  background-color: #071c72;
  color: #fff;
  font-weight: bolder;
}
a:hover {
  background-color: #071c72;
  color: rgb(216, 212, 202);
}
.logoImg {
  width: 25%;
  height: 30px;
}
.lineHeight {
  line-height: 4;
}
aside {
  display: none;
  width: 200px;
  background: #2195f3ce;
  height: 100vh;
}
.navbarClass.adminUrl {
  visibility: visible;
}
#navbarClass.adminUrl {
  visibility: visible;
}
#avatar{
  height: 33px;
   width: 33px;
}
@media (max-width: 768px) {
  .navbarClass {
    display: none;
  }
  #navbarClass {
    display: none;
  }
  nav {
    display: flex;
    flex-direction: column;
  }

  aside.active {
    display: block;
    position: fixed;
    z-index: 4;
    margin-top: -6px;
  }
  aside a {
    display: block;
    padding: 10px 5px;
    color: #fff;
    border-bottom: 1px solid #bbb;
  }
  .w3-button {
    color: lightgray !important;
  }
}
@media screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
}
</style>