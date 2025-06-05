import { Request, Response } from 'express';
import { sequelize } from '../config/db';
import { QueryTypes } from 'sequelize';

export class RankingController {

  async getRanking(req: Request, res: Response) {
  try {
    console.log('✅ [BACKEND] Entró a /ranking con período:', req.query.period);

    const { period = 'all' } = req.query;
    let dateFilter = '';
    let periodLabel = 'Todo el Tiempo';

    switch (period) {
      case 'month':
        dateFilter = 'AND uc.obtainedAt >= DATEADD(day, -30, GETDATE())';
        periodLabel = 'Último Mes';
        break;
      case 'quarter':
        dateFilter = 'AND uc.obtainedAt >= DATEADD(day, -90, GETDATE())';
        periodLabel = 'Últimos 3 Meses';
        break;
      case 'year':
        dateFilter = 'AND uc.obtainedAt >= DATEADD(day, -365, GETDATE())';
        periodLabel = 'Último Año';
        break;
      default:
        periodLabel = 'Todo el Tiempo';
        break;
    }

    const query = `
      SELECT 
        u.id as userId,
        u.name as userName,
        COALESCE(COUNT(DISTINCT uc.cardId), 0) as uniqueCards,
        COALESCE(SUM(uc.quantity), 0) as totalCards,
        COALESCE(SUM(
          CASE c.rarity
            WHEN 'Oro' THEN uc.quantity * 5
            WHEN 'Plata' THEN uc.quantity * 3
            WHEN 'Bronce' THEN uc.quantity * 1
            ELSE uc.quantity * 1
          END
        ), 0) as rarityScore,
        COALESCE(SUM(
          CASE WHEN uc.obtainedAt >= DATEADD(day, -30, GETDATE()) 
               THEN uc.quantity 
               ELSE 0 END
        ), 0) as recentActivity,
        (
          COALESCE(COUNT(DISTINCT uc.cardId), 0) * 10 +
          COALESCE(SUM(
            CASE c.rarity
              WHEN 'Oro' THEN uc.quantity * 5
              WHEN 'Plata' THEN uc.quantity * 3
              WHEN 'Bronce' THEN uc.quantity * 1
              ELSE uc.quantity * 1
            END
          ), 0) * 2
        ) as totalScore
      FROM users u
      LEFT JOIN user_collections uc ON u.id = uc.userId ${dateFilter}
      LEFT JOIN cards c ON uc.cardId = c.id
      WHERE u.role = 'user'
      GROUP BY u.id, u.name
      ORDER BY totalScore DESC, uniqueCards DESC, rarityScore DESC
    `;

    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT
    }) as any[];

    const ranking = results.map((result, index) => ({
      userId: result.userId,
      userName: result.userName,
      uniqueCards: result.uniqueCards,
      totalCards: result.totalCards,
      rarityScore: result.rarityScore,
      recentActivity: result.recentActivity,
      totalScore: result.totalScore,
      position: index + 1
    }));

    console.log('📤 [BACKEND] Datos enviados:', {
      period: periodLabel,
      total: ranking.length
    });

    res.json({
      success: true,
      data: {
        period: periodLabel,
        ranking,
        availablePeriods: [
          { label: 'Último Mes', value: 'month' },
          { label: 'Últimos 3 Meses', value: 'quarter' },
          { label: 'Último Año', value: 'year' },
          { label: 'Todo el Tiempo', value: 'all' }
        ]
      }
    });
  } catch (error) {
    console.error('Error al obtener ranking:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener ranking'
    });
  }
}


  async getStats(req: Request, res: Response) {
    try {
      const statsQuery = `
        SELECT 
          (SELECT COUNT(*) FROM users WHERE role = 'user') as totalUsers,
          (SELECT COUNT(*) FROM cards) as totalCards,
          (SELECT COUNT(*) FROM albums) as totalAlbums,
          (SELECT COUNT(*) FROM user_collections) as totalCollections
      `;

      const stats = await sequelize.query(statsQuery, {
        type: QueryTypes.SELECT
      });

      res.json({
        success: true,
        data: stats[0]
      });

    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas'
      });
    }
  }
}