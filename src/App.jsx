import React, { useState, Suspense } from "react";
import Button from "./components/Button";
import ButtonDitailConditon from "./components/ButtonDitailConditon";
import ButtonDitailConditonSearch from "./components/ButtonDitailConditonSearch";
// import AwsApi from "./apis/AwsApi";
import Graph from "./components/Graph";
import logo from "./logo_v04.png";
import Map from "./components/Map";
import Loading from "./components/Loading";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import moment from 'moment';
import "react-widgets/styles.css";
import "./styles/Style.css";
import DatePicker from "react-widgets/DatePicker";
import DropdownList from "react-widgets/DropdownList";
import axios from "axios";
import { fetchData } from "./Api";


const resourceInit = fetchData();


const App = () => {
  const [resources, setResources] = useState(resourceInit);


  const postDatas = ({valueDate, reqTime, valueDateEnd, reqTimeEnd}) => {

    if(reqTime.length === 0)　{
      alert("開始時間を入力してください");
      return;
    }

    if(reqTimeEnd.length === 0)　{
      alert("終了時間を入力してください");
      return;
    }

    const params = new URLSearchParams();
    const divReqTime = reqTime.split(":");
    const divReqTimeEnd = reqTimeEnd.split(":");

    valueDate.setHours(Number(divReqTime[0]));
    valueDate.setMinutes(Number(divReqTime[1]));
    valueDateEnd.setHours(Number(divReqTimeEnd[0]));
    valueDateEnd.setMinutes(Number(divReqTimeEnd[1]));

    if(valueDate.getTime() >= valueDateEnd.getTime())　{
      alert("開始日時は終了日時より過去の値を入力してください");
      return;
    }

    if(valueDateEnd.getTime() > new Date().getTime())　{
        alert("終了日時には現在の日時よりも過去の値を入力してください");
        return;
    }

    params.append('sendBaseTime', new moment(valueDate).format('YYYY-MM-DDTHH:mm:ss'));
    params.append('sendTimeEnd', new moment(valueDateEnd).format('YYYY-MM-DDTHH:mm:ss'));
    // params.append('sendTerm', term);
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


  const getDatasThreeHour = () => {
    const userPromise = axios
    .get("https://tbvr25b6a0.execute-api.ap-northeast-1.amazonaws.com/handson/datas/toshiro-20210614/threehour")
    .then((res) => res.data)
    .catch((err) => console.log(err));

    const datas = {
        user: wrapPromise(userPromise),
    }
    setResources(datas);
  };

  const getDatasTwelveHour = () => {
    const userPromise = axios
    .get("https://tbvr25b6a0.execute-api.ap-northeast-1.amazonaws.com/handson/datas/toshiro-20210614/twelvehour")
    .then((res) => res.data)
    .catch((err) => console.log(err));

    const datas = {
        user: wrapPromise(userPromise),
    }
    setResources(datas);
  };

  const getDatasOneDay = () => {
    const userPromise = axios
    .get("https://tbvr25b6a0.execute-api.ap-northeast-1.amazonaws.com/handson/datas/toshiro-20210614/oneday")
    .then((res) => res.data)
    .catch((err) => console.log(err));

    const datas = {
        user: wrapPromise(userPromise),
    }
    setResources(datas);
  };

  const getDatasThreeDay = () => {
    const userPromise = axios
    .get("https://tbvr25b6a0.execute-api.ap-northeast-1.amazonaws.com/handson/datas/toshiro-20210614/threeday")
    .then((res) => res.data)
    .catch((err) => console.log(err));

    const datas = {
        user: wrapPromise(userPromise),
    }
    setResources(datas);
  };


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
        if(hour < 10){
          result.push('0' + hour + ':' + minute);
        }else{
          result.push(hour + ':' + minute);  
        }
    }
    return result;
  }

  const Home = () => {

    const [valueDate, setValueDate] = useState(new Date());
    const [valueDateEnd, setValueDateEnd] = useState(new Date());
    // const [reqTime, setReqTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
    const [reqTime, setReqTime] = useState([])
    const [reqTimeEnd, setReqTimeEnd] = useState([])
    const [isOpened, setIsOpened] = useState(false);
 
    // console.log("Home頭あたま");
    // console.log(`valueDate: ${valueDate}`);
    // console.log(`reqTime: ${reqTime}`);

    const displayInputBar =()=>{
      setIsOpened(wasOpened => !wasOpened);
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

                <Button 
                  getDatasThreeHour={()=>getDatasThreeHour()}
                  getDatasTwelveHour={()=>getDatasTwelveHour()}
                  getDatasOneDay={()=>getDatasOneDay()}
                  getDatasThreeDay={()=>getDatasThreeDay()}  
                />
                <div class="btnDitailCondition" >
                  <ButtonDitailConditon onClick={displayInputBar}　/>
                </div>

                {isOpened && (
                <div id="view" >
                    <div className="barsButton">
                        <div className="bars">
                            <div className="barInputBaseTime">
                                <div className="barInputYearMonthDay">
                                    <label for="datePikerStart" >開始日</label>
                                    <DatePicker id="datePikerStart"
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
                                    <label for="dropDownListStart">開始時間</label>　
                                        <DropdownList id="dropDownListStart"
                                            data={getTimeList()}
                                            textField="label"
                                            className="w-2/5 mt-0"
                                            placeholder={`${new Date().getHours()}:${new Date().getMinutes()}`}
                                            value={reqTime}
                                            onSelect={setReqTime}
                                        />
                                </div>
                            </div>
                            <div className="barInputBaseTime">
                                <div className="barInputYearMonthDay">
                                    <label for="datePikerEnd ">終了日</label>
                                    <DatePicker id="datePikerEnd"
                                        defaultValue={new Date()}
                                        className="w-3/5"
                                        max={new Date()}
                                        min={new Date(2021, 5, 21,0,0)}
                                        value={valueDateEnd}
                                        onSelect={setValueDateEnd}
                                        valueFormat={{ dateStyle: "medium"}}
                                    />
                                </div>
                                <div className="dropdownTime">
                                    <label for="dropDownListEnd">終了時間</label>　
                                        <DropdownList id="dropDownListEnd"
                                            data={getTimeList()}
                                            textField="label"
                                            className="w-2/5 mt-0"
                                            placeholder={`${new Date().getHours()}:${new Date().getMinutes()}`}
                                            value={reqTimeEnd}
                                            onSelect={setReqTimeEnd}
                                        />
                                </div>
                            </div>
                        </div>
                        <div class="btnDitailConditonSearch">
                          <ButtonDitailConditonSearch onClick={()=>postDatas({valueDate, reqTime, valueDateEnd, reqTimeEnd})} />
                        </div>
                    </div>
                </div>
                )}


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