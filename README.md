# weimo-ui-tagtree

`weimo-ui-tagtree` 是独立的标签组件包，拥有标签树和标签面包屑。它唯一的 `weimo-ui` 依赖是 `weimo-ui-core`。

`weimo-ui-core` 通过 `git@github.com:jiaowenjun/weimo-ui-core.git` 获取。包通过显式子路径导出组件；包根不提供 `.` 导出。

## 组件入口

| 入口 | 导出 | 职责 |
| --- | --- | --- |
| `components/tag-tree` | `TagTree` | 树形展开、选中和菜单事件编排 |
| `components/tag-tree-row` | `TagTreeRow` | 单行树节点渲染 |
| `components/tag-tree-model` | 模型 API | 树扁平化、展开状态和节点类型 |
| `components/tag-bread` | `TagBread` | 标签路径面包屑 |

`components/coss/*` 是标签组件使用的基础适配入口。完整清单以本包 `package.json#exports` 为准；包根不提供 `.` 导出。

## 使用

```tsx
import { TagBread } from 'weimo-ui-tagtree/components/tag-bread'
import { TagTree } from 'weimo-ui-tagtree/components/tag-tree'
```

应用入口需要加载 core token；组件会导入自身结构样式：

```ts
import 'weimo-ui-core/styles/tokens.css'
```

## 依赖边界

- 只依赖 `weimo-ui-core` 的菜单、胶囊、材质和通用工具。
- `TagTree` 管理受控或非受控展开状态，但不负责路由、持久化和服务端数据加载。
- `TagTreeRow` 是 TagTree 组件族的公开子组件；内部 `useTagTree` 留在组件目录，不单独导出。

## 源码结构

```text
src/
├── components/
│   ├── tag-tree/  # 组件、行、模型与状态 hook
│   ├── tag-bread/ # 标签面包屑
│   └── coss/      # 本包所需的基础适配层
└── css.d.ts       # CSS 模块导入声明
```

## 验证

```bash
pnpm install
pnpm test:typecheck
```

组件的公开入口和依赖边界以本仓库的 `package.json#exports` 为准。
