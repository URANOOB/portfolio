"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { runPortfolioCommand, ALL_COMMANDS } from "@/lib/terminal";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";

interface Entry {
  command?: string;
  lines: string[];
}

function RaccoonAnimation() {
  const language = usePreferencesStore((state) => state.language);
  return (
    <div
      className="terminal-raccoon"
      aria-label={
        language === "es" ? "Mapache de R/COON esperando un comando" : "R/COON raccoon waiting for command"
      }
    >
      <div className="terminal-raccoon-track" aria-hidden="true">
        <Image
          className="terminal-raccoon-sprite"
          src="/terminal-raccoon-walk.gif"
          alt=""
          width={748}
          height={330}
          unoptimized
          priority
          draggable={false}
        />
      </div>
      <div className="terminal-raccoon-status">
        <span aria-hidden="true" />
        R/COON RACCOON // {language === "es" ? "escribe " : "type "}
        <code>help</code>
        {language === "es" ? " para explorar" : " to explore"}
      </div>
    </div>
  );
}

export function TerminalApp() {
  const language = usePreferencesStore((state) => state.language);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const openWindow = useWindowStore((state) => state.openWindow);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight }), [history]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    const result = runPortfolioCommand(input, language);
    if (result.action?.type === "clear") {
      setHistory([]);
    } else {
      setHistory((items) => [...items, { command: input, lines: result.lines }]);
    }
    if (result.action?.type === "open") openWindow(result.action.appId);
    if (result.action?.type === "url") window.open(result.action.href, "_blank", "noopener,noreferrer");
    setCmdHistory((prev) => [input, ...prev.filter((c) => c !== input)]);
    setHistoryIdx(-1);
    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // ── Arrow up/down: navigate command history ──────────────────
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] ?? "");
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIdx = historyIdx - 1;
      if (nextIdx < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx] ?? "");
      }
    }

    // ── Tab: autocomplete ─────────────────────────────────────────
    if (event.key === "Tab") {
      event.preventDefault();
      const val = input.toLowerCase();
      if (!val) return;
      const match = ALL_COMMANDS.find((cmd) => cmd.startsWith(val) && cmd !== val);
      if (match) setInput(match);
    }
  };

  return (
    <div className="terminal-app">
      <div
        className={`terminal-output ${history.length === 0 ? "is-idle" : ""}`}
        ref={outputRef}
        role="log"
        aria-live="polite"
        onClick={() => inputRef.current?.focus()}
      >
        {history.length === 0 ? (
          <RaccoonAnimation />
        ) : (
          history.map((entry, index) => (
            <div className="terminal-entry" key={`${entry.command}-${index}`}>
              {entry.command !== undefined ? (
                <p>
                  <span>william@rcoon</span>:~$ {entry.command}
                </p>
              ) : null}
              {entry.lines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          ))
        )}
      </div>
      <form onSubmit={submit} className="terminal-form">
        <label htmlFor="terminal-command">
          <span>william@rcoon</span>:~$
        </label>
        <input
          id="terminal-command"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoFocus
          spellCheck={false}
          aria-label={language === "es" ? "Comando de terminal" : "Terminal command"}
        />
      </form>
    </div>
  );
}
