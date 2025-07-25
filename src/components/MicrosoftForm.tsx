import React from 'react';

const MicrosoftForm: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Form
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Fill out this form to get in touch with us directly.
        </p>
      </div>

      {/* Microsoft Forms Iframe */}
      <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
        <iframe 
          width="100%" 
          height="480px" 
          src="https://forms.office.com/r/zd11g2RWDR?embed=true" 
          frameBorder="0" 
          marginWidth={0} 
          marginHeight={0} 
          style={{ 
            border: 'none', 
            maxWidth: '100%', 
            maxHeight: '100vh' 
          }} 
          allowFullScreen 
          title="Microsoft Contact Form"
        />
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
        This form is powered by Microsoft Forms and provides a secure way to contact us.
      </p>
    </div>
  );
};

export default MicrosoftForm; 