import React from "react";
import DatePicker from "react-widgets/DatePicker";
import DropdownList from "react-widgets/DropdownList";

const getTermDropDwonList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];

const getTimeList = () => {
  let iterations = 48;
  let result = [];
  for (let i = 0; i < iterations; i++) {
    let hour = Math.floor(i / 2);
    let minute = i % 2 > 0 ? "30" : "00";
    result.push(hour + ":" + minute);
  }
  return result;
};

const SearchBarDayTime = ({
  value,
  setValue,
  // displayTimeList,
  // displayTermlist,
  reqTime,
  setReqTime,
  term,
  setTerm,
}) => {
  return (
    <div className="bars">
      <div className="barInputBaseTime">
        <div className="barInputYearMonthDay">
          <label>日時</label>
          <DatePicker
            defaultValue={new Date()}
            className="w-3/5"
            max={new Date()}
            min={new Date(2021, 5, 21, 0, 0)}
            value={value}
            onSelect={setValue}
            valueFormat={{ dateStyle: "medium" }}
            includeTime
          />
        </div>
        <div className="dropdownTime">
          <label>　</label>　
          <DropdownList
            data={getTimeList}
            textField="label"
            className="w-2/5 mt-0"
            placeholder={`${new Date().getHours()}:${new Date().getMinutes()}`}
            value={reqTime}
            onChange={setReqTime}
          />
        </div>
      </div>
      <div className="barInputTerm">
        <label>表示時間</label>
        <DropdownList
          data={getTermDropDwonList}
          textField="label"
          className="w-2/5 mt-0"
          defaultValue={1}
          value={term}
          onChange={setTerm}
        />
      </div>
    </div>
  );
};

export default SearchBarDayTime;
