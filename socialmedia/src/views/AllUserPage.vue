<template>
  <div class="w3-container w3-content contentPage">
    
        <div class="w3-row"> 
             <div v-for="user in users" :key="user.id">
        <div class="w3-col m4 marginTop">
          
      <div class="w3-card-4 w3-margin">
        <header class="w3-container w3-light-grey">
          <img :src="user.avatarUrl" alt="Avatar" class="w3-circle profile" />
          <h3>{{ user.name }}</h3>
        </header>

        <div class="w3-container">
          <p>1 new friend request</p>
          <hr />
          <img src="img_avatar3.png" alt="Avatar" class="w3-left w3-circle" />
          <p>President/CEO at Mighty Schools...</p>
        </div>

        <button class="w3-button w3-block w3-dark-grey">+ Connect</button>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
export default {
  name: "AllUserPage",
  data() {
    return {
      users: {},
    };
  },
  methods: {
    getallUsers: function () {
      this.$axios.get("user/users").then((datausers) => {
        this.users = datausers.data;
      });
    },
  },
  mounted() {
    this.getallUsers();
  },
};
</script>
<style>
.fullPage {
  width: 100%;
  max-width: 1400px;
  height: auto;
}
.contentPage {
  max-width: 1200px;
  margin-top:180px;
}
.profile {
  height: 50px;
  width: 50px;
}
.marginTop{
    margin-top:100px;
}
</style>