const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Fantasy Character Roster',
        description: 'Allows users to find their characters'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);