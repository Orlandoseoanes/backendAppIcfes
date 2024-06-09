const axios = require('axios');

// URL de la API
const apiUrl = 'http://localhost:4200/API/V2/Question/Register';

describe('Pruebas para el endpoint de banco de preguntas', () => {
    it('debería crear una nueva pregunta correctamente', async () => {
        const data = {
            Question: "¿Cuál es la capital de Francia?",
            Answer: "París",
            OptionA: "Madrid",
            OptionB: "París",
            OptionC: "Londres",
            OptionD: "Berlín",
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('_id');
            expect(response.data.Question).toBe("¿Cuál es la capital de Francia?");
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error si faltan campos obligatorios', async () => {
        const data = {
            Question: "¿Cuál es la capital de Francia?",
            Answer: "París",
            OptionA: "Madrid",
            OptionB: "París",
            // Faltan OptionC, OptionD y Subject
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("Todos los campos son obligatorios.");
        }
    });

    it('debería manejar correctamente un error si algún campo tiene menos de 5 caracteres', async () => {
        const data = {
            Question: "¿Pa?",
            Answer: "Pa",
            OptionA: "Ma",
            OptionB: "Pa",
            OptionC: "Lo",
            OptionD: "Be",
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toMatch(/debe tener al menos 5 caracteres y no puede ser nulo/);
        }
    });

    it('debería manejar correctamente un error si el subject no es válido', async () => {
        const data = {
            Question: "¿Cuál es la capital de Francia?",
            Answer: "París",
            OptionA: "Madrid",
            OptionB: "París",
            OptionC: "Londres",
            OptionD: "Berlín",
            Subject: "Historia"  // Subject inválido
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("El campo Subject debe ser uno de los siguientes: LecturaCritica, Matematicas, Sociales, Naturales, Ingles.");
        }
    });

    it('debería manejar correctamente una pregunta con exactamente 5 caracteres', async () => {
        const data = {
            Question: "12345",
            Answer: "12345",
            OptionA: "12345",
            OptionB: "12345",
            OptionC: "12345",
            OptionD: "12345",
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(201);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    it('debería manejar correctamente un error si la pregunta tiene menos de 5 caracteres', async () => {
        const data = {
            Question: "1234", // 4 caracteres
            Answer: "12345",
            OptionA: "12345",
            OptionB: "12345",
            OptionC: "12345",
            OptionD: "12345",
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("Question debe tener al menos 5 caracteres y no puede ser nulo.");
        }
    });

    it('debería manejar correctamente un error si la respuesta tiene menos de 5 caracteres', async () => {
        const data = {
            Question: "¿Cuál es la capital de Francia?",
            Answer: "1234", // 4 caracteres
            OptionA: "Madrid",
            OptionB: "París",
            OptionC: "Londres",
            OptionD: "Berlín",
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("Answer debe tener al menos 5 caracteres y no puede ser nulo.");
        }
    });

    it('debería manejar correctamente un error si OptionA tiene menos de 5 caracteres', async () => {
        const data = {
            Question: "¿Cuál es la capital de Francia?",
            Answer: "París",
            OptionA: "1234", // 4 caracteres
            OptionB: "París",
            OptionC: "Londres",
            OptionD: "Berlín",
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("OptionA debe tener al menos 5 caracteres y no puede ser nulo.");
        }
    });

    it('debería manejar correctamente un error si OptionB tiene menos de 5 caracteres', async () => {
        const data = {
            Question: "¿Cuál es la capital de Francia?",
            Answer: "París",
            OptionA: "Madrid",
            OptionB: "1234", // 4 caracteres
            OptionC: "Londres",
            OptionD: "Berlín",
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("OptionB debe tener al menos 5 caracteres y no puede ser nulo.");
        }
    });

    it('debería manejar correctamente un error si OptionC tiene menos de 5 caracteres', async () => {
        const data = {
            Question: "¿Cuál es la capital de Francia?",
            Answer: "París",
            OptionA: "Madrid",
            OptionB: "París",
            OptionC: "1234", // 4 caracteres
            OptionD: "Berlín",
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("OptionC debe tener al menos 5 caracteres y no puede ser nulo.");
        }
    });

    it('debería manejar correctamente un error si OptionD tiene menos de 5 caracteres', async () => {
        const data = {
            Question: "¿Cuál es la capital de Francia?",
            Answer: "París",
            OptionA: "Madrid",
            OptionB: "París",
            OptionC: "Londres",
            OptionD: "1234", // 4 caracteres
            Subject: "Sociales"
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("OptionD debe tener al menos 5 caracteres y no puede ser nulo.");
        }
    });

});

describe('Pruebas para el endpoint de eliminación de preguntas', () => {
    it('debería eliminar una pregunta existente correctamente', async () => {
        const _id = '5f574a314f9e680017f0e407'; // ID de una pregunta existente en la base de datos

        try {
            const response = await axios.delete(`${apiUrl}${_id}`);
            expect(response.status).toBe(200);
            expect(response.data.message).toBe("pregunta borrada");
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
});

describe('Pruebas para el endpoint de actualización de preguntas', () => {
    it('debería actualizar una pregunta existente correctamente', async () => {
        const _id = '5f574a314f9e680017f0e407'; // ID de una pregunta existente en la base de datos
        const data = {
            Question: "¿Cuál es la capital de España?",
            Answer: "Madrid",
            OptionA: "Madrid",
            OptionB: "Barcelona",
            OptionC: "Londres",
            OptionD: "Berlín",
        };

        try {
            const response = await axios.put(`${apiUrl}${_id}`, data);
            expect(response.status).toBe(200);
            expect(response.data.Question).toBe("¿Cuál es la capital de España?");
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
});
