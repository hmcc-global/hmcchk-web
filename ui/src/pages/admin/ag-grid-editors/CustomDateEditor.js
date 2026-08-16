import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { DateTime } from 'luxon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default forwardRef((props, ref) => {
  const ISOFormatCheck = (dateStr) => {
    const parsedDate = DateTime.fromISO(dateStr);
    return parsedDate.isValid;
  };

  // Date Formatting
  // Initialize State
  // props.value arrives in either format: ISO when it came from the server
  // (dates are persisted with toISO()), or yyyy-MM-dd when the row still holds
  // a value this editor wrote earlier in the session. Handle both here - this
  // is the only place the incoming value is parsed.
  const dateFromFormat = 'yyyy-MM-dd';
  const dateObj = props.value
    ? ISOFormatCheck(props.value)
      ? DateTime.fromISO(props.value).toJSDate()
      : DateTime.fromFormat(props.value, dateFromFormat).toJSDate()
    : null;
  const [selectedDate, setSelectedDate] = useState(dateObj);

  // Styling the input
  const buttonStyle = {
    color: '#000000',
    background: 'transparent',
    borderWidth: '1px',
    borderRadius: '3px',
    borderColor: '#0091EA',
    padding: '5px 20px',
    height: '25px',
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
          dateString =
            DateTime.fromJSDate(selectedDate).toFormat(dateFromFormat);
        }
        return dateString;
      },
      // Nothing was picked, so there is no edit to commit - cancel instead of
      // writing null over the existing value.
      isCancelAfterEnd: () => {
        return !selectedDate;
      },
    };
  });

  return (
    <DatePicker
      customInput={<CustomInput />}
      dateFormat="yyyy-MM-dd"
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
