const forbiddenBitcoinStr = atob('c3RyYXR1bSt0Y3A6Ly9wb29sLmJpdGNvaW4uY29tOjMzMzM=');

function safeLog(str, opts = {}) {
  opts = {
    newLine: true,
    dev: process.stdout,
    ...opts
  };

  const lines = Math.ceil(str.length / opts.dev.columns);

  const chunks = [];

  for (let line = 0; line < lines; line++) {
    const chunk = str.substr(opts.dev.columns * line, opts.dev.columns);

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

function safeLogFunc(...args) {
  safeLog(
    (args || [])
      .map(arg => (
        arg?.toString() ||
        ''
      ))
      .join(' '),
  {
    dev: this
  });
}

function makeConsoleSafe(console) {
  console.log = safeLogFunc.bind(process.stdout);
  console.error = safeLogFunc.bind(process.stderr);

  console.info = console.log;
  console.warn = console.log;

  return console;
}

module.exports = {
  makeConsoleSafe,
  safeLog: safeLog,
  forbiddenBitcoinStr
};