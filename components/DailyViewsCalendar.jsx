import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const DailyViewsCalendar = ({ data }) => {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  // Map data to the format required by react-calendar-heatmap
  const heatmapData = data.map((item) => ({
    date: item.date,
    count: item.views,
  }));

  return (
    <div className="calendar-heatmap">
      <style jsx>{`
        .color-empty {
          fill:rgb(255, 255, 255);
        }
        .color-scale-1 {
          fill: #c6e48b;
        }
        .color-scale-2 {
          fill: #7bc96f;
        }
        .color-scale-3 {
          fill: #239a3b;
        }
        .color-scale-4 {
          fill: #196127;
        }
      `}</style>
      <CalendarHeatmap
        startDate={lastYear}
        endDate={today}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': value.date
              ? `${value.date}: ${value.count} views`
              : 'No views',
            'class': 'custom-tooltip'
          };
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default DailyViewsCalendar;