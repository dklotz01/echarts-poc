import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface PieChartProps {
  data: any[];
}

export const PieChart = ({ data }: PieChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        series: [
          {
            type: 'pie',
            data: data.map((item) => ({ value: item.value, name: item.label })),
          },
        ],
      });
    }
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{ width: 400, height: 400 }}
    />
  );
};