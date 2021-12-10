# 基本配置

## 常量
`待完善`

## 图表
`待完善`

## 页面

自定义查询界面，是一个由JSON配置驱动的查询界面，可以完成对ES数据的检索与查询功能


### 配置

|字段|描述|数据类型|默认值|
|----|----|----|----|
|index|索引|String|document|
|title|页面Tab标题|String|`null`|
|preViewVisible|是否启用单据预览|Boolean|`false`|
|defaultRows|默认条目数量|Integer|`10`|
|postCondition|数据过滤条件|JSONObject|`null`不过滤，显示索引全部数据|
|searchItemsDefault|搜索框|JSONArray|`null`|
|searchItemsMoreDef|更多搜索框|JSONArray|`null`|
|columns|列定义|JSONArray|`null`|

### postCondition
postCondition 是一段ES查询语法

|过滤类型|描述|语法|
|----|----|----|----|
|term|单条件过滤|`{"字段名":"过滤条件"}`|
|terms|单条件多值过滤|`{"字段名":["过滤条件1"、"过滤条件2"、"过滤条件3"]}`|

`其他待补充`

### searchItemsDefault
searchItemsDefault 描述界面的输入框，目前支持如下几种输入框类型

### searchItemsMoreDef
searchItemsMoreDef 描述界面的更多的输入框，与searchItemsDefault区别是，更多输入框默认不现实，需要用户手动点击选择，
以减少搜索框对界面版幅的占用

### 搜索提示框

> 请注意 搜索提示框仅对部分字段类型有效 

|过滤类型|描述|配置参考|
|----|----|----|
|name|查询字段描述|搜索|
|field|查询字段，不可多选|`docName`|
|component|查询组件|nk-search-options-suggest|
|placeholder|输入提示|请输入关键字|

### 文本搜索框

|过滤类型|描述|配置参考|
|----|----|----|
|name|查询字段描述|搜索|
|field|查询字段，可多选|`["keyword","docName","partnerName"]`|
|component|查询组件|nk-search-options-text|
|placeholder|输入提示|请输入关键字|

### 下拉框

|过滤类型|描述|配置参考|
|----|----|----|
|name|查询字段描述|搜索|
|field|查询字段||
|component|查询组件|nk-search-options-single|
|agg|下拉框数据分组统计候选值|`true or false`|
|min|最小显示宽度||
|max|最大显示宽度||
|placeholder|输入提示|请选择|

### 多选下拉框

|过滤类型|描述|配置参考|
|----|----|----|
|name|查询字段描述|搜索|
|field|查询字段||
|component|查询组件|nk-search-options-multiple|
|agg|下拉框数据分组统计候选值|`true or false`|
|min|最小显示宽度||
|max|最大显示宽度||
|placeholder|输入提示|请选择|

### 日期区间框

|过滤类型|描述|配置参考|
|----|----|----|
|name|查询字段描述|搜索|
|field|查询字段||
|component|查询组件|nk-search-options-date-range|
|placeholder|输入提示|请选择|

### 数值区间框

|过滤类型|描述|配置参考|
|----|----|----|
|name|查询字段描述|搜索|
|field|查询字段||
|component|查询组件|nk-search-options-number-range|
|from|最小值||
|to|最大值||
|placeholder|输入提示|请选择|

### 字段
|属性|描述|配置参考|
|----|----|----|
|title|字段标题||
|field|显示字段||
|width|字段宽度，默认px，可显示指定为%|80, 15%|
|align|对其方式||
|formatter|格式化|nkPercent, nkCurrency, nkDatetime|
|sortable|是否可排序|请选择|
|params.orderField|对于text类型的字段，如果排序则需要指定该字段的原始数据字段，一般情况下为`field`.original||

### 一个典型的例子
```json
{
    "index": "document",
    "preViewVisible": true,
    "width": "60%",
    "defaultRows":15,
    "title": "自定义查询",
    "postCondition": {
        "terms": {
            "docType": [
                "B000"
            ]
        }
    },
    "searchItemsDefault": [
        {
            "name": "搜索",
            "field": ["keyword","docName","partnerName"],
            "component": "nk-search-options-text",
            "placeholder": "请输入关键字"
        },
        {
            "name":"户籍省份",
            "field":"dynamics.province_keyword",
            "component":"nk-search-options-single",
            "min":240,
            "agg":true
        },
        {
            "name":"入职时间",
            "field":"dynamics.date1_date",
            "component":"nk-search-options-date-range",
            "placeholder":"请选择"
        },
        {
            "name":"资产量",
            "field":"dynamics.num5_double",
            "component":"nk-search-options-number-range",
            "placeholderFrom":"从",
            "placeholderTo":"到",
            "from": 0,
            "to": 1000000000
        }
    ],
    "searchItemsMoreDef": [
        {
            "name":"爱好",
            "field":"dynamics.likes_keyword",
            "component":"nk-search-options-multiple",
            "min":240,
            "agg":true
        },
        {
            "name":"城市",
            "field":"dynamics.city_keyword",
            "component":"nk-search-options-single",
            "min":240,
            "agg":true,
            condition:function(params){
                return !!params["dynamics.province_keyword"];
            }
        }
    ],
    "columns": [
        {
            "title": "编号",
            "field": "docNumber",
            "width": "120",
            "type": "html",
            "formatter": [
                "docLink",
                "docId"
            ]
        },
        {
            "title": "名称",
            "field": "docName",
            "width": "140",
            "type": "html",
            "sortable":true, 
            "params":{ 
                "orderField": "docName.original" 
            }
        },
        {
            "field": "dynamics.company_name",
            "title": "任职公司",
            "width": "140", 
            "sortable":true, 
            "params":{ 
                "orderField": "dynamics.company_name.original" 
            }
        },
        {
            "field": "dynamics.date1_date",
            "title": "入职日期",
            "width": "100",
            "formatter": [
                "nkDatetime",
                "YYYY/MM/DD"
            ], 
            "sortable":true
        },
        {
            "field": "dynamics.province_keyword",
            "title": "户籍省份",
            "width": "80", 
            "sortable":true
        },
        {
            "field": "dynamics.plate_serial",
            "title": "车牌号",
            "width": "80"
        },
        {
            "field": "dynamics.num5_double",
            "title": "资产量",
            "width": "120",
            "align": "right",
            "formatter": [
                "nkCurrency"
            ], 
            "sortable":true
        },
        {
            "field": "dynamics.num4_float",
            "title": "信用度",
            "width": "80",
            "align": "right",
            "formatter": [
                "nkPercent"
            ], 
            "sortable":true
        }
    ]
}
```

## 表格导出