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
                <v-btn color="bgBlue" dark :to="'/:' + user.id" title="Profile">
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
          <div
            class="w3-container w3-margin-left w3-card w3-white w3-round w3-margin-right"
          >
            <div v-for="post in allPosts" :key="post.id">
              <div class="w3-half">
                <img
                  :src="user.avatarUrl"
                  alt="Avatar"
                  class="w3-left w3-circle avatar"
                />
                <h4>{{ user.name }}</h4>
              </div>
              <div class="w3-half">
                <span class="w3-right w3-margin-top w3-opacity">{{
                  formatDate(user.createdAt)
                }}</span>
              </div>
              <br />
              <div class="w3-row-padding">
                <div class="w3-container">
                  <div class="w3-card w3-white w3-padding w3-margin-bottom">
                    <header class="w3-container">
                      <h4>{{ post.title }}</h4>
                    </header>
                    <img
                      :src="post.imageUrl"
                      class="w3-image w3-margin-bottom"
                      :alt="post.title"
                    />
                    <br />
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Middle Column -->
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
          </div>
          <!-- End Right Column -->
        </div>
        <br />
      </div>
    </div>
    <!-- End Grid -->
  </div>

  <!-- End Page Container -->
</template>
<script>
import auth from "../mixins/auth";
import moment from "moment";
import axios from "axios";
export default {
  name: "SocialMediaHome",
  data() {
    return {
      user: {},
      users: {},
      allPosts: {},
    };
  },
  components: {},
  methods: {
    linkto: function () {
      window.location.href = `/:${this.user.id}`;
    },

    getallUsers: function () {
      axios.get("user/users").then((datausers) => {
        this.users = datausers.data;
        this.users.forEach((element) => {
          if (element === this.users) {
            this.users.shift();
            return this.users;
          }
        });
      });
    },
    deletePost: function (event) {
      var id = event.target.dataset.id;
      this.allPosts.forEach(function (value) {
        if (id === value.id) {
        }
      });
      this.$axios
        .delete(`post/:${id}`, { data: { id: id } })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.error(err));
    },
    formatDate(date) {
      moment.locale();
      let tanggal = moment(date).format("ddd,ha");
      return tanggal;
    },
    getallPosts: function () {
      this.$axios.get("post/").then((dataPost) => {
        this.allPosts = dataPost.data;
        console.log(this.allPosts);
      });
    },
  },
  created() {
    this.getallPosts();
  },
  mounted() {
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
.avatar {
  width: 3em;
  height: 3em;
  object-fit: cover;
  margin-top: 8px;
  margin-right: 15px;
}
</style>
