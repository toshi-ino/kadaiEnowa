import React  from "react";
import DatePicker from "react-widgets/DatePicker";
import DropdownList from "react-widgets/DropdownList";


const SearchBarDayTime = ({
    value,
    setValue,
    displayTimeList,
    displayTermlist,
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
                                min={new Date(2021, 5, 21,0,0)}
                                value={value}
                                onSelect={setValue}
                                valueFormat={{ dateStyle: "medium"}}
                                includeTime
                            />
                    </div>
                    <div className="dropdownTime">
                        <label>　</label>　
                            <DropdownList
                                data={displayTimeList}
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
                        data={displayTermlist}
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