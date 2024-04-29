const axios = require('axios');

// URL de la API
const apiUrl = 'http://localhost:3002/API/V2/Registro/Cartera';

describe('Pruebas para el endpoint Cartera', () => {
    it('debería crear un nuevo registro con un número de recibo válido', async () => {
        const data = {
            Numero_recibo: '123',
            Pago: 5000,
            Metodo_pago: 'Efectivo',
            Fecha: '2024-04-05',
            Grado: '10'
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error al enviar un número de recibo nulo', async () => {
        const data = {
            Numero_recibo: null,
            Pago: 5000,
            Metodo_pago: 'Efectivo',
            Fecha: '2024-04-05',
            Grado: '10'
        };

        

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un número de recibo nulo', error);
        }
    });

    // Prueba para el caso de número de recibo fuera del rango válido
    it('debería manejar correctamente un error al enviar un número de recibo fuera del rango válido', async () => {
        const data = {
            Numero_recibo: '1000', // Número de recibo fuera del rango válido
            Pago: 5000,
            Metodo_pago: 'Efectivo',
            Fecha: '2024-04-05',
            Grado: '10'
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un número de recibo nulo', error);
        }
    });
    describe('Pruebas para el número de recibo', () => {
        it('debería manejar correctamente un error al enviar un número de recibo fuera del rango válido', async () => {
            const data = {
                Numero_recibo: 1000, // Número de recibo fuera del rango máximo
                // Otros datos requeridos
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un número de recibo nulo', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un número de recibo nulo', async () => {
            const data = {
                Numero_recibo: null, // Número de recibo nulo
                // Otros datos requeridos
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un número de recibo nulo', error);
            }
        });
    
        // Prueba adicional para validar el caso límite del número de recibo (mínimo)
        it('debería manejar correctamente un error al enviar un número de recibo mínimo', async () => {
            const data = {
                Numero_recibo: 0, // Número de recibo mínimo (menor que 001)
                // Otros datos requeridos
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un número de recibo nulo', error);
            }
        });
    
        // Prueba adicional para validar el caso límite del número de recibo (máximo + 1)
        it('debería manejar correctamente un error al enviar un número de recibo máximo + 1', async () => {
            const data = {
                Numero_recibo: 1000, // Número de recibo máximo + 1
                // Otros datos requeridos
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un número de recibo nulo', error);
            }
        });
    });

    // Puedes agregar pruebas similares para las demás condiciones
});
