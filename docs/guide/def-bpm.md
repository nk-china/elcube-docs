# 审批流
## 创建审批流

`待完善`

## 控制单据状态

在工作流BPM中，我们可以增加Service Task来控制当前单据的状态，为此，我们默认提供以下集中JavaDelegate来执行程序

- `${NkDocStateChangeJavaDelegate}` 工作流启动时，改变单据状态
- `${NkDocStateUpdateJavaDelegate}` 任务被提交时，需要修改单据状态
- `${NkDocStateUpdateAgainJavaDelegate}` 任务被提交时，需要在同一个进程中第二次修改单据状态

---
#### ${NkDocStateChangeJavaDelegate}

*字段注入：* `state` 目标单据状态

::: tip 
NkDocStateChangeJavaDelegate是一个比较特殊的JavaDelegate，它仅适用在工作流被启动的时候，第一个用户任务或者其他异步任务介入之前。

它的逻辑就是将当前的单据的docState设置为一个值，剩下的工作交还给**DocEngine**
:::


```java
NkDocEngineThreadLocal.getCurr().setDocState(
    (String) state.getValue(delegateExecution)
);
```

---
#### ${NkDocStateUpdateJavaDelegate}

*字段注入：* `state` 目标单据状态

::: tip 
NkDocStateUpdateJavaDelegate是平时使用最多的JavaDelegate，它适用在一个异步的Task（包括User Task）节点之后，
它会获取当前bpm的关联的doc，将doc的docState设置为一个值，在保存doc。因此，它会触发doc完整的update生命周期
:::

```java
docEngine.doUpdate(
        delegateExecution.getBusinessKey(),
        "BPM:"+delegateExecution.getEventName(),
        (doc)-> doc.setDocState((String) state.getValue(delegateExecution))
);
```

---
#### ${NkDocStateUpdateAgainJavaDelegate}

*字段注入：* `state` 目标单据状态

::: tip 
NkDocStateUpdateAgainJavaDelegate 是由于流程自动化的需要而产生的。

我们知道，在**DocEngine**中，单据的修改是会加锁，且在事务提交之前，锁不会被释放，也因此，我们想在一个事务中连续更新单据两次，是达不到的。
因此有了这个JavaDelegate。

UpdateAgainJavaDelegate必须使用在NkDocStateUpdateJavaDelegate之后的Service Task，且他们需要运行在一个事务里。

UpdateAgainJavaDelegate会越过**DocEngine**的锁机制，将被修改过的单据从内存中加载出来，再一次进行修改。
:::

## 确定审批流待办人

#### ${NkAssigneeExecutionListener} 代理人选择监听器

`功能待实现`

#### ${NkCandidateExecutionListener} 候选人选择监听器

`功能待实现`

## 会签

::: tip 关于多实例任务
为什么不用 ExecutionListener ？ 因为会执行 实例数量+1 次事件，暂时找不到判断方法，isMultipleRoot 参数似乎不好用
:::

#### 多实例节点私有变量
- nrOfInstances：          会签中总共的实例数
- nrOfCompletedInstances： 已经完成的实例数量
- nrOfActiviteInstances：  当前活动的实例数量，即还没有完成的实例数量

#### ${NkCountersignatureJavaDelegate} 会签人员选择

选择一个 Service Task 节点，并设置
- Delegate Expression           = ${NkCountersignatureJavaDelegate}
- Other Params                  = 根据实际情况

#### ${NkCountersignatureTaskListener} 会签监听器

这是一个通用的会签结果统计
         
#### 多实例节点配置：
选择一个多实例 User Task 节点，并设置
- Assignee 指定任务人                  = ${userId}
- Collection 指定会签人员集合           = ${NK$COUNTERSIGNATURE_USERS}
- Element Variable 任务人变量          = userId
- Completion Condition 会签结束条件    = ${nrOfInstances == nrOfCompletedInstances}
- Task Listener                      = ${NkCountersignatureTaskListener}
- eventType                         = complete
- pass                              = ${nkFlowId=='Flow_0kz1ipm'}
         
#### 多实例节点后的路径走向判断：
- 通过路线 Expression = ${NK$COUNTERSIGNATURE_PASS_COUNT>=nrOfInstances}
- 否决路线 Expression = ${NK$COUNTERSIGNATURE_PASS_COUNT< nrOfInstances}

