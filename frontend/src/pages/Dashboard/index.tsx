import { useState } from 'react';
import BarChart from 'components/BarChart';
import DataTable from 'components/DataTable';
import DonutChart from 'components/DonutChart';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import SaleModal from 'components/SaleModal';
import { Sale } from 'types/sale';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);

  const handleSaved = () => {
    setIsModalOpen(false);
    setEditingSale(null);
    setRefreshKey(k => k + 1);
  };

  const handleEdit = (sale: Sale) => {
    setEditingSale(sale);
    setIsModalOpen(true);
  };

  const handleDeleted = () => {
    setRefreshKey(k => k + 1);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <h1 className="text-primary mb-0">Dashboard de Vendas</h1>
          <button
            className="btn btn-primary"
            onClick={() => { setEditingSale(null); setIsModalOpen(true); }}
          >
            Nova Venda
          </button>
        </div>
        <div className="row px-3">
          <div className="col-sm-6">
            <h5 className="text-center text-secondary">Taxa de sucesso(%)</h5>
            <BarChart refreshKey={refreshKey} />
          </div>
          <div className="col-sm-6">
            <h5 className="text-center text-secondary">Todas Vendas</h5>
            <DonutChart refreshKey={refreshKey} />
          </div>
        </div>
        <div className="py-3">
          <h2 className="text-primary">Todas Vendas</h2>
        </div>
        <DataTable refreshKey={refreshKey} onEdit={handleEdit} onDeleted={handleDeleted} />
      </div>
      {isModalOpen && (
        <SaleModal
          sale={editingSale}
          onClose={() => { setIsModalOpen(false); setEditingSale(null); }}
          onSaved={handleSaved}
        />
      )}
      <Footer />
    </>
  );
};

export default Dashboard;