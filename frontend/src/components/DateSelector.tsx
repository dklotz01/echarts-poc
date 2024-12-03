import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date | null) => void;
  minDate: Date;
  maxDate: Date;
}

export const DateSelector = ({ selectedDate, onDateChange, minDate, maxDate }: DateSelectorProps) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Date</h2>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="MMMM d, yyyy"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};
