<template>
  <div class="w3-container socialMedia">
    <!-- Page Container -->
    <div class="w3-container w3-content contentPage">
      <!-- The Grid -->
      <div class="w3-row">
        <!-- Left Column -->
        <div v-if="!user.isAdmin">
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
                <div class="w3-center w3-margin-bottom">
                  <v-btn color="bgBlue" dark to="/Your-Profil" title="Profile">
                    <v-icon left> user </v-icon>
                    Profile
                  </v-btn>
                </div>
              </div>
            </div>
            <br />
            <!-- End Left Column -->
          </div>
          <!-- Middle Column -->
          <div class="w3-col m6">
            <div v-for="post in allPosts" :key="post.id">
              <div v-if="post" >
                <div class="w3-card  w3-container w3-white round w3-padding w3-margin-bottom Centercontainer">
                  <div class="w3-half">
                    <img
                      :src="post.User.avatarUrl"
                      alt="Avatar"
                      class="w3-left w3-circle avatar"
                    />
                    <h4>{{ post.User.name }}</h4>
                  </div>
                  <div class="w3-half">
                    <span class="w3-right w3-margin-top w3-opacity">{{
                      formatDate(post.User.createdAt)
                    }}</span>
                  </div>
                  <br />
                  <header class="w3-container">
                    <h4>{{ post.title }}</h4>
                  </header>
                  <img
                    :src="post.imageUrl"
                    class="w3-image w3-margin-bottom"
                    :alt="post.title"
                  />
                  <br />
                  <div v-if="post.id === btnId">
                    <div class="w3-margin comments">
                      <div class="flexContainer">
                        <div class="imagContent">
                          <img
                            :src="Comments.User.avatarUrl"
                            alt="Avatar"
                            class="w3-circle profile"
                          />
                        </div>
                        <div class="contentComment">{{ Comments.content }}</div>
                        <div class="contentCreatedAt">
                          {{ formatDate(comment.createdAt) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w3-margin"
                    v-for="comment in allComments"
                    :key="comment.id"
                  >
                    <div v-if="post.id === comment.postId">
                      <div class="flexContainer">
                        <div class="imagContent">
                          <img
                            :src="comment.User.avatarUrl"
                            alt="Avatar"
                            class="w3-circle profile"
                          />
                        </div>
                        <div class="contentComment">{{ comment.content }}</div>
                        <div class="contentCreatedAt">
                          {{ formatDate(comment.createdAt) }}
                        </div>
                      </div>
                      </div>
                    <hr />
                  </div>
                  <div :data-id="post.id" id="formComment" class="show">
                    <form name="formComment" class="w3-col w3-margin-bottom">
                      <div class="input-container">
                        <v-icon dark>edit</v-icon>
                        <input
                          class="w3-input w3-border contenteditable"
                          type="text"
                          placeholder="Commentaire....."
                          name="title"
                          v-model="commentaire"
                        />
                        <button
                          type="button"
                          @click="sendComment"
                          :data-id="post.id"
                          class="w3-button bgBlue"
                        >
                          <v-icon class="w3-margin-right" dark>send</v-icon>
                        </button>
                      </div>
                    </form>
                  </div>
                  <footer class="w3-margin-top">
                    <div class="w3-row">
                      <div class="w3-col m3">
                        <v-btn title="Aimer le post">
                          <v-icon large color="blue darken-2">thumb_up</v-icon>
                        </v-btn>
                      </div>
                      <div class="w3-col m2">
                        <v-btn
                          class="w3-margin-right"
                          title="Ne pas aimer le post"
                        >
                          <v-icon large color="blue darken-2"
                            >thumb_down</v-icon
                          >
                        </v-btn>
                      </div>
                      <div class="w3-col m3">
                        <v-btn
                          type="button"
                          class="w3-button w3-theme-d2 w3-margin-bottom w3-margin-left"
                          title="Commmenter le post"
                          @click="displayForm"
                          :data-id="post.id"
                        >
                          <v-icon large color="blue darken-2">chat</v-icon>
                           Commentaire
                        </v-btn>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
              <div
                v-else
                class="w3-container w3-margin-left w3-card w3-white w3-round w3-margin-right"
              >
                <div class="w3-center w3-padding">
                  <h2 class="w3-text-red">aucun post à afficher</h2>
                </div>
              </div>
            </div>
          </div>
          <!-- End Middle Column -->
          <!-- Right Column -->
          <div class="w3-col m3">
            <div class="w3-card w3-round w3-white">
              <div class="w3-container w3-center w3-margin-bottom">
                <h4>Utilisateurs</h4>
                  <div v-for="user in users" :key="user.id">
                <div class="w3-half w3-padding">
                  <img
                    :src="user.avatarUrl"
                    alt="Avatar"
                    class="w3-circle profile"
                  /> 
                  <hr/> 
                  <br>      
                  <a @click="linketo">                   
                 {{ user.name }}
                  </a>
                </div>
                <hr class="w3-margin" />
                <br />               
              </div>
              <br />
              </div>
            </div>
            <!-- End Right Column -->
          </div>
          <br />
        </div>
        <div v-else>
          <AdminPage />
            </div>               
              </div>
              <div v-if="(isModalvisible = true)">
                <Modal />
              </div>
              <!-- End Page Container -->
            </div>
          </div>
       
  <!-- End Grid -->

  <!-- End Page Container -->
</template>
<script>
import auth from "../mixins/auth";
import profil from "../mixins/getUserProfil";
import moment from "moment";
import axios from "axios";
const AdminPage = () => import("@/components/AdminPage.vue");
const Modal = () => import("@/components//Modal.vue");

export default {
  name: "SocialMediaHome",
  data() {
    return {
      user: {},
      users: {},
      allPosts: {},
      show: false,
      isVisible:false,
      comment: "",
      commentaire: "",
      active: false,
      allComments: {},
      isModalvisible: false,
      btnId: localStorage.getItem("btnId"),
    };
  },
  components: { Modal ,AdminPage},
  methods: {
    visiblefunc(){
      this.isVisible = ! this.isVisible;
    },
    getallUsers: function () {
      axios.get("user/users").then((datausers) => {
        this.users = datausers.data;
      });
    },
    linketo(){
     window.location.href= "/AllUserPage";
    },
    viewModal: function () {
      this.isModalvisible = true;
      let modal = document.getElementById("messoutput");
      modal.style.display = "block";
      modal.style.zIndex = "4";
    },
    deletePost: function (event) {
      let id = event.target.dataset.id;
      console.log(id);
      this.allPosts.forEach(function (value) {
        if (id === value.id) {
          this.$axios
            .delete(`post/:${id}`, { data: { id: id } })
            .then(() => {
              window.location.reload();
            })
            .catch((err) => console.error(err));
        }
      });
    },

    formatDate(date) {
      moment.locale();
      let tanggal = moment(date).format("ddd,ha");
      return tanggal;
    },
    getallPosts: function () {
      this.$axios.get("post/").then((dataPost) => {
        this.allPosts = dataPost.data;
      });
    },
    displayForm: function (event) {
      let buttonId = event.target.parentNode.dataset.id;

      let child =
        event.target.parentNode.parentNode.parentNode.parentElement
          .previousSibling;
      let container =
        event.target.parentNode.parentNode.parentNode.parentElement
          .previousSibling.dataset.id;
      this.containBtn = [];
      this.containBtn.push(child);
      console.log(this.containBtn);
      if (buttonId === container) {
        if (child.className === "show") {
          child.classList.add("active");
          localStorage.setItem("btnId", buttonId);
        } else {
          child.classList.remove("active");
        }
      }
    },
    sendComment: async function (event) {
      /*let newComment = event.target.parentNode.parentNode.children[1].value;*/
      let btnId = localStorage.getItem("btnId");
      if (btnId) {
        const send = this.$axios.post("comments/", {
          content: this.commentaire,
          postId: btnId,
        });
        await send
          .then((data) => {
            localStorage.removeItem("btnId");
            window.location.reload();
            this.commentaire = "";
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteUser: function (event) {
       let id = event.target.dataset.id;
       console.log(id)
       console.log(this.user.isAdmin)
     this.$axios
        .delete(`user/${id}`, { data: { id: id , user:this.user.isAdmin} })
        .then((response) => {
          (this.submitStatus = "OK"),
          console.log(response), this.$router.go("/Admin");
        })
        .catch((error) =>
          // (this.submitStatus = "ERROR SERVEUR"),
          console.log(error)
        );
    },
    get() {
      // Récupère les commentaire
      this.$axios
        .get("comments/")
        .then((data) => {
          this.allComments = data.data;
        })
        .catch((e) => {
          if (e) {
            console.error(e);
          }
        });
    },
  },

  created() {
    this.getallPosts();
    this.get();
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
.fullPage {
  width: 100%;
  max-width: 1400px;
  height: auto;
}
.contentPage {
  max-width: 1200px;
  margin-top:80px;
}
.Centercontainer{
  margin-left:16px;
  margin-right:16px;

}
.flexContainer {
  display: flex;
  justify-content: space-around;
}
.contentComment {
  line-height: 3;
}
.contentCreatedAt {
  margin-left: 30px;
  line-height: 3;
}
#contenteditable {
  width: 80%;
  border-radius: 15px;
  background-color: rgba(217, 221, 220, 0.493);
}
.cardComment {
  height: auto;
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
.usersName {
  line-height: 3;
}
#formComment {
  display: none;
}
#formComment.active {
  display: block;
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
.bgBlue {
  background-color: blue;
  color: white;
}

@media (max-width: 768px) {
  .contentPage {
   margin-top: 80px;
}
  .mainContent {
    margin-bottom: 16px;
  }
  .flexContainer {
    flex-direction: column;
  }
}
</style>
