# EL表达式

在 ELCube 中，EL表达式以Spring EL表达式为基础进行改进，因此SpEL语法是基本语法

[Spring EL 官方文档](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#expressions)

在 ELCube 的配置中，主要分为两大类的表达式
- SpEL表达式 它将直接返回一个数据对象
- SpEL模版 它是一个严格的`JSON`数据格式，程序中会对`JSON`反序列化为数据对象再进行使用

两大类的表达式有各自适用的场景，我们逐渐通过下面的例子来理解它的特点与区别

## 基本语法

### 基本数据类型
``` java
2 //整数
3.14159265358979323846264338327950288 //小数
6.0221415E+23 // 科学计数法
0x7FFFFFFF // 16进制数字
null // 空值
true //真
false //假
"Hello ELCube" //字符串
{ "Bean", 2, 3.1415926 } //内联列表 List
{ {'a','b'},{'x','y'} } //内联列表 List
{ 
    "name":"Bean", 
    "age":31, 
    "base": { 
        "nationality":"中国", 
        "city":"重庆" 
    } 
} //内联对象 Maps
```

### 变量
变量可以在使用语法＃variableName表达引用
```java
#key1 // 返回当前表达式所在环境里的key值，如卡片中获取卡片字段名为key1的值
```

### 关系运算符
```java
2 == 2 // 返回true
3 > 2 // 返回true
3 >= 2 // 返回true
3 < 2 // 返回false
3 <= 2 // 返回false
2 < -5.0 // 返回false
'black' < 'block' // 返回true

2 eq 2
// 更多等价字母变量 
// lt (<), gt (>), le (<=), ge (>=), eq (==), 
// ne (!=), div (/), mod (%), not (!)
```
### 逻辑运算符
```java
// AND

true and false // 返回false
true and 2>1 // 返回true

// OR

true or false // 返回true
true or 2>1 // 返回true

// NOT

!false // 返回true
!(2>1) // 返回false


// 三元运算符 if-then-else的条件逻辑 的表达
true ? 1 : 0 // 返回1
2 > 1 ? 2 : 1 // 返回2
!(2 > 1) ? 2 : 1 // 返回1

// Elvis操作符 三元运算符语法的缩短语法
#name ?: 'Bean' // 如果name有值，返回name的值，否则返回Bean，可以理解为默认值

```
### 数学运算符
```java
// 加
1 + 2 // 返回 3

// 减
1 - 2 // 返回 -1

// 乘
1 * 2 // 返回 2

// 除
1 / 2 // 返回 0
3 / 2 // 返回 1
3.0 / 2 // 返回 1.5
3.0 / 0 // 报错，除数不能为0

// 模
1 % 2 // 返回1
7 % 4 // 返回3

// 综合例子
8 / 5 % 2 // 返回 1
1 + 2 - 3 * 8 // 返回 -21

```

### 方法调用
通过java典型的编程语法实现
```java
"abc".substring(2, 3) // 返回c
"abc".toUpperCase() // 返回ABC
```

### 类型
T操作可以被用来指定安装一个java.lang.ClassClass (the type). 静态方法也可以使用该运算符调用
```java
T(java.lang.Integer).parseInt("123") // 返回123
T(java.lang.Double).parseDouble("123.3") // 返回123.3
new java.util.Date().getTime()/1000 // 返回当前时间戳的秒数，即ELCube标准日期格式
```

### 引用
从表达式使用（@）符号查找系统服务的引用
```java
@nk.now() // 获取当前时间戳（秒）同new java.util.Date().getTime()/1000
@nk.user() // 获取当前登陆用户
@nk.user().id // 获取当前登陆用户的ID
@nk.user().realname // 获取当前登陆用户的名称，不是登陆用户名
@dict.json("systemName") // 从字典中获取systemName的值
```
### 安全导航运算符
安全导航操作符是用来避免`NullPointerException`，使用`?.`来调用对象的属性或方法
```java
@nk.user()?.id // 获取当前登陆用户的ID，如果用户没有登陆，即user()没有值，则返回null
#baseInfo?.name // 返回变量baseInfo中的name属性，没有则返回null
data.base?.name // 返回base卡片中的name字段的值，没有则返回null
data.base?.name ?: "Bean" // 返回base卡片中的name字段的值，没有则返回Bean
```
### 集合选择

语法`?[selectionExpression]`过滤收集并返回一个包含原有元素的子集的新的集合

语法`^[selectionExpression]`过滤并返回第一个值

语法`$[selectionExpression]`过滤并返回最后一个值

```java
{1,2,3,4,5,6,7,8}?[#this<3] // 返回数组 [1,2]
{1,2,3,4,5,6,7,8}^[#this<3] // 返回 1
{1,2,3,4,5,6,7,8}$[#this<3] // 返回 2

// 返回数组 [{"name":"Bean","age":31}]
{{"name":"Bean","age":31},{"name":"Max","age":3}}?[age>10] 
```

### 集合投影

语法`![selectionExpression]`返回一个包含不同数据结构的新集合

```java
// 返回数组 ["Bean","Max"]
{{"name":"Bean","age":31},{"name":"Max","age":3}}![name] 
// 返回数组 [31,7]
{{"name":"Bean","age":31},{"name":"Max","age":3}}![age] 
// 返回数组 [{"name":"Bean"},{"name":"Max"}]
{{"name":"Bean","age":31},{"name":"Max","age":3}}![{name:name}] 
```

### 表达式模版 SpEL
表达式模板允许文字文本与一个或多个解析块的混合，

在`SpEL`标准语法中使用`＃{}`作为分隔符，

在`ElCube`高级语法中使用`${}`作为分隔符

```json{1}
[#{1},${2},"${3}"] // 返回JSON字符串 [1,2,3] 
```

## 基本示例

#### 示例1 表达式
```spel
data?.user?.name // 返回结果 Bean
```
这是一个典型的SpEL表达式例子，它将返回当前单据user卡片的name字段的值

#### 示例2 模版
```json{1}
["#{data?.user?.name}"] // 返回结果 ["Bean"]
```
这个例子返回一个JSON数组，它将当前单据user卡片的name字段的值作为数组的一个元素返回

通过示例2我们会发现，在SpEL模版中，我们需要用`#{}`这个符号将表达式进行包裹，表达式会被替换为具体的数值，最终返回一个JSON字符串

## 模版示例

#### 示例3 模版 反面教材
在示例2中，我们返回了一个字符串数组，那么，如果我们希望返回一个数字数组该怎么做呢？
::: warning
请注意，下面这个例子是个错误的做法，仅作为反面示范

从语法角度讲，它是合理的，为了在配置的时候能够更加严谨，我们希望表达式模版是一个严格的JSON格式，

例子1，不是一个严格的JSON，它的值没有被双引号包裹

例子2，它虽然用双引号包裹了表达式，但是返回结果中的数字，变成字符串了，
这显然也不是我们所需要的。
:::
```spel
[#{data?.user?.age}] // 返回结果 [31] 
```
```spel
["#{data?.user?.age}"] // 返回结果 ["31"] 
```

#### 示例4 ELCube的 模版 语法
::: tip
在ELCube中，我们可以将#替换为$，来完成例子3中不可能做到的事

`${}`是对SpEL改进后的语法，它会判断表达式的返回结果的数据类型，将模版替换为符合JSON的格式

:::
```json{1}
["${data?.user?.age}"] // 返回结果 [31] 
```

#### 示例5 使用模版 返回一个对象数组
```json{1}
["${data?.user}"] // 返回结果 [{"name":"Bean","age":31}] 
```

#### 示例6 使用模版 返回一个对象
```json{1}
"${data?.user}" // 返回结果 {"name":"Bean","age":31} 
```

#### 示例7 使用模版 返回一个更复杂的结果
```json{1-4,6-23}
{
  "user" : "${data?.user}",
  "familyList" : "${data?.family}"
}
// 返回结果 
{
    "user" : {
        "name" : "Bean",
        "age" : 31
    },
    "familyList" : [
        {
            "name" : "Tan",
            "age" : 55,
            "relationship" : "father"
        },
        {
            "name" : "Max",
            "age" : 7,
            "relationship" : "children"
        }
    ]
}
```

## 表达式示例

那么，我们不使用模版，而仅使用表达式能否得到同样的效果呢，当然也可以，
只是表达式直接返回数据对象，而非JSON格式的字符串

在表达式中，

#### 示例8 使用表达式 返回一个复杂对象

下面这3个示例，执行结果是一致的，我们推荐使用第三个例子的方式，表达更严谨

```json{1-4}
{
  "user" : #{data?.user},
  "familyList" : #{data?.family}
}
```
```json{1-4}
{
  "user" : ${data?.user},
  "familyList" : ${data?.family}
}
```
```json{1-4}
{
  "user" : "${data?.user}",
  "familyList" : "${data?.family}"
}
```
#### 示例8 使用表达式 返回一个复杂数组

::: tip 注意
在使用表达式返回数组的时候，我们需要使用{}，而不是[]了，这是SpEL的标准语法，在配置ELCube的过程中，
这两个区别点，是最容易搞混的，我们需要细致对待
:::

下面这3个示例，执行结果是一致的，同样我们推荐使用第三个例子的方式，表达更严谨

```
{
  #{data?.user},
  #{data?.user1},
  #{data?.user2}
}
```
```
{
  ${data?.user},
  ${data?.user1},
  ${data?.user2}
}
```
```json{1-5}
{
  "${data?.user}",
  "${data?.user1}",
  "${data?.user2}"
}
```

