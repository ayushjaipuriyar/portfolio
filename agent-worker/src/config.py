"""
Configuration loader and validator for LiveKit voice agent.
Mirrors src_bak/config.ts functionality.
"""

import os
from dotenv import load_dotenv
from typing import Optional

# Try to load from .env.local first, then fall back to .env
env_local_path = os.path.join(os.path.dirname(__file__), "..", ".env.local")
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")

if os.path.exists(env_local_path):
    load_dotenv(env_local_path)
elif os.path.exists(env_path):
    load_dotenv(env_path)


class ConfigError(Exception):
    pass


class Config:
    def __init__(self):
        self.LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
        self.LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")
        self.LIVEKIT_URL = os.getenv("LIVEKIT_URL")
        self.OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
        self.GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        self.GEMINI_MODEL = os.getenv("GEMINI_MODEL", "google/gemini-2.0-flash-lite")
        self.ASSEMBLYAI_API_KEY = os.getenv("ASSEMBLYAI_API_KEY")
        self.ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
        self.NODE_ENV = os.getenv("NODE_ENV", "development")
        self.LOG_LEVEL = os.getenv("LOG_LEVEL", "info")
        self.PORT = int(os.getenv("PORT", "3001"))

    def validate(self):
        missing = []
        if not self.LIVEKIT_API_KEY:
            missing.append("LIVEKIT_API_KEY")
        if not self.LIVEKIT_API_SECRET:
            missing.append("LIVEKIT_API_SECRET")
        if not self.LIVEKIT_URL:
            missing.append("LIVEKIT_URL")
        if not self.ASSEMBLYAI_API_KEY:
            missing.append("ASSEMBLYAI_API_KEY")
        if missing:
            raise ConfigError(
                f"Missing required environment variables: {', '.join(missing)}"
            )


config = Config()
