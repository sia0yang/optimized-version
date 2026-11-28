// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from 'vitest';

import { locateFailureMessage, locateFailureOf } from './locate-error';

describe('locateFailureOf', () => {
  it('reads a refused permission', () => {
    expect(locateFailureOf({ code: 1 })).toBe('denied');
  });

  it('reads a timeout', () => {
    expect(locateFailureOf({ code: 3 })).toBe('timeout');
  });

  it('treats a position the device could not work out, or an unknown code, as unavailable', () => {
    expect(locateFailureOf({ code: 2 })).toBe('unavailable');
    expect(locateFailureOf({ code: 99 })).toBe('unavailable');
  });
});

describe('locateFailureMessage', () => {
  it('gives each failure its own sentence, every one ending on a tap on the map', () => {
    const failures = [
      'denied',
      'timeout',
      'unsupported',
      'unavailable',
    ] as const;
    const messages = failures.map(locateFailureMessage);

    expect(new Set(messages).size).toBe(failures.length);

    for (const message of messages) {
      expect(message).toContain('在地圖上點一下');
    }
  });

  it('keeps the original sentence for a failure with no known cause', () => {
    expect(locateFailureMessage('unavailable')).toBe(
      '拿不到定位，請在地圖上點一下',
    );
  });
});
