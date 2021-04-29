<template>
  <div class="admin">
    <div class="w3-container w3-content marginTop fullPage">
      <!-- The Grid -->
      <div class="w3-row">
        <!-- Left Column -->
        <div class="w3-col m3">
          <!-- Profile -->
          <div class="w3-card w3-round w3-white">
            <div class="w3-container">
              <h4 class="w3-center">{{ user.name }}</h4>
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
                  color="indigo"
                  dark
                  @click="viewModal()"
                  class="w3-margin-right"
                  title="Mettre à jour mes infos">
                  <v-icon dark>update</v-icon>
                </v-btn>
                <v-btn
                  color="red"
                  dark
                  @click="delecteUser()"
                  title="Supprimer mes infos"
                >
                 <v-icon  left> delete </v-icon>
                  Suprimer
                </v-btn>
               
              </div>
            </div>
          </div>
          <div class="w3-card w3-round">
            <div class="w3-white">
              <button
                onclick="myFunction('Demo1')"
                class="w3-button w3-block w3-theme-l1 w3-left-align"
              >
                <v-icon class="w3-margin-right">groups</v-icon>My Groups
              </button>
              <div id="Demo1" class="w3-hide w3-container">
                <p>Some text..</p>
              </div>
              <button
                onclick="myFunction('Demo2')"
                class="w3-button w3-block w3-theme-l1 w3-left-align"
              >
                <v-icon class="w3-margin-right">folder_special</v-icon> My
                Events
              </button>
              <div id="Demo2" class="w3-hide w3-container">
                <p>Some other text..</p>
              </div>
              <button
                onclick="myFunction('Demo3')"
                class="w3-button w3-block w3-theme-l1 w3-left-align"
              >
                <v-icon class="w3-margin-right">camera_alt </v-icon> Photos
              </button>
              <div id="Demo3" class="w3-hide w3-container">
                <div class="w3-row-padding">
                  <br />
                  <div class="w3-half">
                    <img
                      src="/w3images/lights.jpg"
                      style="width: 100%"
                      class="w3-margin-bottom"
                    />
                  </div>
                  <div class="w3-half">
                    <img
                      src="/w3images/nature.jpg"
                      style="width: 100%"
                      class="w3-margin-bottom"
                    />
                  </div>
                  <div class="w3-half">
                    <img
                      src="/w3images/mountains.jpg"
                      style="width: 100%"
                      class="w3-margin-bottom"
                    />
                  </div>
                  <div class="w3-half">
                    <img
                      src="/w3images/forest.jpg"
                      style="width: 100%"
                      class="w3-margin-bottom"
                    />
                  </div>
                  <div class="w3-half">
                    <img
                      src="/w3images/nature.jpg"
                      style="width: 100%"
                      class="w3-margin-bottom"
                    />
                  </div>
                  <div class="w3-half">
                    <img
                      src="/w3images/snow.jpg"
                      style="width: 100%"
                      class="w3-margin-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <!-- Interests -->
          <div class="w3-card w3-round w3-white w3-hide-small">
            <div class="w3-container">
              <h5>Biographie</h5>
              <p>
                {{ user.bio }}
              </p>
            </div>
          </div>
          <br />

          <!-- Alert Box -->
          <div
            class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small"
          >
            <span
              onclick="this.parentElement.style.display='none'"
              class="w3-button w3-theme-l3 w3-display-topright"
            >
              <i class="fa fa-remove"></i>
            </span>
            <p><strong>Hey!</strong></p>
            <p>People are looking at your profile. Find out who.</p>
          </div>

          <!-- End Left Column -->
        </div>

        <!-- Middle Column -->
        <div class="w3-col m7">
          <div class="w3-row-padding">
            <div class="w3-col m12">
              <div class="w3-card w3-round w3-white">
                <div class="w3-container w3-padding"></div>
              </div>
            </div>
          </div>

          <div class="w3-container w3-card w3-white w3-round w3-margin">
            <br />
          </div>

          <div class="w3-container w3-card w3-white w3-round w3-margin">
            <br />
            <img
              src="/w3images/avatar5.png"
              alt="Avatar"
              class="w3-left w3-circle w3-margin-right"
              style="width: 60px"
            />
            <span class="w3-right w3-opacity">16 min</span>
            <h4>Jane Doe</h4>
            <br />
            <hr class="w3-clear" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <button
              type="button"
              class="w3-button w3-theme-d1 w3-margin-bottom"
            >
              <i class="fa fa-thumbs-up"></i> &nbsp;Like
            </button>
            <button
              type="button"
              class="w3-button w3-theme-d2 w3-margin-bottom"
            >
              <i class="fa fa-comment"></i> &nbsp;Comment
            </button>
          </div>

          <!-- End Middle Column -->
        </div>

        <!-- Right Column -->
        <div class="w3-col m2">
          <div class="w3-card w3-round bgBlue w3-center">
            <div class="w3-container">
              <h4 class="w3-white w3-margin-top">contacts</h4>
              <div v-for="user in users" :key="user.id">
                <img
                  :src="user.avatarUrl"
                  alt="Avatar"
                  class="w3-circle profile"
                /><br />
                <p class="w3-white">{{ user.name }}</p>
                <div class="w3-row w3-opacity">
                  <div class="w3-half">
                    <button
                      class="w3-button w3-block w3-white w3-section"
                      title="Accept"
                    >
                      <v-btn color="primary" dark>
                        <v-icon dark left> mdi-checkbox-marked-circle </v-icon>
                      </v-btn>
                    </button>
                  </div>
                  <div class="w3-half">
                    <button
                      class="w3-button w3-block w3-white w3-section"
                      title="Decline"
                    >
                      <v-btn color="red" dark>
                        <v-icon dark right> mdi-cancel </v-icon>
                      </v-btn>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <!-- End Right Column -->
        </div>

        <!-- End Grid -->
      </div>
      <div v-if="(isModalvisible = true)">
        <Modal />
      </div>
      <!-- End Page Container -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "jwt-decode";
import moment from "moment";
import axios from "axios";
const Modal = () => import("@/components//Modal.vue");
export default {
  name: "Admin",
  data() {
    return {
      user: {},
      users: {},
      token: "",
      isModalvisible: false,
      elementsInvalides : 0
    };
  },
  components: {
    Modal,
  },
  methods: {
    viewModal: function () {
      this.isModalvisible = true;
      let modal = document.getElementById("messoutput");
      modal.style.display = "block";
      modal.style.zIndex = "4";
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
            })
            .catch((err) => console.log(err));
        }
      } catch (error) {
        // return error in production env
        console.log(error, "error from decoding token");
      }
    },
    formatDate(date) {
      moment.locale();
      let tanggal = moment(date, "YYYY-MM-DD HH:mm:ss").format("LLL");
      return tanggal;
    },
    updateUser: function () {
      this.isModalvisible = true;
      let modal = document.getElementById("messoutput");
      modal.style.display = "block";
      modal.style.zIndex = "4";
    },
    
   getallUsers: function () {
      this.$axios.get("user/users").then((datausers) => {
        let newusers = datausers.data; 
       newusers.filter((item)=>{
         if(item.id === this.user.id){
        this.users =  newusers;
         }
       })
       /* 
        this.users = newusers;*/
      })
   },
  
    delecteUser:function(){
      this.$axios
        .delete(`user/${this.user.id}`, {})
        .then((response) => {
          //(this.submitStatus = "OK"),
          console.log(response), this.$router.go("/");
        })
        .catch((error) =>
          // (this.submitStatus = "ERROR SERVEUR"),
          console.log(error)
        );
    },
  
  },
  created() {
    this.getUserDetails();
    this.getallUsers();
    
  },
};
</script>
<style scoped>
.fullPage {
  width: 100%;
  max-width: 1400px;
  height: auto;
}
.profile {
  height: 106px;
  width: 106px;
}
.marginTop {
  margin-top: 80px;
  margin-bottom: 50px;
}
.bgBlue {
  background-color: #071c72;
}
</style>