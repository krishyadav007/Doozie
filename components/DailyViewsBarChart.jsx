import { useEffect, useRef } from "react";
import * as d3 from "d3";

import useChartDimensions from "../hooks/useChartDimensions";

const marginTop = 30;
const marginBottom = 100;
const marginLeft = 75;
const marginRight = 25;

const DailyViewsBarChart = ({ height, data }) => {
  // Generate the last 7 days
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }).reverse();

  // Map data to the last 7 days, filling missing days with zero
  const mappedData = last7Days.map((date) => {
    const entry = data.find((d) => new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) === date);
    return {
      date,
      views: entry ? entry.views : 0,
    };
  });

  const [ref, dms] = useChartDimensions({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  });
  const width = dms.width || 800; // Default width if dms.width is not available
  const chartBottomY = height - marginBottom;

  // Create the horizontal scale and its axis generator.
  const xScale = d3
    .scaleBand()
    .domain(mappedData.map((d) => d.date))
    .range([marginLeft, width - marginRight])
    .padding(0.3); // Make bars thinner

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  // Create the vertical scale and its axis generator.
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(mappedData, (d) => d.views)])
    .nice()
    .range([chartBottomY, marginTop]);

  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    d3.select(".x-axis")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px");
    d3.select(".y-axis")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px");
  }, [xAxis, yAxis]);

  return (
    <div
      ref={ref}
      className="container w-full"
      style={{
        height,
      }}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="viz"
      >
        <g className="bars">
          {mappedData.map((d) => (
            <rect
              key={d.date}
              x={xScale(d.date)}
              y={yScale(d.views)}
              height={chartBottomY - yScale(d.views)}
              width={xScale.bandwidth()}
              fill="#DCFCE7"
              rx={5} // Rounded edges
              ry={5} // Rounded edges
            />
          ))}
        </g>
        <g className="labels">
          {mappedData.map((d) => (
            <text
              key={d.date}
              x={xScale(d.date) + xScale.bandwidth() / 2}
              y={yScale(d.views) - 5}
              textAnchor="middle"
              fontSize={14}
            >
              {chartBottomY - yScale(d.views) > 20 ? d.views.toLocaleString() : ""}
            </text>
          ))}
        </g>
        <g className="x-axis" transform={`translate(0,${chartBottomY})`}></g>
        <g className="y-axis" transform={`translate(${marginLeft},0)`}></g>
        {/* X-axis label */}
        <text
          transform={`translate(${width / 2},${height - marginBottom / 2})`}
          textAnchor="middle"
          fontSize={16}
        >
          Date
        </text>
        {/* Y-axis label */}
        <text
          transform={`translate(${marginLeft / 2},${height / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize={16}
        >
          Views
        </text>
      </svg>
    </div>
  );
};

export default DailyViewsBarChart;
