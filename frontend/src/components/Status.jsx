import './Status.css';

export function Loader({ label = 'Loading...' }) {
  return (
    <div className="status" role="status" aria-live="polite">
      <span className="status__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="status status--error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="status__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message }) {
  return <div className="status">{message}</div>;
}
