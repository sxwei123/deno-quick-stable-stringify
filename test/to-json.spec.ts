import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import { jsonStringify } from "../jsonStringify.ts";

Deno.test("toJSON function", () => {
  const obj = {
    one: 1,
    two: 2,
    toJSON: function () {
      return { one: 1 };
    },
  };
  assertEquals(jsonStringify(obj), '{"one":1}');
});

Deno.test("toJSON returns string", () => {
  const obj = {
    one: 1,
    two: 2,
    toJSON: function () {
      return "one";
    },
  };
  assertEquals(jsonStringify(obj), '"one"');
});

Deno.test("toJSON returns array", () => {
  const obj = {
    one: 1,
    two: 2,
    toJSON: function () {
      return ["one"];
    },
  };
  assertEquals(jsonStringify(obj), '["one"]');
});
