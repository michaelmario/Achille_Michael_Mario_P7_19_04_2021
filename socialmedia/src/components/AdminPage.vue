<template>
  <div class="admin">
    <div class="w3-container w3-content fullPage">
      <div v-if="havePost">
        <!-- The Grid -->
        <div class="w3-row">
          <!-- Left Column -->
          <div class="w3-col m3">
            <!-- Profile -->
            <div class="w3-card w3-round w3-white">
              <div class="w3-container" v-if="haveUser">
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
                    title="Mettre à jour mes infos"
                  >
                    <v-icon dark>update</v-icon>
                  </v-btn>
                </div>
              </div>
              <div v-else>no user</div>
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
                  <v-icon class="w3-margin-right">folder_special</v-icon>
                  My Events
                </button>
                <div id="Demo2" class="w3-hide w3-container">
                  <p>Some other text..</p>
                </div>
                <button
                  onclick="myFunction('Demo3')"
                  class="w3-button w3-block w3-theme-l1 w3-left-align"
                >
                  <v-icon class="w3-margin-right">camera_alt </v-icon>
                  Photos
                </button>
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

            <!-- End Left Column -->
          </div>
          <!-- Middle Column -->
          <div class="w3-col m6 mainContent">
            <div v-for="post in allPosts" :key="post.id">
              <div class="w3-margin-left w3-round w3-margin-right">
                <div class="w3-card w3-white round w3-padding cardComment">
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
                      <div class="w3-container">
                        <button
                          @click="visiblefunc"
                          class="w3-button w3-circle w3-black w3-right"
                          title="Action to remove or modify comments"
                        >
                          +
                        </button>
                        <div v-if="isVisible">
                          <v-btn
                            class="w3-button w3-red w3-margin"
                            title="Suprimer"
                            :data-id="comment.id"
                            @click="deletecomment"
                          >
                            <v-icon left dark> delete </v-icon>
                            suprimer
                          </v-btn>
                        </div>
                      </div>
                    </div>
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
                      <div class="w3-col m5 w3-center">
                        <button title="Aimer le post" :data-id="post.id">
                          <v-icon large color="blue darken-2">thumb_up</v-icon>
                        </button>
                        <span>{{ like }}</span>
                      </div>
                      <div class="w3-col m5 w3-center">
                        <v-btn
                          type="button"
                          class="w3-margin-left marginTopSmall"
                          title="Commenter le post"
                          @click="displayForm"
                          :data-id="post.id"
                        >
                          <v-icon large color="blue darken-2">chat</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
          <div class="w3-col m3">
            <div class="w3-card w3-white w3-round w3-center">
              <div class="w3-container w3-center">
                <h4>Utilisateurs</h4>
                <div v-for="user in users" :key="user.id">
                  <div class="w3-half w3-padding">
                    <img
                      :src="user.avatarUrl"
                      alt="Avatar"
                      class="w3-circle profile"
                    />
                  </div>
                  <div class="w3-half w3-padding">
                    <a href="#" @click="linketo">
                      {{ user.name }}
                    </a>
                  </div>
                  <hr class="w3-margin" />
                  <br />
                  <button
                    class="w3-button w3-red"
                    title="Suprimer"
                    :data-id="user.id"
                    @click="deleteUser"
                  >
                    <v-icon left dark> delete </v-icon>
                    suprimer
                  </button>
                </div>
                <br />
              </div>
            </div>
            <br />
            <!-- End Right Column -->
          </div>
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
</template>
<script>
import auth from "../mixins/auth";
import moment from "moment";
import axios from "axios";
const Modal = () => import("@/components//Modal.vue");
export default {
  name: "AdminPage",
  data() {
    return {
      user: {},
      users: {},
      allPosts: {},
      show: false,
      isVisible: false,
      comment: "",
      commentaire: "",
      active: false,
      allComments: {},
      isModalvisible: false,
      btnId: localStorage.getItem("btnId"),
      havePost: false,
      haveUser: false,
      like: 0,
    };
  },
  components: { Modal },
  methods: {
    //Lien pour les utilisateurs
    linketo() {
      window.location.href = "/AllUserPage";
    },
    visiblefunc() {
      this.isVisible = !this.isVisible;
    },
    // Suprimer un commentaire
    deletecomment(event) {
      let eventId = event.target.parentNode.dataset.id;
      console.log(eventId);
      this.$axios
        .delete(`comments/${eventId}`, { data: { user: this.user.isAdmin } })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.error(err));
    },
    // Récupèrer les utilisateurs
    getallUsers: function () {
      axios.get("user/users").then((datausers) => {
        this.users = datausers.data;
      });
    },
    //Affiche le modal
    viewModal: function () {
      this.isModalvisible = true;
      let modal = document.getElementById("messoutput");
      modal.style.display = "block";
      modal.style.zIndex = "4";
    },
    //Suprimer un post
    deletePost: function (event) {
      let id = event.target.dataset.id;
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
    //Convertir le format date
    formatDate(date) {
      moment.locale();
      let tanggal = moment(date).format("ddd,ha");
      return tanggal;
    },
    //Récupèrer les post
    getallPosts: function () {
      this.$axios.get("post/").then((dataPost) => {
        this.allPosts = dataPost.data;
        if (this.allPosts) {
          this.havePost = true;
        } else {
          this.havePost = false;
        }
      });
    },
    //Affiche le form pour ecrire les commentaires
    displayForm: function (event) {
      let buttonId = event.target.parentNode.parentNode.dataset.id;
      let child =
        event.target.parentNode.parentNode.parentNode.parentNode.parentElement
          .previousSibling;
      let container =
        event.target.parentNode.parentNode.parentNode.parentNode.parentElement
          .previousSibling.dataset.id;
      this.containBtn = [];
      this.containBtn.push(child);
      if (buttonId === container) {
        if (child.className === "show") {
          child.classList.add("active");
          localStorage.setItem("btnId", buttonId);
        } else {
          child.classList.remove("active");
        }
      }
    },
    //Envoyer le commentaire
    sendComment: async function (event) {
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
    //Suprimer un utilisateurs
    deleteUser: function (event) {
      let id = event.target.dataset.id;
      console.log(id);
      console.log(this.user.isAdmin);
      this.$axios
        .delete(`user/${id}`, { data: { id: id, user: this.user.isAdmin } })
        .then((response) => {
          (this.submitStatus = "OK"), window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    // Récupère les commentaire
    getallcomment() {
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
    //Récupèrer les like
    getLike() {
      this.$axios
        .get(`post/:id/like`, { data: { id: this.user.id } })
        .then((data) => {
          if ((data.statusText = "OK")) {
            if (this.like === 0) {
              this.like = +1;
            } else if (data.statusText != "ok") {
              this.like = 0;
            }
          }
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
    this.getLike();
    this.getallUsers();
    this.getallcomment();
  },
  mounted() {
    if (this.getUserDetails) {
      this.haveUser = true;
    }
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
  margin-top: 40px;
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
  .mainContent {
    margin-bottom: 16px;
  }
  .flexContainer {
    flex-direction: column;
  }
  .marginTopSmall {
    margin-top: 16px;
  }
}
@media (max-width: 900px) {
  .mainContent {
    margin-bottom: 40px;
  }
}
</style>

  
}
</script>