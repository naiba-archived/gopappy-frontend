<template>
<section class="hero is-fullheight">
    <div class="hero-body">
        <div class="container">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">包含关键字</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <b-input v-model="options.keyword" placeholder="nb"></b-input>
                        </p>
                    </div>
                    <div class="field control">
                        <b-field>
                            <b-radio-button v-model="options.kwpos"
                                            native-value='0'>
                                包含
                            </b-radio-button>

                            <b-radio-button v-model="options.kwpos"
                                            native-value='1'>
                                开头
                            </b-radio-button>

                            <b-radio-button v-model="options.kwpos"
                                            native-value='2'>
                                结尾
                            </b-radio-button>
                        </b-field>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">排除</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <b-input v-model="options.exclude"></b-input>
                        </p>
                    </div>
                    <div class="field control">
                        <div class="field control">
                            <b-field>
                                <b-radio-button v-model="options.expos"
                                                native-value='0'>
                                    包含
                                </b-radio-button>

                                <b-radio-button v-model="options.expos"
                                                native-value='1'>
                                    开头
                                </b-radio-button>

                                <b-radio-button v-model="options.expos"
                                                native-value='2'>
                                    结尾
                                </b-radio-button>
                            </b-field>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">分类</label>
                </div>
                <div class="field-body">
                    <div class="field control">
                        <b-field>
                            <b-radio-button class="is-small"
                                        v-for="(name,key) in tags"
                                        v-model="options.tag"
                                        v-bind:native-value="key">
                                {{name}}
                            </b-radio-button>
                        </b-field>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal" v-if="options.tag >=3 && options.tag < 7">
                <div class="field-label is-normal">
                    <label class="label">拼音</label>
                </div>
                <div class="field-body">
                    <div class="field control">
                        <b-field>
                            <b-radio-button class="is-small"
                                        v-for="(name,key) in tags_pinyin"
                                        v-model="options.tag"
                                        v-bind:native-value="key">
                                {{name}}
                            </b-radio-button>
                        </b-field>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal" v-if="options.tag >= 7">
                <div class="field-label is-normal">
                    <label class="label">杂米</label>
                </div>
                <div class="field-body">
                    <div class="field control">
                        <b-field>
                            <b-radio-button class="is-small"
                                        v-for="(name,key) in tags_zami"
                                        v-model="options.tag"
                                        v-bind:native-value="key">
                                {{name}}
                            </b-radio-button>
                        </b-field>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">限定后缀</label>
                </div>
                <div class="field-body">                        
                    <b-taginput
                        v-model="options.tldsV"
                        autocomplete
                        field="tld"
                        icon="web"
                        placeholder="添加域名"
                        :data="filteredTags"                                                                
                        @typing="getFilteredTags">
                    </b-taginput>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">价格区间</label>
                </div>
                <div class="field-body">
                    <b-field>
                        <b-input type="number" v-model="options.minprice" placeholder="1"></b-input>
                        &nbsp;&nbsp;&nbsp;<span class="label" style="margin-top: 0.3em">至</span>&nbsp;&nbsp;&nbsp;
                        <b-input type="number" v-model="options.maxprice" placeholder="100000"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">长度区间</label>
                </div>
                <div class="field-body">
                    <b-field>
                        <b-input type="number" v-model="options.minlength" placeholder="1"></b-input>
                        &nbsp;&nbsp;&nbsp;<span class="label" style="margin-top: 0.3em">至</span>&nbsp;&nbsp;&nbsp;
                        <b-input type="number" v-model="options.maxlength" placeholder="100000"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                </div>
                <div class="field-body">
                    <button v-on:click="search" class="button is-primary">搜索</button>
                    <div class="control nbb">
                        <div class="tags has-addons">
                        <span class="tag">服务米农</span>
                        <span class="tag is-success">{{stat.search}} 位</span>
                        </div>
                    </div>
                    <div class="control nbb">
                        <div class="tags has-addons">
                        <span class="tag">展示域名</span>
                        <span class="tag is-success">{{stat.domain}} 个</span>
                        </div>
                    </div>
                </div>
            </div>

            <b-table
                    v-if="domainData.length > 0 || searching"
                    :data="domainData"
                    :loading="searching"
                    :paginated="isPaginated"
                    backend-pagination
                    :total="totalPage"
                    :current-page="options.page"
                    :per-page="perPage"
                    @page-change="onPageChange"
                    backend-sorting
                    :default-sort-direction="defaultSortOrder"
                    :default-sort="[sortField, sortOrder]"
                    @sort="onSort">

                <template slot-scope="props">
                    <b-table-column field="name" label="域名">
                        {{ props.row.name }}
                    </b-table-column>

                    <b-table-column field="description" label="介绍">
                        {{ props.row.description }}
                    </b-table-column>

                    <b-table-column field="price" label="价格" sortable>
                        {{ props.row.price }}
                    </b-table-column>

                    <b-table-column field="platform" label="平台">
                        {{ platforms[props.row.platform]}}
                    </b-table-column>
                    <b-table-column field="buy_url" label="购买">
                        <a target="_black" :href="props.row.buy_url">购买</a>
                    </b-table-column>
                </template>
            </b-table>
        </div>
    </div>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p>
                    <strong>GoPappy</strong> 域名市场检索 by
                    <a href="http://nb2.com">奶爸</a> 。
                    <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=40db397ac7ac2e69f7db27ac6390f39c9621e00df88bd2a0def00dc4ade46302">
                        <img src="//pub.idqqimg.com/wpa/images/group.png" alt="奶爸 · 大佬委员会" title="大佬委员会(710012414)">
                    </a>
                </p>
            </div>
        </div>
        </footer>
</section>
</template>

<script>
export default {
  name: "hello",
  data: function() {
    return {
      stat: {},
      domainData: [],
      platforms: {},
      TLDsData: {},
      filteredTags: [],
      tags: {
        1: "纯字母",
        2: "纯数字",
        3: "拼音",
        7: "杂米"
      },
      tags_pinyin: {
        3: "全部",
        4: "单拼",
        5: "双拼",
        6: "三拼"
      },
      tags_zami: {
        7: "全部",
        8: "NNL",
        9: "NLN",
        10: "NLL",
        11: "LNN",
        12: "LNL",
        13: "LLN"
      },
      searching: false,
      isPaginated: false,
      totalPage: 60 * 100,
      perPage: 60,
      defaultSortOrder: "asc",
      sortField: "price",
      sortOrder: "asc",
      options: {
        kwpos: "0",
        expos: "0",
        keyword: "",
        exclude: "o,0,i,l,1",
        tag: "0",
        tldsV: [],
        tlds: [],
        minprice: 0,
        maxprice: 0,
        minlength: 0,
        maxlength: 0,
        sort: 1,
        order: 1,
        page: 1
      }
    };
  },
  mounted: function() {
    this.$http.get("params").then(
      response => {
        this.platforms = response.body.platforms;
        this.TLDsData = response.body.tlds;
        this.stat = response.body.stat;
      },
      response => {
        console.log("error", response);
      }
    );
  },
  methods: {
    search: function(event) {
      this.searching = true;

      if (event !== undefined) {
        this.options.page = 1;
      }

      let f = this;
      let format = function() {
        f.options.expos = parseInt(f.options.expos);
        f.options.kwpos = parseInt(f.options.kwpos);
        f.options.maxprice = parseInt(f.options.maxprice);
        f.options.minprice = parseInt(f.options.minprice);
        f.options.maxlength = parseInt(f.options.maxlength);
        f.options.minlength = parseInt(f.options.minlength);
        f.options.tag = parseInt(f.options.tag);
        f.options.tldsV.forEach(function(a, i) {
          f.options.tlds[i] = a.id;
        });
      };
      let reset = function() {
        f.options.expos = f.options.expos.toString();
        f.options.kwpos = f.options.kwpos.toString();
        f.options.tag = f.options.tag.toString();
      };
      format();

      this.$http.post("search", this.options).then(
        response => {
          f.domainData = response.body;
          if (f.domainData.length > 0) {
            f.isPaginated = true;
          }
          f.searching = false;
        },
        response => {
          console.log("error", response);
          f.searching = false;
        }
      );

      reset();
    },
    onPageChange: function(page) {
      this.options.page = parseInt(page);
      this.search();
    },
    onSort: function(field, order) {
      this.options.sort = order === "asc" ? 1 : 2;
      this.search();
    },
    getFilteredTags(text) {
      this.filteredTags = this.TLDsData.filter(tld => {
        return (
          tld.tld
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  },
  components: {}
};
</script>

<style scoped>
.nbb {
  padding-left: 10px;
  padding-top: 6px;
}
</style>
