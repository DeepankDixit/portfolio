# Hosting Guide

## Running locally

```bash
# 1. Create a virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up environment
cp .env.example .env
# Edit .env and fill in your SMTP credentials (optional — form still works without them in dev mode)

# 4. Start the server
uvicorn main:app --reload

# 5. Open http://localhost:8000
```

---

## Deploying to Render.com (Recommended — Free)

Render gives you a free web service for FastAPI with zero credit card required.

### Steps

1. **Push your code to GitHub** (make sure `.env` is in `.gitignore`)

2. **Go to [render.com](https://render.com)** → New → Web Service

3. **Connect your GitHub repo**

4. **Configure the service:**
   | Setting | Value |
   |---|---|
   | Runtime | Python 3 |
   | Build command | `pip install -r requirements.txt` |
   | Start command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

5. **Add environment variables** (in Render dashboard → Environment):
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASSWORD=your-app-password
   RECIPIENT_EMAIL=deepankdixit0804@gmail.com
   ```

6. **Deploy** — Render builds and deploys automatically on every `git push`.

7. **Custom domain** (optional): Go to Settings → Custom Domains and add your domain (e.g. `deepankdixit.com`). Free SSL included.

---

## Alternative hosts

| Host | Notes |
|---|---|
| **Railway** | Generous free tier, great DX, slightly faster cold starts |
| **Fly.io** | More control, free tier available, good for future scaling |
| **DigitalOcean App Platform** | $5/month starter, very reliable |
| **GitHub Pages** | Only works for static sites — not suitable here (we have FastAPI) |

---

## Setting up Gmail app password (for contact form)

1. Enable 2-factor authentication on your Google account
2. Visit: https://myaccount.google.com/apppasswords
3. Select app: **Mail** → Select device: **Other** → name it "Portfolio"
4. Copy the 16-character password → paste into `.env` as `SMTP_PASSWORD`

Without SMTP configured the contact form still works in dev mode — it logs the message to the console but doesn't email you.

---

## Adding your own domain (~$10/year)

1. Buy a `.com` or `.dev` domain on Namecheap or Cloudflare Registrar
2. In Render → Settings → Custom Domains → Add domain
3. Follow the DNS instructions (add a CNAME record pointing to your Render URL)
4. SSL is provisioned automatically (free via Let's Encrypt)
