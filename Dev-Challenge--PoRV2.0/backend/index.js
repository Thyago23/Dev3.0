const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURACIÓN DE MIDDLEWARE OPTIMIZADA ---
// Mantenemos cors() pero especificamos el origen para evitar bloqueos con Vite (5173)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); 

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Factores de Impacto Ambiental
const CO2_SAVINGS_MAP = {
  'Laptop': 300,
  'Smartphone': 60,
  'Tablet': 120,
  'Monitor': 150,
  'Other': 50
};

// --- NUEVAS RUTAS DE USUARIO ---

// RUTA DE REGISTRO (Mantenida intacta)
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password, role]
    );

    res.status(201).json({
      message: "Registro completado exitosamente",
      user: result.rows[0]
    });
  } catch (err) {
    console.error("Error al registrar usuario:", err.message);
    if (err.code === '23505') {
      return res.status(400).json({ error: "Este correo electrónico ya está registrado." });
    }
    res.status(500).json({ error: "Error en el servidor al procesar el registro." });
  }
});

// RUTA DE LOGIN (Añadida para conectar con Login.jsx y validar usuarios)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, name, email, role, password FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      
      // Verificación de contraseña simple (se recomienda usar bcrypt en el futuro)
      if (user.password === password) {
        // No enviamos la contraseña al frontend por seguridad
        const { password, ...userSession } = user;
        res.json({
          success: true,
          user: userSession
        });
      } else {
        res.status(401).json({ error: "Contraseña incorrecta." });
      }
    } else {
      res.status(404).json({ error: "El usuario no existe." });
    }
  } catch (err) {
    console.error("Error en el login:", err.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// --- RUTAS DE REPARACIÓN ORIGINALES (Mantenidas intactas) ---

// 1. Crear un registro de reparación (Lógica de Pasaporte Digital)
app.post('/api/repair', async (req, res) => {
  const { device_id, shop_id, description, category } = req.body;

  try {
    // Vincular o crear dispositivo en la tabla 
    const deviceRes = await pool.query(
      `INSERT INTO devices (model_name, serial_number, category) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (serial_number) DO UPDATE SET category = EXCLUDED.category
       RETURNING id`,
      [category, device_id, category] 
    );

    const actualDeviceUUID = deviceRes.rows[0].id;
    const co2Saved = CO2_SAVINGS_MAP[category] || CO2_SAVINGS_MAP['Other'];

    // Insertar el registro de reparación vinculado al UUID del dispositivo
    const query = `
      INSERT INTO repair_records (device_id, shop_id, description, co2_saved_this_session)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    
    const result = await pool.query(query, [actualDeviceUUID, shop_id, description, co2Saved]);
    
    res.status(201).json({ success: true, record: result.rows[0] });
  } catch (err) {
    console.error("Error en POST /api/repair:", err);
    res.status(500).json({ error: "Error al procesar", details: err.message });
  }
});

// 2. Estadísticas por Categoría (Para el ImpactChart)
app.get('/api/stats/categories', async (req, res) => {
  try {
    const query = `
      SELECT d.category, SUM(r.co2_saved_this_session) as total_co2 
      FROM repair_records r
      JOIN devices d ON r.device_id = d.id
      GROUP BY d.category;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error en stats categorías:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 3. Estadísticas Globales (Para el StatsBanner)
app.get('/api/stats/global', async (req, res) => {
  try {
    const query = `
      SELECT 
        COALESCE(SUM(co2_saved_this_session), 0) as total_co2, 
        COUNT(*) as total_repairs,
        COUNT(DISTINCT device_id) as unique_devices
      FROM repair_records;
    `;
    const result = await pool.query(query);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Verificar certificado único (QR / VerifyPage)
app.get('/api/verify/:record_id', async (req, res) => {
  const { record_id } = req.params;
  try {
    const query = `
      SELECT r.*, d.model_name, d.serial_number, s.name as shop_name
      FROM repair_records r
      LEFT JOIN devices d ON r.device_id = d.id
      LEFT JOIN repair_shops s ON r.shop_id = s.id
      WHERE r.id = $1;
    `;
    const result = await pool.query(query, [record_id]);
    result.rows.length ? res.json(result.rows[0]) : res.status(404).json({ error: "No encontrado" });
  } catch (err) {
    res.status(500).json({ error: "Error de verificación" });
  }
});

// 5. Historial por Serial (Timeline del Pasaporte Digital)
app.get('/api/history/:serial', async (req, res) => {
  const { serial } = req.params;
  try {
    const query = `
      SELECT r.*, s.name as shop_name
      FROM repair_records r
      JOIN devices d ON r.device_id = d.id
      JOIN repair_shops s ON r.shop_id = s.id
      WHERE d.serial_number = $1
      ORDER BY r.repair_date DESC;
    `;
    const result = await pool.query(query, [serial]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de Proof of Repair activo en: http://localhost:${PORT}`);
  console.log(`📡 Escuchando peticiones desde el frontend en: http://localhost:5173`);
});