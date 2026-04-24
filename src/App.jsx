import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Direction, LABELS, SAMPLES, convert } from './alphabet.js';
import { useTheme } from './useTheme.js';
import styles from './App.module.css';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [direction, setDirection] = useState(Direction.MkhedruliToNuskhuri);
  const [input, setInput] = useState(SAMPLES[Direction.MkhedruliToNuskhuri]);
  const [copied, setCopied] = useState(false);

  // Output is pure-derived from input + direction — no separate state.
  const output = useMemo(() => convert(input, direction), [input, direction]);
  const { source, target } = LABELS[direction];

  const sourceRef = useRef(null);
  const targetRef = useRef(null);

  const handleSourceScroll = useCallback(() => {
    const src = sourceRef.current;
    const tgt = targetRef.current;
    if (!src || !tgt) return;
    const ratioY = src.scrollTop / (src.scrollHeight - src.clientHeight) || 0;
    tgt.scrollTop = ratioY * (tgt.scrollHeight - tgt.clientHeight);
    const ratioX = src.scrollLeft / (src.scrollWidth - src.clientWidth) || 0;
    tgt.scrollLeft = ratioX * (tgt.scrollWidth - tgt.clientWidth);
  }, []);

  // Swap direction AND carry the current output back as the new input, so the
  // user can keep working with the text they just converted.
  const handleSwap = useCallback(() => {
    setDirection((d) =>
      d === Direction.MkhedruliToNuskhuri
        ? Direction.NuskhuriToMkhedruli
        : Direction.MkhedruliToNuskhuri,
    );
    setInput(output);
  }, [output]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      /* Clipboard API unavailable (http, older browsers) — silently ignore. */
    }
  }, [output]);

  // Reset the "Copied!" label two seconds after copying.
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>ანბანი</h1>
          <p className={styles.subtitle}>
            Georgian alphabet converter · Mkhedruli ⇄ Nuskhuri
          </p>
        </div>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </header>

      <div className={styles.panels}>
        <section className={styles.panel}>
          <label htmlFor="source" className={styles.label}>
            {source}
          </label>
          <textarea
            id="source"
            ref={sourceRef}
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onScroll={handleSourceScroll}
            spellCheck={false}
            autoFocus
            aria-label={`Input: ${source}`}
          />
        </section>

        <button
          type="button"
          className={styles.swap}
          onClick={handleSwap}
          aria-label="Swap conversion direction"
          title="Swap direction"
        >
          ⇄
        </button>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <label htmlFor="target" className={styles.label}>
              {target}
            </label>
            <button
              type="button"
              className={styles.iconButton}
              onClick={handleCopy}
              disabled={!output}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            id="target"
            ref={targetRef}
            className={styles.textarea}
            value={output}
            readOnly
            spellCheck={false}
            aria-label={`Output: ${target}`}
          />
        </section>
      </div>

      <footer className={styles.footer}>
        {input.length} character{input.length === 1 ? '' : 's'}
      </footer>
    </main>
  );
}
