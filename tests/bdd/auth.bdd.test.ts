import { defineFeature, loadFeature } from 'jest-cucumber';
import { canAccess } from '@/domain/rules';

const feature = loadFeature('features/auth.feature');

defineFeature(feature, (test) => {
  test('solo aflogon@gmail.com puede entrar', ({ given, when, then }) => {
    let email = '';
    let result = false;
    given(/^un email "(.*)"$/, (e) => { email = e; });
    when('valido acceso', () => { result = canAccess(email); });
    then('el acceso es permitido', () => { expect(result).toBe(true); });
  });
});
