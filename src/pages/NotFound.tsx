import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/seo';

export default function NotFound() {
  const location = useLocation();

  return (
    <>
      <SEO
        {...getPageSEO('home')}
        title="Page not found | OLYNK"
        description="The page you’re looking for doesn’t exist."
        canonical={location.pathname}
        noIndex
      />
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="rounded-2xl border border-sand/60 bg-white/70 p-10 backdrop-blur">
          <p className="text-sm font-medium text-steel">404</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy">
            Page not found
          </h1>
          <p className="mt-3 text-steel">
            No route matches <span className="font-mono text-navy">{location.pathname}</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy/90 transition-colors"
            >
              Go to Home
            </Link>
            <Link
              to="/platform"
              className="inline-flex items-center justify-center rounded-xl border border-sand px-5 py-3 text-sm font-semibold text-navy hover:bg-cream transition-colors"
            >
              Explore Platform
            </Link>
            <Link
              to="/request-demo"
              className="inline-flex items-center justify-center rounded-xl border border-sand px-5 py-3 text-sm font-semibold text-navy hover:bg-cream transition-colors"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
