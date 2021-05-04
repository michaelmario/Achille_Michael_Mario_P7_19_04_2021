export default {
    computed: {
        getallPosts: function () {
            this.$axios.get("post/").then((dataPost) => {
                this.allPosts = dataPost.data;
            });
        }
    }
}