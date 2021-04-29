<template>
  <div class="w3-container socialMedia">
    <!-- Form pour update le profil si c'est notre profil -->
    <div class="w3-container w3-content contentPage">
      <!-- The Grid -->
      <div class="w3-row">
        <!-- Left Column -->
        <div class="w3-col m3">
          <!-- Profile -->
          <div class="w3-card w3-round w3-white">
            <div class="w3-container">
              <h4 class="w3-center mainBlue">{{ user.name }}</h4>
              <p class="w3-center">
                <img
                  v-bind:src="user.avatarUrl"
                  class="w3-circle profile"
                  alt="Profile"
                />
              </p>
              <hr />
              <p>
                <v-icon class="w3-margin-right">work</v-icon>
                {{ user.departement }}
              </p>
              <p>
                <v-icon class="w3-margin-right">location_city</v-icon>
                {{ user.email }}
              </p>
              <p>
                <v-icon class="w3-margin-right">login</v-icon
                >{{ formatDate(user.createdAt) }}
              </p>
              <div class="w3-margin-bottom">
                <v-btn
                  color="red"
                  dark
                  @click="deleteProfile()"
                  title="Supprimer mes infos"
                >
                  <v-icon left> delete </v-icon>
                  Suprimer
                </v-btn>
                <div v-if="messageError">
                  {{ messageError }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w3-col m6">
          <section class="w3-card w3-round w3-white w3-margin-left">
            <form @submit="updateUserProfil" method="post" id="formUpdate">
              <div class="w3-container">
                <div id="object1"></div>
                <div class="outputMessSignup">
                  <h3 class="mainBlue w3-center">Modifier votre profil</h3>
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
                    <select
                      class="w3-select w3-padding"
                      name="dept"
                      v-model="user.departement"
                    >
                      <option value="" disabled>Departement</option>
                      <option value="commercial">Commercial</option>
                      <option value="marketing">Marketing</option>
                      <option value="financiere">Financière</option>
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
                  <form class="input-container" enctype="multipart/form-data" >
                    <v-icon dark>update</v-icon>
                    <input type="file" name="image" ref="image" class="w3-input w3-border" />
                    <div class="w3-right">
                      <button  type="submit" class="w3-btn bgBlue w3-text-white btn" @click="updateAvatar()">
                       Envoyer
                      </button>
                    </div>
                  </form>
                  <div class="w3-margin-top">
                    <v-btn
                      color="#071c72"
                      dark
                      @click="updateUserProfil()"
                      title="Modifier mes infos">
                      <v-icon left>edit</v-icon>
                      Envoyer
                    </v-btn>
                    </div>
                </div>
              </div>
            </form>
          </section>
          <!-- Fin -->
        </div>
        <div class="w3-col m3">
          <section class="w3-card w3-round w3-white w3-margin-left">
            <div class="outputMessSignup">
              <h3 class="mainBlue w3-center">
                Biographe<br />
                {{ user.name }}
              </h3>
            </div>
            <div class="w3-padding">
              {{ user.bio }}
            </div>
          </section>
        </div>
        <!-- Fin -->
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "jwt-decode";
import moment from "moment";
export default {
  name: "UserPage",
  data() {
    return {
      user: {},
      messageError: "",
    };
  },
  components: {},
  methods: {
    alertConstant(type, message) {
      // Crée une alerte
      const dataAlert = this.$data.alert;
      this.connected = false;
      dataAlert.type = type;
      dataAlert.message = message;
    },
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
                id: this.user.id,
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
    updateUserProfil: function (e) {
       let newUser = {
        name: this.user.name,
        email: this.user.email,
        departement: this.user.departement,
        bio: this.user.bio,
        avatarUrl: this.avatarUrl,
      };
      console.log(newUser);
      this.$axios.put(`user/:${this.userId}`, newUser).then((data) => {
        this.user = data.data;
        window.location.reload();
      });
    },
    updateAvatar() {
      // Update son avatar
      const image = this.$refs.image.files[0];
      const formData = new FormData();
      formData.append("image", image);
      this.$axios
        .post(`user/:${this.userId}`, formData)
        .then(() => {
         window.location.href=`/:${this.user.id}`;
         
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteProfile() {
      // Supprime l'utilisateur
      this.$axios
        .delete("user/:id", { data: { id: this.user.id } })
        .then(() => {
          localStorage.removeItem("token");
          delete this.$axios.defaults.headers.common["Authorization"];
          window.location.href = "/connect";
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.messageError = "You are not authorize to delete " + user.name;
          }
        });
    },
    formatDate(date) {
      moment.locale();
      let tanggal = moment(date, "Y#071c72YYY-MM-DD HH:mm:ss").format("LLL");
      return tanggal;
    },
  },
  created() {
    this.getUserDetails();
  },
};
</script>
<style  scoped>
.socialMedia {
  min-height: 710px;
  background-color: #ccc;
}
.contentPage {
  margin-top: 100px;
}
.bgBlue {
  background-color: #071c72;
}
.mainBlue {
  color: #071c72;
}

.input-container {
  display: flex;
  width: 100%;
}
.input-container > .v-icon {
  padding: 10px;
  color: white;
  background-color: blue;
  min-width: 50px;
  text-align: center;
}
.profile {
  width: 10em;
  height: 10em;
  object-fit: cover;
}
.btn{
  height:3em;
}
</style>
