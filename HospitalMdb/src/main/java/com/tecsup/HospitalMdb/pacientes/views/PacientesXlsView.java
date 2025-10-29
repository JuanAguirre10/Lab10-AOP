package com.tecsup.HospitalMdb.pacientes.views;

import com.tecsup.HospitalMdb.reportes.AbstractReporteView;
import com.tecsup.HospitalMdb.pacientes.models.Paciente;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Vista para generar reporte Excel de pacientes
 *
 * Genera un archivo Excel (.xlsx) con la lista de pacientes
 * incluyendo todos sus datos con formato profesional.
 */
public class PacientesXlsView extends AbstractReporteView {

    public PacientesXlsView() {
        super("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    @Override
    protected void renderMergedOutputModel(
            Map<String, Object> model,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        // Obtener lista de pacientes
        @SuppressWarnings("unchecked")
        List<Paciente> pacientes = (List<Paciente>) model.get("pacientes");

        // Configurar nombre del archivo
        String fileName = "Reporte_Pacientes_" +
                new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".xlsx";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        // Crear libro de Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Pacientes");

        // ====================
        // ESTILOS
        // ====================

        // Estilo para título
        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 16);
        titleFont.setColor(IndexedColors.DARK_BLUE.getIndex());
        titleStyle.setFont(titleFont);
        titleStyle.setAlignment(HorizontalAlignment.CENTER);

        // Estilo para encabezados
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(IndexedColors.WHITE.getIndex());
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        // Estilo para datos
        CellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);
        dataStyle.setAlignment(HorizontalAlignment.LEFT);
        dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // Estilo para datos centrados
        CellStyle dataCenterStyle = workbook.createCellStyle();
        dataCenterStyle.cloneStyleFrom(dataStyle);
        dataCenterStyle.setAlignment(HorizontalAlignment.CENTER);

        // Estilo para estado activo
        CellStyle activoStyle = workbook.createCellStyle();
        activoStyle.cloneStyleFrom(dataCenterStyle);
        activoStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        activoStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // Estilo para estado inactivo
        CellStyle inactivoStyle = workbook.createCellStyle();
        inactivoStyle.cloneStyleFrom(dataCenterStyle);
        inactivoStyle.setFillForegroundColor(IndexedColors.LIGHT_ORANGE.getIndex());
        inactivoStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // Estilo para fecha
        CellStyle dateStyle = workbook.createCellStyle();
        dateStyle.cloneStyleFrom(dataCenterStyle);
        CreationHelper createHelper = workbook.getCreationHelper();
        dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd/mm/yyyy"));

        // ====================
        // TÍTULO
        // ====================
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("REPORTE DE PACIENTES");
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 7));

        // Fecha de generación
        Row dateRow = sheet.createRow(1);
        Cell dateCell = dateRow.createCell(0);
        dateCell.setCellValue("Fecha de generación: " +
                new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()));
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(1, 1, 0, 7));

        // Fila vacía
        sheet.createRow(2);

        // ====================
        // ENCABEZADOS
        // ====================
        Row headerRow = sheet.createRow(3);
        String[] headers = {"DNI", "Nombres", "Apellidos", "F. Nacimiento", "Sexo", "Dirección", "Teléfono", "Estado"};

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // ====================
        // DATOS
        // ====================
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        int rowNum = 4;

        for (Paciente paciente : pacientes) {
            Row row = sheet.createRow(rowNum++);

            // DNI
            Cell cell = row.createCell(0);
            cell.setCellValue(paciente.getDni());
            cell.setCellStyle(dataStyle);

            // Nombres
            cell = row.createCell(1);
            cell.setCellValue(paciente.getNombres());
            cell.setCellStyle(dataStyle);

            // Apellidos
            cell = row.createCell(2);
            cell.setCellValue(paciente.getApellidos());
            cell.setCellStyle(dataStyle);

            // Fecha de Nacimiento
            cell = row.createCell(3);
            if (paciente.getFechaNacimiento() != null) {
                cell.setCellValue(paciente.getFechaNacimiento());
                cell.setCellStyle(dateStyle);
            } else {
                cell.setCellValue("N/A");
                cell.setCellStyle(dataCenterStyle);
            }
            cell.setCellStyle(dataCenterStyle);

            // Sexo
            cell = row.createCell(4);
            cell.setCellValue(paciente.getSexo());
            cell.setCellStyle(dataCenterStyle);

            // Dirección
            cell = row.createCell(5);
            cell.setCellValue(paciente.getDireccion());
            cell.setCellStyle(dataStyle);

            // Teléfono
            cell = row.createCell(6);
            cell.setCellValue(paciente.getTelefono());
            cell.setCellStyle(dataCenterStyle);

            // Estado
            cell = row.createCell(7);
            cell.setCellValue(paciente.getEstado());
            if ("activo".equalsIgnoreCase(paciente.getEstado())) {
                cell.setCellStyle(activoStyle);
            } else {
                cell.setCellStyle(inactivoStyle);
            }
        }

        // ====================
        // PIE DE PÁGINA
        // ====================
        Row footerRow = sheet.createRow(rowNum + 1);
        Cell footerCell = footerRow.createCell(0);
        footerCell.setCellValue("Total de pacientes: " + pacientes.size());
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(rowNum + 1, rowNum + 1, 0, 7));

        // ====================
        // AJUSTAR ANCHO DE COLUMNAS
        // ====================
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
            // Añadir un poco más de espacio
            sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 1000);
        }

        // Escribir al response
        workbook.write(response.getOutputStream());
        workbook.close();
    }
}