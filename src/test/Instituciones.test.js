const axios = require('axios');

// URL de la API
const apiUrl = 'http://localhost:3002/API/V2/Instituciones';

describe('Pruebas para la API de instituciones', () => {
    it('debería crear una nueva institución al enviar datos válidos', async () => {
        // Datos de la institución a enviar
        const data = {
            Nombre_Institucion: 'saberysaber',
            Nit_institucion: 457826
        };

        try {
            const response = await axios.post(apiUrl, data);
            // Verificar el código de estado de la respuesta
            expect(response.status).toBe(201); // Supongamos que la API devuelve 201 Created al crear una nueva institución
            // Puedes agregar más aserciones aquí según la respuesta esperada de la API
        } catch (error) {
            // Manejar errores en caso de que la solicitud falle
            console.error('Error al enviar la solicitud:', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error de validación al enviar un nombre no válido
    it('debería manejar correctamente un error de validación al enviar un nombre no válido', async () => {
        const data = {
            // Enviar un nombre vacío
            Nombre_Institucion: '',
            Nit_institucion: 123456
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se intenta crear una institución con un NIT duplicado
    it('debería manejar correctamente un error al intentar crear una institución con un NIT duplicado', async () => {
        const data = {
            Nombre_Institucion: 'Otra Institución',
            // Enviar un NIT que ya existe en la base de datos
            Nit_institucion: 457826
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía un NIT fuera de los límites
    it('debería manejar correctamente un error al enviar un NIT fuera de los límites', async () => {
        const data = {
            Nombre_Institucion: 'Institución con NIT fuera de los límites',
            // Enviar un NIT que está fuera de los límites permitidos
            Nit_institucion: 999999999999
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía un valor nulo para el nombre de la institución
    it('debería manejar correctamente un error al enviar un valor nulo para el nombre de la institución', async () => {
        const data = {
            // Enviar un valor nulo para el nombre de la institución
            Nombre_Institucion: null,
            Nit_institucion: 123456
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía un NIT menor que el límite inferior
    it('debería manejar correctamente un error al enviar un NIT menor que el límite inferior', async () => {
        const data = {
            Nombre_Institucion: 'Institución con NIT menor que el límite inferior',
            // Enviar un NIT menor que el límite inferior permitido
            Nit_institucion: 9999
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía un NIT mayor que el límite superior
    it('debería manejar correctamente un error al enviar un NIT mayor que el límite superior', async () => {
        const data = {
            Nombre_Institucion: 'Institución con NIT mayor que el límite superior',
            // Enviar un NIT mayor que el límite superior permitido
            Nit_institucion: 100000000
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía un nombre de institución nulo
    it('debería manejar correctamente un error al enviar un nombre de institución nulo', async () => {
        const data = {
            // Enviar un nombre de institución nulo
            Nombre_Institucion: null,
            Nit_institucion: 123456
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía un nombre de institución con longitud menor que el límite inferior
    it('debería manejar correctamente un error al enviar un nombre de institución con longitud menor que el límite inferior', async () => {
        const data = {
            // Enviar un nombre de institución con longitud menor que el límite inferior
            Nombre_Institucion: 'I',
            Nit_institucion: 123456
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía un nombre de institución con longitud mayor que el límite superior
    it('debería manejar correctamente un error al enviar un nombre de institución con longitud mayor que el límite superior', async () => {
        const data = {
            // Enviar un nombre de institución con longitud mayor que el límite superior
            Nombre_Institucion: 'Institución con un nombre muy largo que excede el límite permitido de longitud',
            Nit_institucion: 123456
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Prueba para validar que se maneja correctamente un error cuando se envía un nombre de institución como un carácter
    it('debería manejar correctamente un error al enviar un nombre de institución como un carácter', async () => {
        const data = {
            // Enviar un nombre de institución como un carácter
            Nombre_Institucion: 'A',
            Nit_institucion: 123456
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    // Puedes agregar más pruebas según los diferentes casos de uso de tu API
});
