import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import { jsonStringify } from "../jsonStringify.ts";

Deno.test("nested", function () {
  const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
  assertEquals(jsonStringify(obj), '{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

Deno.test("cyclic (default)", () => {
  const one: any = { a: 1 };
  const two: any = { a: 2, one: one };
  one.two = two;
  try {
    jsonStringify(one);
  } catch (ex) {
    assertEquals(
      ex.toString(),
      "TypeError: Converting circular structure to JSON",
    );
  }
});

Deno.test("cyclic (specifically allowed)", () => {
  const one: any = { a: 1 };
  const two: any = { a: 2, one: one };
  one.two = two;
  assertEquals(
    jsonStringify(one, { cycles: true }),
    '{"a":1,"two":{"a":2,"one":"__cycle__"}}',
  );
});

Deno.test("repeated non-cyclic value", () => {
  const one = { x: 1 };
  const two = { a: one, b: one };
  assertEquals(jsonStringify(two), '{"a":{"x":1},"b":{"x":1}}');
});

Deno.test("acyclic but with reused obj-property pointers", () => {
  const x = { a: 1 };
  const y = { b: x, c: x };
  assertEquals(jsonStringify(y), '{"b":{"a":1},"c":{"a":1}}');
});
