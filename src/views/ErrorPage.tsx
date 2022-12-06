import { ErrorResponse } from '@remix-run/router';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const { statusText, error } = useRouteError() as ErrorResponse;

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{statusText ?? error?.message}</i>
      </p>
    </div>
  );
}
