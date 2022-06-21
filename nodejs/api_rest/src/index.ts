import express from 'express';
import jwtAuthenticationMiddleware from './middlewares/jwt-auth';
import errorHandler from './middlewares/errorHandler';
import authRoute from './routes/authorization';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de rotas
app.use(statusRoute);
app.use(authRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

// Configuração dos Handler de erro
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => {
  console.log('listening on port 3000');
})