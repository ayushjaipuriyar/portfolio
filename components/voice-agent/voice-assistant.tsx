'use client';

import { useState } from 'react';
import { Mic, X } from 'lucide-react';
import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
// LiveKit starter-pack UI components
import { SessionProvider, useSession } from '@/components/app/session-provider';
import { SessionView } from '@/components/app/session-view';
import { Toaster } from '@/components/livekit/toaster';
import { Button } from '@/components/ui/button';
import type { PortfolioConfig } from '@/config/portfolio';

export interface VoiceAssistantProps {
  portfolioData: PortfolioConfig;
  className?: string;
}

export function VoiceAssistant({ portfolioData, className }: VoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Minimal appConfig for starter UI. Adjust keys as needed.
  const appConfig = {
    startButtonText: 'Start Conversation',
    agentName: 'portfolio-assistant',
    isPreConnectBufferEnabled: true,
    supportsChatInput: true, // Enable chat input
    supportsVideoInput: false,
    sandboxId: undefined,
  } as any;

  function FloatingMicButton() {
    const { startSession } = useSession();

    return (
      <Button
        onClick={() => {
          setIsOpen(true);
          // startSession may be async; call and ignore errors here
          try {
            startSession();
          } catch (e) {
            // no-op
          }
        }}
        size="lg"
        className="fixed bottom-4 right-4 z-50 h-12 w-12 touch-manipulation rounded-full shadow-lg transition-shadow hover:shadow-xl md:bottom-6 md:right-6 md:h-14 md:w-14"
        aria-label="Open voice assistant"
      >
        <Mic className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    );
  }

  // Close control uses session hook and must be rendered inside SessionProvider
  function CloseControl() {
    const { endSession } = useSession();
    return (
      <Button
        variant="ghost"
        onClick={() => {
          try {
            endSession();
          } catch (e) {
            // ignore
          }
          setIsOpen(false);
        }}
        aria-label="Close voice assistant"
      >
        <X className="h-4 w-4" />
      </Button>
    );
  }

  // Modal content that can access session context
  function ModalContent() {
    const { endSession } = useSession();

    const handleClose = () => {
      try {
        endSession();
      } catch (e) {
        // ignore
      }
      setIsOpen(false);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
        <section className="relative z-10 mx-4 h-[85vh] w-[95vw] max-w-[95vw] overflow-hidden rounded-lg bg-background shadow-lg sm:mx-auto sm:w-auto sm:max-w-3xl">
          <div className="absolute right-3 top-3 z-20">
            <CloseControl />
          </div>

          <div className="h-full w-full">
            <SessionView appConfig={appConfig} onDisconnect={handleClose} />
          </div>

          {/* LiveKit helpers */}
          <StartAudio label="Enable Audio" />
          <RoomAudioRenderer />
          <Toaster />
        </section>
      </div>
    );
  }

  return (
    <SessionProvider appConfig={appConfig}>
      {/* Floating button uses starter session context to start the call */}
      <FloatingMicButton />

      {/* Inline session panel instead of modal. Render when isOpen. */}
      {isOpen && <ModalContent />}
    </SessionProvider>
  );
}

export default VoiceAssistant;
