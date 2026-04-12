import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-accent px-4">
      <div className="text-center animate-slide-up">
        <div className="text-8xl mb-4">🗺️ 🚌 ✈️</div>
        <h1 className="text-8xl sm:text-9xl font-extrabold text-brand-secondary mb-4">404</h1>
        <h2 className="text-2xl font-extrabold text-brand-primary mb-3">Oops! This page went on a trip without us.</h2>
        <p className="text-neutral-500 text-sm mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another destination.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
