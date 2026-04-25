# Personal Portfolio — Deepank Dixit

A simple, single-page personal site built with FastAPI + Jinja2.
Dark, minimal design. Six smooth-scroll sections: Hero, About, Experience, Projects, Life, Contact.

> Live: _coming soon — deployment in progress on Render_

## Stack

- **Backend** — FastAPI (Python 3.13)
- **Templating** — Jinja2
- **Frontend** — Vanilla HTML/CSS/JS (no build step)
- **Fonts** — Inter + JetBrains Mono via Google Fonts
- **Contact form** — POSTs JSON to `/api/contact`; backend forwards via SMTP (Gmail by default), or logs to console in dev when SMTP isn't configured

## Run locally

```bash
git clone https://github.com/DeepankDixit/portfolio.git
cd portfolio

python -m venv venv
source venv/bin/activate         # Windows: venv\Scripts\activate
pip install -r requirements.txt

uvicorn main:app --reload
# → http://localhost:8000
```

## Contact form (optional)

The contact form works without configuration in dev — it just logs submissions to the console.
To actually email yourself when someone hits "Send", copy `.env.example` to `.env` and fill in your SMTP credentials:

```bash
cp .env.example .env
# then edit .env with your Gmail App Password (not your account password)
```

## Project layout

```
.
├── main.py                # FastAPI app + page route
├── routers/
│   └── contact.py         # POST /api/contact endpoint
├── templates/
│   └── index.html         # The whole page, in one Jinja template
├── static/
│   ├── css/styles.css     # Dark theme, indigo accent
│   └── js/main.js         # Nav scroll + form submit
├── requirements.txt
├── HOSTING.md             # Step-by-step deploy guide (Render free tier)
└── .env.example           # SMTP config template
```

## Deploy

See [HOSTING.md](./HOSTING.md). Recommended: Render free tier — auto-deploys on every `git push` to `main`.

## License

MIT
