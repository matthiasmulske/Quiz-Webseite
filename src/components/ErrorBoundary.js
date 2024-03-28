import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error here, e.g., to a logging service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render your error page or fallback UI here
      return <ErrorPage />;
    }

    // Render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
