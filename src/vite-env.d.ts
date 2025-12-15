/// <reference types="vite/client" />

// Extend Window interface for Google Analytics gtag
interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
}
