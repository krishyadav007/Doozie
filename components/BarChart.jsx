import { useEffect } from "react";
import * as d3 from "d3";

import useChartDimensions from "../hooks/useChartDimensions";

const marginTop = 30;
const marginBottom = 70;
const marginLeft = 100; // Increased margin for labels
const marginRight = 25;

const BarChart = ({ height, data }) => {
  // Sort data to show top referrers
  const sortedData = data.sort((a, b) => b.count - a.count).slice(0, 10);

  const [ref, dms] = useChartDimensions({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  });
  const width = dms.width;
  const chartBottomY = height - marginBottom;

  // Create the vertical scale and its axis generator.
  const yScale = d3
    .scaleBand()
    .domain(sortedData.map((d) => d.referrer))
    .range([marginTop, chartBottomY])
    .padding(0.1);

  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

  // Create the horizontal scale and its axis generator.
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(sortedData, (d) => d.count)])
    .nice()
    .range([marginLeft, width - marginRight]);

  const xAxis = d3.axisBottom(xScale);

  useEffect(() => {
    d3.select(".x-axis")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px")
      .attr("dy", "0.35em"); // Adjust vertical alignment
    d3.select(".y-axis")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px");

    // Console log the labels
    console.log("X-axis labels:", sortedData.map((d) => d.referrer));
    console.log("Y-axis labels:", sortedData.map((d) => d.count));
  }, [xAxis, yAxis, sortedData]);

  return (
    <div
      ref={ref}
      style={{
        height,
      }}
      className="container"
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="viz"
      >
        <g className="bars">
          {sortedData.map((d) => (
            <rect
              key={d.referrer}
              y={yScale(d.referrer)}
              x={marginLeft}
              height={yScale.bandwidth()}
              width={xScale(d.count) - marginLeft}
              fill="#6baed6"
            />
          ))}
        </g>
        <g className="labels">
          {sortedData.map((d) => (
            <text
              key={d.referrer}
              y={yScale(d.referrer) + yScale.bandwidth() / 2}
              x={xScale(d.count) + 5}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={14}
              style={{ overflow: "visible" }} // Ensure label is fully visible
            >
              {d.count.toLocaleString()}
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
          Count
        </text>
        {/* Y-axis label */}
        <text
          transform={`translate(${marginLeft / 2},${height / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize={16}
        >
          Referrers
        </text>
      </svg>
    </div>
  );
};

export default BarChart;
