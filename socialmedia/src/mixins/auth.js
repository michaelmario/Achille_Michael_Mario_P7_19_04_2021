import VueJwtDecode from "jwt-decode";
export default{
    computed:{
        getUserDetails() {
         this.token = localStorage.getItem("token");
        try {
          let decoded = VueJwtDecode(this.token);
          this.User = decoded;
          if (this.User) {
            this.$axios
              .post("user/me", {
                method: "POST",
                data: JSON.stringify(this.User),
                headers: {
                  Authorization:
                    "Bearer " +
                    localStorage.getItem("token").replace(/['"']+/g, ""),
                },
              })
              .then((data) => {
                this.user = data.data;
                this.isLoggedIn = true;               
                
              })
              .catch((err) => console.log(err));
          }
        } catch (error) {
          // return error in production env
          console.log(error, "error from decoding token");
        }
      },
    }

}