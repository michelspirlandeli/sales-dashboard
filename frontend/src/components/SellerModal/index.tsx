import { useEffect, useState } from 'react';
import { Seller } from 'types/seller';
import api from 'utils/requests';

type Props = {
  seller: Seller | null;
  onClose: () => void;
  onSaved: () => void;
};

const SellerModal = ({ seller, onClose, onSaved }: Props) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(seller ? seller.name : '');
    setError(null);
  }, [seller]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Informe o nome do vendedor.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      if (seller) {
        await api.put(`/sellers/${seller.id}`, { name });
      } else {
        await api.post('/sellers', { name });
      }
      onSaved();
    } catch (err: any) {
      setError(err.message ?? 'Erro ao salvar vendedor.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered m-0" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{seller ? 'Editar Vendedor' : 'Novo Vendedor'}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <p className="text-danger small">{error}</p>}
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nome do vendedor"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerModal;
