import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Order {
  id: number;
  order_number: string;
  client: string;
  total: number;
  currency: string;
  date: string;
  status: string;
  products_count: number;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/admin/orders')
      .then(res => setOrders(res.data.data || []))
      .catch(e => setErr(e.response?.data?.message || 'Erreur serveur'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleRetry = () => {
    setErr('');
    setLoading(true);
    api.get('/admin/orders')
      .then(res => setOrders(res.data.data || []))
      .catch(e => setErr(e.response?.data?.message || 'Erreur serveur'))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px'
      }}>
        <button 
          onClick={() => setTab(0)}
          style={{
            padding: '10px 20px',
            backgroundColor: tab === 0 ? '#007bff' : '#f8f9fa',
            color: tab === 0 ? 'white' : 'black',
            border: '1px solid #ddd',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Commandes
        </button>
        <button 
          onClick={() => setTab(1)}
          style={{
            padding: '10px 20px',
            backgroundColor: tab === 1 ? '#007bff' : '#f8f9fa',
            color: tab === 1 ? 'white' : 'black',
            border: '1px solid #ddd',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Produits
        </button>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            marginLeft: 'auto'
          }}
        >
          Déconnexion
        </button>
      </nav>

      {/* Contenu des onglets */}
      {tab === 0 && (
        <div>
          <h2>Gestion des Commandes</h2>
          
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Chargement...</p>
            </div>
          )}
          
          {err && (
            <div style={{ 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              padding: '15px', 
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              <p>{err}</p>
              <button 
                onClick={handleRetry}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Réessayer
              </button>
            </div>
          )}
          
          {!loading && !err && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                border: '1px solid #ddd'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Numéro</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Client</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Total</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                        Aucune commande trouvée
                      </td>
                    </tr>
                  ) : orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.order_number}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.client}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {order.total} {order.currency}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {new Date(order.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          backgroundColor: order.status === 'pending' ? '#fff3cd' : 
                                        order.status === 'completed' ? '#d4edda' : '#f8d7da',
                          color: order.status === 'pending' ? '#856404' : 
                                 order.status === 'completed' ? '#155724' : '#721c24'
                        }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {tab === 1 && (
        <div>
          <h2>Gestion des Produits</h2>
          <p>Interface de gestion des produits à implémenter...</p>
        </div>
      )}

      {/* Footer */}
      <footer style={{ 
        marginTop: '40px', 
        paddingTop: '20px', 
        borderTop: '1px solid #ccc',
        textAlign: 'center'
      }}>
        <a href="/" style={{ marginRight: '20px', color: '#007bff', textDecoration: 'none' }}>
          Accueil
        </a>
        <a href="/admin/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
          Dashboard
        </a>
      </footer>
    </div>
  );
} 