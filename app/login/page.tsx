'use client';

import { useEffect, useState } from 'react';
import { Alert, Button, Container, Spinner } from 'react-bootstrap';
import { signIn, useSession } from 'next-auth/react';

type ProvidersResponse = Record<string, { id: string; name: string }>;

export default function LoginPage() {
  const { status } = useSession();
  const [googleAvailable, setGoogleAvailable] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAuthError(params.get('error'));
  }, []);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const response = await fetch('/api/auth/providers');
        if (!response.ok) {
          setGoogleAvailable(false);
          return;
        }

        const providers = (await response.json()) as ProvidersResponse;
        setGoogleAvailable(Boolean(providers.google));
      } catch {
        setGoogleAvailable(false);
      } finally {
        setLoadingProviders(false);
      }
    };

    loadProviders();
  }, []);

  return (
    <Container className="py-5">
      <h1>CRM Login</h1>
      <Alert variant="info">Solo aflogon@gmail.com está autorizado.</Alert>

      {authError === 'Configuration' && (
        <Alert variant="danger">
          Error de configuración OAuth. Revisa NEXTAUTH_SECRET, GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET y NEXTAUTH_URL.
        </Alert>
      )}

      {!loadingProviders && !googleAvailable && (
        <Alert variant="warning">
          Google OAuth no está habilitado en el servidor. Configura las variables de
          entorno para activar el login.
        </Alert>
      )}

      {loadingProviders ? (
        <Button disabled>
          <Spinner size="sm" className="me-2" />
          Cargando Google OAuth...
        </Button>
      ) : (
        <Button
          onClick={() => signIn('google')}
          disabled={status === 'loading' || !googleAvailable}
        >
          Sign in with Google
        </Button>
      )}
    </Container>
  );
}
