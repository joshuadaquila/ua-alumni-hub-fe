import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function CivilStatus({ single, married, separated, singleparent, widow }) {
  const data = [
    { label: 'Single', value: single, color: '#0088FE' },
    { label: 'Married', value: married, color: '#00C49F' },
    { label: 'Separated', value: separated, color: '#FFBB28' },
    { label: 'Single Parent', value: singleparent, color: '#FF8042' },
    { label: 'Widow', value: widow, color: '#FF6384' },
  ];

  const TOTAL = data.reduce((acc, item) => acc + item.value, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${params.label}: ${(percent * 100).toFixed(0)}%`;
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
