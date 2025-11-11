"""
Session monitoring and metrics for agent worker.
Mirrors src_bak/session-monitor.ts functionality.
"""

from logger import logger
from typing import Dict, Optional
from datetime import datetime


class SessionMetrics:
    def __init__(
        self, session_id: str, room_name: str, participant_id: Optional[str] = None
    ):
        self.session_id = session_id
        self.room_name = room_name
        self.participant_id = participant_id
        self.start_time = datetime.utcnow()
        self.end_time = None
        self.duration = None
        self.message_count = 0
        self.user_message_count = 0
        self.agent_message_count = 0
        self.status = "active"
        self.error_count = 0
        self.api_usage = {
            "stt": {"requests": 0, "audio_seconds": 0.0, "estimated_cost": 0.0},
            "llm": {
                "requests": 0,
                "input_tokens": 0,
                "output_tokens": 0,
                "total_tokens": 0,
                "estimated_cost": 0.0,
            },
            "tts": {"requests": 0, "characters": 0, "estimated_cost": 0.0},
            "total": {"estimated_cost": 0.0},
        }


class SessionMonitor:
    def __init__(self):
        self.sessions: Dict[str, SessionMetrics] = {}
        self.error_metrics: Dict[str, Dict] = {}

    def start_session(
        self, session_id: str, room_name: str, participant_id: Optional[str] = None
    ):
        metrics = SessionMetrics(session_id, room_name, participant_id)
        self.sessions[session_id] = metrics
        logger.info(
            "Session started",
            {
                "session_id": session_id,
                "room_name": room_name,
                "participant_id": participant_id,
                "timestamp": metrics.start_time.isoformat(),
            },
        )

    def end_session(self, session_id: str, status: str = "completed"):
        metrics = self.sessions.get(session_id)
        if not metrics:
            logger.warn(
                "Attempted to end non-existent session", {"session_id": session_id}
            )
            return
        metrics.end_time = datetime.utcnow()
        metrics.duration = (
            metrics.end_time - metrics.start_time
        ).total_seconds() * 1000
        metrics.status = status
        logger.info(
            "Session ended",
            {
                "session_id": session_id,
                "room_name": metrics.room_name,
                "duration": metrics.duration,
                "message_count": metrics.message_count,
                "status": status,
                "api_usage": metrics.api_usage,
                "timestamp": metrics.end_time.isoformat(),
            },
        )
        self.log_session_summary(metrics)

    def track_user_message(self, session_id: str):
        metrics = self.sessions.get(session_id)
        if metrics:
            metrics.message_count += 1
            metrics.user_message_count += 1

    def track_agent_message(self, session_id: str):
        metrics = self.sessions.get(session_id)
        if metrics:
            metrics.message_count += 1
            metrics.agent_message_count += 1

    def track_stt_usage(self, session_id: str, audio_seconds: float):
        metrics = self.sessions.get(session_id)
        if not metrics:
            return
        metrics.api_usage["stt"]["requests"] += 1
        metrics.api_usage["stt"]["audio_seconds"] += audio_seconds
        cost = audio_seconds * 0.00025
        metrics.api_usage["stt"]["estimated_cost"] += cost
        metrics.api_usage["total"]["estimated_cost"] += cost
        logger.debug(
            "STT usage tracked",
            {"session_id": session_id, "audio_seconds": audio_seconds, "cost": cost},
        )

    def track_llm_usage(self, session_id: str, input_tokens: int, output_tokens: int):
        metrics = self.sessions.get(session_id)
        if not metrics:
            return
        metrics.api_usage["llm"]["requests"] += 1
        metrics.api_usage["llm"]["input_tokens"] += input_tokens
        metrics.api_usage["llm"]["output_tokens"] += output_tokens
        metrics.api_usage["llm"]["total_tokens"] += input_tokens + output_tokens
        input_cost = (input_tokens / 1_000_000) * 0.15
        output_cost = (output_tokens / 1_000_000) * 0.6
        total_cost = input_cost + output_cost
        metrics.api_usage["llm"]["estimated_cost"] += total_cost
        metrics.api_usage["total"]["estimated_cost"] += total_cost
        logger.debug(
            "LLM usage tracked",
            {
                "session_id": session_id,
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "cost": total_cost,
            },
        )

    def track_tts_usage(self, session_id: str, characters: int):
        metrics = self.sessions.get(session_id)
        if not metrics:
            return
        metrics.api_usage["tts"]["requests"] += 1
        metrics.api_usage["tts"]["characters"] += characters
        cost = (characters / 1000) * 0.015
        metrics.api_usage["tts"]["estimated_cost"] += cost
        metrics.api_usage["total"]["estimated_cost"] += cost
        logger.debug(
            "TTS usage tracked",
            {"session_id": session_id, "characters": characters, "cost": cost},
        )

    def track_error(self, session_id: str, error_type: str):
        metrics = self.sessions.get(session_id)
        if metrics:
            metrics.error_count += 1
        error_metric = self.error_metrics.get(error_type)
        if error_metric:
            error_metric["count"] += 1
            error_metric["last_occurrence"] = datetime.utcnow().isoformat()
        else:
            self.error_metrics[error_type] = {
                "error_type": error_type,
                "count": 1,
                "last_occurrence": datetime.utcnow().isoformat(),
            }
        logger.warn(
            "Error tracked", {"session_id": session_id, "error_type": error_type}
        )

    def log_session_summary(self, metrics: SessionMetrics):
        duration_minutes = metrics.duration / 1000 / 60 if metrics.duration else "N/A"
        logger.info(
            "Session summary",
            {
                "session_id": metrics.session_id,
                "room_name": metrics.room_name,
                "duration": metrics.duration,
                "duration_minutes": f"{duration_minutes} minutes",
                "messages": {
                    "total": metrics.message_count,
                    "user": metrics.user_message_count,
                    "agent": metrics.agent_message_count,
                },
                "api_usage": metrics.api_usage,
                "errors": metrics.error_count,
                "status": metrics.status,
            },
        )


session_monitor = SessionMonitor()
