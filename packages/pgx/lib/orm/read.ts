import { PoolClient, QueryResultRow } from "pg";
import { pgx } from "..";
import { safeSql } from "../safeSql";
import { PgBaseModel } from "../zodPg";
import { comparableSql } from "./comparableSql";
import { pgErrs } from "./pgErrs";
import { PgRead, PgReadMany, PgReadOne, PgResponse } from "./pgInterface";
import { queryParse } from "./queryParse";
import { rowsToData } from "./rowsToData";

async function read<Input, Response extends QueryResultRow>({
  id,
  ids,
  filter,
  table,
  returnColumns,
  readSoftDelete,
  join,
  sensitive,
  tx,
  total,
  readMany,
}: PgRead<Input>): Promise<PgResponse<Response & PgBaseModel>> {
  const pg = (tx as PoolClient) || pgx();
  const desc = filter ? (filter.desc ? "desc" : "") : "desc";
  const order = (filter && filter.order) || "createAt";
  const limit = filter ? (filter.limit ? filter.limit : 10) : 10;
  const offset = (filter && filter.offset) || 0;

  table = safeSql(table);
  if (join) {
    const joinTable = safeSql(join.table);
    if (!join.on || join.on.length !== 2) {
      throw Error(pgErrs["Need join on"]);
    }
    const leftKey = safeSql(join.on[0]);
    const rightKey = safeSql(join.on[1]);

    let joinOn = "";
    if (leftKey === "id" && rightKey === "id") {
      joinOn = `(a.id)::text = (b.id)::text`;
    } else if (leftKey === "id") {
      joinOn = `(a.id)::text = (b.j)->>'${rightKey}'`;
    } else if (rightKey === "id") {
      joinOn = `(a.j)->>'${leftKey}' = (a.${rightKey})::text`;
    } else {
      joinOn = `(a.j)->>'${leftKey}' = (a.j)->'${rightKey}'`;
    }

    let selects = "";
    if (join.columns) {
      selects = "(a.id)::text as id, a.j as j, (b.id)::text as join_id, b.j as join_j";
    } else {
      selects = "(a.id)::text as id, a.j as j";
    }
    const texts: string[] = [];
    const args: unknown[] = [];

    if (ids) {
      const nextIds = [];
      for (let i = 0; i < ids.length; i++) {
        const v = Number(ids[i]);
        if (isNaN(v)) {
          throw Error(pgErrs["Ids need all int"]);
        }
        nextIds.push(v);
      }
      texts.push(`a.id in (${nextIds.join(",")})`);
    } else if (id) {
      texts.push("a.id = $0");
      args.push(id);
    }
    if (filter) {
      if (filter.eq) {
        texts.push("a.j@>$0");
        args.push(filter.eq);
      }
      if (filter.comparable) {
        texts.push(comparableSql(filter.comparable, "a"));
      }
    }
    if (join) {
      if (join.eq) {
        texts.push("b.j@>$0");
        args.push(join.eq);
      }
      if (join.comparable) {
        texts.push(comparableSql(join.comparable, "b"));
      }
    }

    args.push(limit);
    args.push(offset);
    if (!readSoftDelete) {
      texts.push("a.del = '0'");
    }

    let wheres = texts.join(" and ");
    if (wheres) {
      wheres = "where " + wheres;
    }

    if (readMany) {
      const data = await pg.query<{ id: string; j: Response & PgBaseModel }>(
        queryParse(
          `select ${selects} from "${table}" as a join "${joinTable}" as b on (${joinOn}) ${wheres} order by (a.j->'${order}')::text ${desc} limit $0 offset $0`,
        ),
        args,
      );

      args.pop();
      args.pop();

      let totalNum = -1;
      if (total) {
        const totalRes = await pg.query<{ count: number }>(
          queryParse(`select count(*) from "${table}" as a join "${joinTable}" as b on (${joinOn}) ${wheres}`),
          args,
        );
        totalNum = Number(totalRes.rows[0].count);
      }

      return {
        total: totalNum,
        data: rowsToData<Response & PgBaseModel>(data.rows, returnColumns, sensitive),
      };
    }

    // read one
    args.pop();
    args.pop();

    const data = await pg.query<{ id: string; j: Response & PgBaseModel }>(
      queryParse(`select ${selects} from "${table}" as a join "${joinTable}" as b on (${joinOn}) ${wheres} limit 1`),
      args,
    );

    return {
      total: -1,
      data: rowsToData<Response & PgBaseModel>(data.rows, returnColumns, sensitive),
    };
  }
  const args: unknown[] = [];
  const texts: string[] = [];
  if (ids) {
    const nextIds = [];
    for (let i = 0; i < ids.length; i++) {
      const v = Number(ids[i]);
      if (isNaN(v)) {
        throw Error(pgErrs["Ids need all int"]);
      }
      nextIds.push(v);
    }
    texts.push(`id in (${nextIds.join(",")})`);
  } else if (id) {
    texts.push("id = $0");
    args.push(id);
  }
  if (filter) {
    if (filter.eq) {
      texts.push("j@>$0");
      args.push(filter.eq);
    }
    if (filter.comparable) {
      texts.push(comparableSql(filter.comparable, ""));
    }
  }
  if (!readSoftDelete) {
    texts.push("del = '0'");
  }
  args.push(limit);
  args.push(offset);

  let wheres = texts.join(" and ");
  if (wheres) {
    wheres = "where " + wheres;
  }
  if (readMany) {
    const data = await pg.query<Response>(
      queryParse(
        `select (id)::text, j from "${table}" ${wheres} order by (j->'${order}')::text ${desc} limit $0 offset $0`,
      ),
      args,
    );

    args.pop();
    args.pop();

    let totalNum = -1;
    if (total) {
      const totalRes = await pg.query<{ count: number }>(queryParse(`select count(*) from "${table}" ${wheres}`), args);
      totalNum = Number(totalRes.rows[0].count);
    }

    return {
      total: totalNum,
      data: rowsToData(data.rows, returnColumns, sensitive),
    };
  }

  args.pop();
  args.pop();

  const data = await pg.query<Response>(queryParse(`select (id)::text, j from "${table}" ${wheres} limit 1`), args);

  return {
    total: -1,
    data: rowsToData<Response & PgBaseModel>(data.rows, returnColumns, sensitive),
  };
}

export async function readMany<Input, Response extends QueryResultRow>(
  input: PgReadMany<Input>,
): Promise<PgResponse<Response & PgBaseModel>> {
  return read<Input, Response>({
    ...input,
    readMany: true,
  });
}

export async function readOne<Input, Response extends QueryResultRow>(
  input: PgReadOne<Input>,
): Promise<Response & PgBaseModel> {
  const res = await read<Input, Response>({
    ...input,
    readMany: false,
  });

  return res.data[0];
}

export async function has<Input, Response extends QueryResultRow>(input: PgReadOne<Input>): Promise<boolean> {
  const res = await read<Input, Response>({
    ...input,
    readMany: false,
  });

  return !!res.data[0];
}
