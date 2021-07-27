const db = require('../database');

const readiness = async (req, res) => {
  try {
    await db.checkReadiness();
    res.json({ ok: true });
  } catch (err) {
    res.status(503).json({ ok: false });
  }
};
const liveness = async (req, res) => {
  try {
    await db.checkReadiness();
    res.json({ ok: true });
  } catch (err) {
    res.status(503).json({ ok: false });
  }
};

module.exports = { liveness, readiness };
