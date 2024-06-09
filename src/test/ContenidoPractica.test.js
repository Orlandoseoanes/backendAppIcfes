const axios = require('axios');

// URL de la API
const apiUrl = 'http://localhost:4200/API/V2/ContentPractice/Register';

describe('Pruebas para el endpoint de registro de contenido de práctica', () => {
  it('debería crear un nuevo contenido de práctica correctamente', async () => {
    const practiceId = 15;
    const questionIds = ["6665c9324c797d65eb158658", "6665ca06d43bd43e701ad969", "6665ca06d43bd43e701ad96b"]; // Supongamos que estos IDs de pregunta existen en la base de datos

    const data = {
      IdPractica: practiceId,
      Preguntas: questionIds
    };

    try {
      const response = await axios.post(apiUrl, data);
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('IdPractica', practiceId);
      expect(response.data).toHaveProperty('Nombre'); // Suponiendo que el nombre se devuelve en la respuesta
      expect(response.data).toHaveProperty('Preguntas', expect.any(Array));
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });

  it('debería manejar correctamente un error si el ID de práctica no existe', async () => {
    const nonExistentPracticeId = 9999;
    const questionIds = [1, 2, 3]; // Supongamos que estos IDs de pregunta existen en la base de datos

    const data = {
      IdPractica: nonExistentPracticeId,
      Preguntas: questionIds
    };

    try {
      const response = await axios.post(apiUrl, data);
      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('error', 'La práctica especificada no existe.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });

  it('debería manejar correctamente un error si el ID de práctica no es numérico', async () => {
    const invalidPracticeId = 'abc'; // ID de práctica no numérico
    const questionIds = [1, 2, 3]; // Supongamos que estos IDs de pregunta existen en la base de datos

    const data = {
      IdPractica: invalidPracticeId,
      Preguntas: questionIds
    };

    try {
      const response = await axios.post(apiUrl, data);
      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('error', 'El ID de práctica debe ser numérico.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });

  it('debería manejar correctamente un error si alguna pregunta no existe', async () => {
    const practiceId = 1;
    const nonExistentQuestionIds = [9999, 8888, 7777]; // Supongamos que estos IDs de pregunta no existen en la base de datos

    const data = {
      IdPractica: practiceId,
      Preguntas: nonExistentQuestionIds
    };

    try {
      const response = await axios.post(apiUrl, data);
      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('error', expect.stringContaining('pregunta'));
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });
  
  it('debería manejar correctamente un error si el campo de preguntas está vacío', async () => {
    const practiceId = 1;
    const emptyQuestionIds = []; // Array vacío de IDs de pregunta

    const data = {
      IdPractica: practiceId,
      Preguntas: emptyQuestionIds
    };

    try {
      const response = await axios.post(apiUrl, data);
      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('error', 'Tiene que haber al menos 1 pregunta.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });

  it('debería manejar correctamente un error si el campo de preguntas no es un array', async () => {
    const practiceId = 1;
    const invalidQuestionIds = 'invalid'; // Valor no array para IDs de pregunta

    const data = {
      IdPractica: practiceId,
      Preguntas: invalidQuestionIds
    };

    try {
      const response = await axios.post(apiUrl, data);
      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('error', 'El campo Preguntas debe ser un array de cadenas de caracteres.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });
  it('debería manejar correctamente un error si no hay preguntas en el cuerpo de la solicitud', async () => {
    const practiceId = 15;
    const questionIds = []; // Array vacío de IDs de pregunta

    const data = {
      IdPractica: practiceId,
      Preguntas: questionIds
    };

    try {
      const response = await axios.post(apiUrl, data);
      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('error', 'Tiene que haber al menos 1 pregunta.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });

  it('debería manejar correctamente un error si el campo de preguntas no es un array de strings', async () => {
    const practiceId = 15;
    const invalidQuestionIds = [1, true, 'test']; // Valores no válidos para IDs de pregunta

    const data = {
      IdPractica: practiceId,
      Preguntas: invalidQuestionIds
    };

    try {
      const response = await axios.post(apiUrl, data);
      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('error', 'El campo Preguntas debe ser un array de cadenas de caracteres.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });

});
