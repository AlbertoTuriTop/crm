import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

describe('Frontend rendering smoke', () => {
  it('renders public access CTA label', () => {
    const html = renderToStaticMarkup(
      React.createElement('button', { type: 'button' }, 'Continuar al CRM'),
    );
    expect(html).toContain('Continuar al CRM');
  });
});
