# 介绍

ELCube 是一个高可配置的系统

## 配置(开发)

在ELCube的概念里，我们遵循约定优于配置、配置优于开发的原则；

因此ELCube的实施过程即先配置再coding，配置是一种无需编码的开发过程；

所有的配置功能都默认集中在开发菜单下，在开发菜单里，您可以循序渐进得对功能进行配置，并实时预览配置的成果；

::: tip 目前，可支持的配置内容：
* 基本配置
* 单据配置
* 组件
* 流程定义
* 决策定义

:::

#### 基本配置

::: tip
在[基本配置](def-base.md)中可以设置系统的key-value参数，如字典；
这些key-value的配置信息会应用到系统中各个相应的模块下，也因此基本配置的作用是根据各个模块的特性决定的，
希望了解这些基本配置的作用与方法，需要先深入了解各个模块的运行机制
:::

#### 单据配置

::: tip
[单据配置](def-doc-type.md)是ELCube实现业务模型的基础，在单据配置中，你可以根据业务需求来构建业务单据的模型，
并将这些业务单据模型通过业务流串联起来形成一个完整的业务生命周期
:::

#### 组件

::: tip
[组件](def-component.md)是ELCube系统中各个程序的运行单元，不论是系统中的单据、页面、或者图表，其底层都是由
一个个组件来执行的，所以，在使用系统的过程中注意与Vue组件的区分
:::

在此文档中，我们经常会提到各种组件

* 按技术分：脚本组件、JS组件

* 按形态分：
[卡片](def-card.md)组件、
[字段](def-component.md#字段组件)组件、
[图表](def-component.md#图表组件)组件 以及 
[服务组件](def-component.md#服务组件)（也可以称为业务逻辑组件）

* 按业务逻辑分：生命周期组件、SpEL表达式组件、拦截器等

通过形形色色的组件，才得以支撑ELCube的高可配置基础，不过我们也无需担心各种不同类型的组件会混淆，
各种组件都有它各自的使用场景，在配置的过程中也做了很多约束，来提高可配置的特性

#### 流程定义

::: tip
ELCube 使用Camunda工作流引擎作为系统的BPM工作流模型，通过[流程定义](def-bpm.md)来绘制工作流引擎的流程图，
并将bpm绑定到单据类型上，由单据引擎驱动运行
:::


#### 决策定义

::: tip
ELCube 使用Camunda了决策模型，通过[决策定义](def-dmn.md)来绘制决策图，
决策图可被服务组件调用，来返回决策的结果
:::

## 设置

设置与配置不同的是，配置面向IT人员，而配置面向最终用户

在设置里，你可以创建用户授权以及定义系统的主菜单等


## 运维

运维面向IT人员，提供一些系统管理的工具，辅助解决系统在生产环境中遇到的错误及问题