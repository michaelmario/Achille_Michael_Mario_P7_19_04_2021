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
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import moment from "moment";
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
    formatDate(date) {
      moment.locale();
      let tanggal = moment(date).format("ddd,ha");
      return tanggal;
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
  height:700px;
}
.profile {
  height: 50px;
  width: 50px;
}
.marginTop{
    margin-top:100px;
}
</style>