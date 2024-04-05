const axios = require('axios');
const apiUrl = 'http://localhost:3002/API/V2/Registro/Estudiante';



describe('Pruebas para registro estudiante', () => {

    describe('Pruebas para el Tipo de Documento', () => {
        it('debería crear un nuevo registro con tipo de documento válido', async () => {
            const data = {
                Tipo_documento: 'Cédula',
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un tipo de documento inválido', async () => {
            const data = {
                Tipo_documento: 'Pasaporte', // Tipo de documento inválido
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un tipo de documento inválido');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un tipo de documento nulo', async () => {
            const data = {
                Tipo_documento: null, // Tipo de documento nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un tipo de documento nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Documento', () => {
        it('debería crear un nuevo registro con un documento válido', async () => {
            const data = {
                Documento: 1234567890, // Documento válido
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un documento menor al rango válido', async () => {
            const data = {
                Documento: 9999, // Documento menor al rango válido
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un documento menor al rango válido');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un documento mayor al rango válido', async () => {
            const data = {
                Documento: 10000000000, // Documento mayor al rango válido
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un documento mayor al rango válido');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un documento nulo', async () => {
            const data = {
                Documento: null, // Documento nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un documento nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un valor que no es un número como documento', async () => {
            const data = {
                Documento: 'ABC', // Valor que no es un número como documento
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un valor que no es un número como documento');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });


    describe('Pruebas para el Nombre', () => {
        it('debería crear un nuevo registro con un nombre válido', async () => {
            const data = {
                Nombre: 'Juanito', // Nombre válido con longitud entre 5 y 50 caracteres
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un nombre demasiado corto', async () => {
            const data = {
                Nombre: 'Ana', // Nombre con menos de 5 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un nombre demasiado corto');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un nombre demasiado largo', async () => {
            const data = {
                Nombre: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula nisi eu leo eleifend', // Nombre con más de 50 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un nombre demasiado largo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un nombre nulo', async () => {
            const data = {
                Nombre: null, // Nombre nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un nombre nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Apellido', () => {
        it('debería crear un nuevo registro con un apellido válido', async () => {
            const data = {
                Apellido: 'González', // Apellido válido con longitud entre 5 y 50 caracteres
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un apellido demasiado corto', async () => {
            const data = {
                Apellido: 'Li', // Apellido con menos de 5 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un apellido demasiado corto');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un apellido demasiado largo', async () => {
            const data = {
                Apellido: 'Pérez Martínez Sánchez López Rodríguez González Hernández García', // Apellido con más de 50 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un apellido demasiado largo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un apellido nulo', async () => {
            const data = {
                Apellido: null, // Apellido nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un apellido nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Teléfono', () => {
        it('debería crear un nuevo registro con un teléfono válido', async () => {
            const data = {
                Telefono: '3106326313', // Teléfono válido con 10 dígitos
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un teléfono con menos de 10 dígitos', async () => {
            const data = {
                Telefono: '31063263', // Teléfono con menos de 10 dígitos
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un teléfono con menos de 10 dígitos');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un teléfono con más de 10 dígitos', async () => {
            const data = {
                Telefono: '310632631300', // Teléfono con más de 10 dígitos
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un teléfono con más de 10 dígitos');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un teléfono nulo', async () => {
            const data = {
                Telefono: null, // Teléfono nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un teléfono nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para la Dirección', () => {
        it('debería crear un nuevo registro con una dirección válida', async () => {
            const data = {
                Direccion: 'Calle 123', // Dirección válida con longitud entre 5 y 50 caracteres
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar una dirección demasiado corta', async () => {
            const data = {
                Direccion: 'Cll.', // Dirección con menos de 5 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a una dirección demasiado corta');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar una dirección demasiado larga', async () => {
            const data = {
                Direccion: 'Avenida principal del barrio residencial Los Alamos, Calle 123, casa 45, segundo piso, departamento 3A', // Dirección con más de 50 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a una dirección demasiado larga');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar una dirección nula', async () => {
            const data = {
                Direccion: null, // Dirección nula
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a una dirección nula');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Colegio', () => {
        it('debería crear un nuevo registro con un colegio válido', async () => {
            const data = {
                Colegio: 'Colegio XYZ', // Colegio válido con longitud entre 5 y 50 caracteres
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un colegio demasiado corto', async () => {
            const data = {
                Colegio: 'ABC', // Colegio con menos de 5 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un colegio demasiado corto');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un colegio demasiado largo', async () => {
            const data = {
                Colegio: 'Colegio de Educación Secundaria y Bachillerato Santa María de Guadalupe', // Colegio con más de 50 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un colegio demasiado largo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un colegio nulo', async () => {
            const data = {
                Colegio: null, // Colegio nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un colegio nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Municipio', () => {
        it('debería crear un nuevo registro con un municipio válido', async () => {
            const data = {
                Municipio: 'Valledupar', // Municipio válido de la lista proporcionada
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un municipio inválido', async () => {
            const data = {
                Municipio: 'Bogotá', // Municipio no válido
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un municipio inválido');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un municipio nulo', async () => {
            const data = {
                Municipio: null, // Municipio nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un municipio nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Nombre del Acudiente', () => {
        it('debería crear un nuevo registro con un nombre de acudiente válido', async () => {
            const data = {
                NombreAcudiente: 'NombreAcudiente', // Nombre de acudiente válido con 16 caracteres
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un nombre de acudiente inválido', async () => {
            const data = {
                NombreAcudiente: 'A', // Nombre de acudiente no válido con menos de 5 caracteres
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un nombre de acudiente inválido');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un nombre de acudiente nulo', async () => {
            const data = {
                NombreAcudiente: null, // Nombre de acudiente nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un nombre de acudiente nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Teléfono del Acudiente', () => {
        it('debería crear un nuevo registro con un teléfono de acudiente válido', async () => {
            const data = {
                TelefonoAcudiente: '1234567890', // Teléfono de acudiente válido con 10 dígitos
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un teléfono de acudiente inválido', async () => {
            const data = {
                TelefonoAcudiente: '123456', // Teléfono de acudiente no válido con menos de 10 dígitos
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un teléfono de acudiente inválido');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un teléfono de acudiente nulo', async () => {
            const data = {
                TelefonoAcudiente: null, // Teléfono de acudiente nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un teléfono de acudiente nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Estado', () => {
        it('debería crear un nuevo registro con un estado válido', async () => {
            const data = {
                Estado: 'Paz y salvo', // Estado válido
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un estado inválido', async () => {
            const data = {
                Estado: 'Moroso', // Estado no válido
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un estado inválido');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un estado nulo', async () => {
            const data = {
                Estado: null, // Estado nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un estado nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

    describe('Pruebas para el Grado', () => {
        it('debería crear un nuevo registro con un grado válido', async () => {
            const data = {
                Grado: '10', // Grado válido
                // Otros datos requeridos
            };

            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201);
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería manejar correctamente un error al enviar un grado inválido', async () => {
            const data = {
                Grado: '9', // Grado no válido
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un grado inválido');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('debería manejar correctamente un error al enviar un grado nulo', async () => {
            const data = {
                Grado: null, // Grado nulo
                // Otros datos requeridos
            };

            try {
                await axios.post(apiUrl, data);
                fail('Se esperaba que la solicitud fallara debido a un grado nulo');
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
    });

});

