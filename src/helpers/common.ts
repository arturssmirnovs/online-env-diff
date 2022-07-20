/*eslint-disable */
import {Change, diffChars} from "diff";
import {Data} from "envfile/source";
import {Diff} from "@/types";

export class Compare {
  first: Data;
  second: Data;
  keys: string[] = [];

  constructor(first: Data, second: Data) {
    this.first = first;
    this.second = second;
    //@ts-ignore
    this.keys = Object.keys(this.first).concat(Object.keys(this.second)).unique();
  }

  getInformation(): Diff[] {
    let data: Array<Diff> = [];

    this.keys.forEach((item: string) => {
      const key = item;
      const first = this.first[item] ?? '';
      const second = this.second[item] ?? '';
      const diff = diffChars(first, second);
      const html = this.getHTML(diff);

      data.push({
        key: key,
        first: first,
        second: second,
        diff: diff,
        html: html
      });
    });

    return data;
  }

  getHTML(diff: Array<Change>): string {
    let span = null;

    let display = document.createElement('div');
    let fragment = document.createDocumentFragment();

    diff.forEach((part: Change) => {
      const className = part.added ? 'text-success' : part.removed ? 'text-danger' : 'text-muted';
      span = document.createElement('span');
      span.classList.add(className);
      span.appendChild(document.createTextNode(part.value));
      fragment.appendChild(span);
    });

    display.appendChild(fragment);

    return display.innerHTML;
  }
}

declare global {
  interface Array<T> {
    unique(): Array<T>;
  }
}

Array.prototype.unique = function <T>(this: T[]): T[] {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
};
