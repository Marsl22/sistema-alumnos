DROP DATABASE IF EXISTS escuela;
CREATE DATABASE escuela;
USE escuela;

CREATE TABLE curso(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion VARCHAR(200)
);

CREATE TABLE alumno(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    edad INT,
    matricula VARCHAR(50),
    
    curso_id INT,
	FOREIGN KEY (curso_id) REFERENCES curso(id)

);

