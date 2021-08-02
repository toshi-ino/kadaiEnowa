import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import moment from "moment";

const Graph = React.memo(
  ({ resources, element, minY, maxY, intervalY, grdId, colorCode, labelY }) => {
    // console.log("graphの中");
    // console.log(resources);
    const graphData = resources.user.read();
    const dataGraph = graphData["toshiro-20210614"];

    return (
      <React.Fragment>
        <div>
          <svg>
            <defs>
              <linearGradient id={`${grdId}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset={0.5} stop-color={colorCode} stopOpacity={0} />
                <stop offset={0.85} stop-color={colorCode} stopOpacity={0.4} />
                <stop offset={1} stop-color={colorCode} stopOpacity={0.9} />
              </linearGradient>
            </defs>
          </svg>

          <AreaChart
            width={550}
            height={180}
            data={dataGraph}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <XAxis
              style={{ fontSize: 10 }}
              dataKey="timestamp"
              tickFormatter={(t) => moment(t).format("HH:mm")}
              label={{
                value: "時間",
                offset: -7,
                position: "insideBottomRight",
                fontSize: 12,
              }}
              // interval={Math.round(resources.length / 6)}
              interval="preserveStartEnd"
              reversed={true}
            />
            <YAxis
              style={{ fontSize: 12 }}
              type="number"
              domain={[minY, maxY]}
              domainparam
              tickCount={intervalY}
              label={{
                value: `${labelY}`,
                angle: -90,
                position: "insideLeft",
                fontSize: 12,
              }}
            />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Area
              type="monotone"
              dataKey={`${element}`}
              stroke={colorCode}
              fillOpacity={0.55}
              fill={`url(#${grdId})`}
            />
          </AreaChart>
        </div>
      </React.Fragment>
    );
  }
);

export default Graph;
