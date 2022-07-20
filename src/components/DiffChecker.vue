<template>
  <div class="form">
    <form @submit.prevent="compare">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="first" class="form-label fw-bold">First</label>
            <textarea
              class="form-control"
              placeholder="Paste your first .env file here"
              id="first"
              v-model="firstInput"
              @input="compare"
              rows="15"
            ></textarea>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="second" class="form-label fw-bold">Second</label>
            <textarea
              class="form-control"
              placeholder="Paste your second .env file here"
              id="second"
              v-model="secondInput"
              @input="compare"
              rows="15"
            ></textarea>
          </div>
        </div>
      </div>
    </form>
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
        <thead>
        <tr>
          <th>KEY</th>
          <th>FIRST</th>
          <th>SECOND</th>
          <th>DIFF</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, index) in diff" v-bind:key="index">
          <td>{{ value.key }}</td>
          <td>{{ value.first }}</td>
          <td>{{ value.second }}</td>
          <td v-html=value.html></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="mx-auto d-block text-center mb-5 mt-5">
      <a
        class="github-button"
        href="https://github.com/arturssmirnovs/online-env-diff"
        data-size="large"
        data-show-count="true"
        aria-label="Star arturssmirnovs/online-env-diff on GitHub"
      >Star</a>
    </div>
  </div>
</template>

<script lang="ts">
import {parse} from 'envfile';
import {Compare} from "@/helpers/common";
import Vue from 'vue';
import {Diff} from "@/types";
import Component from "vue-class-component";

@Component({
  components: {
    DiffChecker
  }
})
export default class DiffChecker extends Vue {
  firstInput: string = '';
  secondInput: string = '';
  diff: Diff[] = []

  async mounted(): Promise<void> {
    await fetch('first.txt')
      .then(response => response.text())
      .then((response) => {
        this.firstInput = response;
      })

    await fetch('second.txt')
      .then(response => response.text())
      .then((response) => {
        this.secondInput = response;
      })

    this.compare();
  }

  compare(): void {
    let compare = new Compare(parse(this.firstInput), parse(this.secondInput));

    this.diff = compare.getInformation();
  }
}
</script>
