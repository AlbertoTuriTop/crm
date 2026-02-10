'use client';

import { Alert, Button, Container } from 'react-bootstrap';
import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { status } = useSession();
  return (
    <Container className="py-5">
      <h1>CRM Login</h1>
      <Alert variant="info">Solo aflogon@gmail.com está autorizado.</Alert>
      <Button onClick={() => signIn('google')} disabled={status === 'loading'}>Sign in with Google</Button>
    </Container>
  );
}
