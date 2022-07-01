import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { format } from 'date-fns';
import { DateTime } from 'luxon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default forwardRef((props, ref) => {
  // Date Formatting
  const dateFromFormat = 'dd MMM yyyy';
  const dateToFormat = 'yyyy-MM-dd';
  const birthday = DateTime.fromFormat(props.value, dateFromFormat);
  let tempDate = new Date(birthday.toFormat(dateToFormat));

  // Initialize State
  const [selectedDate, setSelectedDate] = useState(tempDate);

  // Styling the input
  const buttonStyle = {
    color: "#000000",
    background: "transparent",
    borderWidth: "1px",
    borderRadius: "3px",
    borderColor: "#0091EA",
    padding: "5px 20px",
    height: "25px",
  };
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button style={buttonStyle} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        let dateString = null;
        if (selectedDate) {
          dateString = format(selectedDate, dateToFormat);
        }
        return dateString;
      },
      isCancelAfterEnd: () => {
        return !selectedDate;
      },
      afterGuiAttached: () => {
        if (!props.value) {
          return;
        }
        const birthday = DateTime.fromFormat(props.value, dateFromFormat);
        let tempDate = new Date(birthday.toFormat(dateToFormat));
        setSelectedDate(tempDate);
      },
    };
  });

  return (
    <DatePicker
      customInput={<CustomInput />}
      dateFormat="dd MMM yyyy"
      selected={selectedDate}
      onChange={(d) => {
        setSelectedDate(d);
      }}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
});
