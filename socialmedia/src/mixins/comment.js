export default {
    computed: {
        getallComments: function () {
             console.log(this.user.id)
            this.$axios.get(`comments/from/:${this.user.id}`,{postId:this.postId}).then((dataComment) => {
                this.allComments = dataComment.data;
                
            });
        }
    }
}