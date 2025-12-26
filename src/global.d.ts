// Global type declarations

// Extend Window interface for Google Analytics gtag
declare global {
    interface Window {
        gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    }
}

export { };
