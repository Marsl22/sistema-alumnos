
USE escuela;

INSERT INTO curso (nombre, descripcion) VALUES
('Matemáticas I', 'Introducción al álgebra y funciones básicas'),
('Programación I', 'Fundamentos de programación en Java'),
('Bases de Datos', 'Modelado y creación de bases de datos relacionales'),
('Física General', 'Conceptos básicos de mecánica y energía'),
('Inglés I', 'Curso introductorio de inglés'),
('Historia Universal', 'Revisión de los eventos históricos más importantes'),
('Química I', 'Fundamentos de química general'),
('Estructuras de Datos', 'Listas, pilas, colas y árboles'),
('Redes de Computadoras', 'Principios de comunicación en redes'),
('Desarrollo Web', 'HTML, CSS y JavaScript');


INSERT INTO alumno (nombre, apellido_paterno, apellido_materno, edad, matricula, curso_id) VALUES
('Juan', 'Pérez', 'López', 20, 'A001', 1),
('María', 'González', 'Ramírez', 19, 'A002', 2),
('Pedro', 'Hernández', 'Torres', 21, 'A003', 3),
('Laura', 'Martínez', 'Santos', 18, 'A004', 4),
('Carlos', 'Rojas', 'Mendoza', 22, 'A005', 5),
('Ana', 'Díaz', 'Castillo', 20, 'A006', 6),
('Luis', 'Morales', 'Reyes', 19, 'A007', 7),
('Sofía', 'Cabrera', 'Ortiz', 21, 'A008', 8),
('Miguel', 'Flores', 'Pineda', 22, 'A009', 9),
('Elena', 'Vega', 'Navarro', 20, 'A010', 10),
('Diego', 'Silva', 'Ramos', 18, 'A011', 1),
('Valeria', 'Ramírez', 'Cruz', 19, 'A012', 3),
('Jorge', 'Luna', 'Aguilar', 22, 'A013', 5),
('Paola', 'Santos', 'Beltrán', 21, 'A014', 7),
('Ricardo', 'Campos', 'Juárez', 20, 'A015', 9);

