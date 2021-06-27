import React, { useState } from "react";
import Button from "./components/Button";
import AwsApi from "./apis/AwsApi";
// import Resources from "./components/Resources";
import Graph from "./components/Graph";
import logo from "./logo_v04.png";
import Map from "./components/Map";
import Loading from "./components/Loading";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import moment from 'moment';
import "react-widgets/styles.css";
import "./styles/Style.css";
import SearchBarDayTime from "./components/SearchBar"


const App = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(new Date());
  const [reqTime, setReqTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
  const [term, setTerm] = useState(1);

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


  const postDatas = async () => {

    const params = new URLSearchParams();
    const divReqTime = reqTime.split(":");

    value.setHours(Number(divReqTime[0]));
    value.setMinutes(Number(divReqTime[1]));

    if(value.getTime() > new Date().getTime())　{
        alert("現在の日時よりも過去の値を入力してください");
        return;
    }
    
    params.append('sendBaseTime', new moment(value).format('YYYY-MM-DDTHH:mm:ss'));
    params.append('sendTerm', term);
    // for (let data of params.entries()){
    //     console.log(`${data[0]}: ${data[1]}`);
    // }

    setLoading(true);
    try {
        const datas = await AwsApi.post("/term",params);
        const objNoId = datas.data["toshiro-20210614"];

        if(objNoId.length === 0){alert("指定された期間のデータはありません");};
        setResources(objNoId);
    } catch (err) {
        console.log(err);
    }
    setLoading(false);
  };


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


  const Home = () => {
    return(
        <React.Fragment>
            <body>
                <header>
                    <div className="headerElement">
                        <div className="deviceBtn"><Link to="DeviceInfo">デバイス</Link></div>
                        <div className="logo"><img src={logo} alt="logo" className="logo" /></div>
                    </div>
                </header>

                <div className="barsButton">
                    <SearchBarDayTime
                        value={value}
                        setValue={setValue}
                        displayTimeList={getTimeList()}
                        displayTermlist={getTermDropDwonList}
                        reqTime={reqTime}
                        setReqTime={setReqTime}
                        term={term}
                        setTerm={setTerm}
                    />
                    <Button onClick={postDatas}  />
                </div>
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
            </body>
        </React.Fragment>
    );
  };


    if(loading){
        return (
        <React.Fragment>
            <Loading />
        </React.Fragment>
    );
  };


  return (
    <React.Fragment>
        <BrowserRouter>
            <div>
                <Route exact path='/' component={Home} />
                <Route path='/DeviceInfo' component={DeviceInfo} />
            </div>
        </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
