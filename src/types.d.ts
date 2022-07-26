import {Change} from "diff";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

export interface Diff {
  key: string;
  first: string;
  second: string;
  diff: Change[];
  html: string;
}
