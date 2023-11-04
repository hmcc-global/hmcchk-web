import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Flex } from '@chakra-ui/react';
import supportContent from './supportContent.json';

const RippleOutBarChart = ({ height, width }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Data from json
    const data = supportContent[1].content[1].data;

    function valueFormatter(input) {
      let res = '';
      if (input >= 1000) {
        res = '$' + input / 1000 + 'M';
      } else {
        res = '$' + input + 'K';
      }

      return res;
    }

    const option = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params) {
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + valueFormatter(tar.value);
        },
      },
      grid: {
        left: '-10%',
        right: '0%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: data.map((bar) => bar.name),
        axisLabel: {
          formatter: function (value) {
            var lines = value.split(' ');
            return lines.join('\n');
          },
          lineHeight: 14,
          interval: 0,
          overflow: 'truncate',
          padding: [10, 0, 0, 0],
          color: '#01375A',
          fontFamily: 'Darker Grotesque',
          fontWeight: 400,
        },
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
            },
          },
          data: data.map((bar, index) => {
            if (index === 0 || index === data.length - 1)
              return {
                value: 0,
              };
            else
              return {
                value: data[index - 1].value,
              };
          }),
        },
        {
          name: 'Cost',
          type: 'bar',
          stack: 'Total',
          z: 2,
          data: data.map((bar, index) => {
            return {
              key: index,
              value:
                index === 0 || index === data.length - 1
                  ? bar.value
                  : bar.value - data[index - 1].value,
              itemStyle: {
                color: bar.color,
                borderRadius:
                  index === 0 || index === data.length - 1
                    ? [4, 4, 0, 0]
                    : [4, 4, 4, 4],
              },
              label: {
                show: true,
                position: 'top',
                formatter: function () {
                  return bar.label;
                },
                color: '#01375A',
                fontSize: 14,
                fontWeight: 400,
                fontFamily: 'Darker Grotesque',
              },
            };
          }),
        },
        ...data.map((line, index) => {
          let finalData = [data[index].value, data[index].value];
          for (let i = 0; i < index; i++) finalData.unshift(null);
          if (index !== data.length - 1)
            return {
              type: 'line',
              data: [...finalData],
              symbol: 'none',
              lineStyle: {
                color: '#C4C4C4',
                width: 1,
              },
              z: 1,
            };
          else return null;
        }),
      ],
    };

    chart.setOption(option);

    window.addEventListener('resize', () => {
      chart.resize();
    });

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <>
      <Flex ref={chartRef} width={width} height={height} />
    </>
  );
};

export default RippleOutBarChart;
