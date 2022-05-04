// import {Chart} from "react-charts"
import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { ResizableBox as ReactResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import useChartConfig from "../utils/useChartConfig";

export default function ChartPage() {
  const { data } = useChartConfig({
    series: 10,
  });

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
        // OR
        // elementType: "area",
      },
    ],
    []
  );

  return (
    <section>
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </section>
  );
}

function ResizableBox({
  children,
  width = 1400,
  height = 700,
  resizable = true,
  style = {},
  className,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  resizable?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div>
      {resizable ? (
        <ReactResizableBox width={width} height={height}>
          <div
            style={{
              ...style,
              width: "100%",
              height: "100%",
            }}
            className={className}
          >
            {children}
          </div>
        </ReactResizableBox>
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            ...style,
          }}
          className={className}
        >
          {children}
        </div>
      )}
    </div>
  );
}
