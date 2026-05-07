import { useEffect, useState } from 'react';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import SellerModal from 'components/SellerModal';
import { Seller } from 'types/seller';
import api from 'utils/requests';

const Sellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);

  const loadSellers = () => {
    api.get<Seller[]>('/sellers')
      .then(data => {
        setError(null);
        setSellers(data);
      })
      .catch(() => setError('Não foi possível carregar os vendedores.'));
  };

  useEffect(() => {
    loadSellers();
  }, []);

  const handleSaved = () => {
    setIsModalOpen(false);
    setEditingSeller(null);
    loadSellers();
  };

  const handleEdit = (seller: Seller) => {
    setEditingSeller(seller);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Confirma a exclusão deste vendedor?')) return;
    try {
      await api.delete(`/sellers/${id}`);
      loadSellers();
    } catch {
      alert('Não foi possível excluir o vendedor.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <h1 className="text-primary mb-0">Vendedores</h1>
          <button
            className="btn btn-primary"
            onClick={() => { setEditingSeller(null); setIsModalOpen(true); }}
          >
            Novo Vendedor
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sellers.map(seller => (
                <tr key={seller.id}>
                  <td>{seller.id}</td>
                  <td>{seller.name}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button className="btn btn-sm btn-outline-primary mr-1" onClick={() => handleEdit(seller)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(seller.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <SellerModal
          seller={editingSeller}
          onClose={() => { setIsModalOpen(false); setEditingSeller(null); }}
          onSaved={handleSaved}
        />
      )}
      <Footer />
    </>
  );
};

export default Sellers;
