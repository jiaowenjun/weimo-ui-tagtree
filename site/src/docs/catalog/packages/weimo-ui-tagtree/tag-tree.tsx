import { useState } from 'react'
import { CalendarDays, Folder, Hash } from 'lucide-react'

import { TagBread } from 'weimo-ui-tagtree/components/tag-bread'
import { TagTree, type TagTreeNode } from 'weimo-ui-tagtree/components/tag-tree'
import type { ComponentDefinition } from '../../component-docs'

/* 演示数据用中文路径(tag 即层级路径),面包屑分段与树节点标签同源,
 * 选中态才能在两个组件间双向同步 */
const tagTreeDemoNodes: TagTreeNode[] = [
  {
    tag: '写作',
    label: '写作',
    icon: <Folder aria-hidden="true" />,
    children: [
      {
        tag: '写作/日记',
        label: '日记',
        icon: <CalendarDays aria-hidden="true" />,
        children: [
          { tag: '写作/日记/晨间', label: '晨间' },
          { tag: '写作/日记/夜读', label: '夜读' },
        ],
      },
      { tag: '写作/灵感', label: '灵感' },
    ],
  },
  {
    tag: '研究',
    label: '研究',
    children: [
      {
        tag: '研究/论文',
        label: '论文',
        children: [
          { tag: '研究/论文/已发表', label: '已发表' },
          { tag: '研究/论文/草稿', label: '草稿' },
        ],
      },
      { tag: '研究/摘录', label: '摘录' },
    ],
  },
  { tag: '归档', label: '归档' },
]

function TagTreeDemo() {
  const [selectedTag, setSelectedTag] = useState('写作/日记')

  return (
    <div className="tag-page__canvas">
      <TagBread tag={selectedTag} onSelect={setSelectedTag} />
      <div className="tag-page__tree-panel">
        <TagTree
          defaultExpandedTags={['写作', '研究']}
          defaultIcon={<Hash aria-hidden="true" />}
          nodes={tagTreeDemoNodes}
          onMenuAction={() => {}}
          onSelect={setSelectedTag}
          selectedTag={selectedTag}
        />
      </div>
    </div>
  )
}

export const tagTreeDefinition = {
  id: 'tag-tree',
  summary: '支持展开、选中和节点操作菜单的层级标签导航',
  status: 'Ready',
  frame: 'plain',
  preview: () => <TagTreeDemo />,
} satisfies ComponentDefinition
