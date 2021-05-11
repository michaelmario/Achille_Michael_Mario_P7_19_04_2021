<template>
    <div> 
     <div v-for="post in allPosts" :key="post.id">
    <div class="w3-container w3-card w3-round w3-margin w3-padding example">
      <br />
     <div v-if="post.UserId === user.id || user.isAdmin === true">
        <div class="w3-half w3-margin-bottom">
          <img
            :src="post.User.avatarUrl"
            alt="Avatar"
            class="w3-left w3-margin-left w3-circle avatar"
          />
          <h4>{{ post.User.name }}</h4>
        </div>
        <div class="w3-half">
          <span class="w3-right w3-opacity">{{post.id}}</span>
          <input type="hidden" id="custId" name="custId" value="post.id">
        </div>
        <br />

        <form enctype="multipart/form-data" @submit.prevent="modifyPost" >
          <div class="w3-container w3-padding">
            <div class="input-container">
              <v-icon class="w3-margin-right" dark>edit</v-icon>
              <input
                class="w3-input w3-border contenteditable"
                type="text"
                :placeholder="post.title"
                name="title"
                v-model="title"
               
              />
            </div>
            <span class="w3-text-red"></span>
            <hr />
            <img
              :src="post.imageUrl"
              class="w3-image w3-margin-bottom"
              :alt="post.title"
              
            />
          </div>
          <div class="input-container">
            <v-icon class="w3-margin-right" dark>image</v-icon>
            <input
              type="file"
              name="image"
              ref="image"
              class="w3-input w3-border contenteditable"
            />
            
          </div>
          <hr class="cardBorder" />
          <div class="w3-margin-top">
            <button
              type="submit"
              class="w3-btn w3-red w3-text-white btn"
              title="Enoyer votre post du jour"
              :id="post.id"
            >
              <v-icon left dark> edit </v-icon>
              Modifier
            </button>
          </div>
        </form>      
      </div>      
    </div>
  </div>
    </div>
</template>
<script>
import auth from "../mixins/auth";
import getallPosts from "../mixins/getallPost";

export default {
  name: "ModifyPost",
  data() {
    return {
       user: {},
      allPosts: {},
      title: "",
      id: "",
    };
  },
  methods: {
    modifyPost: function (event) {
      const title = event.target.title.value;
     let custId = event.target.parentNode.children[3].children[3].children[0].id;
      const image = event.target.image.files[0];
 
      console.log(image)
      console.log(title)
     let formData = new FormData();
      formData.append("title", this.title);
      formData.append("image", image);     
      this.$axios
        .put(`post/${custId}`, formData)
        .then(() => {
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
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
.example {
  border: 1px solid;
  padding: 5px;
  box-shadow: 0px 2px 2px 2px #071c72;
}
</style>

 