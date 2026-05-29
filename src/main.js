const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const init = require('./init');
const usuarioRoute = require('./db/routes/usuario.route');
const tagRoute = require('./db/routes/tags.route');
const app = express();
const PORT = process.env.PORT ?? 3001;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Unahur - Anti-Social Net API",
      version: "1.0.0",
      description: "Documentación del MVP de la red Anti-Social",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/swagger.yaml"],
};
const specs = swaggerJsdoc(options);

app.use(express.json());
app.use("/usuarios", usuarioRoute);
app.use("/tags", tagRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, async(err) => {
    if(err){
        console.log(err.message);
        process.exit(1);
    }
    await init();
    console.log(`Aplicación inicializada correctamente en el puerto ${PORT}`);
    console.log("Swagger docs en http://localhost:3001/api-docs");
});