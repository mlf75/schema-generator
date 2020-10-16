export default {
  schema: {
    type: 'object',
    properties: {
      type: 'object',
      baseInfo: {
        title: '基本信息',
        type: 'object',
        properties: {
          itemCode: {
            title: '编码',
            description: '描述信息',
            default: '',
            pattern: '/^[0-9]+$/',
            message: {
              pattern: '序号为数值类型',
            },
            'ui:widget': 'textarea',
            'ui:disabled': true,
            'ui:hidden': false,
            'ui:width': '50%',
            'ui:options': {
              placeholder: '请输入编码',
              autoSize: {
                minRows: 1,
                maxRows: 6,
              },
            },
          },
          orderNo: {
            title: '排序',
            'ui:widget': 'input',
            'ui:hidden': false,
            pattern: '/^[0-9]+$/',
            message: {
              pattern: '序号为数值类型',
            },
          },
          shareMode: {
            title: '共享方式',
            'ui:widget': 'select',
            'ui:hidden': false,
            enum: ['1', '2'],
            enumNames: ['批量共享', '单条调用'],
          },
          dataSource: {
            title: '数据来源',
            'ui:widget': 'select',
            'ui:hidden': false,
            enum: [],
            enumNames: [],
          },
          validState: {
            title: '有效',
            'ui:widget': 'radio',
            default: 1,
            'ui:hidden': false,
            enum: ['1', '2'],
            enumNames: ['是', '否'],
          },
        },
        required: ['itemCode', 'orderNo', 'shareMode', 'dataSource'],
      },
      extend: {
        title: '扩展信息',
        type: 'object',
        properties: {
          itemCode: {
            title: '编码',
            description: '描述信息',
            default: '',
            pattern: '/^[0-9]+$/',
            message: {
              pattern: '序号为数值类型',
            },
            'ui:widget': 'textarea',
            'ui:disabled': true,
            'ui:hidden': false,
            'ui:width': '50%',
            'ui:options': {
              placeholder: '请输入编码',
              autoSize: {
                minRows: 1,
                maxRows: 6,
              },
            },
          },
          orderNo: {
            title: '排序',
            'ui:widget': 'input',
            'ui:hidden': false,
            pattern: '/^[0-9]+$/',
            message: {
              pattern: '序号为数值类型',
            },
          },
          shareMode: {
            title: '共享方式',
            'ui:widget': 'select',
            'ui:hidden': false,
            enum: ['1', '2'],
            enumNames: ['批量共享', '单条调用'],
          },
          dataSource: {
            title: '数据来源',
            'ui:widget': 'select',
            'ui:hidden': false,
            enum: [],
            enumNames: [],
          },
          validState: {
            title: '有效',
            'ui:widget': 'radio',
            default: 1,
            'ui:hidden': false,
            enum: ['1', '2'],
            enumNames: ['是', '否'],
          },
        },
      },
    },
  },
  formData: {
    baseInfo: {
      itemCode: '',
      orderNo: '',
      shareMode: '',
      dataSource: '',
      validState: '',
    },
    extend: {
      itemCode: '',
      shareMode: '1',
      validState: 1,
    },
  },
};
