 <template>
  <div class="w3-card w3-round w3-white w3-animate-left">
    <div class="w3-container">
       <div   class="w3-col w3-margin-left w3-margin-bottom w3-padding">
        <div class="w3-half">
          <img
            :src="user.avatarUrl"
            alt="Avatar"
            class="w3-left w3-circle avatar"
          />
          <h4>{{ user.name }}</h4>
        </div>
        <div class="w3-half">
          <span class="w3-right w3-opacity w3-padding">
            Inscription le {{ formatDate(user.createdAt) }}</span
          >
        </div>
      </div>
      <hr class="w3-clear" />
      <div class="w3-center w3-margin-bottom">
        <form enctype="multipart/form-data" @submit.prevent="sendPost">
          <div class="w3-container w3-padding">
            <div class="input-container">
              <v-icon class="w3-margin-right" dark>edit</v-icon>
              <input
                class="w3-input w3-border contenteditable"
                type="text"
                placeholder="Titre....."
                name="title"
                v-model="title"
              />
            </div>
            <span class="w3-text-red"></span>
            <hr />
            <div class="input-container">
              <v-icon class="w3-margin-right" dark>image</v-icon>
              <input
                type="file"
                name="image"
                ref="image"
                class="w3-input w3-border contenteditable"
              />
            </div>
            <hr />
            <div class="w3-margin-top">
              <button
                type="submit"
                class="w3-btn bgBlue w3-text-white btn"
                title="Enoyer votre post du jour"
              >
                Envoyer
              </button>
            </div>
          </div>
        </form>
      </div>      
      <hr />
      <div        
        class="w3-container w3-card w3-round w3-margin w3-padding shadow"
      >
        <br />
        <div v-for="post in allPosts" :key="post.id">
          <div v-if="post.UserId === user.id|| user.isAdmin === true">
          <div class="w3-half" >
            <img
              :src="post.User.avatarUrl"
              alt="Avatar"
              class="w3-left w3-circle avatar"
            />
            <h4>{{ post.User.name }}</h4>
          </div>
          <div class="w3-half">
            <span class="w3-right w3-opacity middle">{{
              formatDate(post.createdAt)
            }}</span>
          </div>
          <br />
          <hr class="w3-clear" />

          <div class="w3-row-padding" style="margin: 0 -16px">
            <div class="w3-container">
              <h4>{{ post.title }}</h4>
              <img
                :src="post.imageUrl"
                class="w3-image w3-margin-bottom"
                :alt="post.title"
              />
            </div>
          </div>
          <div
            class="w3-col m12 w3-margin-bottom cardBorder w3-padding">
            <div
            class="w3-col m4">
            <button
              type="submit"
              class="w3-btn w3-red w3-text-white btn"
              title="Enoyer votre post du jour"
              :data-id="post.id"
              @click="deletePost"
            >
              <v-icon left dark> delete </v-icon>
              Suprimer
            </button>
            </div>         
          <div
            class="w3-col m6 ">
            <h4 class="w3-text-red">{{messageError}}</h4>
            </div> 
            </div>
        </div>
        </div>
      </div>     
    </div>
  </div>
</template>
 <script>
import auth from "../mixins/auth";
import getallPosts from "../mixins/getallPost";
import moment from "moment";
export default {
  name: "Post",
  data() {
    return {
      user: {},
      title: "",
      messageError: "",
      isVisible: false,
      allPosts: {},
      postId: "",
    };
  },
  methods: {
    sendPost() {
      const image = this.$refs.image.files[0];
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("image", image);
      this.$axios
        .post("post/", formData)
        .then(() => {
          window.location.reload();
        })
        .catch((e) => {
          this.messageError = "Limage doit etre au format Gifs et le Titre que des alphabet est accepter" 
        });
    },

    formatDate(date) {
      moment.locale();
      let tanggal = moment(date).format("ddd,ha");
      return tanggal;
    },
    deletePost: function (event) {
      let id = event.target.dataset.id;
       this.$axios
        .delete(`post/:${id}`, { data: { id: id , user:this.user.isAdmin} })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    this.getUserDetails;
    this.getallPosts;
  },
  mixins: [auth, getallPosts],
};
</script>
<style scoped>
.contenteditable {
  width: 95%;
  border-radius: 15px;
  background-color: rgba(217, 221, 220, 0.493);
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
  background-color: #071c72;
}
.avatar {
  width: 3em;
  height: 3em;
  object-fit: cover;
  margin-top: 8px;
  margin-right: 15px;
}
.cardBorder {
  border-bottom: 2px solid red;
}
.shadow {
  border: 1px solid;
  padding: 5px;
  box-shadow: 0px 2px 2px 2px #071c72;
}
.middle {
  vertical-align: middle;
}
</style>
