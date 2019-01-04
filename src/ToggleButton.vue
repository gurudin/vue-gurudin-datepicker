<template>
  <span data-name="toggle-button">
    <div
      class="btn-group"
      :class="size!='' ? 'btn-group-' + size : ''"
      role="group"
      v-if="mode=='group'">

      <button
        :disabled="disabled"
        type="button"
        class="btn"
        v-for="opt in options"
        :class="toggleClass(opt)"
        :style="toggleStyle(opt)"
        @click="toggleButton(opt)">{{opt.label}}</button>
    </div>

    <transition name="slide-fade">
    <div
      class="gurudin-toggle-switch gurudin-switch-lg"
      :class="switchClass()"
      :style="switchStyle"
      v-if="mode == 'checkbox'"
      @click="toggleSwitch">
        <span v-if="options.length > 0">{{switchValue}}</span>
        <i :style="switchIStyle"></i>
    </div>
    </transition>

    <input type="hidden" :value="value">
  </span>
</template>

<script>
export default {
  name: "ToggleButton",
  props: {
    /**
     * 模式
     *
     * @type {String}
     * 
     * @required false
     *
     * `group` bootstrap `btn-group`样式
     * `checkbox` 复选框样式
     */
    mode: {
      type: String,
      required: false,
      default: 'group' // group|checkbox
    },
    /**
     * 绑定数据
     *
     * @type {mixed}
     *
     * @required true
     */
    value: {
      type: null,
      required: true,
      default: 0
    },
    /**
     * 回传数据 (透传数据)
     *
     * @type {mixed}
     *
     * @required false
     */
    data: {
      type: null,
      required: false,
      default: ''
    },
    /**
     * 选择数据
     *
     * @type {Array}
     * 
     * @required true
     *
     * @example [
     *     {label: "Left", value: 1, checked: "primary"},
     *     {label: "Middle", value: 2, checked: "info"},
     *     {label: "Right", value: 3}
     * ]
     * label: 标签描述
     * value: 标签值
     * checked: 选中样式
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * 样式设置
     * 
     * @type {Object}
     * 
     * @required false
     * 
     * @example {checked: "success", unchecked: "secondary"}
     * checked: 选中样式
     * unchecked: 未选中样式
     * 
     * bootstrap3 default|primary|success|info|warning|danger
     * bootstrap4 primary|secondary|success|danger|warning|info|light|dark
     * 
     * 自定义颜色 rgb(187, 153, 205)|red|#000000
     */
    toggle: {
      type: Object,
      required: false,
      default: () =>{
        return { checked: "success", unchecked: "secondary" };
      } 
    },
    /**
     * 尺寸
     * 
     * @type {String}
     * 
     * @required false
     * 
     * @example ''|sm|lg
     */
    size: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * 是否可用
     * 
     * @type {Boolean}
     * 
     * @required false
     * 
     * @example true|false
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * 改变前回调方法
     *
     * @type {Function}
     *
     * @required false
     *
     * @param value 改变后值
     * @param event 当前对象
     */
    before: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      toggleClass(opt) {
        if (opt.checked === undefined) {
          return this.value === opt.value ? 'btn-' + this.toggle.checked : 'btn-' + this.toggle.unchecked;
        } else {
          return this.value === opt.value ? 'btn-' + opt.checked : 'btn-' + this.toggle.unchecked;
        }
      },
      toggleStyle(opt) {
        if (opt.checked === undefined) {
          return this.value === opt.value
            ? {"background-color": this.toggle.checked}
            : {"background-color": this.toggle.unchecked};
        } else {
          return this.value === opt.value
            ? {"background-color": opt.checked}
            : {"background-color": this.toggle.unchecked};
        }
      },
      switchClass() {
        var retClass = ' gurudin-switch-' + this.size;

        if (this.value == 1 || this.value == true) {
          retClass += ' bg-' + this.toggle.checked;
        } else {
          retClass += ' bg-' + this.toggle.unchecked;
        }

        if (this.disabled) {
          retClass += ' gurudin-disabled';
        }
        
        return retClass;
      }
    };
  },
  computed: {
    switchStyle() {
      if (this.options.length == 0) {
        return '';
      }
      let maxLength = 0;
      let maxString = '';
      this.options.forEach(row =>{
        maxLength = maxLength < row.label.length ? row.label.length : maxLength;
        maxString = maxString.length < row.label.length ? row.label : maxString;
      });

      var retStyle = this.value ? {
        'text-align': 'left',
        'font-size': '12px'
      }: {
        'text-align': 'right'
      };

      if (this.value == 1 || this.value == true) {
        retStyle['background-color'] = this.toggle.checked;
      } else {
        retStyle['background-color'] = this.toggle.unchecked;
      }

      let smWidth = 15;
      let lgWidth = 15;
      for (let i = 0; i < maxString.length; i++) {
        let tmp = this.isChn(maxString[i]);
        
        smWidth += tmp ? 18 : 12;
        lgWidth += tmp ? 20 : 15;
      }

      if (this.size == 'sm') {
        retStyle['width'] = smWidth + 'px';
        retStyle['font-size'] = '10px';
      } else {
        retStyle['width'] = lgWidth + 'px';
        retStyle['font-size'] = '16px';
      }

      return retStyle;
    },
    switchIStyle() {
      return this.value ? {
        left: 'auto',
        right: '30px',
        transform: 'translateX(27px)'
      } : { };
    },
    switchValue() {
      if (this.options.length == 0) {
        return '';
      }

      var ret = '';
      if (this.options[0].value == this.value) {
        return this.options[0].label;
      } else {
        return this.options[1].label;
      }
    }
  },
  methods: {
    isChn(temp){
      var reg = /^([\u4e00-\u9fa5])+$/;

      if (reg.test(temp)) return true ;
      
      return false;
    },
    setValue(value) {
      var isChange = true;

      /**
       * change function.
       * 
       * @param value Changed value.
       * @param event Current object.
       */
      this.$emit('change', {
        value: value,
        event: event,
        data: this.data
      });

      /**
       * Change before function
       * 
       * @param value Changed value.
       * @param event Current object.
       * 
       * @return Boolean
       */
      if (typeof this.before == 'function') {
        let beforeRes = this.before({
          value: value,
          event: event,
          data: this.data
        });

        isChange = typeof beforeRes == 'undefined' || beforeRes == true ? true : false;
      }

      // Change value.
      if (isChange == true) {
        this.$emit('input', value);
      }
    },
    toggleButton(opt) {
      if (this.value == opt.value) {
        return false;
      }

      this.setValue(opt.value);
    },
    toggleSwitch(event) {
      this.setValue(!this.value);
    }
  },
}
</script>

<style>
.gurudin-toggle-switch {
  border-radius: 999px;
  display: inline-block;
  position: relative;
  outline: 0;
  box-sizing: border-box;
  cursor: pointer;
  display: table;
}
.gurudin-toggle-switch span {
  display: table-cell;
  vertical-align: middle;
  color: white;
  padding-right: 10px;
  padding-left: 10px;
}
.gurudin-toggle-switch i {
  display: block;
  position: absolute;
  overflow: hidden;
  top: 3px;
  left: 3px;
  z-index: 20;
  transition: transform .3s;
  border-radius: 100%;
  background-color: #fff;
  content: "";
}

.gurudin-switch-lg {
  min-width: 70px;
  min-height: 38px;
}
.gurudin-switch-lg i {
  width: 32px;
  height: 32px;
}

.gurudin-switch-sm {
  min-width: 40px;
  min-height: 22px;
}
.gurudin-switch-sm i {
  width: 16px;
  height: 16px;
}

.gurudin-disabled {
  cursor: not-allowed;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
  opacity: .65;
  pointer-events: none;
}
</style>

