# Safe logging for Replit

A wrapper for the Node.js console to safely log strings to the console avoiding DoS vulnerabilities on Replit.

## Example

```js
const { makeConsoleSafe, forbiddenBitcoinStr } = require('safe-logging-replit');

// This is UNSAFE
console.log(forbiddenBitcoinStr);

makeConsoleSafe(console);

// This is now safe
console.log(forbiddenBitcoinStr);
```

A screen recording of with vs. without:

![video](https://cdn.discordapp.com/attachments/439966584501436416/1092958115508527205/safe-logging-replit_demo.mov)

## Why use this?

This package aims to fix a denial of service vulnerability on Replit. Not going into details here as it's a security vulnerability yet to be reported. But the vulnerability consists of the attacker sending specially crafted payloads to specific parts of your app to log a special string to your console. This string is seen as malicious by Replit, and your Repl gets flagged and taken down.

With this package, you avoid this vulnerability completely. Because of how strings get printed with this package, Replit can't detect them properly and therefore it's safe to print whatever you want.