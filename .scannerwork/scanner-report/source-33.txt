const axios = require('axios');
const apiUrl = 'http://localhost:3002/API/V2/Usuario/Registro';

describe('Validaciones para el registro de Usuario', () => {
    // Validaciones para la Cédula
    describe('Cedula', () => {
        it('debería aceptar una Cédula válida', async () => {
            const data = {
                cedula: 1234567890, // Cédula válida con 10 dígitos
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201); // Se espera que la solicitud sea exitosa
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
        it('debería rechazar una Cédula menor que 10000', async () => {
            const data = {
                cedula: 9999, // Menor que 10000
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar una Cédula mayor que 9999999999', async () => {
            const data = {
                cedula: 10000000000, // Mayor que 9999999999
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar una Cédula nula', async () => {
            const data = {
                cedula: null,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });

    // Validaciones para el Nombre
    describe('Nombre', () => {
        it('debería aceptar un Nombre válido', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido', // Nombre válido con 11 caracteres
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201); // Se espera que la solicitud sea exitosa
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });

        it('debería rechazar un Nombre con menos de 5 caracteres', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'hola', // Menos de 5 caracteres
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar un Nombre con más de 50 caracteres', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreConMasDeCincuentaCaracteresNombreConMasDeCincuentaCaracteresNombreConMasDeCincuentaCaracteres', // Más de 50 caracteres
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar un Nombre nulo', async () => {
            const data = {
                cedula: 1234567890,
                nombre: null,
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });

    describe('Apellido', () => {
        it('debería aceptar un Apellido válido', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido', // Apellido válido
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201); // Se espera que la solicitud sea exitosa
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería rechazar un Apellido con menos de 5 caracteres', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'Cuat', // Menos de 5 caracteres
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar un Apellido con más de 50 caracteres', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoMasLargoQueCincuentaCaracteresEsInvalidoPorSerDemasiadoLargo', // Más de 50 caracteres
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar un Apellido nulo', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: null, // Apellido nulo
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });
    
    describe('Usuario', () => {
        it('debería aceptar un Usuario válido', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido', // Usuario válido
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201); // Se espera que la solicitud sea exitosa
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería rechazar un Usuario con menos de 5 caracteres', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'Us', // Menos de 5 caracteres
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar un Usuario con más de 50 caracteres', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioMasLargoQueCincuentaCaracteresEsInvalidoPorSerDemasiadoLargo', // Más de 50 caracteres
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar un Usuario nulo', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: null, // Usuario nulo
                contrasena: 'ContrasenaValida',
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    });
    
    describe('Contraseña', () => {
        it('debería aceptar una Contraseña válida', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContrasenaValida', // Contraseña válida
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(201); // Se espera que la solicitud sea exitosa
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        });
    
        it('debería rechazar una Contraseña con menos de 5 caracteres', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'Pass', // Menos de 5 caracteres
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar una Contraseña con más de 50 caracteres', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: 'ContraseñaMasLargaQueCincuentaCaracteresEsInvalidaPorSerDemasiadoLarga', // Más de 50 caracteres
                Nit_institucion: 'NitValido'
            };
    
            try {
                const response = await axios.post(apiUrl, data);
                expect(response.status).toBe(400);
            } catch (error) {
                console.error('Se esperaba que la solicitud fallara debido a un documento fuera del rango válido', error);
            }
        });
    
        it('debería rechazar una Contraseña nula', async () => {
            const data = {
                cedula: 1234567890,
                nombre: 'NombreValido',
                apellido: 'ApellidoValido',
                usuario: 'UsuarioValido',
                contrasena: null, // Contraseña nula
                Nit_institucion: 'NitValido'
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

