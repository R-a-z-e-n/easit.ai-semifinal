import os
import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from .models import Base, User, Conversation, Message
from flask_sock import Sock

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env.local"))

app = Flask(__name__)
CORS(app, supports_credentials=True)
sock = Sock(app)

Base.metadata.create_all(bind=engine)

def get_db() -> Session:
    return SessionLocal()

@app.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}
    name = data.get("name", "")
    email = data.get("email", "")
    password = data.get("password", "")
    if not name or not email or not password:
        return jsonify({"detail": "Missing fields"}), 400
    db = get_db()
    try:
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            return jsonify({"detail": "Email already registered"}), 400
        user = User(name=name, email=email, password_hash=generate_password_hash(password))
        db.add(user)
        db.commit()
        token = f"token-{user.id}"
        return jsonify({"token": token, "user": {"name": user.name, "email": user.email, "picture": None}})
    finally:
        db.close()

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "")
    password = data.get("password", "")
    if not email or not password:
        return jsonify({"detail": "Missing fields"}), 400
    db = get_db()
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"detail": "Invalid credentials"}), 401
        token = f"token-{user.id}"
        return jsonify({"token": token, "user": {"name": user.name, "email": user.email, "picture": None}})
    finally:
        db.close()

@app.route("/api/auth/google", methods=["POST"])
def auth_google():
    return jsonify({"token": "guest-demo-token", "user": {"name": "Google User", "email": "user@example.com", "picture": None}})

@app.route("/api/conversations", methods=["GET"])
def conversations():
    auth = request.headers.get("Authorization", "")
    db = get_db()
    try:
        items = []
        users = db.query(User).all()
        for u in users:
            convs = db.query(Conversation).filter(Conversation.user_id == u.id).all()
            for c in convs:
                msgs = db.query(Message).filter(Message.conversation_id == c.id).order_by(Message.timestamp.asc()).all()
                items.append({
                    "id": str(c.id),
                    "title": c.title,
                    "messages": [{"id": str(m.id), "role": m.role, "text": m.text, "timestamp": m.timestamp.isoformat()} for m in msgs],
                    "createdAt": c.created_at.isoformat()
                })
        if not items:
            items = [{
                "id": "conv-1",
                "title": "Welcome",
                "messages": [{
                    "id": "msg-1",
                    "role": "model",
                    "text": "Connected to backend.",
                    "timestamp": datetime.utcnow().isoformat()
                }],
                "createdAt": datetime.utcnow().isoformat()
            }]
        return jsonify(items)
    finally:
        db.close()

@sock.route("/ws")
def websocket(ws):
    authed = False
    while True:
        try:
            data = ws.receive()
            if data is None:
                break
            parsed = {}
            try:
                parsed = json.loads(data)
            except Exception:
                parsed = {}
            t = parsed.get("type")
            payload = parsed.get("payload", {})
            if t == "auth":
                token = payload.get("token")
                authed = True
                ws.send(json.dumps({"type": "status", "payload": {"status": "authenticated"}}))
                continue
            if not authed:
                ws.send(json.dumps({"type": "error", "payload": {"message": "unauthorized"}}))
                continue
            ws.send(json.dumps({"type": "echo", "payload": payload}))
        except Exception:
            break

def create_app():
    return app
