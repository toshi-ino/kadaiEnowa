import React, { useState, lazy, Suspense } from "react";
import Button from "./components/Button";
import ButtonDisplayInputBar from "./components/ButtonDisplayInputBar";
import AwsApi from "./apis/AwsApi";
import Graph from "./components/Graph";
import logo from "./logo_v04.png";
import Map from "./components/Map";
import Loading from "./components/Loading";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import moment from 'moment';
import "react-widgets/styles.css";
import "./styles/Style.css";
// import SearchBarDayTime from "./components/SearchBar"
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import DatePicker from "react-widgets/DatePicker";
import DropdownList from "react-widgets/DropdownList";
import axios from "axios";
import { fetchData } from "./Api";


const resourceInit = fetchData();


const App = () => {
  const [resources, setResources] = useState(resourceInit);
  const [loading, setLoading] = useState(false);
//   const [valueDate, setValueDate] = useState(new Date());
//   const [value, setValue] = useState(new Date());
//   const [reqTime, setReqTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
//   const [term, setTerm] = useState(1);


//   const getDatasHarfHour = async () => {
//     setLoading(true);
//     try {
//         const datas = await AwsApi.get();
//         // const str = JSON.stringify(posts.data);
//         // const obj = JSON.parse(str);
//         // const objNoId = posts.data["toshiro-20210614"];
//         const objNoId = datas.data[process.env.REACT_APP_DEVICE_NAME];
//         setResources(objNoId);
//     } catch (err) {
//         console.log(err);
//     }
//     setLoading(false);
//   };



  const postDatas = ({valueDate,reqTime, term}) => {

    const params = new URLSearchParams();
    const divReqTime = reqTime.split(":");

    console.log(valueDate);
    console.log(reqTime);

    valueDate.setHours(Number(divReqTime[0]));
    valueDate.setMinutes(Number(divReqTime[1]));

    if(valueDate.getTime() > new Date().getTime())　{
        alert("現在の日時よりも過去の値を入力してください");
        return;
    }
    console.log(valueDate);

    params.append('sendBaseTime', new moment(valueDate).format('YYYY-MM-DDTHH:mm:ss'));
    params.append('sendTerm', term);
    for (let data of params.entries()){
        console.log(`${data[0]}: ${data[1]}`);
    }

    const userPromise = axios
    .post("https://tbvr25b6a0.execute-api.ap-northeast-1.amazonaws.com/handson/datas/toshiro-20210614/term", params)
    .then((res) => res.data)
    .catch((err) => console.log(err));

    const datas = {
        user: wrapPromise(userPromise),
    }

    setResources(datas);

  };


//   const getDatas = ({valueDate,reqTime, term}) => {

//     const userPromise = axios
//     .get("https://tbvr25b6a0.execute-api.ap-northeast-1.amazonaws.com/handson/datas/toshiro-20210614/threehour")
//     .then((res) => res.data)
//     .catch((err) => console.log(err));

//     const datas = {
//         user: wrapPromise(userPromise),
//     }

//     setResources(datas);

//   };


  const wrapPromise = (promise) => {
    let status = "pending";
    let result;
    let suspender = promise.then(
      (res) => {
        status = "success";
        result = res;
      },
      (err) => {
        status = "error";
        result = err;
      }
    );
  
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      },
    };
  };


//   const postDatas = ({valueDate,reqTime, term}) => {

//     const params = new URLSearchParams();
//     const divReqTime = reqTime.split(":");

//     console.log(valueDate);
//     console.log(reqTime);

//     valueDate.setHours(Number(divReqTime[0]));
//     valueDate.setMinutes(Number(divReqTime[1]));

//     // if(valueDate.getTime() > new Date().getTime())　{
//     //     alert("現在の日時よりも過去の値を入力してください");
//     //     return;
//     // }
//     console.log(valueDate);

//     params.append('sendBaseTime', new moment(valueDate).format('YYYY-MM-DDTHH:mm:ss'));
//     params.append('sendTerm', term);
//     for (let data of params.entries()){
//         console.log(`${data[0]}: ${data[1]}`);
//     }

//     setLoading(true);
//     try {
//         const datas = AwsApi.post("/term",params);
//         const objNoId = datas.data["toshiro-20210614"];

//         if(objNoId.length === 0){alert("指定された期間のデータはありません");};
//         setResources(objNoId);

//     } catch (err) {
//         console.log(err);
//     }
//   };



  const MapStyle = {
    width: "500px",
    height: "300px",
  };

  const center = {
    lat: 36.9570268,
    lng: 137.5520313
  };


  const DeviceInfo = () => {
    return(
        <React.Fragment>
            <header>
                <div class="headerElement">
                    <div class="deviceBtn"><Link to="/">ホーム</Link></div>
                    <div class="logo"><img src={logo} alt="logo" className="logo" /></div>
                </div>
            </header>

            <div className="map">
                <Map center={center} MapStyle={MapStyle} />
            </div>
        </React.Fragment>
    );
  };


  const getTimeList = () => {
    let iterations = 48;
    let result = [];
    for(let i = 0; i < iterations; i++) {
        let hour = Math.floor(i / 2);
        let minute = (i % 2) > 0 ? '30' : '00';
        result.push(hour + ':' + minute);
    }
    return result;
  }

  const getTermDropDwonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24];

//   const displayInputBar =({displayValue,setDisplayValue})=>{
//     alert(displayValue);
//     // if(displayValue === "hidden"){
//     //     setDisplayValue("visible")
//     //     console.log(displayValue);
//     //     console.log("hidenの方");
//     // }else{
//     //     setDisplayValue("hidden")
//     //     console.log(displayValue);
//     // }
//   };

//   const [displayValue, setDisplayValue] = useState("hidden");

  const Home = () => {

    const [valueDate, setValueDate] = useState(new Date());
    const [reqTime, setReqTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
    const [term, setTerm] = useState(1);
    // const [displayValue, setDisplayValue] = useState("hidden");
    const [displayValue, setDisplayValue] = useState("visible");
 
    console.log("Home頭あたま");
    console.log(`valueDate: ${valueDate}`);
    console.log(`reqTime: ${reqTime}`);
    console.log(`term: ${term}`);


    const displayInputBar =({displayValue,setDisplayValue})=>{
        alert(displayValue);
        // if(displayValue === "hidden"){
        //     setDisplayValue("visible")
        //     console.log(displayValue);
        //     console.log("hidenの方");
        // }else{
        //     setDisplayValue("hidden")
        //     console.log(displayValue);
        // }
      };


    return(
        <React.Fragment>
            <body>
                <header>
                    <div className="headerElement">
                        <div className="deviceBtn"><Link to="DeviceInfo">デバイス</Link></div>
                        <div className="logo"><img src={logo} alt="logo" className="logo" /></div>
                    </div>
                </header>

                <Button onClick={()=>postDatas({valueDate, reqTime, term})}  />
                {/* <ButtonDisplayInputBar onClick={()=>displayInputBar({displayValue,setDisplayValue})}  /> */}


                <div id="view" style={{visibility: `${displayValue}`}}>
                    <div className="barsButton">
                        <div className="bars">
                            <div className="barInputBaseTime">
                                <div className="barInputYearMonthDay">
                                    <label>日時</label>
                                    <DatePicker
                                        defaultValue={new Date()}
                                        className="w-3/5"
                                        max={new Date()}
                                        min={new Date(2021, 5, 21,0,0)}
                                        value={valueDate}
                                        onSelect={setValueDate}
                                        valueFormat={{ dateStyle: "medium"}}
                                    />
                                </div>
                                <div className="dropdownTime">
                                    <label>　</label>　
                                        <DropdownList
                                            data={getTimeList()}
                                            textField="label"
                                            className="w-2/5 mt-0"
                                            placeholder={`${new Date().getHours()}:${new Date().getMinutes()}`}
                                            value={reqTime}
                                            onSelect={setReqTime}
                                        />
                                </div>
                            </div>
                            <div className="barInputTerm" >
                                <label>表示時間</label>
                                <DropdownList
                                    data={getTermDropDwonList}
                                    textField="label"
                                    className="w-2/5 mt-0"
                                    defaultValue={1}
                                    value={term}
                                    onSelect={setTerm}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <Suspense fallback={<Loading />}>
                    <div className="graphConteiner">
                        <div className="graphGroup1">
                            <div className="graph"><Graph resources={resources} element="temp" minY={0} maxY={50} intervalY={6} grdId="grdTmep" colorCode="#C31932" labelY="温度　℃" /></div>
                            <div className="graph"><Graph resources={resources} element="humi" minY={0} maxY={100} intervalY={6} grdId="grdHumi" colorCode="#149619" labelY="湿度　%" /></div>
                        </div>
                        <div className="graphGroup2">
                            <div className="graph"><Graph resources={resources} element="CO2" minY={250} maxY={350} intervalY={6} grdId="grdCo2" colorCode="#A0A014" labelY="CO2　mL"/></div>
                            <div className="graph"><Graph resources={resources} element="pF" minY={0} maxY={50} intervalY={6} grdId="grdHPf" colorCode="#C846D2" labelY="土壌水分 pF" /></div>
                        </div>
                    </div>
                </Suspense>


            </body>


        </React.Fragment>
    );
  };


//     if(loading){
//         return (
//         <React.Fragment>
//             <Loading />
//         </React.Fragment>
//     );
//   };


  return (
    <React.Fragment>
        <BrowserRouter>
            <div>
                <Route exact path='/' component={Home} />
                <Route path='/DeviceInfo' component={DeviceInfo} />
                {/* <AmplifySignOut /> */}
            </div>
        </BrowserRouter>
    </React.Fragment>
  );
};

export default App;