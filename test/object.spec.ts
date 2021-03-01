import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import { jsonStringify } from "../jsonStringify.ts";

Deno.test("empty object", () => {
  assertEquals(jsonStringify({}), "{}");
});

Deno.test("simple object", () => {
  const obj = { c: 6, b: [4, 5], a: 3, z: null };
  assertEquals(jsonStringify(obj), '{"a":3,"b":[4,5],"c":6,"z":null}');
});

Deno.test("object with undefined", () => {
  const obj = { a: 3, z: undefined };
  assertEquals(jsonStringify(obj), '{"a":3}');
});

Deno.test("object with null", () => {
  const obj = { a: 3, z: null };
  assertEquals(jsonStringify(obj), '{"a":3,"z":null}');
});

Deno.test("object with NaN and Infinity", () => {
  const obj = { a: 3, b: NaN, c: Infinity };
  assertEquals(jsonStringify(obj), '{"a":3,"b":null,"c":null}');
});

Deno.test("array with undefined", () => {
  const obj = [4, undefined, 6];
  assertEquals(jsonStringify(obj), "[4,null,6]");
});

Deno.test("object with empty string", () => {
  const obj = { a: 3, z: "" };
  assertEquals(jsonStringify(obj), '{"a":3,"z":""}');
});

Deno.test("object with Symbol", () => {
  const obj = { a: 12, z: Symbol("") };
  assertEquals(jsonStringify(obj), '{"a":12}');
});

Deno.test("non-enumerable properties", () => {
  const obj = Object.create(null, {
    x: { value: "x", enumerable: false },
    y: { value: "y", enumerable: true },
  });
  assertEquals(jsonStringify(obj), '{"y":"y"}');
});

Deno.test("array with empty string", () => {
  const obj = [4, "", 6];
  assertEquals(jsonStringify(obj), '[4,"",6]');
});

Deno.test("simple function", () => {
  const obj = () => {
    // empty
  };
  assertEquals(jsonStringify(obj), undefined);
});

Deno.test("standard data structures", () => {
  assertEquals(
    jsonStringify([
      new Set([1]),
      new Map([[1, 2]]),
      new WeakSet([{ a: 1 }]),
      new WeakMap([[{ a: 1 }, 2]]),
    ]),
    "[{},{},{},{}]",
  );
});
