export default {
  baseInfo: {
    title: '基本信息',
    fields: [
      {
        name: 'itemCode',
        label: '编码',
        defaultValue: '',
        widget: 'textarea',
        required: true,
        disabled: true,
        hidden: false,
        help: '描述信息',
        rules: [
          {
            pattern: /^[0-9]+$/,
            message: '序号为数值类型',
          },
        ],
        style: {
          width: '100%',
        },
        options: {
          placeholder: '请输入编码',
          formElementOpts: {
            autoSize: {
              minRows: 1,
              maxRows: 6,
            },
          },
        },
      },
      {
        name: 'itemName',
        label: '名称',
        widget: 'textarea',
        defaultValue: '',
        required: true,
        hidden: false,
        options: {
          formElementOpts: {
            autoSize: {
              minRows: 1,
              maxRows: 6,
            },
          },
        },
        style: {
          width: '100%',
        },
      },
      {
        name: 'versionNo',
        label: '版本',
        widget: 'input',
        hidden: true,
      },
      {
        name: 'validState',
        label: '有效',
        widget: 'radio',
        defaultValue: 1,
        hidden: false,
        options: {
          data: {
            '0': '否',
            '1': '是',
          },
        },
      },
      {
        name: 'orderNo',
        label: '排序',
        widget: 'input',
        hidden: false,
        rules: [
          {
            pattern: /^[0-9]+$/,
            message: '序号为数值类型',
          },
        ],
      },
      {
        name: 'remark',
        label: '描述',
        widget: 'textarea',
        defaultValue: '',
        hidden: false,
        options: {
          formElementOpts: {
            autoSize: {
              minRows: 1,
              maxRows: 6,
            },
          },
        },
        style: {
          width: '100%',
        },
      },
    ],
  },
  /* itemInfo: {
    title: "事项信息",
    fields: [
      {
        widget: "input",
        name: "respUnitCreditCode",
        label: "责任单位信用代码",
        required: true,
        hidden: false,
        isCodeAttr: true,
        sampleValue: "11500000MB0Q40209N",
      },
      {
        widget: "select",
        name: "administrativeDivision",
        label: "行政区划",
        required: true,
        hidden: false,
        options: {
          remote: {
            url: "/dimtable/getMembers",
            params: {
              dimcode: "ADMIN_DIVISION",
            },
          },
        },
        isCodeAttr: true,
        sampleValue: "",
      },
      {
        widget: "select",
        name: "dataSource",
        label: "数据来源",
        required: true,
        hidden: false,
        options: {
          remote: {
            url: "/dimtable/getMembers",
            params: {
              dimcode: "DATA_SOURCE",
            },
          },
        },
        isCodeAttr: true,
        sampleValue: "1",
      },
      {
        widget: "select",
        name: "sourceDepartment",
        label: "来源部门",
        required: true,
        hidden: false,
        options: {
          remote: {
            url: "/dimtable/getMembers",
            params: {
              dimcode: "DEPARTMENT",
            },
          },
        },
        isCodeAttr: true,
        sampleValue: "95",
      },
      {
        widget: "select",
        name: "itemType",
        label: "事项类型",
        required: true,
        hidden: false,
        options: {
          remote: {
            url: "/dimtable/getMembers",
            params: {
              dimcode: "ITEM_TYPE",
            },
          },
        },
        isCodeAttr: true,
        sampleValue: "0202",
      },
      {
        widget: "select",
        name: "creditSubjectCategory",
        label: "信用主体类别",
        required: true,
        hidden: false,
        options: {
          remote: {
            url: "/dimtable/getMembers",
            params: {
              dimcode: "CREDIT_SUBJECT",
            },
          },
        },
        isCodeAttr: true,
        sampleValue: "20",
      },
      {
        widget: "select",
        name: "shareMode",
        label: "共享方式",
        hidden: false,
        options: {
          data: {
            "1": "批量共享",
            "2": "单条调用",
          },
        },
        isCodeAttr: false,
        sampleValue: "",
      },
      {
        widget: "select",
        name: "updateFrequency",
        label: "更新频次",
        hidden: false,
        options: {
          remote: {
            url: "/dimtable/getMembers",
            params: {
              dimcode: "UPDATE_FREQUENCY",
            },
          },
        },
        isCodeAttr: false,
        sampleValue: "",
      },
      {
        widget: "select",
        name: "publishMethod",
        label: "披露方式",
        hidden: false,
        options: {
          data: {
            "1": "主动公开",
            "2": "授权查询",
          },
        },
        isCodeAttr: false,
        sampleValue: "",
      },
      {
        name: "sequenceCode",
        label: "顺序码",
        widget: "input",
        hidden: false,
        required: true,
        defaultValue: "",
        isCodeAttr: true,
        sampleValue: "001",
      },
      {
        name: "subitemCode",
        label: "子项代码",
        required: true,
        widget: "input",
        hidden: false,
        defaultValue: "",
        isCodeAttr: true,
        sampleValue: "000",
      },
    ],
  },
  related: {
    title: "关联模型",
    fields: [
      {
        name: "dbname",
        label: "数据库",
        widget: "select",
        required: true,
        hidden: false,
        options: {
          remote: {
            url: "/itemTable/getDbOptions",
          },
        },
      },
      {
        name: "tableName",
        label: "表名称",
        widget: "table",
        required: true,
        hidden: false,
        options: {
          uiWidget: 'tableShow'
        }
      },
      {
        name: "tableXmlid",
        widget: "input",
        hidden: true,
      },
      {
        name: "filterWhere",
        label: "where条件",
        widget: "textarea",
        required: true,
        hidden: false,
        style: {
          width: "100%",
        },
        options: {
          placeholder: "请输入过滤条件，如：where colname=1",
          formElementOpts: {
            autoSize: {
              minRows: 3,
              maxRows: 6,
            },
          },
        },
      },
    ],
  }, */
};

// "schema": {
//   "type": "object",
//   "properties": {
//     "input_epiFLF": {
//       "title": "输入框",
//       "type": "string"
//     },
//     "textarea_j4Tf_j": {
//       "title": "编辑框",
//       "type": "string",
//       "format": "textarea"
//     },
//     "date_e7VHbB": {
//       "title": "日期选择",
//       "type": "string",
//       "format": "date"
//     },
//     "number_fkmnUc": {
//       "title": "数字输入框",
//       "type": "number"
//     }
//   }
// },
