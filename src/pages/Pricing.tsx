import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/seo';

function Pricing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page with pricing hash
    navigate('/#pricing', { replace: true });
  }, [navigate]);

  // This component will redirect, but we still need SEO tags
  return <SEO {...getPageSEO('pricing')} />;
}

export default Pricing;