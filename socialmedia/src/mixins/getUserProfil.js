import VueJwtDecode from "jwt-decode";
export default{
    computed:{       
      async getUserProfil() { 
        this.token = localStorage.getItem("token");
        try {
          let decoded = VueJwtDecode(this.token);
          this.User = decoded;
          if (this.User) {
              await this.$axios
              .get(`user/role`,{user:this.User})
              .then((data) => {
                this.user = data.data;
                console.log(this.user)
                this.isLoggedIn = true;                               
              })
              .catch((err) => console.log(err));
          }
        }
         catch (error) {
          // return error in production env
          console.log(error, "error from decoding token");
        }
      },
    }

}
