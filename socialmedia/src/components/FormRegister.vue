<template>
  <div class="formPage w3-display-container w3-text-white">
    <img
      src="../../public/img/backgroundImage.webp"
      alt="Lights"
      class="w3c-image w3-show"
      id="topImg"
    />
      <div class="w3-display-topmiddle formContainer w3-large">
      <div class="w3-bar bgBlue marginTop">
        <button class="w3-bar-item w3-button tablink" @click="openSec(this)">
          <i class="fa fa-user fa-fw w3-margin-right"></i>S'inscrire
        </button>
        <button
          class="w3-bar-item w3-button tablink w3-red"
          @click="openSec(this)"
        >
          <i class="fa fa-sign-in-alt w3-margin-right"></i> Se connecter
        </button>
      </div>

      <!-- Tabs -->

      <div
        id="signup"
        class="w3-container w3-white w3-padding-16 myLink"
        :class="{ active: active }"
      >
        <form @submit="checkForm" method="post">
          <div class="outputMessSignup">
            <h1 class="mainBlue">
              Inscrivez-vous au reseau interne de Groupomania
            </h1>
          </div>
          <div class="w3-margin-bottom">
             <div class="input-container">
              <v-icon>perm_identity</v-icon>
            <input
              class="w3-input w3-border"
              type="text"
              placeholder="Mon prénom..."
              id="name"
              name="name"
              v-model="user.name"
            />
             </div>
            <span class="w3-text-red">{{ nameErrors }}</span>
          </div>
          <div class="input-group w3-margin-bottom">
            <div class="input-container">
               <v-icon> email</v-icon>
            <input
              class="w3-input w3-border"
              type="email"
              placeholder="Mon adresse Email....."
              id="email"
              name="email"
              v-model="user.email"
            />
            </div>
            <span class="w3-text-red">{{ emailErrors }}</span>
          </div>
          <div class="w3-margin-bottom">
            <div class="input-container">
               <v-icon>view_list</v-icon>              
            <select class="w3-select w3-padding" name="dept" v-model="user.departement">
              <option disabled value="">Choisissez votre Departement</option>
               <option value="commercial">Commercial</option>
              <option value="marketing">Marketing</option>
              <option value="financiere">Financière</option>
              <option value="juridique">Juridique</option>
            </select>            
            </div>  
            <span class="w3-text-red">{{ optionErrors }}</span>
          </div>
          <div class="input-group w3-margin-bottom">
            <div class="input-container">
               <v-icon>lock</v-icon>              
                <input
                  class="w3-input w3-border"
                  :type="passwordFieldType"
                  placeholder="Mot de passe..."
                  id="password"
                  name="password"
                  v-model="user.password" />
                <i
                  id="pass-status"
                  class="fa fa-eye-slash icon"
                  aria-hidden="true"
                  @click="switchVisibility"
                ></i >
                </div>
            <span class="w3-text-red">{{ passwordErrors }}</span>
          </div>
           <div class="input-group w3-margin-bottom">
             <div class="input-container">
               <v-icon>lock</v-icon>
            <input
              class="w3-input w3-border"
              type="password"
              id="passwordConf"
              name="passwordConf"
              placeholder="La confirmation de  mot de passe..."
              v-model="user.passwordConf"
            />
             </div>
            <span class="w3-text-red">{{ confimPasswordErrors }}</span>
          </div>
          <div>
            <button type="submit" class="w3-button bgBlue w3-margin-right">
              S'inscrire
            </button>
            <button type="button" class="w3-button bgBlue" @click="initialiser">
              initialiser
            </button>
          </div>
        </form>
      </div>

      <div
        id="login"
        class="w3-container w3-white w3-padding-16 myLink"
        :class="{ active: active }"
      >
        <form @submit="checkFormLogin" method="post">
          <div class="outputMessLogin">
            <h1 class="mainBlue">Connectez-vous à votre compte Groupomania</h1>
          </div>
          <div class="input-group w3-margin-bottom">
            <div class="input-container">
             <v-icon>email</v-icon>
            <input
              class="w3-input w3-border"
              type="email"
              placeholder="Email address"
              v-model="dataUser.email"
            />
            </div>
            <span class="w3-text-red">{{ loginEmailErrors }}</span>
          </div>
          <div class="input-group w3-margin-bottom">
            <div class="input-container">
              <v-icon>lock</v-icon>
            <input
              class="w3-input w3-border"
              type="password"
              placeholder="Password"
              v-model="dataUser.password"
            />
            </div>
            <span class="w3-text-red">{{ loginPasswordErrors }}</span>
             <span class=" w3-text-green w3-padding w3-margin-top">{{loginSucess }}</span>
          </div>
          <div>
            <button type="submit" class="w3-button bgBlue w3-margin-right">
              Se connecter
            </button>
            <button
              type="button"
              class="w3-button bgBlue"
              @click="initialiserLogin"
            >
              initialiser
            </button>
            <router-link to="/ForgetPassword">
             <div  class="w3-btn"><i class="fa fa-unlock" aria-hidden="true"></i> Forget Password</div>
          </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
 
</template>

<script>
import axios from 'axios';
export default {
  name: "FormRegister",
  data() {
    return {
      active: false,
      data:{},
      nameErrors: "",
      emailErrors: "",
      optionErrors: "",
      passwordErrors: "",
      confimPasswordErrors: "",
      loginSucess:"",
      Emailregex: new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
      EmailValue: "",
      Nameregex: new RegExp(/[a-zA-z]./gi),
      NameValue: "",
      // Format mot de passe :
      // * Au moins 6 caractères
      // * Au moins 1 lettre majuscule
      // * Au moins 1 lettre minuscule
      // * Au moins 1 chiffre
      // * Seuls les caractères suivants sont autorisés : @ $ ! % ?
      passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?]{6,}$/,
      PasswordValue: "",

      loginEmailErrors: "",
      loginPasswordErrors: "",
      user: {
        type: Object,
      },
      password: "",
      passwordFieldType: "password",
      dataUser:{} 
     };
  },
  mounted() {
    // Défini le titre
    document.title = "Création de compte | Groupomania";
  },
  methods: {
    openSec() {
      this.active = !this.active;
    },
    switchVisibility: function (e) {
      e.preventDefault();
      let passStatus = document.getElementById("pass-status");
      if (e) {
        this.passwordFieldType =
          this.passwordFieldType === "password" ? "text" : "password";
        passStatus.className = "fa fa-eye icon";
      }
    }, 
    formValidation(_user){
    this.EmailValue = this.Emailregex.test(this.user.email);
    this.NameValue = this.Nameregex.test(this.user.name);
    this.PasswordValue = this.passwordRegex.test(this.user.password);
    if (!this.user.name) {
      this.nameErrors = "Nom (obligatoire).";
    }
    if (!this.user.email) {
      this.emailErrors = "Email (obligatoire).";
    }
    if (!this.user.departement) {
      this.optionErrors = "Departement (requis).";
    }
    if (!this.user.password) {
      this.passwordErrors = "Mot de Pass (obligatoire).";
    }
    if (!this.user.passwordConf) {
      this.confimPasswordErrors =
        "Le mot de passe de confirmation est requis";
    }
    if (!this.NameValue) {
      this.nameErrors = "Que le texte avec l'alphabet est autorisé  🤬";
    }
    if (!this.EmailValue) {
      this.emailErrors =
        "L'adresse e-mail n'est pas formatée correctement  🤬";
    }
    if (!this.PasswordValue) {
      this.passwordErrors =
        "Le mot de passe doit comporter au minimum 6 caractères une lettre  en majuscule, une en minuscule un chiffre  et un caratere speciaux @ $ ! % ?  🤬";
    }
    if (this.user.password !== this.user.passwordConf) {
      this.confimPasswordErrors =
        "Confirm-password n'est pas identique au mot de passe  🤬";
    }
  },

    checkForm:function (e) {
      e.preventDefault();
      try{
       this.formValidation(); 
        if(this.user){
       this.signup();
        }
        }catch(e){
        console.log(e)
      }      
      
    },
     signup: function(_user){
      if(this.user){
        this.data = {
          name:this.user.name,
          email:this.user.email,
          departement:this.user.departement,
          password:this.user.password

        }
       axios
        .post("http://localhost:3000/api/user/signup", this.data)       
        .then((data) => {
          this.active = ! this.active;
                 
          }).then(()=>{
             this.loginSucess ="Votre countre a etait crée vous pouvez connectez Maintenant "
          })
          .catch((e) => {
          if (e) {
            this.loginPasswordErrors = `Aucun compte ne correspond à l'adresse email renseingée !`;
          }  
            })    
        .catch((e) => {
          if (e) {
            this.confimPasswordErrors = "Erreur serveur";
          }
          sessionStorage.removeItem("token");
        });
   
    }
    },
    initialiser: function (e) {
      e.preventDefault();
      this.nameErrors = "";
      this.emailErrors = "";
      this.optionErrors = "";
      this.passwordErrors = "";
      this.confimPasswordErrors = "";
    },
   
    initialiserLogin: function (e) {      
      this.loginEmailErrors = "";
      this.loginPasswordErrors = "";
      window.location.reload();
    },
   
 
  
  formLoginValidation :function(_dataUser){
   this.EmailValue = this.Emailregex.test(this.dataUser.email);
    if (!this.EmailValue) {
      this.loginEmailErrors =
        "L'adresse e-mail n'est pas formatée correctement  🤬";
    }
  },

checkFormLogin: function (e) {
      e.preventDefault();
       try{
        this.formLoginValidation(this.dataUser);
        if(this.dataUser){
          this.login(this.dataUser)
        }
      }catch(e){
        console.log(e)
      }

      
    },
    login:function(_dataUser){
     this.dataUser = {
             email:this.dataUser.email,
             password:this.dataUser.password
          }
        axios.post("http://localhost:3000/api/user/login",  this.dataUser)  
      .then((data) => {
            localStorage.setItem("token", data.data.token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + data.data.token;           
          }).then(()=>{
             window.location.href="/SocialMediaHome";
          })
          .catch((e) => {
          if (e) {
            this.loginPasswordErrors = `Aucun compte ne correspond à l'adresse email renseingée !`;
          }  
            });
  } 
   },
  
 
  
};
</script>
<style scoped>
.formPage {
  width: 100%;
  height:fit-content;
  background-size: cover;
  background-position: center;
  margin-top:12px;
}
.bgBlue {
  background-color: #071c72;
  color: #fff;
 
}
.marginTop{
  margin-top:100px;
}
.mainBlue {
  color: #071c72;
  font-weight: bolder;
}
option:disabled {
  color: darkblue !important;
}
#topImg {
  height: 700px;
  width: 100%;
}
#signup {
  display: none;
  width: 100%;
}
#signup.active {
  display: block;
  position: absolute;
  z-index: 4;
}
#login {
  display: block;
  position: absolute;
  width: 100%;
}
.formContainer {
  width: 70%;
  height: auto;
  margin-top: 50px;
}
.input-container {
  display: flex;
  width: 100%;
  
}
.v-icon.v-icon 
 {
  padding: 10px;
  background: #071c72;
  color: white;
  min-width: 50px;
  text-align: center;
}
</style>


