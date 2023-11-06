import React from 'react';
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts';

class SparkLine extends React.PureComponent {
  render() {
    const { id, height, width, color, data, type, currentColor } = this.props;
    if (data?.length)
      return (
        <SparklineComponent
          id={id}
          height={height}
          width={width}
          lineWidth={1}
          valueType="Category"
          fill={color}
          border={{ color: currentColor, width: 2 }}
          tooltipSettings={{
            visible: true,
            // eslint-disable-next-line no-template-curly-in-string
            format: '${x} : expenditure ${yval}',
            trackLineSettings: {
              visible: true,
            },
          }}
          markerSettings={{ visible: ['All'], size: 2.5, fill: currentColor }}
          dataSource={data}
          xName="x"
          yName="yval"
          type={type}
        >
          <Inject services={[SparklineTooltip]} />
        </SparklineComponent>
      );
    return <h1>No Data</h1>
  }
}

export default SparkLine;
