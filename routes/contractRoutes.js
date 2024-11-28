const express = require('express');
const { Job } = require('../models');

const router = express.Router();

// Listar todos os jobs não pagos de um contrato
router.get('/:contractId/jobs/unpaid', async (req, res) => {
  const { contractId } = req.params;

  try {
    const unpaidJobs = await Job.findAll({
      where: {
        contractId,
        paid: false
      }
    });

    if (unpaidJobs.length === 0) {
      return res.status(404).json({ message: 'Nenhum job não pago encontrado' });
    }

    res.status(200).json(unpaidJobs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar jobs não pagos' });
  }
});

module.exports = router;