// 只需写配置，方便可扩展
const commonSettings = {
  $id: {
    title: 'ID',
    description: '数据存储的名称，请写英文，不能为空',
    type: 'string',
    'ui:widget': 'idInput',
  },
  title: {
    title: '标题',
    description: '对输入域的简单说明，设置为空则不显示',
    type: 'string',
  },
  default: {
    title: '默认值',
    description: '输入框的默认内容',
    type: 'string',
  },
  description: {
    title: '说明',
    type: 'string',
  },
  'ui:width': {
    title: '元素宽度',
    type: 'string',
    'ui:widget': 'percentSlider',
  },
  required: {
    title: '必填',
    type: 'boolean',
  },
  'ui:disabled': {
    title: '禁用',
    type: 'boolean',
  },
};

const elements = [
  {
    text: '单行文本输入框',
    name: 'input',
    widget: 'input',
    schema: {
      title: '输入框',
      type: 'string',
      'ui:widget': 'input',
    },
    setting: {
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        'ui:options': {
          placeholder: '填写正则表达式',
        },
      },
      'ui:options': {
        title: '选项',
        type: 'object',
        properties: {
          placeholder: {
            title: '文本框内提示文字',
            type: 'string',
          },
        },
      },
    },
  },
  {
    text: '多行文本输入框',
    name: 'textarea',
    widget: 'textarea',
    schema: {
      title: '编辑框',
      type: 'string',
      'ui:widget': 'textarea',
    },
    setting: {
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        'ui:options': {
          placeholder: '填写正则表达式',
        },
      },
      'ui:options': {
        title: '选项',
        type: 'object',
        properties: {
          placeholder: {
            title: '文本框内提示文字',
            type: 'string',
          },
          autoSize: {
            title: '高度自动',
            type: 'boolean',
          },
          row: {
            title: '指定高度',
            type: 'number',
          },
        },
      },
    },
  },
  {
    text: '下拉单选',
    name: 'select',
    widget: 'select',
    schema: {
      title: '下拉单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      'ui:widget': 'select',
    },
    setting: {
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        'ui:widget': 'select',
        'ui:options': {
          mode: 'tags',
        },
      },
      enumNames: {
        title: '选项名称',
        type: 'array',
        enum: [],
        'ui:widget': 'select',
        'ui:options': {
          mode: 'tags',
        },
      },
    },
  },
  {
    text: '点击单选',
    name: 'radio',
    widget: 'radio',
    schema: {
      title: '点击单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      'ui:widget': 'radio',
    },
    setting: {
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        'ui:widget': 'select',
        'ui:options': {
          mode: 'tags',
        },
      },
      enumNames: {
        title: '选项名称',
        type: 'array',
        enum: [],
        'ui:widget': 'select',
        'ui:options': {
          mode: 'tags',
        },
      },
    },
  },
];

const advancedElements = [
  {
    text: '日期范围',
    name: 'dateRange',
    widget: 'dateRange',
    schema: {
      title: '日期范围',
      type: 'range',
      format: 'dateTime',
      'ui:options': {
        placeholder: ['开始时间', '结束时间'],
      },
    },
    setting: {
      format: {
        title: '类型',
        type: 'string',
        enum: ['dateTime', 'date'],
        enumNames: ['日期时间', '日期'],
      },
    },
  },
  {
    text: '数字（slider）',
    name: 'slider',
    widget: 'slider',
    schema: {
      title: '带滑动条',
      type: 'number',
      'ui:widget': 'slider',
    },
    setting: {},
  },
  {
    text: '图片展示',
    name: 'image',
    // widget: 'input',
    schema: {
      title: '图片展示',
      type: 'string',
      format: 'image',
    },
    setting: {},
  },
  {
    text: '颜色选择',
    name: 'color',
    widget: 'color',
    schema: {
      title: '颜色选择',
      type: 'string',
      format: 'color',
    },
    setting: {},
  },
];

const layouts = [
  {
    text: 'object',
    name: 'object',
    schema: {
      title: '对象',
      type: 'object',
      properties: {},
    },
    widget: 'map',
    setting: {},
  },
  /* {
    text: '列表',
    name: 'list',
    widget: 'list',
    schema: {
      title: '数组',
      type: 'array',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      minItems: {
        title: '最小长度',
        type: 'number',
      },
      maxItems: {
        title: '最大长度',
        type: 'number',
      },
      'ui:options': {
        title: '选项',
        type: 'object',
        properties: {
          foldable: {
            title: '是否可折叠',
            type: 'boolean',
          },
        },
      },
    },
  }, */
];

const saves = [
  {
    text: '复杂结构样例',
    name: 'something',
    schema: {
      title: '对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        inputName: {
          title: '简单输入框',
          type: 'string',
        },
        selectName: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
        dateName: {
          title: '时间选择',
          type: 'string',
          format: 'date',
        },
        listName: {
          title: '对象数组',
          description: '对象数组嵌套功能',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rangeName: {
                title: '日期/时间范围',
                type: 'range',
                format: 'date',
                'ui:options': {
                  placeholder: ['开始日期', '结束日期'],
                },
              },
            },
          },
        },
      },
    },
  },
];

let result = [elements, advancedElements, layouts, saves];

result = result.map(list =>
  list.map(item => ({
    ...item,
    setting: { ...commonSettings, ...item.setting },
  })),
);

console.log('result', result);

export default result;
