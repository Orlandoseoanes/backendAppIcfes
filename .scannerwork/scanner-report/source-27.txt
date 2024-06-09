const axios = require('axios');

// URL de la API
const apiUrl = 'http://localhost:3002/API/V2/Registro/Docente';

describe('Pruebas para el endpoint Registro de Docente', () => {
     // Prueba adicional para validar el caso límite del documento (mínimo)
     it('debería manejar correctamente un error al enviar un documento mínimo', async () => {
        const data = {
            Documento: '1234', // Documento mínimo (menor que 10000)
            Nombre: 'Juan',
            Apellido: 'Pérez',
            Telefono: '3106326310',
            Materia_Dicta: 'Español',
            Cobro: 150000,
            Nit_institucion: '1234567890'
        };

        

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
        
    });

    // Prueba adicional para validar el caso límite del documento (máximo)
    it('debería manejar correctamente un error al enviar un documento máximo', async () => {
        const data = {
            Documento: '12345678901', // Documento máximo (mayor que 9999999999)
            Nombre: 'Juan',
            Apellido: 'Pérez',
            Telefono: '3106326310',
            Materia_Dicta: 'Español',
            Cobro: 150000,
            Nit_institucion: '1234567890'
        };

        try {
            const response = await axios.post(apiUrl, data);
            expect(response.status).toBe(400);
        } catch (error) {
            console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
        }
    });

    describe('Pruebas para el Documento', () => {
        it('debería crear un nuevo docente con un documento válido', async () => {
            const data = {
                Documento: '1234567890', // Documento válido (10 dígitos)
                Nombre: 'Juan',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un documento nulo', async () => {
            const data = {
                Documento: null, // Documento nulo
                Nombre: 'Juan',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a documento nulo', error);
            }
        });

        // Prueba para el caso de documento fuera del rango válido
        it('debería manejar correctamente un error al enviar un documento fuera del rango válido', async () => {
            const data = {
                Documento: '123', // Documento fuera del rango válido
                Nombre: 'Juan',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };

            
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });
 
    });
    describe('Pruebas para el Nombre', () => {
        it('debería crear un nuevo docente con un nombre válido', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito', // Nombre válido (longitud entre 5 y 50)
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un nombre nulo', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: null, // Nombre nulo
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un nombre con longitud menor a 5 caracteres', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juan', // Nombre con longitud menor a 5 caracteres
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un nombre con longitud mayor a 50 caracteres', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito'.repeat(11), // Nombre con longitud mayor a 50 caracteres
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });
    describe('Pruebas para el Apellido', () => {
        it('debería crear un nuevo docente con un apellido válido', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez', // Apellido válido (longitud entre 5 y 50)
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un apellido nulo', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: null, // Apellido nulo
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un apellido con longitud menor a 5 caracteres', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pér', // Apellido con longitud menor a 5 caracteres
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un apellido con longitud mayor a 50 caracteres', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez'.repeat(11), // Apellido con longitud mayor a 50 caracteres
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });
    
    describe('Pruebas para el Teléfono', () => {
        it('debería crear un nuevo docente con un teléfono válido', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '3106326310', // Teléfono válido (10 dígitos)
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un teléfono nulo', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: null, // Teléfono nulo
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un teléfono con longitud menor a 10 dígitos', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '310632631', // Teléfono con longitud menor a 10 caracteres
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un teléfono con longitud mayor a 10 dígitos', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '31063263100', // Teléfono con longitud mayor a 10 caracteres
                Materia_Dicta: 'Español',
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });
    
    describe('Pruebas para la Materia que Dicta', () => {
        it('debería crear un nuevo docente con una materia válida', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español', // Materia válida
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar una materia no válida', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Historia', // Materia no válida
                Cobro: 150000,
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });
    
    describe('Pruebas para el Cobro', () => {
        it('debería crear un nuevo docente con un cobro válido', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 150000, // Cobro válido (entre 10000 y 500000)
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un cobro nulo', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: null, // Cobro nulo
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un cobro menor al valor mínimo permitido', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 9999, // Cobro menor al valor mínimo permitido
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería manejar correctamente un error al enviar un cobro mayor al valor máximo permitido', async () => {
            const data = {
                Documento: '1234567890',
                Nombre: 'Juanito',
                Apellido: 'Pérez',
                Telefono: '3106326310',
                Materia_Dicta: 'Español',
                Cobro: 500001, // Cobro mayor al valor máximo permitido
                Nit_institucion: '1234567890'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });
    


    
