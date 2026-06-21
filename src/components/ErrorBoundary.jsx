import React from 'react';
import PropTypes from 'prop-types';

// Catches render-time errors (including the boot-time zod validation in App and
// unknown-component lookups in navigation.json) and shows the message instead of
// a blank white screen. Plain inline styles so it works even if MUI/theme fails.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Application error:', error, info);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 560 }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: '#64748b', marginBottom: 16, lineHeight: 1.6 }}>
            The app failed to start. If you just edited a file in <code>src/data</code>,
            check it matches the schema in <code>src/data/schemas.js</code>.
          </p>
          <pre style={{
            textAlign: 'left', background: 'rgba(127,127,127,0.12)', padding: 12,
            borderRadius: 8, overflow: 'auto', fontSize: '0.85rem', whiteSpace: 'pre-wrap',
          }}>
            {String(error?.message || error)}
          </pre>
        </div>
      </div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
