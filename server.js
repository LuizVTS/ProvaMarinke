const express = require('express');
const { sequelize } = require('./models');
const profileRoutes = require('./routes/profileRoutes');
const contractRoutes = require('./routes/contractRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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

app.use('/profile', profileRoutes);
app.use('/contract', contractRoutes);


