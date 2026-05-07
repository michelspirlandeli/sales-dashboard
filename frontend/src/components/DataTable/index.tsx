import { useEffect, useState } from 'react';
import { Sale, SalePage } from 'types/sale';
import { formatLocalDate } from 'utils/format';
import api from 'utils/requests';
import Pagination from '../Pagination';

type Props = {
  refreshKey: number;
  onEdit: (sale: Sale) => void;
  onDeleted: () => void;
};

const DataTable = ({ refreshKey, onEdit, onDeleted }: Props) => {
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
    setActivePage(0);
  }, [refreshKey]);

  useEffect(() => {
    api.get<SalePage>(`/sales?page=${activePage}&size=20&sort=date,desc`)
      .then(data => {
        setError(null);
        setPage(data);
      })
      .catch(() => setError('Não foi possível carregar as vendas.'));
  }, [activePage, refreshKey]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Confirma a exclusão desta venda?')) return;
    try {
      await api.delete(`/sales/${id}`);
      onDeleted();
    } catch {
      alert('Não foi possível excluir a venda.');
    }
  };

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
              <th></th>
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
                <td style={{ whiteSpace: 'nowrap' }}>
                  <button className="btn btn-sm btn-outline-primary mr-1" onClick={() => onEdit(item)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>Excluir</button>
                </td>
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