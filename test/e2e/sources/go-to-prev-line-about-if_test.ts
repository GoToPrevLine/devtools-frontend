// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assert} from 'chai';

import {
  getBrowserAndPages,
  goToResource,
  step,
  waitFor,
} from '../../shared/helper.js';
import {
  PAUSE_INDICATOR_SELECTOR,
} from '../helpers/sources-helpers.js';

describe('Sources Tab', () => {
  it('디버거로 인해 멈췄을 경우, 거꾸로 가기 버튼이 보여야 한다.', async () => {
    const {target} = getBrowserAndPages();
    await step('if문 예제 코드가 제공된다.', async () => {
      await goToResource('sources/go-to-prev-line-about-if.html');
    });

    await step('debugger 표현식에서 멈춘다.', async () => {
      target.evaluate('test();');
      await waitFor(PAUSE_INDICATOR_SELECTOR);
    });

    await step('거꾸로 가기 버튼이 보인다.', async () => {
      const selector = '[aria-label="goToPrevLine"]';

      const goToPrevLineButton = await waitFor(selector);

      assert.exists(goToPrevLineButton);
    });
  });
});
