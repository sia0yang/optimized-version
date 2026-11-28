// SPDX-License-Identifier: GPL-3.0-only
/**
 * What the small map tells a person when the device cannot say where they are. Every case ends on
 * the same way out, a tap on the map, but the first part says why, so the person knows whether
 * to switch a permission on or simply tap.
 */

/** Why the device gave no point. */
export type LocateFailure =
  | 'denied'
  | 'timeout'
  | 'unsupported'
  | 'unavailable';

/** The standard `GeolocationPositionError.code` values. */
const PERMISSION_DENIED = 1;
const TIMEOUT = 3;

/** The failure a browser's error means. A code it does not know is `unavailable`. */
export function locateFailureOf(error: { code: number }): LocateFailure {
  if (error.code === PERMISSION_DENIED) {
    return 'denied';
  }

  if (error.code === TIMEOUT) {
    return 'timeout';
  }

  return 'unavailable';
}

const MESSAGES: Record<LocateFailure, string> = {
  denied: '定位權限被關閉，請到瀏覽器設定開啟，或直接在地圖上點一下',
  timeout: '定位花太久，請在地圖上點一下你的位置',
  unsupported: '這台裝置不支援定位，請在地圖上點一下你的位置',
  unavailable: '拿不到定位，請在地圖上點一下',
};

/** The sentence under the map for one failure. */
export function locateFailureMessage(failure: LocateFailure): string {
  return MESSAGES[failure];
}
