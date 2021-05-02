 <template>
  <div class="w3-card w3-round w3-white w3-animate-left">
    <div class="w3-container">           
                 <div class="w3-center">
      <h4 class=" mainBlue">{{user.name}}</h4>
      <img   :src="user.avatarUrl"
                class="w3-circle w3-margin-right"
                id="avatar"
                alt="Avatar"
              />
        </div>       
      <div class="w3-center w3-margin-bottom">
        <form   method="POST">
          <div class="w3-container w3-padding">
            <div class="input-container">
              <v-icon class="w3-margin-right"> email</v-icon>
              <input
                class="w3-input w3-border contenteditable"
                type="text"
                placeholder="Titre....."
                name="post.title"
                v-model="post.title"
              />
            </div>           
            <span class="w3-text-red"></span>
            <hr />
            <div class="input-container">
              <v-icon></v-icon>
              <input
                type="file"
                name="image"
                ref="image"
                class="w3-input w3-border contenteditable"
                enctype="multipart/form-data"
              />
            </div> 
             <hr />
             <div class="w3-margin-top">
              <button
                type="button"
                class="w3-btn bgBlue w3-text-white btn"               
                title="Enoyer votre post du jour" @submit="sendPost(e)" >
                Envoyer
              </button>
            </div>
          </div>
        </form>
        <hr />
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
        
          <div class="w3-row-padding" style="margin: 0 -16px">
           <div class="w3-container">
              <img
                src="/w3images/nature.jpg"
                style="width: 100%"
                alt="Nature"
                class="w3-margin-bottom"
              />
            </div>
          </div> 
           <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>          
        </div>
      </div>
    </div>
  </div>
</template>
 <script>
 import auth from "../mixins/auth";
export default {
    
  name: "Post",
  data() {
    return {
      user: {},
      post:{},
      messageError: "",
      isVisible: false,
    };
  },
  methods:{
      sendPost(e){
          e.preventDefault();
      console.log('ce post'+ post)
      }

  },
  mounted() {
    this.getUserDetails;
  },
   mixins: [auth],
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
#avatar {
  width:3em;
  height:3em;
  object-fit: cover;
  margin-top:8px;
  margin-right:15px;
}
</style>
