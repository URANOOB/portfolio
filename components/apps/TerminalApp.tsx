"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { runPortfolioCommand } from "@/lib/terminal";
import { useWindowStore } from "@/store/window-store";

interface Entry {
  command?: string;
  lines: string[];
}

function RaccoonAnimation() {
  return (
    <div className="terminal-raccoon" aria-label="Mapache de Urano esperando un comando">
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
        URANO RACCOON // escribe <code>help</code> para explorar
      </div>
    </div>
  );
}

export function TerminalApp() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const openWindow = useWindowStore((state) => state.openWindow);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight }), [history]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    const result = runPortfolioCommand(input);
    if (result.action?.type === "clear") setHistory([]);
    else setHistory((items) => [...items, { command: input, lines: result.lines }]);
    if (result.action?.type === "open") openWindow(result.action.appId);
    setInput("");
  };

  return (
    <div className="terminal-app">
      <div
        className={`terminal-output ${history.length === 0 ? "is-idle" : ""}`}
        ref={outputRef}
        role="log"
        aria-live="polite"
      >
        {history.length === 0 ? (
          <RaccoonAnimation />
        ) : (
          history.map((entry, index) => (
            <div className="terminal-entry" key={`${entry.command}-${index}`}>
              {entry.command !== undefined ? (
                <p>
                  <span>william@urano</span>:~$ {entry.command}
                </p>
              ) : null}
              {entry.lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          ))
        )}
      </div>
      <form onSubmit={submit} className="terminal-form">
        <label htmlFor="terminal-command">
          <span>william@urano</span>:~$
        </label>
        <input
          id="terminal-command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          autoFocus
          spellCheck={false}
          aria-label="Comando de terminal"
        />
      </form>
    </div>
  );
}
