"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { runPortfolioCommand } from "@/lib/terminal";
import { useWindowStore } from "@/store/window-store";

interface Entry {
  command?: string;
  lines: string[];
}

export function TerminalApp() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([
    { lines: ["Urano Shell 1.0 — entorno seguro del portafolio.", "Escribe “help” para explorar."] },
  ]);
  const openWindow = useWindowStore((state) => state.openWindow);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight }), [history]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = runPortfolioCommand(input);
    if (result.action?.type === "clear") setHistory([]);
    else setHistory((items) => [...items, { command: input, lines: result.lines }]);
    if (result.action?.type === "open") openWindow(result.action.appId);
    setInput("");
  };

  return (
    <div className="terminal-app">
      <div className="terminal-output" ref={outputRef} role="log" aria-live="polite">
        {history.map((entry, index) => (
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
        ))}
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
