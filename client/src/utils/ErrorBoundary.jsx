import React from 'react';

/**
 * ErrorBoundary class component that catches JavaScript errors in child components
 * Displays fallback UI when errors occur instead of crashing the entire app
 * Logs error information for debugging purposes
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    /**
     * Updates state to render fallback UI when an error is caught
     * @param {Error} error - The error that was caught
     * @returns {Object} New state with error information
     */
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    /**
     * Logs error information when an error is caught
     * @param {Error} error - The error that was caught
     * @param {Object} info - Error information including component stack
     */
    componentDidCatch(error, info) {
        console.error('Caught by ErrorBoundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 20 }}>
                    <h1>Something went wrong 😢</h1>
                    <pre>{this.state.error?.toString()}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
