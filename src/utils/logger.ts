// Enhanced logging system with error tracking
const isDevelopment = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

type LogLevel = 'log' | 'error' | 'warn' | 'info';
type LogContext = Record<string, any>;

interface ErrorLog {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  stack?: string;
  userAgent?: string;
  url?: string;
}

class Logger {
  private errorQueue: ErrorLog[] = [];
  private maxQueueSize = 50;

  private formatMessage(level: LogLevel, message: string, context?: LogContext): ErrorLog {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
  }

  private addToQueue(logEntry: ErrorLog) {
    this.errorQueue.push(logEntry);
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }
  }

  private async sendToBackend(logEntry: ErrorLog) {
    if (!isProd) return;

    try {
      // Store critical errors in backend for monitoring
      if (logEntry.level === 'error') {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-activity`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'error',
            data: logEntry,
          }),
        });
      }
    } catch (err) {
      // Silently fail - don't want logging errors to break the app
      console.error('Failed to send log to backend:', err);
    }
  }

  log(message: string, context?: LogContext) {
    const entry = this.formatMessage('log', message, context);
    if (isDevelopment) {
      console.log(`[${entry.timestamp}]`, message, context || '');
    }
    this.addToQueue(entry);
  }

  info(message: string, context?: LogContext) {
    const entry = this.formatMessage('info', message, context);
    if (isDevelopment) {
      console.info(`[${entry.timestamp}]`, message, context || '');
    }
    this.addToQueue(entry);
  }

  warn(message: string, context?: LogContext) {
    const entry = this.formatMessage('warn', message, context);
    console.warn(`[${entry.timestamp}]`, message, context || '');
    this.addToQueue(entry);
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const entry = this.formatMessage('error', message, {
      ...context,
      errorMessage: errorObj.message,
      stack: errorObj.stack,
    });
    
    console.error(`[${entry.timestamp}]`, message, errorObj, context || '');
    this.addToQueue(entry);
    this.sendToBackend(entry);
  }

  // Get recent logs for debugging
  getRecentLogs(count: number = 10): ErrorLog[] {
    return this.errorQueue.slice(-count);
  }

  // Clear logs
  clearLogs() {
    this.errorQueue = [];
  }
}

export const logger = new Logger();
