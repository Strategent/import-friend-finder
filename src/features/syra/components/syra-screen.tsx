import { useState } from "react";
import { Paperclip, ChevronDown } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { models, quickActions } from "../fixtures";

export function SyraScreen() {
  const [input, setInput] = useState("");
  const [modelId, setModelId] = useState(models[0].id);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100dvh - var(--topbar-h))" }}
    >
      <style>{`
        .font-radley { font-family: 'Radley', Georgia, serif; }
      `}</style>

      {/* Animated on-brand monotone + subtle purple fluid background */}
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundGradientAnimation
          interactive={false}
          size="70%"
          containerClassName="h-full w-full"
        />
        <div className="absolute inset-0 [background:var(--syra-gradient-vignette)]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
          YOUR OPERATIONS AGENT
        </div>
        <h1 className="font-radley text-5xl md:text-6xl font-normal tracking-tight text-foreground text-center">
          Syra
        </h1>
        <p className="mt-4 text-muted-foreground text-center max-w-xl text-[15px]">
          Draft, analyze, automate. Syra moves work forward.
        </p>

        {/* Input bar */}
        <div className="mt-10 w-full max-w-3xl">
          <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-xl shadow-xl">
            <input
              value={input}
              aria-label="Ask Syra"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Syra anything…"
              className="w-full bg-transparent px-5 pt-5 pb-16 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            />
            <div className="absolute left-3 bottom-3 flex items-center gap-1.5">
              <button
                aria-label="Attach"
                className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <div className="relative">
                <label htmlFor="syra-model" className="sr-only">
                  AI model
                </label>
                <select
                  id="syra-model"
                  value={modelId}
                  onChange={(event) => setModelId(event.target.value)}
                  className="h-9 appearance-none rounded-lg bg-transparent pl-3 pr-8 text-[12.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground opacity-70"
                  aria-hidden
                />
              </div>
            </div>
            <button
              aria-label="Send"
              className="absolute right-3 bottom-3 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[12.5px] font-medium hover:bg-primary/90 transition-colors"
            >
              Send
            </button>
          </div>

          {/* Quick actions */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-[12.5px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <a.icon className="h-3.5 w-3.5" /> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
