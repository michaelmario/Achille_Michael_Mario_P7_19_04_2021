<template>
  <div class="landing">
    <div class="imgSocial">
      <div class="w3-card w3-animate-bottom">
        <img
          src="../../public/img/social.jpeg"
          class="w3-image w3-circle w3-opacity-min"
        />
        <div class="w3-container bggray w3-margin-top">
          <h1 class="animation">Venez nous rejoindre</h1>
          <h2 class="animation">
            collaboration connexion et
            <span class="animation">communication</span>
          </h2>
          <h3>est notre devise</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
   mounted() {
    // Défini le titre
    document.title = "Groupomania";
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.landing {
  height: 700px;
  background-image: url("../../public/img/fond.png");
  background-origin: border-box;
  background-size: cover;
  background-position: center;
  width: 100%;
  margin-top: -19px;
  color: #fff;
}
.imgSocial {
  width: 100%;
  height: auto;
  margin:50px auto;
}
.imgSocial img {
  width: 400px;
  height: 400px;
  margin-top: 40px;
}
h3 {
  font-weight: bolder;
}
.bggray {
  background-color: rgba(204, 204, 204, 0.178);
}
.animation {
  font-weight: bolder;
  position: relative;
  animation-name: mainTitle;
  animation-duration: 15s;
  animation-iteration-count: infinite;
}
@keyframes mainTitle {
  10% {
    color: aliceblue;
  }
  50% {
    color: rgb(170, 10, 63);
  }
  100% {
    color: #071c72;
  }
}
</style>
