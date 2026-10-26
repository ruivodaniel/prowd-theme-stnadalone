/**
 * System detection — read the IANA timezone the JS engine resolved for
 * the current process / browser session.
 *
 * Works in both browser and Node (any environment with `Intl`). Returns
 * `null` if `Intl` rejects the resolved zone (defensive — should be
 * unreachable in practice).
 */

import { isTimezone, type Timezone } from "./index";

export function detectSystemValue(): Timezone | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return isTimezone(tz) ? tz : null;
  } catch {
    return null;
  }
}
