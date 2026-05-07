import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import api from 'utils/requests';

type Props = {
  refreshKey: number;
};

type SeriesData = {
  name: string;
  data: number[];
};

type CharData = {
  labels: { categories: string[] };
  series: SeriesData[];
};

const BarChart = ({ refreshKey }: Props) => {
  const [chartData, setChartData] = useState<CharData>({
    labels: { categories: [] },
    series: [{ name: '', data: [] }],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<SaleSuccess[]>('/sales/success-by-seller')
      .then(data => {
        setChartData({
          labels: { categories: data.map(x => x.sellerName) },
          series: [{ name: '% Sucesso', data: data.map(x => round((100.0 * x.deals) / x.visited, 1)) }],
        });
      })
      .catch(() => setError('Não foi possível carregar os dados.'));
  }, [refreshKey]);

  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <Chart
      options={{ plotOptions: { bar: { horizontal: true } }, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
};

export default BarChart;