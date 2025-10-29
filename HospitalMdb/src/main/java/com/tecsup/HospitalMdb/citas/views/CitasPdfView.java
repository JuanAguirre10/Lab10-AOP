package com.tecsup.HospitalMdb.citas.views;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.tecsup.HospitalMdb.reportes.AbstractReporteView;
import com.tecsup.HospitalMdb.citas.models.CitaDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.awt.Color;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class CitasPdfView extends AbstractReporteView {

    public CitasPdfView() {
        super("application/pdf");
    }

    @Override
    protected void renderMergedOutputModel(
            Map<String, Object> model,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        @SuppressWarnings("unchecked")
        List<CitaDTO> citas = (List<CitaDTO>) model.get("citas");

        String fileName = "Reporte_Citas_" +
                new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".pdf";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        Document document = new Document(PageSize.A4.rotate());
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD, Color.BLUE);
        Paragraph title = new Paragraph("REPORTE DE CITAS MEDICAS", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);

        Font dateFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.GRAY);
        Paragraph dateInfo = new Paragraph(
                "Fecha de generacion: " + new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()),
                dateFont
        );
        dateInfo.setAlignment(Element.ALIGN_RIGHT);
        dateInfo.setSpacingAfter(10);
        document.add(dateInfo);

        PdfPTable table = new PdfPTable(6);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10);

        float[] columnWidths = {20f, 20f, 12f, 12f, 20f, 12f};
        table.setWidths(columnWidths);

        PdfPCell headerCell;
        Font headerFont = new Font(Font.HELVETICA, 10, Font.BOLD, Color.WHITE);

        String[] headers = {"Paciente", "Medico", "Fecha", "Hora", "Motivo", "Estado"};

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

        for (CitaDTO cita : citas) {
            PdfPCell cell = new PdfPCell(new Phrase(cita.getNombrePaciente(), dataFont));
            cell.setPadding(5);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(cita.getNombreMedico(), dataFont));
            cell.setPadding(5);
            table.addCell(cell);

            String fecha = cita.getFecha() != null ? cita.getFecha().format(dateFormatter) : "N/A";
            cell = new PdfPCell(new Phrase(fecha, dataFont));
            cell.setPadding(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(cita.getHora(), dataFont));
            cell.setPadding(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(cita.getMotivo(), dataFont));
            cell.setPadding(5);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(cita.getEstado(), dataFont));
            cell.setPadding(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);

            if ("programada".equalsIgnoreCase(cita.getEstado())) {
                cell.setBackgroundColor(new Color(255, 243, 205));
            } else if ("atendida".equalsIgnoreCase(cita.getEstado())) {
                cell.setBackgroundColor(new Color(212, 237, 218));
            } else if ("cancelada".equalsIgnoreCase(cita.getEstado())) {
                cell.setBackgroundColor(new Color(248, 215, 218));
            }

            table.addCell(cell);
        }

        document.add(table);

        Font footerFont = new Font(Font.HELVETICA, 8, Font.ITALIC, Color.GRAY);
        Paragraph footer = new Paragraph(
                "\nTotal de citas: " + citas.size() +
                        " | Sistema de Gestion Hospitalaria - HospitalMdb",
                footerFont
        );
        footer.setAlignment(Element.ALIGN_CENTER);
        footer.setSpacingBefore(20);
        document.add(footer);

        document.close();
    }
}