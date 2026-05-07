import { useEffect, useState } from 'react';
import { Sale, SaleForm } from 'types/sale';
import { Seller } from 'types/seller';
import api from 'utils/requests';

type Props = {
  sale: Sale | null;
  onClose: () => void;
  onSaved: () => void;
};

const EMPTY_FORM: SaleForm = {
  sellerId: 0,
  visited: 0,
  deals: 0,
  amount: 0,
  date: '',
};

const SaleModal = ({ sale, onClose, onSaved }: Props) => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [form, setForm] = useState<SaleForm>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get<Seller[]>('/sellers').then(setSellers);
  }, []);

  useEffect(() => {
    if (sale) {
      setForm({
        sellerId: sale.seller.id,
        visited: sale.visited,
        deals: sale.deals,
        amount: sale.amount,
        date: sale.date,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [sale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'date' ? value : Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sellerId) {
      setError('Selecione um vendedor.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      if (sale) {
        await api.put(`/sales/${sale.id}`, form);
      } else {
        await api.post('/sales', form);
      }
      onSaved();
    } catch (err: any) {
      setError(err.message ?? 'Erro ao salvar venda.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered m-0" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{sale ? 'Editar Venda' : 'Nova Venda'}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <p className="text-danger small">{error}</p>}
              <div className="form-group">
                <label>Vendedor</label>
                <select name="sellerId" className="form-control" value={form.sellerId || ''} onChange={handleChange} required>
                  <option value="">Selecione um vendedor</option>
                  {sellers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Data</label>
                <input type="date" name="date" className="form-control" value={form.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Clientes visitados</label>
                <input type="number" name="visited" className="form-control" value={form.visited} onChange={handleChange} min={0} required />
              </div>
              <div className="form-group">
                <label>Negócios fechados</label>
                <input type="number" name="deals" className="form-control" value={form.deals} onChange={handleChange} min={0} required />
              </div>
              <div className="form-group">
                <label>Valor (R$)</label>
                <input type="number" name="amount" className="form-control" value={form.amount} onChange={handleChange} min={0} step="0.01" required />
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

export default SaleModal;