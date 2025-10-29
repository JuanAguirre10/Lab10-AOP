# 🏥 Sistema de Gestión Hospitalaria - HospitalMdb v2.0

Sistema integral de gestión hospitalaria desarrollado con Spring Boot (Backend) y React + Material-UI (Frontend) que permite administrar pacientes, citas, consultas, hospitalización, facturación, auditoría y reportes.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Backend - Spring Boot](#backend---spring-boot)
- [Frontend - React](#frontend---react)
- [Instalación y Configuración](#instalación-y-configuración)
- [Módulos del Sistema](#módulos-del-sistema)
- [API Endpoints](#api-endpoints)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Autor](#autor)

---

## 🎯 Descripción

Sistema de Gestión Hospitalaria que integra todos los procesos relacionados con la atención médica:

- **Gestión de Pacientes**: Registro completo con historia clínica
- **Gestión de Médicos**: Control de especialidades y horarios
- **Citas Médicas**: Programación y seguimiento
- **Consultas Médicas**: Registro con diagnósticos y recetas
- **Hospitalización**: Control de ingresos y habitaciones
- **Facturación**: Emisión y control de pagos
- **Auditoría**: Registro automático de todas las operaciones
- **Reportes**: Generación de PDF y Excel

---

## 🛠️ Tecnologías

### Backend
- **Framework**: Spring Boot 3.5.6
- **Base de Datos**: MongoDB
- **Lenguaje**: Java 17
- **Build Tool**: Maven
- **Librerías**:
  - Lombok (reducción de código boilerplate)
  - Spring Data MongoDB
  - OpenPDF / Apache PDFBox (reportes PDF)
  - Apache POI (reportes Excel)
  - Spring AOP (auditoría)

### Frontend
- **Framework**: React 18.3.1
- **UI Library**: Material-UI (MUI) 6.3.0
- **Routing**: React Router DOM 7.1.1
- **HTTP Client**: Axios 1.7.9
- **Notifications**: React Toastify 10.0.6
- **Build Tool**: Vite 6.0.5
- **Styling**: Emotion (CSS-in-JS)

---

## 🏗️ Arquitectura del Sistema

### Estructura General

```
HospitalMdb/
├── Backend (Spring Boot)
│   ├── src/main/java/com/tecsup/HospitalMdb/
│   │   ├── aspectos/
│   │   ├── auditoria/
│   │   ├── reportes/
│   │   ├── pacientes/
│   │   ├── medicos/
│   │   ├── citas/
│   │   ├── consultas/
│   │   ├── hospitalizacion/
│   │   ├── facturacion/
│   │   ├── config/
│   │   └── seguridad/
│   └── src/main/resources/
│       └── application.properties
│
└── Frontend (React)
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   ├── utils/
    │   └── App.jsx
    ├── public/
    └── package.json
```

---

## 🔧 Backend - Spring Boot

### Estructura de Paquetes

```
com.tecsup.HospitalMdb/
├── aspectos/
│   └── LoggingAspecto.java
├── auditoria/
│   ├── Auditoria.java
│   ├── AuditoriaController.java
│   └── AuditoriaDao.java
├── reportes/
│   └── AbstractReporteView.java
├── pacientes/
│   ├── models/
│   │   └── Paciente.java
│   ├── PacienteDao.java
│   ├── PacienteService.java
│   ├── PacienteController.java
│   └── views/
│       ├── PacientesPdfView.java
│       └── PacientesXlsView.java
├── citas/
│   ├── models/
│   │   └── Cita.java
│   ├── CitaDao.java
│   ├── CitaService.java
│   ├── CitaController.java
│   └── views/
│       ├── CitasPdfView.java
│       └── CitasXlsView.java
├── consultas/
│   ├── models/
│   │   ├── Consulta.java
│   │   ├── Diagnostico.java
│   │   ├── RecetaMedica.java
│   │   └── DetalleReceta.java
│   ├── ConsultaDao.java
│   ├── ConsultaService.java
│   ├── ConsultaController.java
│   └── views/
│       ├── ConsultasPdfView.java
│       └── ConsultasXlsView.java
├── medicos/
├── hospitalizacion/
├── facturacion/
├── config/
│   └── CorsConfig.java
└── seguridad/
    ├── Usuario.java
    └── UsuarioController.java
```

### Configuración (application.properties)

```properties
spring.application.name=HospitalMdb

spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=hospital_db

server.port=8080
```

### Dependencias Maven (pom.xml)

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <dependency>
        <groupId>com.github.librepdf</groupId>
        <artifactId>openpdf</artifactId>
        <version>1.3.30</version>
    </dependency>
    
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>5.2.3</version>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

### Sistema de Auditoría

**Entidad: Auditoria**

```java
@Document(collection = "auditorias")
public class Auditoria {
    @Id
    private String id;
    private String usuario;
    private String accion;
    private String tabla;
    private String idRegistro;
    private String datosAnteriores;
    private String datosNuevos;
    private Date fecha;
    private String ip;
}
```

**Endpoints de Auditoría:**

```
GET  /api/auditorias
GET  /api/auditorias/tabla/{tabla}
GET  /api/auditorias/usuario/{usuario}
GET  /api/auditorias/accion/{accion}
GET  /api/auditorias/registro/{id}
GET  /api/auditorias/rango?inicio={fecha}&fin={fecha}
GET  /api/auditorias/filtro?tabla={tabla}&accion={accion}
GET  /api/auditorias/estadisticas
```

### Sistema de Reportes

**Reportes Disponibles:**

1. **Pacientes**
   - `GET /api/pacientes/reporte/pdf`
   - `GET /api/pacientes/reporte/excel`

2. **Citas**
   - `GET /api/citas/reporte/pdf`
   - `GET /api/citas/reporte/excel`

3. **Consultas**
   - `GET /api/consultas/reporte/pdf`
   - `GET /api/consultas/reporte/excel`

---

## 💻 Frontend - React

### Estructura del Proyecto

```
hospital-frontend/
├── src/
│   ├── components/
│   │   ├── auditoria/
│   │   │   ├── AuditoriaTable.jsx
│   │   │   ├── AuditoriaFiltros.jsx
│   │   │   └── AuditoriaDetalle.jsx
│   │   ├── citas/
│   │   │   ├── CitaTable.jsx
│   │   │   ├── CitaForm.jsx
│   │   │   └── CitaDetail.jsx
│   │   ├── consultas/
│   │   │   ├── ConsultaTable.jsx
│   │   │   ├── ConsultaForm.jsx
│   │   │   └── ConsultaDetail.jsx
│   │   ├── diagnosticos/
│   │   │   ├── DiagnosticoTable.jsx
│   │   │   ├── DiagnosticoForm.jsx
│   │   │   ├── RecetaTable.jsx
│   │   │   ├── RecetaForm.jsx
│   │   │   ├── DetalleRecetaTable.jsx
│   │   │   └── DetalleRecetaForm.jsx
│   │   ├── facturacion/
│   │   ├── habitaciones/
│   │   ├── hospitalizacion/
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── medicos/
│   │   ├── pacientes/
│   │   ├── reportes/
│   │   │   └── ReporteCard.jsx
│   │   └── usuarios/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PacientesPage.jsx
│   │   ├── MedicosPage.jsx
│   │   ├── CitasPage.jsx
│   │   ├── ConsultasPage.jsx
│   │   ├── HospitalizacionPage.jsx
│   │   ├── HabitacionesPage.jsx
│   │   ├── FacturacionPage.jsx
│   │   ├── DiagnosticosPage.jsx
│   │   ├── UsuariosPage.jsx
│   │   ├── AuditoriaPage.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── pacienteService.js
│   │   ├── medicoService.js
│   │   ├── citaService.js
│   │   ├── consultaService.js
│   │   ├── hospitalizacionService.js
│   │   ├── habitacionService.js
│   │   ├── facturaService.js
│   │   ├── diagnosticoService.js
│   │   ├── recetaService.js
│   │   ├── detalleRecetaService.js
│   │   ├── usuarioService.js
│   │   ├── auditoriaService.js
│   │   └── reporteService.js
│   ├── utils/
│   │   └── PrivateRoute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.js
├── public/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

### Dependencias del Frontend (package.json)

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "@mui/material": "^6.3.0",
    "@mui/icons-material": "^6.3.0",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "axios": "^1.7.9",
    "react-toastify": "^10.0.6"
  },
  "devDependencies": {
    "vite": "^6.0.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0"
  }
}
```

### Configuración de API (src/services/api.js)

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
```

### Variables de Entorno (.env)

```env
VITE_API_URL=http://localhost:8080/api
VITE_PORT=5173
VITE_MODE=development
```

---

## 📦 Instalación y Configuración

### Requisitos Previos

- **JDK 17** o superior
- **Maven 3.6+**
- **MongoDB 4.4+**
- **Node.js 16+** y **npm 8+**
- **Git**

### Instalación del Backend

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/hospital-backend.git
   cd hospital-backend
   ```

2. **Instalar MongoDB y ejecutar:**
   ```bash
   mongod
   ```

3. **Crear base de datos:**
   - Abrir MongoDB Compass
   - Conectar a `mongodb://localhost:27017`
   - Crear base de datos: `hospital_db`

4. **Compilar el proyecto:**
   ```bash
   mvn clean install
   ```

5. **Ejecutar la aplicación:**
   ```bash
   mvn spring-boot:run
   ```

6. **Verificar:**
   ```
   http://localhost:8080/api/pacientes
   ```

### Instalación del Frontend

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/hospital-frontend.git
   cd hospital-frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación:**
   ```
   http://localhost:5173
   ```

6. **Build para producción:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🏥 Módulos del Sistema

### 1. Dashboard

**Características:**
- Estadísticas en tiempo real
- Total de pacientes, médicos, citas y consultas
- Estado de hospitalizaciones
- Resumen financiero con gráficos
- Cards con animaciones hover

### 2. Pacientes

**Funcionalidades:**
- CRUD completo de pacientes
- Búsqueda por nombre, DNI o email
- Ver detalles completos
- Historia clínica automática
- Generación de reportes PDF/Excel

**Campos:**
- DNI, Nombres, Apellidos
- Fecha de nacimiento, Género
- Dirección, Teléfono, Email
- Tipo de sangre, Estado

**Reportes integrados:**
- Botón PDF en el header
- Botón Excel en el header

### 3. Médicos

**Funcionalidades:**
- Gestión de médicos
- Especialidades
- Horarios de atención
- Búsqueda por nombre o especialidad

### 4. Citas Médicas

**Funcionalidades:**
- Programación de citas
- Estados: Programada, Atendida, Cancelada
- Asignación de paciente y médico
- Búsqueda por fecha y estado
- Generación de reportes PDF/Excel

**Reportes integrados:**
- Botón PDF en el header
- Botón Excel en el header

### 5. Consultas Médicas

**Funcionalidades:**
- Registro de consultas
- Motivo y observaciones
- Vinculación con diagnósticos y recetas
- Detalle completo con medicamentos
- Generación de reportes PDF/Excel

**Reportes integrados:**
- Botón PDF en el header
- Botón Excel en el header

### 6. Hospitalización

**Funcionalidades:**
- Registro de ingresos
- Asignación de habitaciones
- Control de altas
- Estados: Activo/Finalizado

### 7. Habitaciones

**Funcionalidades:**
- Gestión de habitaciones
- Tipos: Individual, Doble, UCI, Pediatría
- Estados: Disponible, Ocupada, Mantenimiento

### 8. Diagnósticos y Recetas

**Sistema integrado con 3 tabs:**

**Tab 1: Diagnósticos**
- Tipo: Principal, Secundario, Diferencial
- Descripción completa
- Vinculación con consulta

**Tab 2: Recetas Médicas**
- Indicaciones generales
- Vinculación con consulta

**Tab 3: Detalle de Medicamentos**
- Nombre del medicamento
- Dosis, frecuencia, duración
- Vinculación con receta

### 9. Facturación

**Funcionalidades:**
- Emisión de facturas
- Estados: Pendiente, Pagada, Anulada
- Métodos de pago
- Resumen financiero

### 10. Usuarios

**Funcionalidades:**
- Gestión de usuarios del sistema
- Roles: Admin, Médico, Recepcionista
- Control de acceso
- Estados activo/inactivo

### 11. Auditoría

**Características:**
- Registro automático de operaciones CRUD
- Filtros por usuario, acción, tabla y fecha
- Modal con detalles completos
- Visualización de datos anteriores y nuevos
- Formato JSON legible

**Filtros disponibles:**
- Por usuario
- Por acción (CREATE, UPDATE, DELETE)
- Por tabla (pacientes, citas, consultas, etc.)
- Por rango de fechas

**Campos mostrados:**
- Usuario que realizó la acción
- Tipo de acción
- Tabla afectada
- ID del registro
- Fecha y hora
- Dirección IP
- Datos anteriores (en UPDATE/DELETE)
- Datos nuevos (en CREATE/UPDATE)

---

## 🔌 API Endpoints

### Autenticación
```
POST   /api/usuarios/login
POST   /api/usuarios/logout
GET    /api/usuarios/me
```

### Pacientes
```
GET    /api/pacientes
GET    /api/pacientes/{id}
POST   /api/pacientes
PUT    /api/pacientes/{id}
DELETE /api/pacientes/{id}
GET    /api/pacientes/dni/{dni}
GET    /api/pacientes/estado/{estado}
GET    /api/pacientes/reporte/pdf
GET    /api/pacientes/reporte/excel
```

### Médicos
```
GET    /api/medicos
GET    /api/medicos/{id}
POST   /api/medicos
PUT    /api/medicos/{id}
DELETE /api/medicos/{id}
GET    /api/medicos/especialidad/{especialidad}
```

### Citas
```
GET    /api/citas
GET    /api/citas/{id}
POST   /api/citas
PUT    /api/citas/{id}
DELETE /api/citas/{id}
GET    /api/citas/estado/{estado}
GET    /api/citas/paciente/{id}
GET    /api/citas/medico/{id}
GET    /api/citas/fecha/{fecha}
GET    /api/citas/reporte/pdf
GET    /api/citas/reporte/excel
```

### Consultas
```
GET    /api/consultas
GET    /api/consultas/{id}
POST   /api/consultas
PUT    /api/consultas/{id}
DELETE /api/consultas/{id}
GET    /api/consultas/paciente/{id}
GET    /api/consultas/medico/{id}
GET    /api/consultas/reporte/pdf
GET    /api/consultas/reporte/excel
```

### Diagnósticos
```
GET    /api/diagnosticos
GET    /api/diagnosticos/{id}
POST   /api/diagnosticos
PUT    /api/diagnosticos/{id}
DELETE /api/diagnosticos/{id}
GET    /api/diagnosticos/consulta/{id}
```

### Recetas
```
GET    /api/recetas
GET    /api/recetas/{id}
POST   /api/recetas
PUT    /api/recetas/{id}
DELETE /api/recetas/{id}
GET    /api/recetas/consulta/{id}
```

### Detalle Recetas
```
GET    /api/detalle-recetas
GET    /api/detalle-recetas/{id}
POST   /api/detalle-recetas
PUT    /api/detalle-recetas/{id}
DELETE /api/detalle-recetas/{id}
GET    /api/detalle-recetas/receta/{id}
```

### Hospitalización
```
GET    /api/hospitalizaciones
GET    /api/hospitalizaciones/{id}
POST   /api/hospitalizaciones
PUT    /api/hospitalizaciones/{id}
DELETE /api/hospitalizaciones/{id}
GET    /api/hospitalizaciones/paciente/{id}
GET    /api/hospitalizaciones/estado/{estado}
```

### Habitaciones
```
GET    /api/habitaciones
GET    /api/habitaciones/{id}
POST   /api/habitaciones
PUT    /api/habitaciones/{id}
DELETE /api/habitaciones/{id}
GET    /api/habitaciones/estado/{estado}
GET    /api/habitaciones/tipo/{tipo}
GET    /api/habitaciones/numero/{numero}
```

### Facturación
```
GET    /api/facturas
GET    /api/facturas/{id}
POST   /api/facturas
PUT    /api/facturas/{id}
DELETE /api/facturas/{id}
GET    /api/facturas/paciente/{id}
GET    /api/facturas/estado/{estado}
```

### Auditoría
```
GET    /api/auditorias
GET    /api/auditorias/tabla/{tabla}
GET    /api/auditorias/usuario/{usuario}
GET    /api/auditorias/accion/{accion}
GET    /api/auditorias/registro/{id}
GET    /api/auditorias/rango?inicio={fecha}&fin={fecha}
GET    /api/auditorias/filtro?tabla={tabla}&accion={accion}
GET    /api/auditorias/estadisticas
```

### Usuarios
```
GET    /api/usuarios
GET    /api/usuarios/{id}
POST   /api/usuarios
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}
```

---

## 🎨 Características del Frontend

### Diseño y UX

**Paleta de Colores:**
- Primario (Pacientes): `#1976d2` - Azul
- Secundario (Médicos): `#9c27b0` - Morado
- Info (Citas): `#0288d1` - Azul claro
- Warning (Consultas): `#ed6c02` - Naranja
- Error (Hospitalización): `#d32f2f` - Rojo
- Success (Finanzas): `#2e7d32` - Verde

**Características:**
- Diseño responsive (móvil, tablet, desktop)
- Animaciones suaves en hover
- Sidebar colapsable
- Notificaciones toast elegantes
- Modales interactivos
- Tablas con paginación
- Búsqueda en tiempo real
- Chips con estados de colores
- Cards con sombras y efectos

### Sistema de Reportes Integrado

**En cada módulo:**
- Botones de PDF y Excel en el header
- Descarga directa al hacer clic
- Nombres de archivos con timestamp
- Notificaciones de éxito/error
- Estados de carga (loading)
- Colores distintivos:
  - PDF: Rojo (`#dc3545`)
  - Excel: Verde (`#28a745`)

**Módulos con reportes:**
- Pacientes
- Citas
- Consultas

---

## 📸 Capturas de Pantalla

### Dashboard
- Tarjetas de estadísticas con iconos
- Resumen de actividad del día
- Estado de hospitalizaciones
- Resumen financiero con progreso

### Módulo de Pacientes
- Lista completa con búsqueda
- Botones de PDF y Excel en el header
- Formulario de creación/edición
- Modal de detalles completos

### Módulo de Citas
- Tabla con estados (programada, atendida, cancelada)
- Botones de PDF y Excel en el header
- Autocompletado de paciente y médico
- Selector de fecha y hora

### Módulo de Consultas
- Registro de consulta médica
- Botones de PDF y Excel en el header
- Modal de detalle con diagnósticos y recetas
- Visualización de medicamentos

### Módulo de Auditoría
- Tabla con todas las operaciones
- Filtros avanzados (usuario, acción, tabla, fecha)
- Modal de detalles con JSON formateado
- Chips de colores por tipo de acción

---

## 🔐 Credenciales de Prueba

### Administrador
```
Usuario: admin
Contraseña: admin123
Rol: Administrador
```

### Médico
```
Usuario: medico1
Contraseña: medico123
Rol: Médico
```

### Recepcionista
```
Usuario: recepcion1
Contraseña: recep123
Rol: Recepcionista
```

---

## 🗄️ Base de Datos MongoDB

**Base de datos:** `hospital_db`

**Colecciones:**
- `pacientes`
- `historias_clinicas`
- `antecedentes_medicos`
- `medicos`
- `especialidades`
- `medico_especialidades`
- `citas`
- `consultas`
- `diagnosticos`
- `recetas_medicas`
- `detalle_recetas`
- `habitaciones`
- `hospitalizaciones`
- `facturas`
- `detalle_facturas`
- `usuarios`
- `bitacoras`
- `auditorias`

---

## 🔧 Solución de Problemas

### Backend

**Error: Cannot connect to MongoDB**
```bash
mongod
netstat -an | grep 27017
```

**Error: Port 8080 already in use**
```properties
server.port=8081
```

**Error: Lombok not working**
```
File → Settings → Build → Compiler → Annotation Processors
Enable annotation processing
```

### Frontend

**Error: Cannot connect to backend**
```bash
Verificar backend en http://localhost:8080
Revisar .env: VITE_API_URL=http://localhost:8080/api
Verificar CORS en backend
```

**Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: Port 5173 already in use**
```bash
lsof -ti:5173 | xargs kill -9
```

---

## 🚀 Scripts Disponibles

### Backend
```bash
mvn clean install
mvn spring-boot:run
mvn clean compile
```

### Frontend
```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 📋 Próximas Mejoras

- [ ] Reportes para Médicos y Hospitalización
- [ ] Gráficos estadísticos en Dashboard
- [ ] Filtros avanzados en reportes
- [ ] Exportación a CSV
- [ ] Envío de reportes por email
- [ ] Sistema de notificaciones en tiempo real
- [ ] Chat médico-paciente
- [ ] Agenda visual de citas
- [ ] Backup automático
- [ ] App móvil (React Native)


## 🙏 Agradecimientos

- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [Material-UI](https://mui.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vite](https://vitejs.dev/)
- [Apache POI](https://poi.apache.org/)
- [OpenPDF](https://github.com/LibrePDF/OpenPDF)

---

**⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub!**

**Juan Aguirre - TECSUP 2025**
