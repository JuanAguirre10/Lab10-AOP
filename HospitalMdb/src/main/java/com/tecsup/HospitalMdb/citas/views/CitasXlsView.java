package com.tecsup.HospitalMdb.citas.views;

import com.tecsup.HospitalMdb.reportes.AbstractReporteView;
import com.tecsup.HospitalMdb.citas.models.CitaDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class CitasXlsView extends AbstractReporteView {

    public CitasXlsView() {
        super("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    @Override
    protected void renderMergedOutputModel(
            Map<String, Object> model,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        @SuppressWarnings("unchecked")
        List<CitaDTO> citas = (List<CitaDTO>) model.get("citas");

        String fileName = "Reporte_Citas_" +
                new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".xlsx";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Citas");

        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 16);
        titleFont.setColor(IndexedColors.DARK_BLUE.getIndex());
        titleStyle.setFont(titleFont);
        titleStyle.setAlignment(HorizontalAlignment.CENTER);

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

        CellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);
        dataStyle.setAlignment(HorizontalAlignment.LEFT);
        dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        CellStyle dataCenterStyle = workbook.createCellStyle();
        dataCenterStyle.cloneStyleFrom(dataStyle);
        dataCenterStyle.setAlignment(HorizontalAlignment.CENTER);

        CellStyle dateStyle = workbook.createCellStyle();
        dateStyle.cloneStyleFrom(dataCenterStyle);
        CreationHelper createHelper = workbook.getCreationHelper();
        dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd/mm/yyyy"));

        CellStyle programadaStyle = workbook.createCellStyle();
        programadaStyle.cloneStyleFrom(dataCenterStyle);
        programadaStyle.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
        programadaStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle atendidaStyle = workbook.createCellStyle();
        atendidaStyle.cloneStyleFrom(dataCenterStyle);
        atendidaStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        atendidaStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle canceladaStyle = workbook.createCellStyle();
        canceladaStyle.cloneStyleFrom(dataCenterStyle);
        canceladaStyle.setFillForegroundColor(IndexedColors.LIGHT_ORANGE.getIndex());
        canceladaStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("REPORTE DE CITAS MEDICAS");
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 5));

        Row dateRow = sheet.createRow(1);
        Cell dateCell = dateRow.createCell(0);
        dateCell.setCellValue("Fecha de generacion: " +
                new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()));
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(1, 1, 0, 5));

        sheet.createRow(2);

        Row headerRow = sheet.createRow(3);
        String[] headers = {"Paciente", "Medico", "Fecha", "Hora", "Motivo", "Estado"};

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        int rowNum = 4;

        for (CitaDTO cita : citas) {
            Row row = sheet.createRow(rowNum++);

            Cell cell = row.createCell(0);
            cell.setCellValue(cita.getNombrePaciente());
            cell.setCellStyle(dataStyle);

            cell = row.createCell(1);
            cell.setCellValue(cita.getNombreMedico());
            cell.setCellStyle(dataStyle);

            cell = row.createCell(2);
            if (cita.getFecha() != null) {
                Date date = Date.from(cita.getFecha().atStartOfDay(ZoneId.systemDefault()).toInstant());
                cell.setCellValue(date);
                cell.setCellStyle(dateStyle);
            } else {
                cell.setCellValue("N/A");
                cell.setCellStyle(dataCenterStyle);
            }

            cell = row.createCell(3);
            cell.setCellValue(cita.getHora());
            cell.setCellStyle(dataCenterStyle);

            cell = row.createCell(4);
            cell.setCellValue(cita.getMotivo());
            cell.setCellStyle(dataStyle);

            cell = row.createCell(5);
            cell.setCellValue(cita.getEstado());
            if ("programada".equalsIgnoreCase(cita.getEstado())) {
                cell.setCellStyle(programadaStyle);
            } else if ("atendida".equalsIgnoreCase(cita.getEstado())) {
                cell.setCellStyle(atendidaStyle);
            } else if ("cancelada".equalsIgnoreCase(cita.getEstado())) {
                cell.setCellStyle(canceladaStyle);
            } else {
                cell.setCellStyle(dataCenterStyle);
            }
        }

        Row footerRow = sheet.createRow(rowNum + 1);
        Cell footerCell = footerRow.createCell(0);
        footerCell.setCellValue("Total de citas: " + citas.size());
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(rowNum + 1, rowNum + 1, 0, 5));

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
            sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 1000);
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}
