import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';

import { stackedPrimaryXAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';

let stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 100,
  maximum: 400,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};
const Stacked = ({ stackedCustomSeries, width, height }) => {
  const { currentMode, userDetails } = useStateContext();
  async function getMaximumAmt() {
    const { data } = await axios.post("http://localhost:8000/getMax.php", JSON.stringify({ userID: userDetails?.email }));
    console.log(data)
    stackedPrimaryYAxis = { ...stackedPrimaryYAxis, maximum: (data?.max + 100), minimum: (data?.min - 100) }
  }
  React.useEffect(() => {
    getMaximumAmt();
  }, [])
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <SeriesDirective {...stackedCustomSeries} />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
