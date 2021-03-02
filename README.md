# deno-quick-stable-stringify

![Test status](https://github.com/sxwei123/deno-quick-stable-stringify/workflows/Test/badge.svg?branch=master)

Deterministic `JSON.stringify()` for Deno 🦕

## Features

- Written in Typescript
- Support custom comparator function
- No dependencies

## Examples

```ts
import { jsonStringify } from "https://deno.land/x/stable_stringify@v0.2.1/jsonStringify.ts";

const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
console.log(jsonStringify(obj));
```

## Options

Options can be a comparator function or an object which has two optional
properties: `cmp` and `cycles`.

### cmp

`opts.cmp` is the custom comparator function that user can specify. If custom
comparator function is not provided, the JSON string of an object will be sorted
by the alphanumeric order of object keys. The type of the comparator function is
defined as:

```ts
interface KeyValue {
  key: string;
  value: any;
}

type ComparatorFunction = (a: KeyValue, b: KeyValue) => number;
```

For example, to sort by the object keys in reverse order:

```ts
import { jsonStringify } from "https://deno.land/x/stable_stringify@v0.2.1/jsonStringify.ts";

const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
const s = jsonStringify(obj, function (a, b) {
  return a.key < b.key ? 1 : a.key === b.key ? 0 : -1;
});
console.log(s);
```

which results in the output string:

```
{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}
```

To sort by the object values in reverse order:

```ts
import { jsonStringify } from "https://deno.land/x/stable_stringify@v0.2.1/jsonStringify.ts";

const obj = { d: 6, c: 5, b: [{ z: 3, y: 2, x: 1 }, 9], a: 10 };
const s = jsonStringify(obj, function (a, b) {
  return a.value < b.value ? 1 : a.value === b.value ? 0 : -1;
});
console.log(s);
```

which outputs:

```
{"d":6,"c":5,"b":[{"z":3,"y":2,"x":1},9],"a":10}
```

### cycles

Pass `true` in `opts.cycles` to stringify circular property as `__cycle__` - the
result will not be a valid JSON string in this case.

TypeError will be thrown in case of circular object without this option.

## Security contact

Mail to: [sxwei321@gmail.com](mailto:sxwei321@gmail.com)

Please do NOT report security vulnerability via GitHub issues.

## License

[MIT](https://github.com/sxwei123/deno-quick-stable-stringify/blob/master/LICENSE)
