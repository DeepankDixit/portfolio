from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str


@router.post("/api/contact")
async def contact(form: ContactForm):
    """
    Receive a contact form submission and forward it to your email.
    Configure SMTP credentials in the .env file.
    """
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_password = os.getenv("SMTP_PASSWORD", "")
    recipient = os.getenv("RECIPIENT_EMAIL", "deepankdixit0804@gmail.com")

    if not smtp_user or not smtp_password:
        # Dev mode: no SMTP configured — just log and return success
        print(f"[Contact] From: {form.name} <{form.email}> — {form.message}")
        return {"status": "ok", "message": "Message received (dev mode — configure SMTP in .env to send real emails)."}

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio contact from {form.name}"
        msg["From"] = smtp_user
        msg["To"] = recipient

        body = f"""New message from your portfolio contact form:

Name:    {form.name}
Email:   {form.email}

Message:
{form.message}
"""
        html_body = f"""<html><body style="font-family:sans-serif;color:#333;">
  <h2 style="color:#6366f1;">New Portfolio Message</h2>
  <p><strong>Name:</strong> {form.name}</p>
  <p><strong>Email:</strong> <a href="mailto:{form.email}">{form.email}</a></p>
  <hr/>
  <p style="white-space:pre-wrap;">{form.message}</p>
</body></html>"""

        msg.attach(MIMEText(body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, recipient, msg.as_string())

        return {"status": "ok", "message": "Message sent successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send message: {str(e)}")
