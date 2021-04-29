<template>
  <div class="w3-container socialMedia">
    <!-- Page Container -->
    <div class="w3-container w3-content contentPage">
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
              <div class="w3-margin-bottom">
                <v-btn color="bgBlue" dark :to="'/:'+user.id" title="Profile">
                  <v-icon left> wright </v-icon>
                  Profile
                </v-btn>
              </div>
            </div>
          </div>
          <br />

          <!-- End Left Column -->
        </div>

        <!-- Middle Column -->
        <div class="w3-col m7">
          <div class="w3-row-padding">
            <div class="w3-col m12">
              <div class="w3-card w3-round w3-white">
                <div class="w3-container w3-padding flexContainer">
                  <div
                    contenteditable="true"
                    id="contenteditable"
                    class="w3-border w3-padding w3-margin-left"
                  >
                    Status: Feeling Blue
                  </div>
                  <v-btn class="w3-margin-left" color="red" dark>
                    <v-icon class="w3-margin-right"> email</v-icon>
                    Envoyer</v-btn
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="w3-container w3-card w3-white w3-round w3-margin">
            <br />
            <img
              src="/w3images/avatar2.png"
              alt="Avatar"
              class="w3-left w3-circle w3-margin-right"
              style="width: 60px"
            />
            <span class="w3-right w3-opacity">1 min</span>
            <h4>John Doe</h4>
            <br />
            <hr class="w3-clear" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div class="w3-row-padding" style="margin: 0 -16px">
              <div class="w3-half">
                <img
                  src="/w3images/lights.jpg"
                  style="width: 100%"
                  alt="Northern Lights"
                  class="w3-margin-bottom"
                />
              </div>
              <div class="w3-half">
                <img
                  src="/w3images/nature.jpg"
                  style="width: 100%"
                  alt="Nature"
                  class="w3-margin-bottom"
                />
              </div>
            </div>
            <button
              type="button"
              class="w3-button w3-theme-d1 w3-margin-bottom"
            >
              <i class="fa fa-thumbs-up"></i>  Like
            </button>
            <button
              type="button"
              class="w3-button w3-theme-d2 w3-margin-bottom"
            >
              <i class="fa fa-comment"></i>  Comment
            </button>
          </div>

          <!-- End Middle Column -->
        </div>

        <!-- Right Column -->
        <div class="w3-col m2">
          <div class="w3-card w3-round w3-white w3-center">
            <div class="w3-container">
              <p>Recent Notification</p>
              <div v-for="user in users" :key="user.id">
                <div class="flexContainer w3-margin-bottom">
                  <img
                    :src="user.avatarUrl"
                    alt="Avatar"
                    class="w3-circle profile"
                  />
                  <p class="w3-margin-left">{{ user.name }}</p>
                </div>
              </div>
            </div>
            <br />
          </div>
          <!-- End Right Column -->
        </div>

        <!-- End Grid -->
      </div>

      <!-- End Page Container -->
    </div>
    <br />
  </div>
</template>
<script>
import auth from "../mixins/auth";
export default {
  name: "SocialMediaHome",
  data() {
    return {
      user: {},
      users: [],
    };
  },
  components: {},
  methods: {
    linkto: function () {
      window.location.href = `/:${this.user.id}`;
    },

    getallUsers: function () {
      this.$axios.get("user/users").then((datausers) => {
        this.users = datausers.data;
        this.users.forEach((element) => {
          if (element === this.users) {
            this.users.shift();
            return this.users;
          }
        });
      });
    },
  },
  created() {
    this.getUserDetails;
    this.getallUsers();
  },
  mixins: [auth],
};
</script>
<style  scoped>
.socialMedia {
  background-color: #ccc;
  min-height: 750px;
}
.contentPage {
  max-width: 1200px;
  margin-top: 80px;
}
.flexContainer {
  display: flex;
}
#contenteditable {
  width: 80%;
  border-radius: 15px;
  background-color: rgba(217, 221, 220, 0.493);
}
.profile {
  height: 50px;
  width: 50px;
}
</style>
