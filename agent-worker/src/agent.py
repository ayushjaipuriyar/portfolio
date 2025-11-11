from typing import Optional
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    RunContext,
    WorkerOptions,
    cli,
    function_tool,
    inference,
    metrics,
)
from livekit.plugins import silero, deepgram, google

from portfolio_data import format_portfolio_for_agent, get_portfolio_data
from function_tools import function_tools, execute_function_tool
from config import config
from logger import logger
from error_handler import error_handler
from session_monitor import session_monitor


class PortfolioAssistant(Agent):
    def __init__(self, session_id: str) -> None:
        self.session_id = session_id
        portfolio_data = get_portfolio_data()
        portfolio_summary = format_portfolio_for_agent(portfolio_data)
        super().__init__(
            instructions=f"""
You are a helpful voice assistant for {portfolio_data.personal.name}'s portfolio website.

Act like a friendly, slightly nerdy engineering buddy who answers questions about their experience, projects, skills, and background.

{portfolio_summary}

Voice response guidelines:
1) keep answers short and human, like you're chatting on a call
2) 3–4 sentences max unless they explicitly ask for more depth
3) if it exists in the portfolio data, use real specifics (company names, stacks, metrics)
4) if something isn't in the portfolio data, say you don't have that info
5) offer to expand if they want to zoom in
6) for visuals, just point them to the site (you're not a CDN)
7) for availability or contact, share their contact / booking info
8) tone = chill, sharp, confident, not corporate-marketing

data you can use:
- experience at Healthtrip, AST Consulting, Microsoft
- projects like LeetCode MCP server and ML based traffic detection
- stacks: React, Next.js, NestJS, Python, AWS, Docker, Kubernetes
- MSc Computing Science, University of Glasgow
- contact + meeting scheduling info

if the answer isn't in the known set → return politely with "not in my dataset" and offer to check another area.
"""
        )

    @function_tool
    async def get_experience(self, context: RunContext, company: Optional[str] = None):
        logger.info("Getting experience information", {"company": company})
        try:
            result = execute_function_tool("getExperience", {"company": company})
            session_monitor.track_agent_message(self.session_id)
            return result
        except Exception as e:
            session_monitor.track_error(self.session_id, "get_experience")
            return error_handler.handle_llm_error(e)
            session_monitor.track_agent_message(self.session_id)
            return result
        except Exception as e:
            session_monitor.track_error(self.session_id, "get_projects")
            return error_handler.handle_llm_error(e)

    @function_tool
    async def get_skills(self, context: RunContext, category: Optional[str] = None):
        logger.info("Getting skills information", {"category": category})
        try:
            result = execute_function_tool("getSkills", {"category": category})
            session_monitor.track_agent_message(self.session_id)
            return result
        except Exception as e:
            session_monitor.track_error(self.session_id, "get_skills")
            return error_handler.handle_llm_error(e)

    @function_tool
    async def get_education(self, context: RunContext):
        logger.info("Getting education information")
        try:
            result = execute_function_tool("getEducation", {})
            session_monitor.track_agent_message(self.session_id)
            return result
        except Exception as e:
            session_monitor.track_error(self.session_id, "get_education")
            return error_handler.handle_llm_error(e)

    @function_tool
    async def get_contact_info(self, context: RunContext):
        logger.info("Getting contact information")
        try:
            result = execute_function_tool("getContactInfo", {})
            session_monitor.track_agent_message(self.session_id)
            return result
        except Exception as e:
            session_monitor.track_error(self.session_id, "get_contact_info")
            return error_handler.handle_llm_error(e)

    @function_tool
    async def get_personal_info(self, context: RunContext):
        logger.info("Getting personal information")
        try:
            result = execute_function_tool("getPersonalInfo", {})
            session_monitor.track_agent_message(self.session_id)
            return result
        except Exception as e:
            session_monitor.track_error(self.session_id, "get_personal_info")
            return error_handler.handle_llm_error(e)

    @function_tool
    async def get_portfolio_summary(self, context: RunContext):
        logger.info("Getting portfolio summary")
        try:
            result = execute_function_tool("getPortfolioSummary", {})
            session_monitor.track_agent_message(self.session_id)
            return result
        except Exception as e:
            session_monitor.track_error(self.session_id, "get_portfolio_summary")
            return error_handler.handle_llm_error(e)

    @function_tool
    async def search_portfolio(self, context: RunContext, query: str):
        logger.info("Searching portfolio", {"query": query})
        try:
            result = execute_function_tool("searchPortfolio", {"query": query})
            session_monitor.track_agent_message(self.session_id)
            return result
        except Exception as e:
            session_monitor.track_error(self.session_id, "search_portfolio")
            return error_handler.handle_llm_error(e)


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    session_id = ctx.room.name
    session_monitor.start_session(session_id, ctx.room.name)

    session = AgentSession(
        stt=deepgram.STTv2(
            model="flux-general-en",
            eager_eot_threshold=0.4,
        ),
        llm=inference.LLM(model=config.GEMINI_MODEL),
        tts=deepgram.TTS(
            model="aura-asteria-en",
        ),
        turn_detection="vad",
        vad=silero.VAD.load(),
        preemptive_generation=True,
    )

    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        try:
            summary_dict = vars(summary)
        except Exception:
            summary_dict = str(summary)
        logger.info("Usage summary", {"summary": summary_dict})
        session_monitor.end_session(session_id, status="completed")

    ctx.add_shutdown_callback(log_usage)

    try:
        await session.start(
            agent=PortfolioAssistant(session_id),
            room=ctx.room,
            room_input_options=RoomInputOptions(),
        )
        await ctx.connect()
        logger.info("Successfully connected to room", {"room": ctx.room.name})
    except Exception as e:
        session_monitor.track_error(session_id, "session_start")
        error_handler.handle_connection_error(e, lambda: None)


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
