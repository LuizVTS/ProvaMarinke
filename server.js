const express = require('express');
const { sequelize, Profile, Contract, Job, Deposit } = require('./models');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Sincroniza o banco e inicia o servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
  

/* ENDPOINTS */

// 1. Listar todos os contratos de um Profile (Cliente ou Contratante)
app.get('/profile/:profileId/contracts', async (req, res) => {
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

// 2. Realizar depósito para um Profile
app.post('/profile/:profileId/deposit', async (req, res) => {
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

// 3. Listar todos os jobs não pagos de um contrato
app.get('/contract/:contractId/jobs/unpaid', async (req, res) => {
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


