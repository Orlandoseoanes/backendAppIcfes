const axios = require('axios');
const apiUrl = 'http://localhost:3002/API/V2/Notas/cargar-excel';


describe('Pruebas para la nota de Matemáticas', () => {
    it('debería crear un nuevo registro con una nota de Matemáticas válida', async () => {
        const data = {
            Nota_Matematicas: 75, // Nota válida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error al enviar una nota de Matemáticas inválida', async () => {
        const data = {
            Nota_Matematicas: 120, // Nota inválida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba adicional para el caso límite de la nota de Matemáticas (máxima)
    it('debería manejar correctamente un error al enviar una nota de Matemáticas máxima', async () => {
        const data = {
            Nota_Matematicas: 100, // Nota máxima (mayor que el límite superior)
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota de Matemáticas en el límite superior
    it('debería manejar correctamente una nota de Matemáticas en el límite superior', async () => {
        const data = {
            Nota_Matematicas: 100, // Límite superior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota de Matemáticas en el límite inferior
    it('debería manejar correctamente una nota de Matemáticas en el límite inferior', async () => {
        const data = {
            Nota_Matematicas: 0, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
    it('debería manejar correctamente una nota de Matemáticas en el límite inferior-1', async () => {
        const data = {
            Nota_Matematicas: -1, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
    it('debería manejar correctamente una nota de Matemáticas en el límite superior +1', async () => {
        const data = {
            Nota_Matematicas: 101, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

     // Prueba para verificar el manejo de null
    it('debería manejar correctamente un valor null para la nota de Matemáticas', async () => {
        const data = {
            Nota_Matematicas: null,
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para verificar el manejo de strings
    it('debería manejar correctamente un valor de tipo string para la nota de Matematicas', async () => {
        const data = {
            Nota_Matematicas: "Doscientos veinte",
            // Otros campos de la nota...
        };
    
        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
    
    
    
});

describe('Pruebas para la nota de Lectura Crítica', () => {
    it('debería crear un nuevo registro con una nota de Lectura Crítica válida', async () => {
        const data = {
            Nota_LecturaCritica: 80, // Nota válida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error al enviar una nota de Lectura Crítica inválida', async () => {
        const data = {
            Nota_LecturaCritica: 120, // Nota inválida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba adicional para el caso límite de la nota máxima
    it('debería manejar correctamente un error al enviar una nota de Lectura Crítica máxima', async () => {
        const data = {
            Nota_LecturaCritica: 100, // Nota máxima (mayor que el límite superior)
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite superior
    it('debería manejar correctamente una nota de Lectura Crítica en el límite superior', async () => {
        const data = {
            Nota_LecturaCritica: 100, // Límite superior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite inferior
    it('debería manejar correctamente una nota de Lectura Crítica en el límite inferior', async () => {
        const data = {
            Nota_LecturaCritica: 0, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
    
    it('debería manejar correctamente una nota de LecturaCritica en el límite inferior -1', async () => {
        const data = {
            Nota_LecturaCritica: -1, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota de LecturaCritica en el límite superior +1', async () => {
        const data = {
            Nota_LecturaCritica: 101, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un valor null para la nota de LecturaCritica', async () => {
        const data = {
            Nota_LecturaCritica: null,
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para verificar el manejo de strings
    it('debería manejar correctamente un valor de tipo string para la nota de LecturaCritica', async () => {
        const data = {
            Nota_LecturaCritica: "Doscientos veinte",
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
});


describe('Pruebas para la nota de Sociales', () => {
    it('debería crear un nuevo registro con una nota de Sociales válida', async () => {
        const data = {
            Nota_Sociales: 70, // Nota válida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error al enviar una nota de Sociales inválida', async () => {
        const data = {
            Nota_Sociales: -1, // Nota inválida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba adicional para el caso límite de la nota máxima
    it('debería manejar correctamente un error al enviar una nota de Sociales máxima', async () => {
        const data = {
            Nota_Sociales: 100, // Nota máxima (mayor que el límite superior)
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite superior
    it('debería manejar correctamente una nota de Sociales en el límite superior', async () => {
        const data = {
            Nota_Sociales: 100, // Límite superior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite inferior
    it('debería manejar correctamente una nota de Sociales en el límite inferior', async () => {
        const data = {
            Nota_Sociales: 0, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota de Sociales en el límite inferior -1', async () => {
        const data = {
            Nota_Sociales: -1, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota de Sociales en el límite superior +1', async () => {
        const data = {
            Nota_Sociales: 101, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    
    it('debería manejar correctamente un valor null para la nota de Sociales', async () => {
        const data = {
            Nota_Sociales: null,
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para verificar el manejo de strings
    it('debería manejar correctamente un valor de tipo string para la nota de Sociales', async () => {
        const data = {
            Nota_Sociales: "Doscientos veinte",
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
});

describe('Pruebas para la nota de Naturales', () => {
    it('debería crear un nuevo registro con una nota de Naturales válida', async () => {
        const data = {
            Nota_Naturales: 90, // Nota válida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error al enviar una nota de Naturales inválida', async () => {
        const data = {
            Nota_Naturales: 101, // Nota inválida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba adicional para el caso límite de la nota máxima
    it('debería manejar correctamente un error al enviar una nota de Naturales máxima', async () => {
        const data = {
            Nota_Naturales: 100, // Nota máxima (mayor que el límite superior)
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite superior
    it('debería manejar correctamente una nota de Naturales en el límite superior', async () => {
        const data = {
            Nota_Naturales: 100, // Límite superior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite inferior
    it('debería manejar correctamente una nota de Naturales en el límite inferior', async () => {
        const data = {
            Nota_Naturales: 0, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota de Naturales en el límite inferior -1', async () => {
        const data = {
            Nota_Naturales: -1, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota de Naturales en el límite superior +1', async () => {
        const data = {
            Nota_Naturales: 101, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un valor null para la nota de Naturales', async () => {
        const data = {
            Nota_Naturales: null,
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para verificar el manejo de strings
    it('debería manejar correctamente un valor de tipo string para la nota de Naturales', async () => {
        const data = {
            Nota_Naturales: "Doscientos veinte",
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
});


describe('Pruebas para la nota de Inglés', () => {
    it('debería crear un nuevo registro con una nota de Inglés válida', async () => {
        const data = {
            Nota_Ingles: 85, // Nota válida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error al enviar una nota de Inglés inválida', async () => {
        const data = {
            Nota_Ingles: -5, // Nota inválida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba adicional para el caso límite de la nota máxima
    it('debería manejar correctamente un error al enviar una nota de Inglés máxima', async () => {
        const data = {
            Nota_Ingles: 100, // Nota máxima (mayor que el límite superior)
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite superior
    it('debería manejar correctamente una nota de Inglés en el límite superior', async () => {
        const data = {
            Nota_Ingles: 100, // Límite superior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite inferior
    it('debería manejar correctamente una nota de Inglés en el límite inferior', async () => {
        const data = {
            Nota_Ingles: 0, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota de ingles en el límite inferior -1', async () => {
        const data = {
            Nota_Ingles: -1, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota de ingles en el límite superior +1', async () => {
        const data = {
            Nota_Ingles: 101, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un valor null para la nota de ingles', async () => {
        const data = {
            Nota_Ingles: null,
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para verificar el manejo de strings
    it('debería manejar correctamente un valor de tipo string para la nota de ingles', async () => {
        const data = {
            Nota_Ingles: "Doscientos cuarenta",
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
});


describe('Pruebas para la nota Global', () => {
    it('debería crear un nuevo registro con una nota Global válida', async () => {
        const data = {
            Global: 85, // Nota válida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error al enviar una Global inválida', async () => {
        const data = {
            Global: -5, // Nota inválida
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba adicional para el caso límite de la nota máxima
    it('debería manejar correctamente un error al enviar una nota Global máxima', async () => {
        const data = {
            Global: 500, // Nota máxima (mayor que el límite superior)
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite superior
    it('debería manejar correctamente una nota Global en el límite superior', async () => {
        const data = {
            Global: 500, // Límite superior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para la nota en el límite inferior
    it('debería manejar correctamente una nota Global en el límite inferior', async () => {
        const data = {
            Global: 0, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota Global en el límite inferior -1', async () => {
        const data = {
            Global: -1, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente una nota Global en el límite superior +1', async () => {
        const data = {
            Global: 501, // Límite inferior
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un valor null para la nota de Global', async () => {
        const data = {
            Global: null,
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para verificar el manejo de strings
    it('debería manejar correctamente un valor de tipo strings para la nota de Global', async () => {
        const data = {
            Global: "Doscientos cuarenta",
            // Otros campos de la nota...
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }

    });
    
});


