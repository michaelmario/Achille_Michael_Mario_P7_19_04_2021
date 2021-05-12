<template>
  <div>
    <div class="w3-bar bgBlue w3-top navbarClass" v-if="!isLoggedIn">
      <router-link to="/" exact>
        <img
          alt="Vuetify Logo"
          src="../assets/images/icon-left-font-monochrome-white.png"
          class="logoImg w3-animate-left"
        />
      </router-link>
      <!-- Right-sided navbar links -->
      <div class="w3-right w3-hide-small lineHeight">
        <v-btn text to="/" color="white" class="mr-2" exact> ACCUEIL </v-btn>
        <v-btn text to="/connect" exact class="mr-2" color="white">
          CONNEXION
        </v-btn>
      </div>
    </div>
    <div v-else class="w3-bar bgBlue w3-top navbarClass">
      <router-link to="/" exact>
        <img
          alt="Groupomania"
          src="../assets/images/icon-left-font-monochrome-white.png"
          class="logoImg"
        />
      </router-link>

      <div class="w3-right w3-hide-small lineHeight">
        <v-spacer></v-spacer>
        <div class="w3-dropdown-hover w3-hide-small">
          <v-btn text color="white" to="/" class="mr-2" exact>
            <v-icon> home</v-icon> ACCUEIL
          </v-btn>
          <v-btn text to="/SocialMediaHome" class="mr-2" color="white" exact>
            <v-icon large color="red darken-2">chat</v-icon>Social Page
          </v-btn>
        </div>
        <v-btn text to="#" class="mr-2" color="white" exact @click="logOut">
          <v-icon>logout</v-icon> SE DECONNECTER
        </v-btn>
        <v-btn to="/Your-Profil" class="mr-2" exact>
          <div class="w3-bar-item">
            <img
              :src="user.avatarUrl"
              class="w3-circle"
              id="avatar"
              alt="Avatar"
            />
            {{ user.name }}
          </div>
        </v-btn>
      </div>
    </div>

    <!-- Hide right-floated links on small screens and replace them with a menu icon -->
    <header class="w3-bar w3-top w3-hide-large w3-hide-medium bgBlue w3-xlarge">
      <router-link to="/" exact>
        <img
          alt="Groupomania"
          src="../assets/images/icon-left-font-monochrome-white.png"
          class="logoImg w3-bar-item"
        />
      </router-link>

      <a class="w3-right w3-bar-item w3-button" @click="toggleNav">
        <v-icon dark>lock</v-icon></a
      >
    </header>
    <aside :class="{ active: active }">
      <nav>
        <div v-if="!isLoggedIn">
          <router-link to="/" exact class="w3-padding">
            <img
              alt="Groupomania"
              src="../assets/images/icon-left-font-monochrome-white.png"
              class="smlogoImg w3-bar-item"
            />
          </router-link>
          <v-btn
            text
            color="white"
            to="/"
            class="mr-2 mt-4"
            exact
            @click="close"
          >
            <v-icon class="w3-margin-right"> home</v-icon> ACCUEIL
          </v-btn>
          <v-btn
            text
            color="white"
            to="/connect"
            class="mr-2 mt-4"
            exact
            @click="close"
          >
            <v-icon class="w3-margin-right"> login</v-icon> CONNEXION
          </v-btn>
        </div>
        <div v-else>
          <router-link to="/" exact class="w3-padding">
            <img
              alt="Groupomania"
              src="../assets/images/icon-left-font-monochrome-white.png"
              class="smlogoImg w3-bar-item"
            />
          </router-link>
          <v-btn
            text
            to="/SocialMediaHome"
            class="mr-2 mt-4"
            color="white"
            exact
            @click="close"
          >
            <v-icon large color="red darken-2">chat</v-icon>Social Page
          </v-btn>
          <v-btn
            text
            to="#"
            class="mr-2 mt-4"
            color="white"
            exact
            @click="logOut"
          >
            <v-icon>logout</v-icon> SE DECONNECTER
          </v-btn>
          <v-btn to="/Your-Profil" class="mr-2 mt-4" @click="close" exact>
            <div class="w3-bar-item">
              <img
                :src="user.avatarUrl"
                class="w3-circle"
                id="avatar"
                alt="Avatar"
              />
              {{ user.name }}
            </div>
          </v-btn>
        </div>
      </nav>
    </aside>
  </div>
</template>
<script>
import auth from "../mixins/auth";
export default {
  name: "Head",
  data() {
    return {
      active: false,
      isLoggedIn: false,
      //isAdmin:false,
      user: {},
      token: "",
    };
  },

  methods: {
    toggleNav() {
      this.active = !this.active;
      console.log("1");
    },
    close() {
      this.active = !this.active;
    },

    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/connect");
      this.isLoggedIn = false;
      this.close();
    },
  },
  created() {
    this.getUserDetails;
  },
  mounted() {},

  mixins: [auth],
};
</script>
<style scoped>
.bgBlue {
  background-color: #071c72;
}
a {
  color: #fff;
  font-weight: bolder;
}
a:hover {
  background-color: #071c72;
  color: rgb(216, 212, 202);
}
.logoImg {
  width: 25%;
  height: 50px;
  line-height: 4;
  margin-top: 10px;
  margin-left: 25px;
}
.smlogoImg {
  width: 95%;
  height: 30px;
}
.lineHeight {
  line-height: 4;
}
aside {
  display: none;
  width: 200px;
  background: #071c72;
  height: 100vh;
  margin-top: 50px;
}
.navbarClass.adminUrl {
  visibility: visible;
}
#navbarClass.adminUrl {
  visibility: visible;
}
#avatar {
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

  .logoImg {
    width: 100%;
    height: 50px;
    line-height: 1;
    margin-top: 0px;
  }
} 
</style>