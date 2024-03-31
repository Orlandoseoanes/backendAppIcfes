CREATE  DATABASE preicfes;
drop database preicfes;
USE preicfes;
SELECT * FROM Instituciones;

-- Tabla Instituciones
CREATE TABLE Instituciones (
    Nit_institucion BIGINT PRIMARY  KEY ,
    Nombre_Institucion VARCHAR(255)
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    cedula BIGINT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    usuario VARCHAR(255) UNIQUE,
    contrasena VARCHAR(255),
    Nit_institucion BIGINT,
    FOREIGN KEY (Nit_institucion) REFERENCES Instituciones(Nit_institucion)
);


CREATE TABLE simulacros (
  Id VARCHAR(255) NOT NULL  PRIMARY KEY,
  Empresa VARCHAR(255) NOT NULL,
  CuadernillosComprados BIGINT NOT NULL,
  Fecha_Simulacro DATETIME NOT NULL,
  Grado VARCHAR(255) NOT NULL
);


-- Tabla Estudiantes
CREATE TABLE Estudiantes (
    Tipo_documento VARCHAR(255),
    Documento BIGINT PRIMARY KEY,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Telefono VARCHAR(255),
    Direccion VARCHAR(255),
    Colegio VARCHAR(255),
    Municipio VARCHAR(255),
    NombreApeAcu VARCHAR(255),
    TelefonoAcu VARCHAR(255),
    Estado VARCHAR(255),
    Nit_institucion BIGINT,
	Grado VARCHAR(255) NOT NULL,
    FOREIGN KEY (Nit_institucion) REFERENCES Instituciones(Nit_institucion)
);

-- Tabla Gastos
CREATE TABLE Gastos (
    Id_gasto BIGINT auto_increment PRIMARY KEY,
    Fecha DATE,
    Tipo_gasto VARCHAR(255),
    Gasto BIGINT,
    Descripcion VARCHAR(255),
    Id_Usuario BIGINT,
	Grado VARCHAR(255) NOT NULL,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(cedula)
);


-- Tabla Cartera
CREATE TABLE Carteras (
    Documento_alumno BIGINT,
    Id_Pago BIGINT  auto_increment primary KEY,
    Numero_recibo VARCHAR(255),
    Pago BIGINT,
    Metodo_pago VARCHAR(255),
    Fecha DATE,
	Grado VARCHAR(255) NOT NULL,
    FOREIGN KEY (Documento_alumno) REFERENCES Estudiantes(Documento)
);

-- Tabla Cursos
CREATE TABLE Cursos (
    Id_curso BIGINT auto_increment PRIMARY KEY,
    Nombre_curso VARCHAR(255),
	Grado VARCHAR(255) NOT NULL
);

-- Tabla Docentes
CREATE TABLE Docentes (
    Documento BIGINT PRIMARY KEY,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Telefono VARCHAR(255),
    Materia_Dicta VARCHAR(255),
    Cobro BIGINT,
    Nit_institucion BIGINT,
    FOREIGN KEY (Nit_institucion) REFERENCES Instituciones(Nit_institucion)
);

-- Tabla EstuCurso (Tabla de unión para la relación muchos a muchos entre Estudiantes y Cursos)
CREATE TABLE EstuCursos (
    Id_EstuCurso BIGINT,
    Id_Alumno BIGINT,
    Curso BIGINT,
    PRIMARY KEY (Id_EstuCurso),
    FOREIGN KEY (Id_Alumno) REFERENCES Estudiantes(Documento),
    FOREIGN KEY (Curso) REFERENCES Cursos(Id_curso)
);


CREATE TABLE Notas (
  id BIGINT NOT NULL auto_increment PRIMARY   KEY,
  Id_Simulacro varchar(255) NOT NULL,
  Id_Alumno BIGINT NOT NULL,
  Nota_LecturaCritica BIGINT,
  Nota_Matematicas BIGINT,
  Nota_Sociales BIGINT,
  Nota_Naturales BIGINT,
  Nota_Ingles BIGINT,
  Global BIGINT,
  FOREIGN KEY (Id_Simulacro) REFERENCES simulacros(Id),
  FOREIGN KEY (Id_Alumno) REFERENCES Estudiantes(Documento)
);

select * from Usuarios;
select * from Instituciones;
select * from Estudiantes;
select * from Cursos;
select * from Docentes;
select * from Carteras;
select * from Gastos;
select * from simulacros;
select * from Notas;
