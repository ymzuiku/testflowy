import type { Method, Suggestion } from "@testing-library/dom";
import { TesterElement } from "./data";
import { testx } from "./testx";

const queryMethods = ["TestId", "AltText", "PlaceholderText", "LabelText", "Text", "DisplayValue", "Title", "Role"];

const fixSuggestion = (suggestion: Suggestion) => {
  return {
    m: suggestion.queryMethod,
    a: suggestion.queryArgs.map((v) => {
      if (v instanceof RegExp) {
        return { t: 2, v: v.source };
      }
      if (typeof v === "object" && v.name) {
        if (v.name instanceof RegExp) {
          return { t: 3, v: v.name.source };
        }
        return { t: 4, v: v.name as unknown as string };
      }
      return { t: 1, v: v ? v.toString() : "" };
    }),
  };
};

export function getRole(element: TesterElement) {
  const list = [];
  // let getByRole: Suggestion;
  for (const method of queryMethods) {
    const suggestion = testx.getSuggestedQuery(element, "get", method as Method);

    if (suggestion) {
      // if (suggestion.queryMethod === "getByRole") {
      //   getByRole = suggestion;
      //   continue;
      // }

      list.push(fixSuggestion(suggestion));
      break;
    }
  }
  if (!list.length) {
    // if (getByRole!) {
    //   list.push(fixSuggestion(getByRole));
    //   return list;
    // }
    return void 0;
  }
  return list;
}
