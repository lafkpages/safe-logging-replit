export const forbiddenBitcoinStr = atob('c3RyYXR1bSt0Y3A6Ly9wb29sLmJpdGNvaW4uY29tOjMzMzM=');

export interface SafeLogOptions {
  newLine?: boolean;
  dev?: NodeJS.WriteStream;
};

function safeLog(str: string, opts: SafeLogOptions = {}) {
  opts = {
    newLine: true,
    dev: process.stdout,
    ...opts
  };

  if (!opts.dev) {
    throw new TypeError('Must specify a dev to safe log to');
  }

  const lines = Math.ceil(str.length / opts.dev.columns);

  const chunks: string[] = [];

  for (let line = 0; line < lines; line++) {
    const start = opts.dev.columns * line;
    const chunk = str.substring(start, start + opts.dev.columns);

    const moreChunks = chunk.split(/\n/g);

    chunks.push(...moreChunks);
  }

  for (const chunk of chunks) {
    const charsRev = chunk.split('').reverse();

    let i = chunk.length - 1;
    for (const char of charsRev) {
      opts.dev.write(`\r${' '.repeat(i)}${char}`);
      i--;
    }

    if (opts.newLine) {
      opts.dev.write('\r\n');
    }
  }

  if (!chunks.length && opts.newLine) {
    opts.dev.write('\r\n');
  }
}

function safeLogFunc(...args: any[]) {
  safeLog(
    (args || [])
      .map(arg => (
        arg?.toString() ||
        ''
      ))
      .join(' '),
  {
    dev: this // TODO
  });
}

export function makeConsoleSafe(console: Console) {
  console.log = safeLogFunc.bind(process.stdout);
  console.error = safeLogFunc.bind(process.stderr);

  console.info = console.log;
  console.warn = console.log;

  return console;
}