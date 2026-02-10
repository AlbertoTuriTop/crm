'use client';

import Link from 'next/link';
import { Alert, Container } from 'react-bootstrap';

export default function LoginPage() {
  return (
    <Container className="py-5">
      <h1>CRM</h1>
      <Alert variant="warning">
        El login con Google está desactivado temporalmente. Puedes acceder directamente a la
        aplicación.
      </Alert>
      <Link className="btn btn-primary" href="/contacts">
        Continuar al CRM
      </Link>
    </Container>
  );
}
