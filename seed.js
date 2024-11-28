const { sequelize, Profile, Contract, Job, Deposit } = require('./models');

async function seedDatabase() {
  
  await sequelize.sync({ force: true });

  const profiles = await Profile.bulkCreate([
    {
      firstname: "João",
      lastname: "Silva",
      profession: "Desenvolvedor",
      balance: 1000,
      type: "Cliente"
    },
    {
      firstname: "Maria",
      lastname: "Oliveira",
      profession: "Designer",
      balance: 500,
      type: "Contratante"
    },
    {
      firstname: "Carlos",
      lastname: "Pereira",
      profession: "Gerente de Projetos",
      balance: 1200,
      type: "Cliente"
    },  
    {
      firstname: "Ana",
      lastname: "Souza",
      profession: "Desenvolvedora Frontend",
      balance: 800,
      type: "Contratante"
    }
  ]);

  const contracts = await Contract.bulkCreate([
    {
      terms: "Contrato de desenvolvimento de site",
      clientId: profiles[0].id,
      contractorId: profiles[1].id,  
      operationdate: new Date('2023-01-01'),
      status: "ativo"
    },
    {
      terms: "Contrato de design de logo",
      clientId: profiles[2].id,  
      contractorId: profiles[3].id,  
      operationdate: new Date('2023-02-01'),
      status: "ativo"
    }
  ]);

  await Job.bulkCreate([
    {
      contractId: contracts[0].id,  
      description: "Desenvolver a página inicial",
      operationdate: new Date('2023-01-02'),
      paymentdate: null,
      price: 300.00,
      paid: false
    },
    {
      contractId: contracts[0].id,  
      description: "Implementar o sistema de login",
      operationdate: new Date('2023-01-05'),
      paymentdate: null,
      price: 200.00,
      paid: false
    },
    {
      contractId: contracts[1].id,  
      description: "Criar o logo principal",
      operationdate: new Date('2023-02-02'),
      paymentdate: null,
      price: 150.00,
      paid: false
    }
  ]);

  await Deposit.bulkCreate([
    {
      clientId: profiles[0].id,  
      operationdate: new Date('2023-01-10'),
      depositvalue: 200.00
    },
    {
      clientId: profiles[2].id,  
      operationdate: new Date('2023-02-05'),
      depositvalue: 300.00
    }
  ]);

  console.log('Banco de dados populado com dados de exemplo.');
}

seedDatabase().catch(console.error);