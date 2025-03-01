"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS, YEARS, getDaysInMonth } from "../constants/dateConstants";

interface BirthdaySelectProps {
  dateInputs: {
    year: number;
    month: number;
    day: number;
  };
  onDateChange: (date: Date) => void;
}

const BirthdaySelect = React.memo<BirthdaySelectProps>(
  ({ dateInputs, onDateChange }) => {
    const handleChange = React.useCallback(
      (type: "year" | "month" | "day", value: string) => {
        const newDate = { ...dateInputs };
        newDate[type] = parseInt(value);

        // 確保日期有效
        const daysInMonth = getDaysInMonth(newDate.year, newDate.month);
        if (newDate.day > daysInMonth) {
          newDate.day = daysInMonth;
        }

        onDateChange(new Date(newDate.year, newDate.month - 1, newDate.day));
      },
      [dateInputs, onDateChange]
    );

    const days = React.useMemo(
      () =>
        Array.from(
          { length: getDaysInMonth(dateInputs.year, dateInputs.month) },
          (_, i) => i + 1
        ),
      [dateInputs.year, dateInputs.month]
    );

    return (
      <div className="grid grid-cols-3 gap-2">
        <Select
          value={dateInputs.year.toString()}
          onValueChange={(value) => handleChange("year", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="年" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}年
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={dateInputs.month.toString()}
          onValueChange={(value) => handleChange("month", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="月" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month) => (
              <SelectItem key={month} value={month.toString()}>
                {month}月
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={dateInputs.day.toString()}
          onValueChange={(value) => handleChange("day", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="日" />
          </SelectTrigger>
          <SelectContent>
            {days.map((day) => (
              <SelectItem key={day} value={day.toString()}>
                {day}日
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

BirthdaySelect.displayName = "BirthdaySelect";

export default BirthdaySelect;
