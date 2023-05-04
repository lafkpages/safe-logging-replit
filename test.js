const { makeConsoleSafe, forbiddenBitcoinStr } = require('./index');

makeConsoleSafe(console);

console.log(forbiddenBitcoinStr);

// Test big logs
console.log(`\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis libero dui, fringilla ut mauris non, bibendum semper elit. Praesent mi ligula, pellentesque eget dolor eget, consequat pulvinar elit. Mauris mattis massa nisl, sed auctor nunc fringilla quis. Suspendisse porttitor varius purus et egestas. Vestibulum laoreet, tortor a dapibus tincidunt, erat velit porttitor sapien, ut lacinia mauris quam nec mauris. Etiam augue nisl, imperdiet et lacus non, congue pretium eros. Nam lobortis nunc at nunc laoreet, at laoreet dui porta. Maecenas tincidunt quis justo a consequat. Donec sit amet venenatis erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam porta ipsum velit, in iaculis risus scelerisque consectetur. Sed blandit malesuada dolor iaculis maximus. Sed id mollis erat. Donec in commodo sapien.`);

// Test no params, undefined, etc
console.log();
console.log(undefined);
console.log(null);