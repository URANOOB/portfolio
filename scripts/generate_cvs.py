from pathlib import Path
from shutil import copy2

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
PUBLIC = ROOT / "public" / "cv"
OUTPUT.mkdir(parents=True, exist_ok=True)
PUBLIC.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#181B24")
MUTED = colors.HexColor("#626875")
ACCENT = colors.HexColor("#E56F45")
PAPER = colors.HexColor("#F7F5EF")
LINE = colors.HexColor("#D8D4CB")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=28, leading=28, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="Role", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=ACCENT, tracking=1.1, spaceAfter=9))
styles.add(ParagraphStyle(name="Meta", parent=styles["Normal"], fontName="Helvetica", fontSize=7.5, leading=10, textColor=MUTED))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=8, leading=11, textColor=INK, tracking=1.4, spaceBefore=11, spaceAfter=6, borderColor=LINE, borderWidth=0, borderPadding=0))
styles.add(ParagraphStyle(name="BodySmall", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.2, leading=12.2, textColor=MUTED, spaceAfter=5))
styles.add(ParagraphStyle(name="ItemTitle", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=8.7, leading=11, textColor=INK))
styles.add(ParagraphStyle(name="ItemMeta", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.3, leading=10, textColor=ACCENT, alignment=TA_RIGHT))
styles.add(ParagraphStyle(name="Footer", parent=styles["Normal"], fontName="Helvetica", fontSize=6.5, leading=8, textColor=MUTED))


COMMON_EXPERIENCE = [
    ("Lean Group", "Coordinacion logistica senior", "", "Coordinacion de operaciones, prioridades y comunicacion con clientes y aliados internacionales."),
    ("JB Hunt", "Operaciones logisticas", "", "Seguimiento de cargas, comunicacion operativa y gestion de novedades."),
    ("Avenger Logistics", "Operaciones logisticas", "", "Soporte a transporte y atencion a requerimientos de clientes internacionales."),
    ("USA Truck / DB Schenker", "Logistica internacional", "", "Trazabilidad, gestion de excepciones y coordinacion entre actores de transporte."),
    ("Concentrix", "Servicio al cliente internacional", "", "Resolucion de solicitudes y seguimiento de casos en un entorno bilingue."),
    ("Nexa BPO", "Servicio y operaciones", "", "Atencion, documentacion de casos y cumplimiento de procesos operativos."),
]

DEV_EXPERIENCE = [
    ("Ingles Pa' la Paz", "Desarrollo web y contribucion social", "En curso", "Construccion frontend y arquitectura de contenido con Next.js, React y TypeScript."),
    ("Atlas Splitter", "Desarrollo de herramienta de imagen", "En desarrollo", "Procesamiento de atlas WEBP y exportacion de elementos mediante Python y OpenCV."),
    ("Asistente juridico con IA", "Concepto de producto privado", "Concepto", "Diseno de flujos de gestion documental, busqueda semantica, CRM y asistencia con IA."),
]


def draw_background(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, A4[1] - 8 * mm, A4[0], 8 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 13 * mm, A4[0] - 18 * mm, 13 * mm)
    canvas.setFont("Helvetica", 6.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8.5 * mm, "William Galeano - Portafolio profesional")
    canvas.drawRightString(A4[0] - 18 * mm, 8.5 * mm, f"Pagina {doc.page}")
    canvas.restoreState()


def header(role):
    left = [Paragraph("WILLIAM GALEANO", styles["Name"]), Paragraph(role.upper(), styles["Role"])]
    right = Paragraph("Bogota, Colombia<br/>Espanol nativo - Ingles B2+<br/>Datos de contacto por configurar", styles["Meta"])
    table = Table([[left, right]], colWidths=[118 * mm, 50 * mm])
    table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "BOTTOM"), ("ALIGN", (1, 0), (1, 0), "RIGHT"), ("BOTTOMPADDING", (0, 0), (-1, -1), 8), ("LINEBELOW", (0, 0), (-1, -1), 1.2, INK)]))
    return table


def experience_item(company, role, period, summary):
    heading = Table([[Paragraph(company, styles["ItemTitle"]), Paragraph(period, styles["ItemMeta"])]], colWidths=[118 * mm, 50 * mm])
    heading.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
    return KeepTogether([heading, Paragraph(f"<b>{role}</b> - {summary}", styles["BodySmall"]), Spacer(1, 2)])


def build_cv(filename, role, profile_text, experience, skills):
    path = OUTPUT / filename
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=17 * mm, bottomMargin=18 * mm, title=f"William Galeano - {role}", author="William Galeano")
    story = [header(role), Paragraph("PERFIL", styles["Section"]), Paragraph(profile_text, styles["BodySmall"]), Paragraph("EXPERIENCIA Y PROYECTOS SELECCIONADOS", styles["Section"])]
    story.extend(experience_item(*item) for item in experience)
    story.extend([Paragraph("TECNOLOGIAS Y HERRAMIENTAS", styles["Section"]), Paragraph(skills, styles["BodySmall"]), Paragraph("IDIOMAS Y FORTALEZAS", styles["Section"]), Paragraph("Espanol nativo - Ingles B2+ - Servicio internacional - Liderazgo - Aprendizaje rapido - Documentacion y seguimiento", styles["BodySmall"]), Spacer(1, 7), Paragraph("Version preliminar. Fechas, enlaces, metricas, formacion y certificaciones deben validarse contra documentos fuente antes de su publicacion definitiva.", styles["Footer"])])
    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background)
    copy2(path, PUBLIC / filename)
    return path


build_cv(
    "william-galeano-desarrollo.pdf",
    "Software Developer",
    "Desarrollador orientado a productos web, automatizacion y soluciones con contexto de negocio. Combina tecnologia, logistica internacional y servicio bilingue para convertir problemas ambiguos en flujos claros y productos utiles.",
    DEV_EXPERIENCE + COMMON_EXPERIENCE[:3],
    "React - Next.js - TypeScript - JavaScript - Node.js - API REST - SQL - PostgreSQL - Supabase - Python - OpenCV - Java - Git - Docker - IA y automatizacion",
)

build_cv(
    "william-galeano-logistica.pdf",
    "Senior Logistics Coordinator",
    "Coordinador de logistica con experiencia en servicio internacional, seguimiento operativo y comunicacion bilingue. Aporta criterio tecnologico, liderazgo y capacidad para conectar clientes, aliados y equipos internos.",
    COMMON_EXPERIENCE,
    "TMS - CRM - Hojas de calculo - Seguimiento de cargas - Gestion de excepciones - Servicio al cliente - Ingles B2+ - Automatizacion - Analisis de datos",
)
