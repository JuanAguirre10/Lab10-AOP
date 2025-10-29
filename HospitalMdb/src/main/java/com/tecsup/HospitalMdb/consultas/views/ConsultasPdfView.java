package com.tecsup.HospitalMdb.consultas.views;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.tecsup.HospitalMdb.reportes.AbstractReporteView;
import com.tecsup.HospitalMdb.consultas.models.ConsultaDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.awt.Color;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ConsultasPdfView extends AbstractReporteView {

    public ConsultasPdfView() {
        super("application/pdf");
    }

    @Override
    protected void renderMergedOutputModel(
            Map<String, Object> model,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        @SuppressWarnings("unchecked")
        List<ConsultaDTO> consultas = (List<ConsultaDTO>) model.get("consultas");

        String fileName = "Reporte_Consultas_" +
                new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".pdf";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        Document document = new Document(PageSize.A4.rotate());
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD, Color.BLUE);
        Paragraph title = new Paragraph("REPORTE DE CONSULTAS", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);

        Font dateFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.GRAY);
        Paragraph dateInfo = new Paragraph(
                "Fecha de generación: " + new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()),
                dateFont
        );
        dateInfo.setAlignment(Element.ALIGN_RIGHT);
        dateInfo.setSpacingAfter(10);
        document.add(dateInfo);

        PdfPTable table = new PdfPTable(7);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10);

        float[] columnWidths = {10f, 20f, 20f, 12f, 10f, 20f, 20f};
        table.setWidths(columnWidths);

        PdfPCell headerCell;
        Font headerFont = new Font(Font.HELVETICA, 10, Font.BOLD, Color.WHITE);

        String[] headers = {"N° Cita", "Médico", "Paciente", "Fecha", "Hora", "Motivo", "Observaciones"};

        for (String header : headers) {
            headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setBackgroundColor(new Color(41, 128, 185));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            headerCell.setPadding(8);
            table.addCell(headerCell);
        }

        Font dataFont = new Font(Font.HELVETICA, 9, Font.NORMAL);
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        for (ConsultaDTO consulta : consultas) {
            PdfPCell cell = new PdfPCell(new Phrase(consulta.getNumeroCita(), dataFont));
            cell.setPadding(5);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(consulta.getNombreMedico(), dataFont));
            cell.setPadding(5);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(consulta.getNombrePaciente(), dataFont));
            cell.setPadding(5);
            table.addCell(cell);

            String fecha = consulta.getFecha() != null ?
                    consulta.getFecha().format(dateFormatter) : "N/A";
            cell = new PdfPCell(new Phrase(fecha, dataFont));
            cell.setPadding(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(consulta.getHora(), dataFont));
            cell.setPadding(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(consulta.getMotivoConsulta(), dataFont));
            cell.setPadding(5);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(consulta.getObservaciones(), dataFont));
            cell.setPadding(5);
            table.addCell(cell);
        }

        document.add(table);

        Font footerFont = new Font(Font.HELVETICA, 8, Font.ITALIC, Color.GRAY);
        Paragraph footer = new Paragraph(
                "\nTotal de consultas: " + consultas.size() +
                        " | Sistema de Gestión Hospitalaria - HospitalMdb",
                footerFont
        );
        footer.setAlignment(Element.ALIGN_CENTER);
        footer.setSpacingBefore(20);
        document.add(footer);

        document.close();
    }
}