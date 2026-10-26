// Compile-time checks of the platform split. Nothing here runs; each `@ts-expect-error`
// line is a thing a theme must NOT be able to write, and fails the type-check if it becomes allowed.
import type { MobileTheme, WebTheme } from '../theme';
import type { MobileElementTypes, MobileFamilies } from './mobile';
import type { MobileElementKey, MobileStateOf, WebElementKey } from '../elements';
import type { ElementTypes } from '../cascade';

type Expect<T extends true> = T;
type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type Has<U, V> = V extends U ? true : false;

// the table: 89 elements on the web, 66 of them on mobile
export type _c1 = Expect<Has<WebElementKey, 'tooltip'>>;
export type _c2 = Expect<Has<MobileElementKey, 'button'>>;
export type _c3 = Expect<Equal<Has<MobileElementKey, 'tooltip'>, false>>;
export type _c4 = Expect<Equal<Has<MobileElementKey, 'tableRow'>, false>>;
// and one element only mobile has
export type _c4b = Expect<Has<MobileElementKey, 'navItem'>>;
export type _c4c = Expect<Equal<Has<WebElementKey, 'navItem'>, false>>;

// states: mobile has no hover; long-pressed stands where hover was; a list row can be swiped
export type _c5 = Expect<Equal<Has<MobileStateOf<'button'>, 'hover'>, false>>;
export type _c6 = Expect<Has<MobileStateOf<'button'>, 'long-pressed'>>;
export type _c7 = Expect<Has<MobileStateOf<'button'>, 'active'>>;
export type _c8 = Expect<Has<MobileStateOf<'listItem'>, 'swiped'>>;
export type _c9 = Expect<Equal<Has<MobileStateOf<'button'>, 'swiped'>, false>>;

// a web theme still authors everything it could
export const _web: Pick<WebTheme, 'elements' | 'families'> = {
  families: { surfaceContainer: { cursor: 'pointer', boundary: { outline: { width: 'thin' } }, combined: [{ where: { state: 'hover' } }] } },
  elements: { tooltip: {}, tableRow: {} } satisfies ElementTypes,
};

// a mobile theme authors the shared shapes with mobile's states …
export const _mobileOk: MobileFamilies = {
  surfaceContainer: { boundary: { radius: { all: 'md' } }, combined: [{ where: { state: 'long-pressed' } }, { where: { state: 'active' } }] },
};
export const _mobileElementsOk: MobileElementTypes = { button: {}, listItem: {}, sheet: {} };

// … and cannot write what only the web has
export const _noCursor: MobileFamilies = {
  // @ts-expect-error cursor is web only
  surfaceContainer: { cursor: 'pointer' },
};
export const _noOutline: MobileFamilies = {
  // @ts-expect-error the focus outline is web only
  surfaceContainer: { boundary: { outline: { width: 'thin' } } },
};
export const _noScrollbar: MobileFamilies = {
  // @ts-expect-error the scrollbar is web only
  surfaceContainer: { interior: { scrollbar: { width: '8px' } } },
};
export const _noHover: MobileFamilies = {
  // @ts-expect-error hover is a web state
  surfaceContainer: { combined: [{ where: { state: 'hover' } }] },
};
export const _noWebElement: MobileElementTypes = {
  // @ts-expect-error a tooltip does not exist on mobile
  tooltip: {},
};
export const _noWebLayouts: Pick<MobileTheme, 'layouts'> = {
  // @ts-expect-error a page header is a web region; mobile has an app bar
  layouts: { pageHeader: { height: '56px' } },
};
export const _mobileLayoutsOk: Pick<MobileTheme, 'layouts' | 'press'> = {
  layouts: { appBar: { height: '56px', safeArea: ['top'] }, tabBar: { height: '64px', safeArea: ['bottom'] } },
  press: { opacityDim: 0.6 },
};
