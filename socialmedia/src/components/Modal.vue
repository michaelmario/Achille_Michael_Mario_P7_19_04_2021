<template>
  <div id="messoutput" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container bgBlue">
        <span
          onclick="document.getElementById('messoutput').style.display='none'"
          class="w3-button w3-display-topright w3-white"
          >&times;</span
        >
        <img
          src="../assets/images/icon/icon-left-font-monochrome-white.svg"
          class="w3-image logoImg"
          alt="logo"
        />
      </header>
      <form @submit="updateUserProfil" method="post">
        <div class="w3-container">
          <div id="object1"></div>
          <div class="outputMessSignup">
            <h3 class="mainBlue w3-center">Modifier vos données</h3>
          </div>
          <div class="w3-margin-bottom">
            <div class="input-container">
              <v-icon>perm_identity</v-icon>
              <input
                class="w3-input w3-border"
                type="text"
                id="name"
                name="name"
                v-model="user.name"
              />
            </div>
            <span class="w3-text-red"></span>
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
            <span class="w3-text-red"></span>
          </div>
          <div class="w3-margin-bottom">
            <div class="input-container">
              <v-icon>view_list</v-icon>
              <select class="w3-select w3-padding" name="dept" v-model="user.departement">
                <option  value="" disabled>Departement</option>
                <option  value="commercial">Commercial</option>
                <option value="marketing">Marketing</option>
                <option  value="financiere">Financière</option>
                <option value="juridique">Juridique</option>
              </select>
            </div>
            <span class="w3-text-red"></span>
          </div>
          <div class="input-group w3-margin-bottom">
            <div class="input-container">
              <v-icon large> mdi-message-text </v-icon>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Mon Biographe....."
                id="bio"
                name="bio"
                v-model="user.bio"
              />
            </div>
            <span class="w3-text-red"></span>
          </div>
          <div class="input-group w3-margin-bottom">
            <div class="input-container">
              <v-icon dark >update</v-icon>
               <input type="file"  ref="image" class="w3-input w3-border">
              <div class="w3-right"> 
                 <v-icon>update</v-icon>
                <v-btn @click="onFileSelected">
                envoyer
                </v-btn>
           <img v-bind:src="user.avatarUrl" class="w3-circle profile" alt="Profile"></div> 
            </div>
          
            <button type="submit" class="w3-button bgBlue w3-margin-right">
               <h6 class="w3-text-white">
          <span class="w3-text-red">&#9755;</span> Modifier
        </h6>
            </button>
          </div>
        </div>
      </form>
    </div>
    <footer class="w3-container bgBlue">
      <button type="submit" class="w3-bar-item w3-btn w3-mobile w3-center">
       
      </button>
    </footer>
  </div>
</template>
<script>
import VueJwtDecode from "jwt-decode";
export default {
  name: "modal",
  data() {
    return {
      user: {},
      token: "",
      isLoggedIn: "",
      selectedFile:null,
      userId:"",
      image:null,
      isModalvisible:true
    };
  },
  methods: {
    getUserDetails: function () {
      this.token = localStorage.getItem("token");
      try {
        let decoded = VueJwtDecode(this.token);
        this.User = decoded;
        if (this.User) {
          this.isLoggedIn = true;
          this.$axios
            .post("user/me", {
              method: "POST",
              data: JSON.stringify(this.User),
              headers: {
                Authorization:
                  "Bearer " +
                  localStorage.getItem("token").replace(/['"']+/g, ""),
              },
            })
            .then((data) => {
              this.user = data.data;
              this.userId = this.user.id;
              return (this.user = {
                id:this.user.id,
                name: this.user.name,
                email: this.user.email,
                departement: this.user.departement,
                avatarUrl: this.user.avatarUrl,
                bio: this.user.bio,
              });
            });
        }
      } catch (error) {
        // return error in production env
        console.log(error, "error from decoding token");
      }
    },
      onFileSelected:function(event){
     this.image = this.$refs.image.files[0];
     console.log(this.image.name)
     const formData = new FormData();
      formData.append("image", this.image, this.image.name);
      this.$axios.put("user/profilePicture", formData)
        .then((response) => {
          console.log(response)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateUserProfil: function (e) {
      e.preventDefault();          
        let newUser = {
                 name: this.user.name,
                email: this.user.email,
                departement: this.user.departement,               
                bio: this.user.bio,
                avatarUrl:this.avatarUrl
              }; 
              this.$axios.put(`user/:${this.userId}`, newUser)
             .then((data) => {
              this.user = data.data;
              window.location.reload();
             
            })
           

    },
  },
  created() {
   this.getUserDetails();
  },
};
</script>
<style  scoped>
.bgBlue {
  background-color: #071c72;
}
.logoImg {
  width: 45%;
  height: 60px;
  padding: 10px;
}
.input-container {
  display: flex;
  width: 100%;
}
.v-icon.v-icon {
  padding: 10px;
  background: #071c72;
  color: white;
  min-width: 50px;
  text-align: center;
}
.profile{
   height:40px;
   width:40px;
}
</style>