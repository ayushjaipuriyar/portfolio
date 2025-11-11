"""
Structured logger for agent worker.
Mirrors src_bak/logger.ts functionality.
"""

import logging
import json
from typing import Any, Dict, Optional


class StructuredLogger:
    def __init__(self, level: str = "info"):
        self.logger = logging.getLogger("portfolio-agent")
        self.set_level(level)

    def set_level(self, level: str):
        self.logger.setLevel(getattr(logging, level.upper(), logging.INFO))

    def log(self, level: str, message: str, context: Optional[Dict[str, Any]] = None):
        entry = {
            "timestamp": logging.Formatter().formatTime(
                logging.LogRecord("", "", "", "", "", "", "", ""), None
            ),
            "level": level.upper(),
            "message": message,
        }
        if context:
            entry.update(context)
        getattr(self.logger, level.lower(), self.logger.info)(json.dumps(entry))

    def debug(self, message: str, context: Optional[Dict[str, Any]] = None):
        self.log("debug", message, context)

    def info(self, message: str, context: Optional[Dict[str, Any]] = None):
        self.log("info", message, context)

    def warn(self, message: str, context: Optional[Dict[str, Any]] = None):
        self.log("warning", message, context)

    def error(self, message: str, context: Optional[Dict[str, Any]] = None):
        self.log("error", message, context)


logger = StructuredLogger()
