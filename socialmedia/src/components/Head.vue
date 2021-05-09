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
         <v-btn text to="/"  color="white" class="mr-2" exact> ACCUEIL </v-btn>
        <v-btn  text to="/connect" exact class="mr-2" color="white">
           CONNEXION         
        </v-btn>
  </div> 
</div>           
  <div v-else  class="w3-bar bgBlue w3-top navbarClass">
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
         </v-btn></div>
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
            {{user.name}}
            </div>
        </v-btn>
         </div>
      </div>
         
        
         
     
<!-- Hide right-floated links on small screens and replace them with a menu icon -->
<ul class="btnMobile w3-hide-large w3-padding-right"> 
    <li> 
      <img
          alt="Groupomania"      
          src="../assets/images/icon-left-font-monochrome-white.png"
         class="logoImg"
         
        /></li>
    <li class="tg-list-item" type="button" id="iosbtn" name="Mobil button"  role="button" aria-label="Center Align">
    <input class="tgl tgl-ios" id="cb2" type="checkbox" @click="toggleNav()">
    <label class="tgl-btn" for="cb2" aria-hidden="true"></label>
    </li>  
</ul> 

      
<aside :class="{ active: active}">
      <nav>
        <div v-if="!isLoggedIn">
        <v-btn text color="white" to="/" class="mr-2 mt-4" exact>
         <v-icon> home</v-icon> ACCUEIL
         </v-btn>
          <v-btn text color="white" to="/connect" class="mr-2 mt-4" exact>
         <v-icon> home</v-icon> CONNEXION
         </v-btn>
        </div>
        <div v-else> 
         <v-btn text to="/SocialMediaHome" class="mr-2 mt-4" color="white" exact>
        <v-icon large color="red darken-2">chat</v-icon>Social Page 
         </v-btn>
        <v-btn text to="#" class="mr-2 mt-4" color="white" exact @click="logOut">
         <v-icon>logout</v-icon> SE DECONNECTER
        </v-btn>
        <v-btn to="/Your-Profil" class="mr-2 mt-4" exact>
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
      user: {},
      token: "",
    }
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
  created() {
    this.getUserDetails;
  },

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
  width:25%;
  height:50px;  
  line-height: 4;
  margin-top:10px;
  margin-left: 25px;
  
}
.lineHeight {
  line-height: 4;
}
aside {
  display: none;
  width: 200px;
  background: #071c72;
  height: 100vh;
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
  width:100%;
  height:50px;  
  line-height:1;
  margin-top:0px;
 
  
}
}
@media (max-width: 768px) {
    .btnMobile {
        display:block;
        display: flex;
        background-color: #071c72;
        padding: 13px 0;
        margin:0px;
    }

    .btnMobile>li {
        display: inline-block;
        list-style: none
    }

    .btnMobile .tg-list-item {
        display: inline-block;
        margin-left: 50px
    }

    .tgl {
        display: none
    }

    .tgl,.tgl *,.tgl :after,.tgl :before,.tgl+.tgl-btn,.tgl:after,.tgl:before {
        box-sizing: border-box
    }

    .tgl ::selection,.tgl :after::selection,.tgl :before::selection,.tgl+.tgl-btn::selection,.tgl::selection,.tgl:after::selection,.tgl:before::selection {
        background: 0 0
    }

    .tgl+.tgl-btn {
        outline: 0;
        display: block;
        width: 4em;
        height: 2em;
        position: relative;
        cursor: pointer;
        user-select: none
    }

    .tgl+.tgl-btn:after,.tgl+.tgl-btn:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%
    }

    .tgl+.tgl-btn:after {
        left: 0
    }

    .tgl+.tgl-btn:before {
        display: none
    }

    .tgl:checked+.tgl-btn:after {
        left: 50%
    }

    .tgl-light+.tgl-btn {
        background: #f0f0f0;
        border-radius: 2em;
        padding: 2px;
        transition: all .4s ease;

    }

    .tgl-light+.tgl-btn:after {
        border-radius: 50%;
        background: #fff;
        transition: all .2s ease
    }

    .tgl-light:checked+.tgl-btn {
        background: #9fd6ae
    }

    .tgl-ios+.tgl-btn {
        background: #fbfbfb;
        border-radius: 2em;
        padding: 2px;
        transition: all .4s ease;
        border: 1px solid #e8eae9;
        margin-right:19px;
        margin-top:10px;
    }

    .tgl-ios+.tgl-btn:after {
        border-radius: 2em;
        background: #fbfbfb;
        transition: left .3s cubic-bezier(.175,.885,.32,1.275),padding .3s ease,margin .3s ease;
        box-shadow: 0 0 0 1px rgba(0,0,0,.1),0 4px 0 rgba(0,0,0,.08)
    }

    .tgl-ios+.tgl-btn:hover:after {
        will-change: padding
    }

    .tgl-ios+.tgl-btn:active {
        box-shadow: inset 0 0 0 2em #e8eae9
    }

    .tgl-ios+.tgl-btn:active:after {
        padding-right: .8em
    }

    .tgl-ios:checked+.tgl-btn {
        background: #2196f3
    }

    .tgl-ios:checked+.tgl-btn:active {
        box-shadow: none
    }

    .tgl-ios:checked+.tgl-btn:active:after {
        margin-left: -.8em
    }

    .tgl-flat+.tgl-btn {
        padding: 2px;
        transition: all .2s ease;
        background: #fff;
        border: 4px solid #f2f2f2;
        border-radius: 2em
    }

    .tgl-flat+.tgl-btn:after {
        transition: all .2s ease;
        background: #f2f2f2;
        content: "";
        border-radius: 1em
    }

    .tgl-flat:checked+.tgl-btn {
        border: 4px solid #7fc6a6
    }

    .tgl-flat:checked+.tgl-btn:after {
        left: 50%;
        background: #7fc6a6
    }

    .tgl-flip+.tgl-btn {
        padding: 2px;
        transition: all .2s ease;
        font-family: sans-serif;
        perspective: 100px
    }

    .tgl-flip+.tgl-btn:after,.tgl-flip+.tgl-btn:before {
        display: inline-block;
        transition: all .4s ease;
        width: 100%;
        text-align: center;
        position: absolute;
        line-height: 2em;
        font-weight: 700;
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        border-radius: 4px
    }

    .tgl-flip+.tgl-btn:after {
        content: attr(data-tg-on);
        background: #02c66f;
        transform: rotateY(-180deg)
    }

    .tgl-flip+.tgl-btn:before {
        background: #ff3a19;
        content: attr(data-tg-off)
    }

    .tgl-flip+.tgl-btn:active:before {
        transform: rotateY(-20deg)
    }

    .tgl-flip:checked+.tgl-btn:before {
        transform: rotateY(180deg)
    }

    .tgl-flip:checked+.tgl-btn:after {
        transform: rotateY(0);
        left: 0;
        background: #7fc6a6
    }

    .tgl-flip:checked+.tgl-btn:active:after {
        transform: rotateY(20deg)
    }
}

@media only screen and (min-width: 600px) {
    .btnMobile .tg-list-item {
        margin-left:0
    }
}

@media only screen and (max-width: 800px) {
    .btnMobile .tg-list-item {
        margin-left:20%
    }

    .box {
        margin-top: 30%;
        margin-bottom: 0;
        width: 80%
    }
}




</style>