import { canAccess } from '@/domain/rules';

describe('access rule', () => {
  it('allows only aflogon@gmail.com', () => {
    expect(canAccess('aflogon@gmail.com')).toBe(true);
    expect(canAccess('otro@gmail.com')).toBe(false);
  });
});
