// ============================================================
// EMIT — Token-to-CSS emitters
// ============================================================
//
// Converts theme token objects into CSS declarations.
//
// Color composition uses CSS custom properties set and consumed
// on the same selector ([element], [layout], [data-part]).
// The consuming formula lives on those selectors via generatePropertyApplication().
// State overrides just change the vars — the formula re-evaluates automatically.
// Children (span, svg, etc.) are unaffected: they don't match [element].
//
// Vars emitted here:
//   --bg, --fg, --tint, --bg-alpha, --border-color  → composition vars
//   --scrollbar-*, --placeholder-*, --caret-color   → pseudo-element vars
//   --scrim-*, --obfuscation-*                      → family-specific vars
//

// ── Types ───────────────────────────────────────────────────

export type EmittedDeclarations = {
  vars: Record<string, string>;
  props: Record<string, string>;
};

// ── Utilities ───────────────────────────────────────────────

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// ── Color Resolution ────────────────────────────────────────

const SEMANTIC_COLOR_TOKENS = new Set([
  'background', 'foreground',
  'primary', 'secondary', 'muted', 'accent',
]);

const GRAY_PURE_HEX: Record<string, string> = {
  '50': '#FAFAFA', '100': '#F2F2F2', '150': '#ECECEC', '200': '#E6E6E6',
  '250': '#DBDBDB', '300': '#D1D1D1', '400': '#A3A3A3', '500': '#737373',
  '600': '#545454', '700': '#3D3D3D', '800': '#242424', '900': '#121212',
  '950': '#0A0A0A',
};

function resolveGradientLayer(def: Record<string, unknown>): string {
  const stops = (def.stops as Array<{ color: string; position?: string }> | undefined) ?? [];
  const resolvedStops = stops.map(s => {
    const color = resolveColorRef(String(s.color));
    return s.position ? `${color} ${s.position}` : color;
  }).join(', ');

  if (def.type === 'linear') {
    const angle = def.angle ?? '180deg';
    const angleStr = typeof angle === 'number' ? `${angle}deg` : String(angle);
    return `linear-gradient(${angleStr}, ${resolvedStops})`;
  }
  if (def.type === 'radial') {
    const shape = def.shape ?? 'ellipse';
    const pos = def.position ? ` at ${def.position}` : '';
    return `radial-gradient(${shape}${pos}, ${resolvedStops})`;
  }
  if (def.type === 'conic') {
    const angle = def.angle != null ? `from ${def.angle}deg ` : '';
    const pos = def.position ? `at ${def.position} ` : '';
    return `conic-gradient(${angle}${pos}${resolvedStops})`;
  }
  return resolvedStops;
}

// Handles both a single GradientLayer and a stacked GradientLayer[].
// Stacked layers emit as comma-separated CSS background values.
export function resolveGradient(def: unknown): string {
  if (Array.isArray(def)) {
    return (def as Record<string, unknown>[]).map(resolveGradientLayer).join(', ');
  }
  return resolveGradientLayer(def as Record<string, unknown>);
}

export function resolveColorRef(value: string): string {
  if (value === 'transparent' || value === 'currentColor' || value === 'inherit') return value;
  if (value === 'smart-bw') return 'hsl(from var(--bg) 0 0 calc((l - 74) * -100))';
  if (value === 'tint') return 'var(--tint)';
  if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl') || value.startsWith('oklch') || value.startsWith('var(')) return value;
  if (value.startsWith('gray-pure-')) return GRAY_PURE_HEX[value.slice(10)] ?? '#000000';
  if (SEMANTIC_COLOR_TOKENS.has(value)) return `var(--${value})`;
  return `var(--color-${value})`;
}

// ── Token Resolution (spacing, radius, etc.) ────────────────

export function resolveTokenRef(value: string, type: 'spacing' | 'radius' | 'shadow' | 'border-width' | 'transition-duration' | 'transition-timing'): string {
  if (value === 'none') {
    if (type === 'shadow') return 'none';
    return '0';
  }
  if (type === 'spacing') return `var(--spacing-${value})`;
  if (type === 'radius') {
    if (value === 'full') return '9999px';
    return `var(--radius-${value})`;
  }
  if (type === 'shadow') return `var(--shadow-${value})`;
  if (type === 'border-width') return `var(--border-width-${camelToKebab(value)})`;
  if (type === 'transition-duration') return `var(--transition-duration-${camelToKebab(value)})`;
  if (type === 'transition-timing') return `var(--transition-timing-${camelToKebab(value)})`;
  return value;
}

// ── Boundary ────────────────────────────────────────────────

export function emitBoundary(
  b: Record<string, unknown> | undefined,
  out: EmittedDeclarations,
): void {
  if (!b) return;

  const border = b.border as Record<string, unknown> | undefined;
  if (border) {
    if (border.width != null) {
      out.props['border-width'] = resolveTokenRef(String(border.width), 'border-width');
      if (border.style == null) out.props['border-style'] = 'solid';
      if (border.color == null) out.vars['border-color'] = 'var(--color-gray-200)';
    }
    if (border.style != null) out.props['border-style'] = String(border.style);
    if (border.color != null) out.vars['border-color'] = resolveColorRef(String(border.color));

    for (const side of ['top', 'right', 'bottom', 'left'] as const) {
      const s = border[side] as Record<string, unknown> | undefined;
      if (!s) continue;
      if (s.width != null) out.props[`border-${side}-width`] = resolveTokenRef(String(s.width), 'border-width');
      if (s.style != null) out.props[`border-${side}-style`] = String(s.style);
      if (s.color != null) out.props[`border-${side}-color`] = resolveColorRef(String(s.color));
    }
  }

  const radius = b.radius as Record<string, unknown> | undefined;
  if (radius) {
    if (radius.all != null) out.props['border-radius'] = resolveTokenRef(String(radius.all), 'radius');
    if (radius.topLeft != null) out.props['border-top-left-radius'] = resolveTokenRef(String(radius.topLeft), 'radius');
    if (radius.topRight != null) out.props['border-top-right-radius'] = resolveTokenRef(String(radius.topRight), 'radius');
    if (radius.bottomRight != null) out.props['border-bottom-right-radius'] = resolveTokenRef(String(radius.bottomRight), 'radius');
    if (radius.bottomLeft != null) out.props['border-bottom-left-radius'] = resolveTokenRef(String(radius.bottomLeft), 'radius');
  }

  const effectRef = b.effect;
  if (effectRef != null && typeof effectRef === 'string') {
    out.props['box-shadow'] = resolveTokenRef(effectRef, 'shadow');
  }

  const margin = b.margin as Record<string, unknown> | undefined;
  if (margin) {
    const resolveMarginValue = (v: unknown) =>
      String(v) === 'auto' ? 'auto' : resolveTokenRef(String(v), 'spacing');
    if (margin.all != null) {
      out.props['margin'] = resolveMarginValue(margin.all);
    } else {
      const mx = margin.x != null ? resolveMarginValue(margin.x) : undefined;
      const my = margin.y != null ? resolveMarginValue(margin.y) : undefined;
      if (mx != null && my != null) {
        out.props['margin'] = `${my} ${mx}`;
      } else {
        if (mx != null) { out.props['margin-left'] = mx; out.props['margin-right'] = mx; }
        if (my != null) { out.props['margin-top'] = my; out.props['margin-bottom'] = my; }
      }
      if (margin.top    != null) out.props['margin-top']    = resolveMarginValue(margin.top);
      if (margin.right  != null) out.props['margin-right']  = resolveMarginValue(margin.right);
      if (margin.bottom != null) out.props['margin-bottom'] = resolveMarginValue(margin.bottom);
      if (margin.left   != null) out.props['margin-left']   = resolveMarginValue(margin.left);
    }
  }

  const outline = b.outline as Record<string, unknown> | undefined;
  if (outline) {
    if (outline.width != null) out.props['outline-width'] = resolveTokenRef(String(outline.width), 'border-width');
    if (outline.style != null) out.props['outline-style'] = String(outline.style);
    if (outline.color != null) out.props['outline-color'] = resolveColorRef(String(outline.color));
    if (outline.offset != null) out.props['outline-offset'] = String(outline.offset);
  }
}

// ── Interior ────────────────────────────────────────────────

export function emitInterior(
  i: Record<string, unknown> | undefined,
  out: EmittedDeclarations,
): void {
  if (!i) return;

  // Colors → composition vars (consumed by formula on [element],[layout],[data-part])
  if (i.background != null) {
    if (typeof i.background === 'object') {
      out.vars['bg-gradient'] = resolveGradient(i.background);
    } else if (String(i.background).startsWith('gradient-')) {
      out.vars['bg-gradient'] = `var(--${i.background})`;
    } else {
      out.vars['bg'] = resolveColorRef(String(i.background));
    }
  }
  if (i.backgroundAlpha != null) out.vars['bg-alpha'] = `${Math.round(Number(i.backgroundAlpha) * 100)}%`;
  if (i.foreground != null) out.vars['fg'] = resolveColorRef(String(i.foreground));

  // Opacity → plain CSS
  if (i.opacity != null) out.props['opacity'] = String(i.opacity);

  // Padding → plain CSS
  const p = i.padding as Record<string, unknown> | undefined;
  if (p) {
    if (p.all != null) {
      out.props['padding'] = resolveTokenRef(String(p.all), 'spacing');
    } else {
      const px = p.x != null ? resolveTokenRef(String(p.x), 'spacing') : undefined;
      const py = p.y != null ? resolveTokenRef(String(p.y), 'spacing') : undefined;
      if (px != null && py != null) {
        out.props['padding'] = `${py} ${px}`;
      } else {
        if (px != null) { out.props['padding-left'] = px; out.props['padding-right'] = px; }
        if (py != null) { out.props['padding-top'] = py; out.props['padding-bottom'] = py; }
      }
      if (p.top != null) out.props['padding-top'] = resolveTokenRef(String(p.top), 'spacing');
      if (p.right != null) out.props['padding-right'] = resolveTokenRef(String(p.right), 'spacing');
      if (p.bottom != null) out.props['padding-bottom'] = resolveTokenRef(String(p.bottom), 'spacing');
      if (p.left != null) out.props['padding-left'] = resolveTokenRef(String(p.left), 'spacing');
    }
  }

  // Gap → plain CSS
  const g = i.gap as Record<string, unknown> | undefined;
  if (g) {
    if (g.all != null) out.props['gap'] = resolveTokenRef(String(g.all), 'spacing');
    if (g.h != null) out.props['column-gap'] = resolveTokenRef(String(g.h), 'spacing');
    if (g.v != null) out.props['row-gap'] = resolveTokenRef(String(g.v), 'spacing');
  }

  // Scrollbar → CSS vars (used in ::-webkit-scrollbar pseudo-elements)
  const sb = i.scrollbar as Record<string, unknown> | undefined;
  if (sb) {
    if (sb.thumbColor != null) out.vars['scrollbar-thumb'] = resolveColorRef(String(sb.thumbColor));
    if (sb.trackColor != null) out.vars['scrollbar-track'] = resolveColorRef(String(sb.trackColor));
    if (sb.width != null) out.vars['scrollbar-width'] = String(sb.width);
  }

  // Child align → works for flex (justify-content / align-items) AND block text (text-align).
  // Inspired by the pr-layout pattern: same token, correct property per context.
  // horizontal → justify-content (flex-row main axis) + text-align (block)
  // vertical   → align-items (flex-row cross axis)
  // For flex-col containers the axes are swapped — handled by the component's flex-direction.
  const ca = i.childAlign as Record<string, unknown> | undefined;
  if (ca) {
    if (ca.horizontal != null) {
      const h = String(ca.horizontal);
      out.props['justify-content'] = h;
      out.props['text-align'] = h;
    }
    if (ca.vertical != null) {
      out.props['align-items'] = String(ca.vertical);
    }
  }
}

// ── Typography ──────────────────────────────────────────────

export function emitTypography(
  t: Record<string, unknown> | undefined,
  out: EmittedDeclarations,
): void {
  if (!t) return;
  if (t.typographyType != null) {
    const key = String(t.typographyType);
    out.props['font-family'] = `var(--typography-${key}-font-family)`;
    out.props['font-size'] = `var(--typography-${key}-font-size)`;
    out.props['font-weight'] = `var(--typography-${key}-font-weight)`;
    out.props['line-height'] = `var(--typography-${key}-line-height)`;
    out.props['font-style'] = `var(--typography-${key}-font-style, normal)`;
    out.props['letter-spacing'] = `var(--typography-${key}-letter-spacing, normal)`;
  }
  if (t.textAlign != null) out.props['text-align'] = String(t.textAlign);
  if (t.verticalAlign != null) out.props['vertical-align'] = String(t.verticalAlign);
  if (t.textTransform != null) out.props['text-transform'] = String(t.textTransform);
  if (t.textDecoration != null) out.props['text-decoration'] = String(t.textDecoration);

  const textEffects = t.textEffect as Array<Record<string, unknown>> | undefined;
  if (textEffects && textEffects.length > 0) {
    out.props['text-shadow'] = textEffects.map(te => {
      const resolved = resolveColorRef(String(te.color));
      const color = te.opacity != null
        ? `color-mix(in srgb, ${resolved} ${Math.round(Number(te.opacity) * 100)}%, transparent)`
        : resolved;
      return `${te.x}px ${te.y}px ${te.blur}px ${color}`;
    }).join(', ');
  }
}

// ── Transition ──────────────────────────────────────────────

export function emitTransition(
  tr: Record<string, unknown> | undefined,
  out: EmittedDeclarations,
): void {
  if (!tr) return;
  if (tr.duration != null) out.props['transition-duration'] = resolveTokenRef(String(tr.duration), 'transition-duration');
  if (tr.timing != null) out.props['transition-timing-function'] = resolveTokenRef(String(tr.timing), 'transition-timing');
}

// ── Full surface ────────────────────────────────────────────

export function emitDimensionPosition(
  dp: Record<string, unknown> | undefined,
  out: EmittedDeclarations,
): void {
  if (!dp) return;
  if (dp.width != null) out.props['width'] = String(dp.width);
  if (dp.height != null) out.props['height'] = String(dp.height);
  const parts: string[] = [];
  if (dp.translateX != null) parts.push(`translateX(${dp.translateX})`);
  if (dp.translateY != null) parts.push(`translateY(${dp.translateY})`);
  if (parts.length) out.props['transform'] = parts.join(' ');
}

export function emitSurface(
  tokens: Record<string, unknown>,
  out: EmittedDeclarations,
): void {
  emitBoundary(tokens.boundary as Record<string, unknown> | undefined, out);
  emitInterior(tokens.interior as Record<string, unknown> | undefined, out);
  emitDimensionPosition(tokens.dimensionPosition as Record<string, unknown> | undefined, out);
  emitTypography(tokens.defaultTypography as Record<string, unknown> | undefined, out);
  emitTransition(tokens.transition as Record<string, unknown> | undefined, out);

  if (tokens.tint != null) out.vars['tint'] = resolveColorRef(String(tokens.tint));
  if (tokens.cursor != null) out.props['cursor'] = String(tokens.cursor);
}

// ── Partial surface (for state/status/emphasis) ─────────────

export function emitPartialSurface(
  entry: Record<string, unknown>,
  out: EmittedDeclarations,
): void {
  const ps = entry.partialSurface as Record<string, unknown> | undefined;
  if (ps) emitSurface(ps, out);
  emitTransition(entry.transition as Record<string, unknown> | undefined, out);
}

// ── Family-specific extras ──────────────────────────────────

const BLUR_TOKEN_MAP: Record<string, string> = {
  none: '0px',
  xs:   '2px',
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '20px',
};

export function emitOverlayExtras(
  tokens: Record<string, unknown>,
  out: EmittedDeclarations,
): void {
  const overlay = tokens.overlay as Record<string, unknown> | undefined;
  if (overlay) {
    if (overlay.scrimColor != null) out.vars['scrim-color'] = resolveColorRef(String(overlay.scrimColor));
    if (overlay.scrimOpacity != null) {
      // Precompute as a percentage so color-mix can use it without calc()
      const pct = Math.round(Number(overlay.scrimOpacity) * 100);
      out.vars['scrim-opacity-pct'] = `${pct}%`;
    }
    if (overlay.scrimBlur != null) {
      const raw = String(overlay.scrimBlur);
      out.vars['scrim-blur'] = BLUR_TOKEN_MAP[raw] ?? raw;
    }
  }
}

export function emitMediaExtras(
  tokens: Record<string, unknown>,
  out: EmittedDeclarations,
): void {
  if (tokens.objectFit != null) out.vars['media-object-fit'] = String(tokens.objectFit);
  if (tokens.objectPosition != null) out.vars['media-object-position'] = String(tokens.objectPosition);
  if (tokens.aspectRatio != null) out.props['aspect-ratio'] = String(tokens.aspectRatio);

  const filter = tokens.filter as Record<string, unknown> | undefined;
  if (filter) {
    const parts: string[] = [];
    if (filter.grayscale != null) parts.push(`grayscale(${filter.grayscale})`);
    if (filter.brightness != null) parts.push(`brightness(${filter.brightness})`);
    if (filter.contrast != null) parts.push(`contrast(${filter.contrast})`);
    if (filter.blur != null) parts.push(`blur(${filter.blur})`);
    if (parts.length) out.props['filter'] = parts.join(' ');
  }

  const overlay = tokens.overlay as Record<string, unknown> | undefined;
  if (overlay) {
    if (overlay.color != null) out.vars['media-overlay-color'] = resolveColorRef(String(overlay.color));
    if (overlay.opacity != null) out.vars['media-overlay-opacity'] = `${Math.round(Number(overlay.opacity) * 100)}%`;
    if (overlay.blur != null) out.vars['media-overlay-blur'] = String(overlay.blur);
  }
}

export function emitFieldExtras(
  tokens: Record<string, unknown>,
  out: EmittedDeclarations,
): void {
  if (tokens.placeholderColor != null) out.vars['placeholder-color'] = resolveColorRef(String(tokens.placeholderColor));
  if (tokens.placeholderOpacity != null) out.vars['placeholder-opacity'] = String(tokens.placeholderOpacity);
  if (tokens.caretColor != null) out.vars['caret-color'] = resolveColorRef(String(tokens.caretColor));

  const obf = tokens.obfuscation as Record<string, unknown> | undefined;
  if (obf) {
    if (obf.character != null) out.vars['obfuscation-char'] = `"${String(obf.character)}"`;
    if (obf.letterSpacing != null) out.vars['obfuscation-letter-spacing'] = String(obf.letterSpacing);
    if (obf.fontSize != null) out.vars['obfuscation-font-size'] = String(obf.fontSize);
  }
}
