import VueJwtDecode from "jwt-decode";
import axios from 'axios';

 function getUserDetails(){
     let user = {};
     let token = '';
     let isLoggedIn = false
     token = localStorage.getItem("token");
     try {
      let decoded = VueJwtDecode(token);        
       user = decoded;
      if (user) {
        isLoggedIn = true;
        axios.post("http://localhost:3000/api/user/me",{
          method:"POST",
          data:JSON.stringify(user),
           headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token").replace(/['"']+/g, ""),
      },
        })
        .then(data=>{
          console.log(user)
          return user = data.data;
         
        }).catch(err=>console.log(err));
      }
    } catch (error) {
      // return error in production env
      console.log(error, "error from decoding token");
    }
}
export default() =>{
   getUserDetails();
}