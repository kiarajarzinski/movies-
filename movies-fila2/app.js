import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import movieRoutes from './src/routes/movie.routes.js';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
    });
});

