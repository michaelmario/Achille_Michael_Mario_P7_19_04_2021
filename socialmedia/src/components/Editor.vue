<template>
  <ckeditor v-model="content"></ckeditor>
</template> 
<script>
export default {
  name: "Editor",
  data() {
    return {
      content: {},
    };
  },
  props: {
    value: {
      type: String,
    },
    id: {
      type: String,
      default: "editor",
    },
    height: {
      type: String,
      default: "90px",
    },
    toolbar: {
      type: Array,
      default: () => [
        ["Undo", "Redo"],
        ["Bold", "Italic", "Strike"],
        ["NumberedList", "BulletedList"],
        ["Cut", "Copy", "Paste"],
      ],
    },
    language: {
      type: String,
      default: "fr",
    },
    extraplugins: {
      type: String,
      default: "",
    },
  },
  methods: {
    beforeUpdate() {
      const ckeditorId = this.id;
      if (this.value !== CKEDITOR.instances[ckeditorId].getData()) {
        CKEDITOR.instances[ckeditorId].setData(this.value);
      }
    },

    destroyed() {
      const ckeditorId = this.id;
      if (CKEDITOR.instances[ckeditorId]) {
        CKEDITOR.instances[ckeditorId].destroy();
      }
    },
  },
  mounted() {
    const ckeditorId = this.id;
    console.log(this.value);
    const ckeditorConfig = {
      toolbar: this.toolbar,
      language: this.language,
      height: this.height,
      extraPlugins: this.extraplugins,
      removePlugins: "elementspath",
      resize_enabled: false,
    };
    CKEDITOR.replace(ckeditorId, ckeditorConfig);
    CKEDITOR.instances[ckeditorId].setData(this.value);
    CKEDITOR.instances[ckeditorId].on("change", () => {
      let ckeditorData = CKEDITOR.instances[ckeditorId].getData();
      if (ckeditorData !== this.value) {
        this.$emit("input", ckeditorData);
      }
    });
  },
};
</script>
<style  scoped>
body {
  background-color: #5c4084;
  padding: 50px;
}
.container {
  padding: 40px 80px 15px 80px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 800px;
}
.heading {
  text-align: center;
}
h1 {
  background: -webkit-linear-gradient(#fff, #999);
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 0 0 5px 0;
  font-weight: 900;
  font-size: 4rem;
  color: #fff;
}
h4 {
  color: lighten(#5c3d86, 30%);
  text-align: center;
  margin: 0 0 35px 0;
  font-weight: 400;
  font-size: 24px;
}

.btn {
  outline: none !important;
}
.btn.btn-primary {
  background-color: #5c4084;
  border-color: #5c4084;
  outline: none;
}
/* &:hover {
    background-color: darken($purple, 10%);
    border-color: darken($purple, 10%);
  }
  &:active, &:focus {
    background-color: lighten($purple, 5%);
    border-color: lighten($purple, 5%);
  }
  & .fa {
    padding-right: 4px;
  }
}*/
.label-primary {
  background-color: #5c4084;
}
.form-group {
  margin-bottom: 25px;
}

.ckeditor {
  margin-bottom: 15px;
  width: 100%;
  clear: both;
}
.cke_chrome {
  border: 1px solid #ddd;
  box-shadow: none;
}
.cke_top {
  background-image: none;
  background: #f5f5f5;
  border-color: #ddd;
  box-shadow: none;
}
.cke_bottom {
  background-image: none;
  background: #f5f5f5;
  border-color: #ddd;
  box-shadow: none;
}
.cke_toolgroup {
  background-image: none;
  border-color: #fff;
  background: #fff;
  box-shadow: none;
}
.cke_toolgroup a {
  color: #5c4084;
}
</style>

 
 
 