import { useEffect, useState } from 'react';
import { SalePage } from 'types/sale';
import { formatLocalDate } from 'utils/format';
import api from 'utils/requests';
import Pagination from '../Pagination';

const DataTable = () => {
  const [activePage, setActivePage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<SalePage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    api.get<SalePage>(`/sales?page=${activePage}&size=20&sort=date,desc`)
      .then(data => {
        setError(null);
        setPage(data);
      })
      .catch(() => setError('Não foi possível carregar as vendas.'));
  }, [activePage]);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map(item => (
              <tr key={item.id}>
                <td>{formatLocalDate(item.date, 'dd/MM/yyyy')}</td>
                <td>{item.seller.name}</td>
                <td>{item.visited}</td>
                <td>{item.deals}</td>
                <td>{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} onPageChange={setActivePage} />
    </>
  );
};

export default DataTable;
