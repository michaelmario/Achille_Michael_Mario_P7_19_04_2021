import moment from "moment";
export default{
    computed:{
formatDate(date) {
    moment.locale();
    let tanggal = moment(date, "YYYY-MM-DD HH:mm:ss").format("LLL");
    return tanggal;
  }
}
}