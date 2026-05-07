import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import api from 'utils/requests';

type Props = {
  refreshKey: number;
};

type CharData = {
  labels: string[];
  series: number[];
};

const DonutChart = ({ refreshKey }: Props) => {
  const [chartData, setChartData] = useState<CharData>({ labels: [], series: [] });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<SaleSum[]>('/sales/amount-by-seller')
      .then(data => {
        setChartData({
          labels: data.map(x => x.sellerName),
          series: data.map(x => x.sum),
        });
      })
      .catch(() => setError('Não foi possível carregar os dados.'));
  }, [refreshKey]);

  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <Chart
      options={{ legend: { show: true }, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
};

export default DonutChart;