import axios from "axios";

// var device_name = "toshiro-20210614"
// var hosturl = "https://tbvr25b6a0.execute-api.ap-northeast-1.amazonaws.com/handson"
// var apiurl = hosturl + "/datas/" + device_name

export default axios.create({
baseURL: "https://tbvr25b6a0.execute-api.ap-northeast-1.amazonaws.com/handson/datas/toshiro-20210614",

});
