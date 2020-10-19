// 定义简单属性的转换规则
const simpleAttr = {
  label: 'title',
  defaultValue: 'default',
  widget: 'ui:widget',
  disabled: 'ui:disabled',
  hidden: 'ui:hidden',
  help: 'description',
};

/--------------  从目标格式转换为 form-render 所需格式 -------------/;
// 获取具体的属性
function getProperties(obj) {
  const result = {};
  obj.forEach(item => {
    const attrs = Object.keys(item).filter(key => key !== 'name') || [];
    result[item.name] = {
      ...attrsTransformFrom(attrs, item),
    };
  });
  return result;
}

// 具体的每个属性的转换规则如：widget => ui:widget
function attrsTransformFrom(attrs, value) {
  const result = {};

  attrs.forEach((key, index) => {
    for (let attr in simpleAttr) {
      if (key === attr) {
        result[simpleAttr[key]] = value[key];
      }
    }
  });

  const complexAttrs = getComplexAttrs(attrs, value);

  Object.entries(complexAttrs).forEach(([attr, value]) => {
    result[attr] = value;
  });

  console.log('complexAttrs', complexAttrs);

  return result;
}

// 倒序循环剔除掉 simpleAttr 里面的属性，剩下的复合属性做自己的特殊转换
function getComplexAttrs(attrs, value) {
  for (let i = attrs.length - 1; i >= 0; i--) {
    for (let key in simpleAttr) {
      if (key === attrs[i]) {
        attrs.splice(i, 1);
      }
    }
  }

  const complexAttr = {};
  // 复合属性的特殊转换
  attrs.forEach(complex => {
    switch (complex) {
      case 'options':
        complexAttr['ui:options'] = {
          placeholder: value[complex].placeholder || '',
          ...value[complex].formElementOpts, // formElementOpts 自定义表单渲染组件里对于 form 表单元素属性设置对象
        };
        break;

      // 目前 form-render 只支持一个验证规则
      case 'rules':
        const rule =
          value[complex] && value[complex].length
            ? value[complex][0]
            : undefined;
        complexAttr['pattern'] = rule.pattern;
        complexAttr['message'] = {
          pattern: rule.message,
        };
        break;
      case 'style':
        complexAttr['ui:width'] = value[complex].width;
        break;
    }
  });
  return complexAttr;
}

// 获取必填项
function getRequired(fields) {
  return fields
    .map(item => {
      if (item.required) {
        return item.name;
      }
    })
    .filter(item => item);
}

// schema 格式转换 from 需要转化的格式 to 转换后的目标格式
export function transformFromFun(from) {
  if (!from || !from.properties) {
    return;
  }

  const result = {};

  Object.entries(from).forEach(([key, value]) => {
    result[key] = {
      title: value.title,
      type: 'object',
      properties: getProperties(value.fields),
      required: getRequired(value.fields),
    };
  });

  return {
    type: 'object',
    properties: {
      type: 'object',
      ...result,
    },
  };
}

/-------------- 从form-render schema转换到目标格式相关函数 -------------/;

// 组装自定义 form 渲染组件需要的配置项信息
function getCustomeProperties(obj, requiredArr) {
  return Object.entries(obj).map(([prop, value]) => {
    const required = requiredArr
      ? requiredArr.find(item => item === prop)
      : undefined;
    return {
      name: prop,
      ...attrsTransformTo(value),
      required: required ? true : false,
    };
  });
}

function attrsTransformTo(field) {
  const result = {};

  // 简单属性转换
  Object.entries(field).forEach(([_k, _v]) => {
    Object.entries(simpleAttr).forEach(([attr, value]) => {
      if (_k === value) {
        result[attr] = _v;
      }
    });
  });

  // 复合属性转换
  const complexAttrs = getToComplexAttrs(field);

  Object.entries(complexAttrs).forEach(([attr, value]) => {
    result[attr] = value;
  });

  return result;
}

// 倒序循环剔除掉 simpleAttr 里面的属性，剩下的复合属性做自己的特殊转换
function getToComplexAttrs(field) {
  const attrs = Object.keys(field);
  for (let i = attrs.length - 1; i >= 0; i--) {
    for (let key in simpleAttr) {
      if (simpleAttr[key] === attrs[i]) {
        attrs.splice(i, 1);
      }
    }
  }

  const complexAttr = {};
  // 复合属性的特殊转换
  attrs.forEach(complex => {
    switch (complex) {
      case 'ui:options':
      case 'enum':
      case 'enumNames':
        complexAttr['options'] = {};
        if (complex === 'enum' || complex === 'enumNames') {
          complexAttr['options']['data'] = {};
          field.enum.forEach((item, idx) => {
            complexAttr['options']['data'][[item]] = field['enumNames'][idx];
          });
        }

        if (complex === 'ui:options') {
          complexAttr['options'] = {
            placeholder: field[complex].placeholder,
            formElementOpts: {
              autoSize: field[complex].autoSize,
            },
          };
        }
        break;
      // 目前 form-render 只支持一个验证规则
      case 'pattern':
      case 'message':
        complexAttr['rules'] = [
          {
            pattern: field.pattern,
            message: field.message ? field.message.pattern : '',
          },
        ];
        break;
      case 'ui:width':
        complexAttr['style'] = {
          width: field['ui:width'],
        };
        break;
    }
  });
  return complexAttr;
}

// schema 格式转换 from 需要转化的格式 to 转换后的目标格式
export function transformToFun(from) {
  if (!from || !from.properties) {
    return;
  }
  let result = {};

  if (from && from.properties) {
    delete from.type;
    Object.entries(from.properties).forEach(([key, value]) => {
      if (value.properties) {
        const fields = getCustomeProperties(value.properties, value.required);
        result[key] = {
          title: value.title,
          fields,
        };
        return transformToFun(value);
      } else {
        result.fields = getCustomeProperties(from.properties, from.required);
      }
    });
  }

  /* if (from.properties.type === 'object') {
    delete from.properties.type;
    Object.entries(from.properties).forEach(([key, value]) => {
      result[key] = {
        title: value.title,
        fields: getCustomeProperties(value.properties, value.required),
      };
    });
  } */
  return result;
}
