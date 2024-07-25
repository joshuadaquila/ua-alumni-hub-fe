import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function PieChartEvents({ happening, future, past }) {
  const data = [
    { label: 'Happening', value: happening, color: '#0088FE' },
    { label: 'Future', value: future, color: '#00C49F' },
    { label: 'Past', value: past, color: '#FFBB28' },
  ];

  const TOTAL = data.reduce((acc, item) => acc + item.value, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  const sizing = {
    margin: { right: 5 },
    width: 500,
    height: 500,
    legend: { hidden: true },
  };

  return (
    <PieChart
      series={[
        {
          outerRadius: 200,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
