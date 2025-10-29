# Sistema de Gestión Hospitalaria - HospitalMdb

## Descripción del Proyecto

Sistema de Gestión Hospitalaria desarrollado con Spring Boot y MongoDB que permite administrar de manera integrada los procesos relacionados con la atención de pacientes, control de médicos, hospitalización, facturación y seguridad de la información.

## Tecnologías Utilizadas

- **Backend:** Spring Boot 3.5.6
- **Base de Datos:** MongoDB
- **Lenguaje:** Java 17
- **Gestor de Dependencias:** Maven
- **Herramientas:** Lombok, Spring DevTools, Thymeleaf
- **Cliente de BD:** MongoDB Compass
- **Pruebas:** Postman
- **IDE:** IntelliJ IDEA

## Arquitectura del Proyecto

El proyecto está estructurado siguiendo el patrón de arquitectura en capas:

### Estructura de Carpetas

```
HospitalMdb/
├── src/main/java/com/tecsup/HospitalMdb/
│   ├── pacientes/
│   │   ├── models/
│   │   ├── dao/
│   │   ├── service/
│   │   └── controller/
│   ├── citas/
│   │   ├── models/
│   │   ├── dao/
│   │   ├── service/
│   │   └── controller/
│   ├── medicos/
│   │   ├── models/
│   │   ├── dao/
│   │   ├── service/
│   │   └── controller/
│   ├── consultas/
│   │   ├── models/
│   │   ├── dao/
│   │   ├── service/
│   │   └── controller/
│   ├── hospitalizacion/
│   │   ├── models/
│   │   ├── dao/
│   │   ├── service/
│   │   └── controller/
│   ├── facturacion/
│   │   ├── models/
│   │   ├── dao/
│   │   ├── service/
│   │   └── controller/
│   └── seguridad/
│       ├── models/
│       ├── dao/
│       ├── service/
│       └── controller/
└── src/main/resources/
    └── application.properties
```

## Módulos del Sistema

### 1. Módulo de Pacientes

**Entidades:**
- Paciente
- HistoriaClinica
- AntecedenteMedico

**Funcionalidades:**
- Registro y gestión de pacientes
- Creación automática de historia clínica
- Registro de antecedentes médicos

**Endpoints:**
- `GET /api/pacientes` - Listar todos los pacientes
- `GET /api/pacientes/{id}` - Buscar paciente por ID
- `POST /api/pacientes` - Crear nuevo paciente
- `PUT /api/pacientes/{id}` - Actualizar paciente
- `DELETE /api/pacientes/{id}` - Eliminar paciente
- `GET /api/pacientes/estado/{estado}` - Buscar por estado
- `GET /api/pacientes/dni/{dni}` - Buscar por DNI

### 2. Módulo de Médicos

**Entidades:**
- Medico
- Especialidad
- MedicoEspecialidad

**Funcionalidades:**
- Gestión de médicos y sus datos profesionales
- Administración de especialidades médicas
- Asociación de médicos con especialidades (relación muchos a muchos)

**Endpoints:**
- `GET /api/medicos` - Listar todos los médicos
- `POST /api/medicos` - Crear nuevo médico
- `GET /api/especialidades` - Listar especialidades
- `POST /api/especialidades` - Crear especialidad
- `GET /api/medico-especialidades/medico/{idMedico}` - Especialidades de un médico

### 3. Módulo de Citas

**Entidades:**
- Cita

**Funcionalidades:**
- Agendamiento de citas médicas
- Reprogramación y cancelación de citas
- Control de estados (programada, atendida, cancelada)

**Endpoints:**
- `GET /api/citas` - Listar todas las citas
- `POST /api/citas` - Agendar nueva cita
- `PUT /api/citas/{id}` - Actualizar cita
- `GET /api/citas/paciente/{idPaciente}` - Citas de un paciente
- `GET /api/citas/medico/{idMedico}` - Citas de un médico
- `GET /api/citas/estado/{estado}` - Citas por estado
- `GET /api/citas/fecha/{fecha}` - Citas por fecha

### 4. Módulo de Consultas y Diagnósticos

**Entidades:**
- Consulta
- Diagnostico
- RecetaMedica
- DetalleReceta

**Funcionalidades:**
- Registro de consultas médicas
- Generación de diagnósticos
- Emisión de recetas médicas con detalles

**Endpoints:**
- `GET /api/consultas` - Listar consultas
- `POST /api/consultas` - Registrar consulta
- `GET /api/diagnosticos/consulta/{idConsulta}` - Diagnósticos de consulta
- `GET /api/recetas/consulta/{idConsulta}` - Recetas de consulta
- `GET /api/detalle-recetas/receta/{idReceta}` - Detalles de receta

### 5. Módulo de Hospitalización

**Entidades:**
- Habitacion
- Hospitalizacion

**Funcionalidades:**
- Gestión de habitaciones (UCI, general, emergencia)
- Control de ocupación de camas
- Registro de hospitalizaciones con fechas de ingreso y alta

**Endpoints:**
- `GET /api/habitaciones` - Listar habitaciones
- `GET /api/habitaciones/estado/{estado}` - Habitaciones por estado
- `POST /api/hospitalizaciones` - Registrar hospitalización
- `GET /api/hospitalizaciones/paciente/{idPaciente}` - Hospitalizaciones de paciente

### 6. Módulo de Facturación

**Entidades:**
- Factura
- DetalleFactura

**Funcionalidades:**
- Generación de facturas por servicios
- Detalle de conceptos facturados
- Control de estado de pagos

**Endpoints:**
- `GET /api/facturas` - Listar facturas
- `POST /api/facturas` - Crear factura
- `GET /api/facturas/paciente/{idPaciente}` - Facturas de paciente
- `GET /api/detalle-facturas/factura/{idFactura}` - Detalles de factura

### 7. Módulo de Seguridad

**Entidades:**
- Usuario
- Bitacora

**Funcionalidades:**
- Gestión de usuarios con roles
- Sistema de login
- Registro de acciones en bitácora
- Usuario administrador predefinido (no eliminable)

**Usuario Administrador por Defecto:**
- Username: `juan`
- Password: `1234`
- Rol: `admin`
- ID: `admin-juan-principal` (protegido contra eliminación)

**Endpoints:**
- `POST /api/usuarios/login` - Iniciar sesión
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario
- `GET /api/bitacoras` - Ver registro de acciones

## Configuración

### application.properties

```properties
spring.application.name=HospitalMdb

spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=hospital_db

server.port=8080

spring.thymeleaf.cache=false
```

### Base de Datos MongoDB

**Base de datos:** `hospital_db`

**Colecciones creadas:**
- pacientes
- historias_clinicas
- antecedentes_medicos
- medicos
- especialidades
- medico_especialidades
- citas
- consultas
- diagnosticos
- recetas_medicas
- detalle_recetas
- habitaciones
- hospitalizaciones
- facturas
- detalle_facturas
- usuarios
- bitacoras

## Instalación y Ejecución

### Requisitos Previos

- JDK 17 o superior
- Maven
- MongoDB instalado y ejecutándose
- MongoDB Compass (opcional, para visualización)
- Postman (para pruebas de API)

### Pasos de Instalación

1. Clonar el repositorio o descargar el proyecto

2. Instalar MongoDB y ejecutar el servidor:
   ```bash
   mongod
   ```

3. Abrir MongoDB Compass y conectarse a `localhost:27017`

4. Crear la base de datos `hospital_db`

5. Abrir el proyecto en IntelliJ IDEA

6. Habilitar el procesamiento de anotaciones:
   - File → Settings → Build, Execution, Deployment → Compiler → Annotation Processors
   - Marcar "Enable annotation processing"

7. Compilar el proyecto:
   ```bash
   mvn clean install
   ```

8. Ejecutar la aplicación:
   ```bash
   mvn spring-boot:run
   ```
   
   O ejecutar la clase principal `HospitalMdbApplication.java` desde el IDE

9. La aplicación estará disponible en: `http://localhost:8080`

## Pruebas con Postman

### Ejemplo de Prueba: Crear un Paciente

**Método:** POST  
**URL:** `http://localhost:8080/api/pacientes`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
    "dni": "12345678",
    "nombres": "Juan Carlos",
    "apellidos": "Pérez López",
    "fechaNacimiento": "1990-05-15",
    "sexo": "M",
    "direccion": "Av. Siempre Viva 123",
    "telefono": "987654321",
    "correo": "juan.perez@email.com",
    "estado": "activo"
}
```

### Ejemplo de Prueba: Login

**Método:** POST  
**URL:** `http://localhost:8080/api/usuarios/login`  
**Body:**
```json
{
    "nombreUsuario": "juan",
    "contrasena": "1234"
}
```

## Características Técnicas

### Patrón de Diseño

- **Arquitectura en Capas:** Models, DAO, Service, Controller
- **Inyección de Dependencias:** @Autowired
- **REST API:** Endpoints RESTful con formato JSON

### Anotaciones Principales

- `@Document` - Mapeo de entidades a colecciones MongoDB
- `@Id` - Identificador único de documento
- `@RestController` - Controladores REST
- `@Service` - Capa de servicios
- `@Repository` - Capa de acceso a datos
- `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor` - Lombok para reducir código boilerplate

### Seguridad

- Sistema de usuarios con roles (admin, medico, recepcionista, enfermera)
- Bitácora de acciones del sistema
- Usuario administrador protegido contra modificación y eliminación

## Estructura de Datos

### Tipos de Datos Utilizados

- `String` - IDs, nombres, descripciones
- `LocalDate` - Fechas
- `LocalTime` - Horas
- `LocalDateTime` - Timestamps
- `Double` - Montos y valores numéricos

### Relaciones entre Colecciones

Las relaciones se manejan mediante IDs de referencia (foreign keys simuladas):

- Paciente → HistoriaClinica (1:1)
- HistoriaClinica → AntecedenteMedico (1:N)
- Paciente → Cita → Consulta (1:N)
- Consulta → Diagnostico (1:N)
- Consulta → RecetaMedica → DetalleReceta (1:N)
- Medico ↔ Especialidad (N:N a través de MedicoEspecialidad)
- Paciente → Hospitalizacion → Habitacion (1:N)
- Paciente → Factura → DetalleFactura (1:N)

## Problemas Comunes y Soluciones

### Error: Lombok requires enabled annotation processing

**Solución:**
- File → Settings → Annotation Processors
- Enable annotation processing
- Rebuild Project

### Error: Cannot connect to MongoDB

**Solución:**
- Verificar que MongoDB esté ejecutándose
- Verificar la configuración en `application.properties`
- Verificar que el puerto 27017 esté disponible

### Error: Port 8080 already in use

**Solución:**
- Cambiar el puerto en `application.properties`: `server.port=8081`
- O detener el proceso que usa el puerto 8080

## Siguiente Fase: Frontend con React

Este backend está preparado para conectarse con un frontend desarrollado en React. Los endpoints REST proporcionan todas las operaciones CRUD necesarias para construir una interfaz de usuario completa.

