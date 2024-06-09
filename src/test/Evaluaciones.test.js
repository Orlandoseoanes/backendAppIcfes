const axios = require('axios');

// URL de la API

describe('Pruebas para el endpoint de evaluación de contenido de práctica', () => {
  
    it('debería evaluar correctamente las respuestas y devolver el puntaje', async () => {
        const practiceId = "15"; // Supongamos que este ID de práctica existe
        const studentId = "1001234747"; // Supongamos que este ID de estudiante existe
      
        const data = {
          IdPractica: practiceId,
          Respuestas: ["OptionA","OptionA","OptionA"],
          CedulaAlumno: studentId
        };
      
        try {
          const response = await axios.post("http://localhost:4200/API/V2/ContentPractice/Evaluate", data);
          expect(response.status).toBe(200);
          expect(response.data).toHaveProperty('Estudiante');
          expect(response.data).toHaveProperty('correctAnswers', expect.any(Number));
          expect(response.data).toHaveProperty('wrongAnswers', expect.any(Number));
          expect(response.data).toHaveProperty('results', expect.any(Array));
          expect(response.data).toHaveProperty('score', expect.any(Number));
        } catch (error) {
          console.error('Error al enviar la solicitud:', error);
        }
      });
      
    it('debería manejar correctamente un error si la práctica no existe', async () => {
      const practiceId = 9999; // Supongamos que este ID de práctica no existe
  
      const data = {
        IdPractica: practiceId,
        Respuestas: ["A", "B", "C"],
        CedulaAlumno: "123456789"
      };
  
      try {
        const response = await axios.post("http://localhost:4200/API/V2/ContentPractice/Evaluate", data);
        expect(response.status).toBe(404);
        expect(response.data).toHaveProperty('error', 'Práctica no encontrada');
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    });
  
    it('debería manejar correctamente un error si el estudiante no existe', async () => {
      const practiceId = 15; // Supongamos que este ID de práctica existe
      const studentId = "1234567890"; // Supongamos que este ID de estudiante no existe
  
      const data = {
        IdPractica: practiceId,
        Respuestas: ["A", "B", "C"],
        CedulaAlumno: studentId
      };
  
      try {
        const response = await axios.post("http://localhost:4200/API/V2/ContentPractice/Evaluate", data);
        expect(response.status).toBe(404);
        expect(response.data).toHaveProperty('error', 'Estudiante no encontrado');
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    });
  
    it('debería manejar correctamente un error si el array de respuestas está vacío', async () => {
      const practiceId = 15; // Supongamos que este ID de práctica existe
  
      const data = {
        IdPractica: practiceId,
        Respuestas: [],
        CedulaAlumno: "123456789"
      };
  
      try {
        const response = await axios.post("http://localhost:4200/API/V2/ContentPractice/Evaluate", data);
        expect(response.status).toBe(400);
        expect(response.data).toHaveProperty('error', 'El array de Respuestas no puede estar vacío.');
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    });

  });