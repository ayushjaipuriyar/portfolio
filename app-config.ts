// Central app configuration type and defaults used by the LiveKit starter UI
// and other components. Components import this via `@/app-config`.

export type AppConfig = {
  // Text for the start button shown in the welcome view
  startButtonText: string;

  // Optional LiveKit agent name to request from the connection-details endpoint
  agentName?: string | undefined;

  // Optional sandbox id used when requesting remote app config or connection details
  sandboxId?: string | undefined | null;

  // Enable pre-connect buffering for microphone warmup
  isPreConnectBufferEnabled: boolean;

  // UI capabilities
  supportsChatInput: boolean;
  supportsVideoInput: boolean;

  // Accent colors used by theming helpers (optional)
  accent?: string;
  accentDark?: string;

  // Allow extra, optional fields (backwards-compatible)
  [key: string]: unknown;
};

export const APP_CONFIG_DEFAULTS: AppConfig = {
  startButtonText: 'Start Conversation',
  agentName: undefined,
  sandboxId: undefined,
  isPreConnectBufferEnabled: true,
  supportsChatInput: true,
  supportsVideoInput: false,
  accent: undefined,
  accentDark: undefined,
};

export default APP_CONFIG_DEFAULTS;
