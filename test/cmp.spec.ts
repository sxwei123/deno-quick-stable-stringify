import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import { jsonStringify } from "../jsonStringify.ts";

Deno.test("Stringify works with deno", () => {
  const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
  const s = jsonStringify(obj, function (a, b) {
    return a.key < b.key ? 1 : -1;
  });

  assertEquals(s, '{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}');
});
