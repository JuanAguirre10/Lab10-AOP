package com.tecsup.HospitalMdb.consultas.views;

import com.tecsup.HospitalMdb.reportes.AbstractReporteView;
import com.tecsup.HospitalMdb.consultas.models.ConsultaDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ConsultasXlsView extends AbstractReporteView {

    public ConsultasXlsView() {
        super("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    @Override
    protected void renderMergedOutputModel(
            Map<String, Object> model,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        @SuppressWarnings("unchecked")
        List<ConsultaDTO> consultas = (List<ConsultaDTO>) model.get("consultas");

        String fileName = "Reporte_Consultas_" +
                new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".xlsx";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Consultas");

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

        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("REPORTE DE CONSULTAS");
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 6));

        Row dateRow = sheet.createRow(1);
        Cell dateCell = dateRow.createCell(0);
        dateCell.setCellValue("Fecha de generación: " +
                new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()));
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(1, 1, 0, 6));

        sheet.createRow(2);

        Row headerRow = sheet.createRow(3);
        String[] headers = {"N° Cita", "Médico", "Paciente", "Fecha", "Hora", "Motivo Consulta", "Observaciones"};

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        int rowNum = 4;

        for (ConsultaDTO consulta : consultas) {
            Row row = sheet.createRow(rowNum++);

            Cell cell = row.createCell(0);
            cell.setCellValue(consulta.getNumeroCita());
            cell.setCellStyle(dataStyle);

            cell = row.createCell(1);
            cell.setCellValue(consulta.getNombreMedico());
            cell.setCellStyle(dataStyle);

            cell = row.createCell(2);
            cell.setCellValue(consulta.getNombrePaciente());
            cell.setCellStyle(dataStyle);

            cell = row.createCell(3);
            if (consulta.getFecha() != null) {
                Date date = Date.from(consulta.getFecha().atStartOfDay(ZoneId.systemDefault()).toInstant());
                cell.setCellValue(date);
                cell.setCellStyle(dateStyle);
            } else {
                cell.setCellValue("N/A");
                cell.setCellStyle(dataCenterStyle);
            }

            cell = row.createCell(4);
            cell.setCellValue(consulta.getHora());
            cell.setCellStyle(dataCenterStyle);

            cell = row.createCell(5);
            cell.setCellValue(consulta.getMotivoConsulta());
            cell.setCellStyle(dataStyle);

            cell = row.createCell(6);
            cell.setCellValue(consulta.getObservaciones());
            cell.setCellStyle(dataStyle);
        }

        Row footerRow = sheet.createRow(rowNum + 1);
        Cell footerCell = footerRow.createCell(0);
        footerCell.setCellValue("Total de consultas: " + consultas.size());
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(rowNum + 1, rowNum + 1, 0, 6));

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
            sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 1000);
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}