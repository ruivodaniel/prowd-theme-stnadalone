import type { CSSProperties, ReactNode } from "react";

/**
 * Chrome shared by every fixture layer. Theme-aware where it carries text:
 * labels use `element="type--body-extra-small" emphasis="quiet"` so the
 * fixture body inherits the live theme typography. Inline visual styles
 * are allowed here — this is tooling, not product markup.
 */
export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p element="type--body-extra-small" emphasis="quiet">{label}</p>
      <div className="flex gap-3 flex-wrap items-center">{children}</div>
    </div>
  );
}

export function FixtureBody({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-6 p-6">{children}</div>;
}

/**
 * The one wrapper a pattern fixture may use besides canonical components.
 * A labelled surface holding the pattern at a set width — the same everywhere,
 * so every pattern reads the same. `width` sizes the inner card (px or any CSS
 * width); everything inside must be canonical library components.
 */
export function FixtureContainer({ width = 600, children }: { width?: number | string; children: ReactNode }) {
  return (
    <div className="bg-muted/50 p-6 rounded-lg">
      <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Container</div>
      <div className="bg-background p-4 rounded-lg border" style={{ width, maxWidth: "100%" }}>
        {children}
      </div>
    </div>
  );
}

const mono: CSSProperties = { fontFamily: "'SF Mono',Menlo,monospace" };

/**
 * Color swatch keyed to a live CSS custom property. `token` is the var name
 * WITHOUT the leading `--`; it is the swatch fill and the caption. `value`
 * (the declared value, when known) is a second caption line. Pass `css` to
 * override the fill with a raw expression for context-computed values.
 */
export function Swatch({ token, css, value }: { token: string; css?: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1" style={{ width: 84 }}>
      <div
        className="rounded-md h-11"
        style={{ background: css ?? `var(--${token})`, border: "1px solid color-mix(in srgb, currentColor 15%, transparent)" }}
      />
      <span style={{ ...mono, fontSize: 9, lineHeight: 1.2, opacity: 0.6, wordBreak: "break-all" }}>{token}</span>
      {value && <span style={{ ...mono, fontSize: 9, lineHeight: 1.2, opacity: 0.4, wordBreak: "break-all" }} title={value}>{value.length > 28 ? `${value.slice(0, 26)}…` : value}</span>}
    </div>
  );
}

/** Flush color ramp — swatches edge to edge so a derived scale reads as one gradient. */
export function Ramp({ tokens }: { tokens: string[] }) {
  return (
    <div className="flex">
      {tokens.map((t) => (
        <div key={t} className="h-11" style={{ background: `var(--${t})`, width: 28 }} title={t} />
      ))}
    </div>
  );
}

/** A token as text: name and declared value. For scales that are not colors. */
export function Token({ name, value, children }: { name: string; value?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1" style={{ minWidth: 96 }}>
      {children}
      <span style={{ ...mono, fontSize: 9, lineHeight: 1.2, opacity: 0.6 }}>{name}</span>
      {value && <span style={{ ...mono, fontSize: 9, lineHeight: 1.2, opacity: 0.4 }} title={value}>{value.length > 34 ? `${value.slice(0, 32)}…` : value}</span>}
    </div>
  );
}

/**
 * Scope a subtree to a color mode. The engine emits every mode's variables
 * under `[data-mode="…"]`, so this wrapper re-resolves the whole subtree.
 */
export function Mode({ mode, label, children }: { mode?: string; label: string; children: ReactNode }) {
  return (
    <div {...(mode && { "data-mode": mode })} className="flex flex-col gap-4" style={{ background: "var(--background)", color: "var(--foreground)", padding: 16, borderRadius: 8, flex: 1, minWidth: 320 }}>
      <span style={{ ...mono, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", opacity: 0.5 }}>{label}</span>
      {children}
    </div>
  );
}

/** Filler for layout fixtures: a dashed box that names the region it fills. */
export function Block({ label, style, children }: { label: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div style={{ border: "1px dashed color-mix(in srgb, currentColor 35%, transparent)", borderRadius: 6, padding: 12, minHeight: 40, ...mono, fontSize: 11, opacity: 0.85, ...style }}>
      {label}
      {children}
    </div>
  );
}
