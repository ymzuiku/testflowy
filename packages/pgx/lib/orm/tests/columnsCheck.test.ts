import { assertIsError } from "utils/assertType";
import { expect, it } from "vitest";
import { PgColumn } from "../../zodPg";
import { columnsCheck } from "../columnsCheck";
import { pgErrs } from "../pgErrs";

it("columnsCheck", async () => {
  const columns: PgColumn[] = [
    {
      name: "name",
      typed: "string",
      error: "name is error",
      imma: true,
      label: "the dog",
      min: 1,
      max: 3,
    },
    {
      name: "age",
      typed: "int",
      label: "the dog",
      min: 1,
      max: 3,
    },
    {
      name: "vip",
      typed: "bool",
      label: "the dog",
    },
  ];
  try {
    columnsCheck(
      {
        name: "dogcat",
        age: 20,
        vip: true,
        other: "need remove",
      },
      columns,
    );
    throw Error("need error");
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq("name is error");
  }
  const data = columnsCheck(
    {
      name: "dog",
      age: 2,
      vip: false,
      other: "need remove",
    },
    columns,
  );
  expect(data).deep.eq({
    name: "dog",
    age: 2,
    vip: false,
  });
});

it("columnsCheck pick required", async () => {
  const columns: PgColumn[] = [
    {
      name: "name",
      typed: "string",
      error: "name is error",
      imma: true,
      label: "the dog",
      min: 1,
      max: 3,
    },
    {
      name: "animal",
      typed: "string",
      pick: ["dog", "cat", "fish"],
      required: true,
    },
  ];
  try {
    columnsCheck(
      {
        name: "dog",
      },
      columns,
    );
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq(pgErrs["A column need required"]);
  }
  try {
    columnsCheck(
      {
        name: "dog",
        animal: "fffff",
      },
      columns,
    );
    throw Error("need error");
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq(pgErrs["A column is need in pick"]);
  }
  columnsCheck(
    {
      name: "dog",
      animal: "dog",
    },
    columns,
  );
});

it("columnsCheck min-max", async () => {
  const columns: PgColumn[] = [
    {
      name: "theString",
      typed: "string",
      min: 1,
      max: 3,
    },
    {
      name: "theInt",
      typed: "int",
      min: 1,
      max: 3,
    },
    {
      name: "theFloat",
      typed: "float",
      min: 1,
      max: 3,
    },
    {
      name: "theVecString",
      typed: "vecString",
      min: 1,
      max: 3,
    },
    {
      name: "theVecObject",
      typed: "vecObject",
      min: 1,
      max: 3,
    },
  ];
  try {
    columnsCheck(
      {
        theString: "theString",
      },
      columns,
    );
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq(pgErrs["A column string length is too max"]);
  }
  try {
    columnsCheck(
      {
        theInt: 20,
      },
      columns,
    );
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq(pgErrs["A column int length is too max"]);
  }
  try {
    columnsCheck(
      {
        theFloat: 20,
      },
      columns,
    );
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq(pgErrs["A column float length is too max"]);
  }
  try {
    columnsCheck(
      {
        theVecString: ["staa", "bbb", "ddddd", "aaaaa"],
      },
      columns,
    );
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq(pgErrs["A column array length is too max"]);
  }
  try {
    columnsCheck(
      {
        theVecString: [],
      },
      columns,
    );
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq(pgErrs["A column array length is too min"]);
  }
});

it("columnsCheck reg", async () => {
  const columns: PgColumn[] = [
    {
      name: "reg",
      typed: "string",
      reg: `^\\d+$`, // 注意，字符串转 regex，不能前后不需要有反斜杠
    },
  ];
  try {
    columnsCheck(
      {
        reg: "12323b",
      },
      columns,
    );
    throw Error("need a error");
  } catch (err) {
    assertIsError(err);
    expect(err.message).eq(pgErrs["A column RegExp is error"]);
  }
  columnsCheck(
    {
      reg: "123123213",
    },
    columns,
  );
});
