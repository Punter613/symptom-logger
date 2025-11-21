from reportlab.pdfgen import canvas
from datetime import datetime
import os

def generate_pdf(entries):
    if not os.path.exists("reports"):
        os.mkdir("reports")

    filename = f"reports/report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    c = canvas.Canvas(filename)
    y = 800

    for e in entries:
        line = f"{e['date']} | {e['symptoms']} | Severity {e['severity']}"
        c.drawString(40, y, line)
        y -= 20
        if y < 60:
            c.showPage()
            y = 800

    c.save()
    return filename
