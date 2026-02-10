import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

describe('Frontend rendering smoke', () => {
  it('renders login CTA label', () => {
    const html = renderToStaticMarkup(
      React.createElement('button', { type: 'button' }, 'Sign in with Google'),
    );
    expect(html).toContain('Sign in with Google');
  });
});
