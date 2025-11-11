"""
Centralized error handler for agent worker.
Mirrors src_bak/error-handler.ts functionality.
"""

from logger import logger
from typing import Optional, Dict


class AgentError(Exception):
    def __init__(
        self,
        message: str,
        type_: str,
        severity: str = "medium",
        retryable: bool = True,
        context: Optional[Dict] = None,
    ):
        super().__init__(message)
        self.type = type_
        self.severity = severity
        self.retryable = retryable
        self.context = context or {}


class ErrorHandler:
    def __init__(self):
        self.error_counts = {}
        self.last_errors = {}

    def handle_stt_error(self, error: Exception, context: Optional[Dict] = None) -> str:
        agent_error = AgentError(
            f"STT error: {error}", "stt_error", "medium", True, context
        )
        logger.warn(agent_error.args[0], context)
        self._increment("stt_error")
        return "I'm sorry, I didn't catch that. Could you please repeat?"

    def handle_llm_error(self, error: Exception, context: Optional[Dict] = None) -> str:
        agent_error = AgentError(
            f"LLM error: {error}", "llm_error", "high", True, context
        )
        logger.error(agent_error.args[0], context)
        self._increment("llm_error")
        if "rate limit" in str(error) or "429" in str(error):
            return (
                "I'm experiencing high demand right now. Please try again in a moment."
            )
        return "I'm having trouble processing that right now. Could you try rephrasing your question?"

    def handle_tts_error(
        self, error: Exception, text_content: str, context: Optional[Dict] = None
    ):
        agent_error = AgentError(
            f"TTS error: {error}", "tts_error", "medium", True, context
        )
        logger.warn(
            agent_error.args[0], {**(context or {}), "text_content": text_content[:100]}
        )
        self._increment("tts_error")

    def handle_connection_error(
        self, error: Exception, reconnect_callback, context: Optional[Dict] = None
    ):
        agent_error = AgentError(
            f"Connection error: {error}", "connection_error", "high", True, context
        )
        logger.error(agent_error.args[0], context)
        self._increment("connection_error")
        # Implement retry logic if needed

    def handle_timeout_error(
        self, operation: str, context: Optional[Dict] = None
    ) -> str:
        agent_error = AgentError(
            f"Timeout error: {operation}", "timeout_error", "medium", True, context
        )
        logger.warn(agent_error.args[0], context)
        self._increment("timeout_error")
        return "I'm taking a bit longer than usual. Let me try that again."

    def _increment(self, error_type: str):
        self.error_counts[error_type] = self.error_counts.get(error_type, 0) + 1
        from datetime import datetime

        self.last_errors[error_type] = datetime.utcnow().isoformat()


error_handler = ErrorHandler()
