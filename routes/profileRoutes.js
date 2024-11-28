const express = require('express');
const { Profile, Contract, Deposit } = require('../models');
const Sequelize = require('sequelize');

const router = express.Router();

// Listar todos os contratos de um Profile (Cliente ou Contratante)
router.get('/:profileId/contracts', async (req, res) => {
  const { profileId } = req.params;

  try {
    const contracts = await Contract.findAll({
      where: {
        [Sequelize.Op.or]: [
          { clientId: profileId },
          { contractorId: profileId }
        ]
      },
      include: [
        { model: Profile, as: 'Client' },
        { model: Profile, as: 'Contractor' }
      ]
    });

    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar contratos' });
  }
});

// Realizar depósito para um Profile
router.post('/:profileId/deposit', async (req, res) => {
  const { profileId } = req.params;
  const { depositvalue } = req.body;

  try {
    const profile = await Profile.findByPk(profileId);

    if (!profile) {
      return res.status(404).json({ error: 'Profile não encontrado' });
    }

    // Atualizar saldo
    profile.balance += depositvalue;
    await profile.save();

    // Criar depósito
    const deposit = await Deposit.create({
      clientId: profileId,
      depositvalue,
      operationdate: new Date()
    });

    res.status(201).json(deposit);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar depósito' });
  }
});

module.exports = router;