"use client";

import { ArrowLeft } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    return (
        <div className="fixed top-6 left-6 z-50">
            <RippleButton
                variant="outline"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
                aria-label="Go back"
            >
                <ArrowLeft className="h-5 w-5" />
            </RippleButton>
        </div>
    );
}
