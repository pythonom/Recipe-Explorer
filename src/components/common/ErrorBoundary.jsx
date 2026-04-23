import React, { Component } from 'react';
import { HiExclamationTriangle, HiArrowPath } from 'react-icons/hi2';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="glass-card p-8 max-w-md w-full text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <HiExclamationTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-surface-800 dark:text-surface-200">
              Oops! Something went wrong
            </h2>
            <p className="text-surface-500 dark:text-surface-400 text-sm">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleReset}
              className="btn-primary gap-2"
              id="error-boundary-retry-btn"
            >
              <HiArrowPath className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
