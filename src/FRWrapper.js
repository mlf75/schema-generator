import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSet, useStorageState } from './hooks';
import copyTOClipboard from 'copy-text-to-clipboard';
import Left from './Left';
import Right from './Right';
import {
  flattenSchema,
  idToSchema,
  combineSchema,
  dataToFlatten,
  flattenToData,
  getSaveNumber,
  looseJsonParse,
  isObject,
  oldSchemaToNew,
  newSchemaToOld,
} from './utils';
import { Ctx, PropsCtx, InnerCtx } from './context';
// import SCHEMA from './json/basic.json';
import FR from './FR';
import { Modal, Input, message } from 'antd';
import { Button } from 'antd';

import { transformFromFun, transformToFun } from './customeToFr';

import FromSchema from './schema';
import ToSchema from './fr-schema';

const { TextArea } = Input;

function Wrapper(
  {
    simple = true,
    schema,
    formData,
    onChange,
    onSchemaChange,
    templates,
    submit,
    transformFrom,
    transformTo,
    extraButtons = [],
    ...globalProps
  },
  ref,
) {
  const [local, setLocal] = useSet({
    showModal: false,
    showModal2: false,
    showModal3: false,
    schemaForImport: '',
  });

  const [saveList, setSaveList] = useState(templates || []);

  const saveNameRef = useRef();

  const {
    preview,
    setState,
    mapping,
    widgets,
    selected,
    hovering,
    isNewVersion,
    ...rest
  } = globalProps;
  let _schema = {};
  if (schema) {
    _schema = combineSchema(schema.schema, schema.uiSchema); // TODO: 要不要判断是否都是object
  }
  const flatten = flattenSchema(_schema);
  const flattenWithData = dataToFlatten(flatten, formData);

  const onFlattenChange = newFlatten => {
    const newSchema = idToSchema(newFlatten);
    const newData = flattenToData(newFlatten);
    // 判断只有schema变化时才调用，一般需求的用户不需要
    if (onSchemaChange) {
      onSchemaChange(newSchema);
    }
    onChange(newData);
  };

  const onItemChange = (key, value) => {
    flattenWithData[key] = value;
    onFlattenChange(flattenWithData);
  };

  const toggleModal = () => {
    setLocal({ showModal: !local.showModal });
  };
  const toggleModal2 = () => setLocal({ showModal2: !local.showModal2 });
  const toggleModal3 = () => setLocal({ showModal3: !local.showModal3 });

  const clearSchema = () => {
    setState({
      schema: {
        schema: {
          type: 'object',
        },
      },
      formData: {},
      selected: undefined,
    });
  };

  const onTextareaChange = e => {
    setLocal({ schemaForImport: e.target.value });
  };

  // 收口点 propsSchema 到 schema 的转换（一共就3个入口：defaultValue，importSchema，setValue）
  // TODO: 3个入口可能还是太多了，是不是考虑在外面裹一层
  const importSchema = () => {
    try {
      const info = transformFrom(looseJsonParse(local.schemaForImport));
      let _isNewVersion = true;
      if (info && info.propsSchema) {
        _isNewVersion = false;
      }
      const _info = oldSchemaToNew(info);
      const { schema, ...rest } = _info;
      const result = {
        schema: {
          schema,
        },
        formData: {},
        selected: undefined,
        ...rest,
        isNewVersion: _isNewVersion,
      };
      setState(result);
    } catch (error) {
      message.info('格式不对哦，请重新尝试'); // 可以加个格式哪里不对的提示
    }
    toggleModal2();
  };

  let displaySchema = {};
  let displaySchemaString = '';
  try {
    const _schema = idToSchema(flattenWithData, '#', true);
    displaySchema = transformTo({ schema: _schema, ...rest });
    if (!isNewVersion) {
      displaySchema = newSchemaToOld(displaySchema);
    }
    displaySchemaString = JSON.stringify(displaySchema, null, 2);
  } catch (error) {}

  const copySchema = () => {
    copyTOClipboard(displaySchemaString);
    message.info('复制成功');
    toggleModal();
  };

  // const handleSubmit = () => {
  //   submit(displaySchema);
  // };

  const getValue = () => {
    return displaySchema;
  };

  // 收口点 propsSchema 到 schema
  const setValue = value => {
    try {
      const { schema, propsSchema, ...rest } = value;
      let _schema = { schema: schema || propsSchema };
      let _isNewVersion = true;
      if (!schema && propsSchema) {
        _isNewVersion = false;
      }
      setState(state => ({
        ...state,
        schema: _schema,
        formData: {},
        selected: undefined,
        isNewVersion: _isNewVersion,
        ...rest,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const copyValue = () => {
    copyTOClipboard(displaySchemaString);
  };

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    copyValue,
  }));

  const saveSchema = () => {
    try {
      const text = saveNameRef.current.state.value;
      const name = 'save' + getSaveNumber();
      const schema = idToSchema(flattenWithData, '#', true);
      setSaveList([...saveList, { text, name, schema }]);
      toggleModal3();
    } catch (error) {
      message.error('保存失败');
    }
  };

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData,
    onFlattenChange,
    onItemChange,
    ...globalProps,
  };

  const _extraButtons = Array.isArray(extraButtons) ? extraButtons : [];
  const _showDefaultBtns = _extraButtons.filter(
    item => item === true || item === false,
  );
  const _extraBtns = _extraButtons.filter(item => isObject(item) && item.text);

  if (simple) {
    return (
      <Ctx.Provider value={setState}>
        <PropsCtx.Provider value={globalProps}>
          <InnerCtx.Provider value={store}>
            <FR preview={true} />
          </InnerCtx.Provider>
        </PropsCtx.Provider>
      </Ctx.Provider>
    );
  }

  // console.log('transformFromFun----', transformFromFun(FromSchema))

  // console.log('transformToFun----', transformToFun(ToSchema.schema))

  return (
    <Ctx.Provider value={setState}>
      <PropsCtx.Provider value={globalProps}>
        <InnerCtx.Provider value={store}>
          <div className="fr-wrapper">
            <Left saveList={saveList} setSaveList={setSaveList} />

            <div className="mid-layout pr2">
              <div className="mv2 mh1">
                {_showDefaultBtns[0] !== false && (
                  <Button
                    className="mr2 mb1"
                    onClick={() => {
                      setState({ preview: !preview, selected: '#' });
                    }}
                  >
                    {preview ? '开始编辑' : '最终展示'}
                  </Button>
                )}
                {_showDefaultBtns[1] !== false && (
                  <Button className="mr2" onClick={clearSchema}>
                    清空
                  </Button>
                )}
                {/* <Button className="mr2" onClick={toggleModal3}>
                  保存
                </Button> */}
                {/* {_showDefaultBtns[2] !== false && (
                  <Button className="mr2" onClick={toggleModal2}>
                    导入
                  </Button>
                )} */}
                {_showDefaultBtns[3] !== false && (
                  <Button type="primary" className="mr2" onClick={toggleModal}>
                    导出schema
                  </Button>
                )}
                {/* {_extraBtns.map((item, idx) => {
                  return (
                    <Button key={idx.toString()} className="mr2" {...item}>
                      {item.text || item.children}
                    </Button>
                  );
                })} */}
                {/* <Button type="primary" className="mr2" onClick={handleSubmit}>
                  保存
                </Button> */}
              </div>
              <div className="dnd-container">
                <FR preview={preview} />
              </div>
            </div>

            <Right globalProps={rest} />
            <Modal
              visible={local.showModal}
              onOk={copySchema}
              onCancel={toggleModal}
              okText="复制"
              cancelText="取消"
            >
              <div className="mt3">
                <TextArea
                  style={{ fontSize: 12 }}
                  // value={displaySchemaString}
                  value={JSON.stringify(
                    transformToFun(JSON.parse(displaySchemaString).schema),
                    null,
                    2,
                  )}
                  autoSize={{ minRows: 10, maxRows: 30 }}
                />
              </div>
            </Modal>
            <Modal
              visible={local.showModal2}
              okText="导入"
              cancelText="取消"
              onOk={importSchema}
              onCancel={toggleModal2}
            >
              <div className="mt3">
                <TextArea
                  style={{ fontSize: 12 }}
                  value={local.schemaForImport}
                  placeholder="贴入需要导入的schema，模样可点击导出schema参考"
                  onChange={onTextareaChange}
                  autoSize={{ minRows: 10, maxRows: 30 }}
                />
              </div>
            </Modal>
            <Modal
              visible={local.showModal3}
              okText="确定"
              cancelText="取消"
              onOk={saveSchema}
              onCancel={toggleModal3}
            >
              <div className="mt4 flex items-center">
                <div style={{ width: 100 }}>保存名称：</div>
                <div style={{ width: 280 }}>
                  <Input
                    defaultValue={'存档' + getSaveNumber()}
                    ref={saveNameRef}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </InnerCtx.Provider>
      </PropsCtx.Provider>
    </Ctx.Provider>
  );
}

const FRWrapper = forwardRef(Wrapper);

FRWrapper.defaultProps = {
  labelWidth: 120,
};

export default FRWrapper;
