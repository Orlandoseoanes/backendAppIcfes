const axios = require('axios');
const apiUrl = 'http://localhost:3002/API/V2/Registro/Simulacro';

describe('Validaciones para el registro de Simulacro', () => {
    // Validaciones para la Empresa
    describe('Empresa',()=>{
        it('debería rechazar una Empresa con menos de 5 caracteres', async () => {
            const data = {
                Id: 1,
                Empresa: 'ABCD', // Menos de 5 caracteres
                CuadernillosComprados: 100,
                Fecha_Simulacro: '2024-04-01',
                Grado: '10'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar una Empresa con más de 50 caracteres', async () => {
            const data = {
                Id: 1,
                Empresa: 'UnaEmpresaConMasDeCincuentaCaracteresUnaEmpresaConMasDeCincuentaCaracteres', // Más de 50 caracteres
                CuadernillosComprados: 100,
                Fecha_Simulacro: '2024-04-01',
                Grado: '10'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar una Empresa nula', async () => {
            const data = {
                Id: 1,
                Empresa: null,
                CuadernillosComprados: 100,
                Fecha_Simulacro: '2024-04-01',
                Grado: '10'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        });

    describe('Numero de cuadernillos',()=>{
        it('debería rechazar un número de Cuadernillos Comprados menor que 1', async () => {
            const data = {
                Id: 1,
                Empresa: 'EmpresaA',
                CuadernillosComprados: 0, // Menor que 1
                Fecha_Simulacro: '2024-04-01',
                Grado: '10'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar un número de Cuadernillos Comprados mayor que 500', async () => {
            const data = {
                Id: 1,
                Empresa: 'EmpresaB',
                CuadernillosComprados: 501, // Mayor que 500
                Fecha_Simulacro: '2024-04-01',
                Grado: '10'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar un Cuadernillos Comprados nulo', async () => {
            const data = {
                Id: 1,
                Empresa: 'EmpresaC',
                CuadernillosComprados: null,
                Fecha_Simulacro: '2024-04-01',
                Grado: '10'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });

        it('debería manejar correctamente CuadernillosComprados en el límite inferior -1', async () => {
            const data = {
                CuadernillosComprados: 0, // Límite inferior
                // Otros campos de la nota...
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería manejar correctamente CuadernillosComprados en el límite superior +1', async () => {
            const data = {
                CuadernillosComprados: 501, // Límite inferior
                // Otros campos de la nota...
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
    
    })
    });
    
    describe('Validar fechas',()=>{

        it('debería rechazar una Fecha Simulacro nula', async () => {
            const data = {
                Id: 1,
                Empresa: 'EmpresaD',
                CuadernillosComprados: 100,
                Fecha_Simulacro: null,
                Grado: '10'
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });

        it('debería rechazar una Fecha Simulacro anterior a la fecha del sistema', async () => {
            const data = {
                Id: 1,
                Empresa: 'EmpresaE',
                CuadernillosComprados: 100,
                Fecha_Simulacro: '2023-04-01', // Anterior a la fecha del sistema
                Grado: '10'
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });

        it('debería rechazar una Fecha Simulacro posterior a la fecha límite', async () => {
            const data = {
                Id: 1,
                Empresa: 'EmpresaF',
                CuadernillosComprados: 100,
                Fecha_Simulacro: '2026-04-01', // Posterior a la fecha límite
                Grado: '10'
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });

    });
    // Validaciones para Grado
   

});
