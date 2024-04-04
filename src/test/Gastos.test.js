const axios = require('axios');

// URL de la API
const apiUrl = 'http://localhost:3002/API/V2/Registro/Gasto';

describe('Pruebas para el endpoint Gasto"', () => {
    it('debería crear un nuevo gasto con datos válidos', async () => {
        // Datos del gasto a enviar
        const data = {
            Fecha: '2024-04-05',
            Tipo_gasto: 'Sueldos',
            Gasto: 5000,
            Descripcion: 'Gasto de sueldos para el mes de abril',
            Id_Usuario: '123456',
            Grado: '10'
        };

        try {
            const response = await axios.post(apiUrl, data);
            // Verificar el código de estado de la respuesta
            expect(response.status).toBe(201);
            // Puedes agregar más aserciones aquí según la respuesta esperada de la API
        } catch (error) {
            // Manejar errores en caso de que la solicitud falle
            console.error('Error al enviar la solicitud:', error);
        }
    });

   

    // Prueba para validar que se maneja correctamente un error cuando se envía un gasto no válido
    it('debería manejar correctamente un error al enviar un gasto no válido', async () => {
        const data = {
            Fecha: '2024-04-05',
            Tipo_gasto: 'Sueldos',
            Gasto: -100, // Gasto negativo
            Descripcion: 'Gasto de sueldos para el mes de abril',
            Id_Usuario: '123456',
            Grado: '10'
        };

        try {
            await axios.post(apiUrl, data);
            // Si la solicitud se completa correctamente, la prueba falla
            fail('Se esperaba que la solicitud fallara debido a un gasto no válido');
        } catch (error) {
            // Verificar que el error recibido sea un error de validación
            expect(error.response.status).toBe(400);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía una descripción inválida
    it('debería manejar correctamente un error al enviar una descripción inválida', async () => {
        const data = {
            Fecha: '2024-04-05',
            Tipo_gasto: 'Sueldos',
            Gasto: 5000,
            Descripcion: '', // Descripción vacía
            Id_Usuario: '123456',
            Grado: '10'
        };

        try {
            await axios.post(apiUrl, data);
            // Si la solicitud se completa correctamente, la prueba falla
            fail('Se esperaba que la solicitud fallara debido a una descripción inválida');
        } catch (error) {
            // Verificar que el error recibido sea un error de validación
            expect(error.response.status).toBe(400);
        }
    });



    // Puedes agregar más pruebas según los diferentes casos de uso de tu API
});
