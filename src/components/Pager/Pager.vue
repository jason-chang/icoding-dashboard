<template>
  <div class="app-pager-wrap" v-show="pager.totalPage">
    <ul class="pagination" :class="['justify-content-' + alian]">
      <li class="page-item disabled" v-if="showTotal">
        <a class="page-link" href="javascript:;" tabindex="-1">{{ pager.totalPage }}</a>
      </li>
      <li class="page-item" v-if="showFirst" :class="{disabled: current === 1}" @click.prevnet="goto(1)">
        <a class="page-link" href="javascript:;">
          <i class="fa fa-angle-double-left" aria-hidden="true"></i>
        </a>
      </li>
      <li class="page-item" v-if="showPrev" :class="{disabled: current === 1}" @click.prevnet="goto(pager.prev)">
        <a class="page-link" href="javascript:;">
          <i class="iconfont icon-back" aria-hidden="true"></i>
        </a>
      </li>
      <li class="page-item" v-if="showNumber" v-for="item in pager.numbers" :class="{active: item == current}"  @click.prevnet="goto(item)">
        <a class="page-link" href="javascript:;">{{ item }}</a>
      </li>
      <li class="page-item" v-if="showNext" :class="{disabled: current === pager.totalPage}" @click.prevnet="goto(pager.next)">
        <a class="page-link" href="javascript:;">
          <i class="iconfont icon-forward" aria-hidden="true"></i>
        </a>
      </li>
      <li class="page-item" v-if="showLast" :class="{disabled: current === pager.totalPage}" @click.prevnet="goto(pager.totalPage)">
        <a class="page-link" href="javascript:;">
          <i class="fa fa-angle-double-right" aria-hidden="true"></i>
        </a>
      </li>
      <li class="page-item jump" v-if="showJump">
        <input type="number" @keydown.enter="go" v-model="pager.jumpTo" min="1" :max="totalPage">
        <button @click="goto(jumpTo)">
          <i class="fa fa-play-circle" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  @import "~@/style/modules/variables";
  .app-pager-wrap {
    width: 100%; display: flex; flex-direction: column;

    .pagination {
      overflow: hidden; display: flex;

      &.justify-content-start { align-self: flex-start; };
      &.justify-content-center { align-self: center; };
      &.justify-content-end { align-self: flex-end; };
    }

    .page-item { cursor: not-allowed; overflow: hidden; }
    .page-item.disabled { cursor: not-allowed; }

    .page-item .page-link {
      border-color: $color-green-dark; border-style: solid; border-width: 1px 1px 1px 0; float: left; line-height: 38px; width: 40px; height: 40px; text-align: center; color: $color-green-dark; font-size: 15px;
      font-family: "Microsoft YaHei UI Light"; vertical-align: middle; cursor: pointer; overflow: hidden; padding: 0;
    }

    .page-item.active .page-link { background: $color-green-dark; color: white; border-color: $color-green-dark };

    .page-item:first-child .page-link { border-radius: 5px 0 0 5px; border-left-width: 1px; }
    .page-item:last-child .page-link { border-radius: 0 5px 5px 0; }
  }
</style>

<script>
  import upperFirst from 'lodash/upperFirst';

  /* eslint func-names: 0 */
  const defaultLayout = ['total', 'first', 'prev', 'number', 'next', 'last', 'jump'];
  const props = {
    alian: {
      type: String,
      required: false,
      default: 'center',
    },
    total: {
      type: Number,
      required: false,
      default: 0,
    },
    totalPage: {
      type: Number,
      required: false,
      default: 0,
    },
    size: {
      type: Number,
      required: false,
      default: 10,
    },
    cell: {
      type: Number,
      required: false,
      default: 5,
    },
    current: {
      type: Number,
      required: false,
      default: 1,
    },
    layout: {
      type: Array,
      required: false,
      default() {
        return defaultLayout;
      },
    },
  };

  function makeComputeds() {
    const all = {};

    for (let index = 0; index < defaultLayout.length; index++) {
      const part = defaultLayout[index];
      all[`show${upperFirst(part)}`] = (partName =>
        function () {
          return this.layout.indexOf(partName) !== -1;
        }
      )(part);
    }

    return all;
  }

  function makeWatchers() {
    const all = {};

    const callView = function () {
      this.view();
    };

    for (const name in props) {
      all[name] = callView;
    }

    return all;
  }

  export default {
    name: 'AppPager',
    data() {
      return {
        pager: {
          first: {},
          prev: {},
          numbers: [],
          next: {},
          last: {},
          totalPage: 0,
          jumpto: 0,
          bottom: 200,
          right: 200,
          jumpTo: 1,
        },
      };
    },
    computed: {
      ...makeComputeds(),
    },
    props: {
      ...props,
    },
    watch: {
      ...makeWatchers(),
    },
    created() {},
    mounted() {
      this.view();
    },
    methods: {
      goto(num) {
        this.$emit('goto', num);
      },
      view() {
        this.pager.totalPage = this.totalPage
          ? this.totalPage
          : Math.ceil(this.total / this.size);

        this.pager.current = this.current;

        // Prev
        this.pager.prev = this.current > 1 ? this.current - 1 : 1;

        // Num
        let start = 1;
        let end = 1;
        if (this.pager.totalPage < this.cell) {
          start = 1;
          end = this.pager.totalPage;
        } else if (this.pager.totalPage >= this.cell) {
          if (this.pager.current < this.cell / 2) {
            // 前区 当前页码 小于 页栏数1/2的情况
            start = 1;
            end = this.cell;
          } else if (this.pager.current > this.pager.totalPage - (this.cell / 2)) {
            // 后区 当前页码 离最后页面的间隔 小于页栏数1/2的情况
            start = (this.pager.totalPage - this.cell) + 1;
            end = this.pager.totalPage;
          } else {
            // 中区
            start = this.pager.current - Math.floor(this.cell / 2);
            end = this.pager.current + Math.floor(this.cell / 2);
          }
        }

        const numbers = [];

        for (let i = start; i <= end; i++) {
          numbers.push(i);
        }

        this.pager.numbers = numbers;

        // next
        this.pager.next = this.pager.current >= this.pager.totalPage ? this.pager.totalPage : this.pager.current + 1;
      },
    },
  };
</script>