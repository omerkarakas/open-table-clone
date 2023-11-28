"use client";

import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { partySize, times } from "../../../../data";

type Props = { openTime: string; closeTime: string };

const ReservationCard = ({ openTime, closeTime }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimesByRestaurantOpenWindow = () => {
    // return times.filter((time) => time.time >= props.openTime && time.time <= props.closeTime);
    const timesInWindow: typeof times = [];
    let isInWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isInWindow = true;
      }
      if (isInWindow) {
        timesInWindow.push(time);
      }
      if (time.time === closeTime) {
        isInWindow = false;
      }
    });
    return timesInWindow;
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map((ps, index) => (
            <option value={ps.value}>{ps.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <ReactDatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-24"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light">
            {filterTimesByRestaurantOpenWindow().map((time, index) => {
              return <option value={time.time}>{time.displayTime}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
