import React, { forwardRef, useState, useImperativeHandle } from 'react';
// TODO-aparedan: Remove this
import { format } from 'date-fns';
import { DateTime } from 'luxon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default forwardRef((props, ref) => {
  // Date Formatting
  // Initialize State
  const dateFromFormat = 'yyyy-MM-dd';
  const dateObj = props.value ? DateTime.fromFormat(props.value, dateFromFormat).toJSDate() : null;
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
          dateString = DateTime.fromJSDate(selectedDate).toFormat(dateFromFormat);
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
        const tempDate =
          props.value && DateTime.fromFormat(props.value, dateFromFormat);
        const dateObj = tempDate && tempDate.toJSDate();
        setSelectedDate(dateObj);
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
