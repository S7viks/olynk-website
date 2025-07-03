import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page with pricing hash
    navigate('/#pricing', { replace: true });
  }, [navigate]);

  // This component will redirect, so we don't need to render anything
  return null;
}

export default Pricing;