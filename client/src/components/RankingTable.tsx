import React, { useState, useEffect } from 'react';
import { rankingService, RankingEntry } from '../services/rankingService';

export const RankingTable: React.FC = () => {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState('all');
  const [periodLabel, setPeriodLabel] = useState('Todo el Tiempo');
  const [isLoading, setIsLoading] = useState(true);

  const periods = [
    { label: 'Último Mes', value: 'month' },
    { label: 'Últimos 3 Meses', value: 'quarter' },
    { label: 'Último Año', value: 'year' },
    { label: 'Todo el Tiempo', value: 'all' }
  ];

  useEffect(() => {
    loadRanking();
    console.log('📤 [FRONTEND] Pidiendo ranking con período:', currentPeriod);
  }, [currentPeriod]);

  const loadRanking = async () => {
  try {
    console.log('📤 [FRONTEND] Pidiendo ranking con período:', currentPeriod);
    setIsLoading(true);
    const data = await rankingService.getRanking(currentPeriod);

    console.log('📥 [FRONTEND] DATA RECIBIDA:', data);

    setRanking(data.ranking);
    setPeriodLabel(data.period);
  } catch (error: any) {
    console.error('❌ [FRONTEND] Error al cargar ranking:', error);
  } finally {
    setIsLoading(false);
  }
};

  const getRankingIcon = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${position}`;
    }
  };

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando ranking...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0 }}>🏆 Ranking de Coleccionistas - {periodLabel}</h2>
        
        <div>
          <label style={{ marginRight: '10px' }}>Período: </label>
          <select 
            value={currentPeriod} 
            onChange={(e) => setCurrentPeriod(e.target.value)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '6px', 
              border: '2px solid #e1e5e9',
              fontSize: '14px'
            }}
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #e9ecef' }}>Posición</th>
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Usuario</th>
            <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #e9ecef' }}>Cartas Únicas</th>
            <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #e9ecef' }}>Total Cartas</th>
            <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #e9ecef' }}>Score Rareza</th>
            <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #e9ecef' }}>Actividad Reciente</th>
            <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #e9ecef' }}>Score Total</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((entry, index) => (
            <tr key={entry.userId} style={{
              backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
              borderBottom: '1px solid #e9ecef'
            }}>
              <td style={{ padding: '15px', textAlign: 'center', fontSize: '18px' }}>
                {getRankingIcon(entry.position)}
              </td>
              <td style={{ padding: '15px', fontWeight: '500' }}>
                {entry.userName}
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                {entry.uniqueCards}
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                {entry.totalCards}
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                {entry.rarityScore}
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                {entry.recentActivity > 0 ? (
                  <span style={{ 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    +{entry.recentActivity}
                  </span>
                ) : '0'}
              </td>
              <td style={{ 
                padding: '15px', 
                textAlign: 'center', 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                {entry.totalScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ranking.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p>No hay datos de ranking para este período.</p>
        </div>
      )}
    </div>
  );
};