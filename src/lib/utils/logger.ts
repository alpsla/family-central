// Logger utility for consistent logging across the application
type LogLevel = 'info' | 'warn' | 'error' | 'success';

interface LogOptions {
  title?: string;
  data?: unknown;
}

const COLORS = {
  info: '#3b82f6',    // blue
  warn: '#f59e0b',    // amber
  error: '#ef4444',   // red
  success: '#10b981', // emerald
};

const ICONS = {
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
  success: '✅',
};

export const logger = {
  _log(level: LogLevel, message: string, options: LogOptions = {}) {
    if (import.meta.env.PROD) return; // Only log in development

    const { title, data } = options;
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    
    // Style for the log message
    const styles = [
      `color: ${COLORS[level]}`,
      'font-weight: bold',
      'padding: 2px 4px',
      'border-radius: 4px',
    ].join(';');

    // Build the log message
    const icon = ICONS[level];
    const titleStr = title ? ` | ${title}` : '';
    const prefix = `[${timestamp}]${titleStr}`;

    // Log the message with styling
    console.groupCollapsed(`%c${icon} ${prefix} ${message}`, styles);
    
    if (data !== undefined) {
      console.log('Details:', data);
    }
    
    // Add stack trace for errors
    if (level === 'error') {
      console.trace('Stack trace:');
    }
    
    console.groupEnd();
  },

  info(message: string, options?: LogOptions) {
    this._log('info', message, options);
  },

  warn(message: string, options?: LogOptions) {
    this._log('warn', message, options);
  },

  error(message: string, options?: LogOptions) {
    this._log('error', message, options);
  },

  success(message: string, options?: LogOptions) {
    this._log('success', message, options);
  }
};