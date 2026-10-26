import { useState } from 'react'
import { CalendarDays, Folder, Hash } from 'lucide-react'

import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { TagBread } from 'weimo-ui-tagtree/components/tag-bread'
import { TagTree, type TagTreeNode } from 'weimo-ui-tagtree/components/tag-tree'
import type { ComponentDefinition } from '../../component-docs'

const writingTreeNode: TagTreeNode = {
  tag: 'writing',
  label: '写作',
  icon: <Folder aria-hidden="true" />,
  children: [
    { tag: 'writing/daily', label: '日记', icon: <CalendarDays aria-hidden="true" /> },
    { tag: 'writing/ideas', label: '灵感' },
  ],
}

const tagTreeDemoNodes: TagTreeNode[] = [
  writingTreeNode,
  {
    tag: 'research',
    label: '研究',
    children: [
      { tag: 'research/papers', label: '论文' },
      { tag: 'research/quotes', label: '摘录' },
    ],
  },
  { tag: 'archive', label: '归档' },
]

function TagTreeDemo() {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined)

  return (
    <ComponentPreviewCard
      className="tag-page__card"
      label="标签树"
    >
      <div className="tag-page__canvas">
        <TagBread tag="文学/古代/诗词" onSelect={() => {}} />
        <div className="tag-page__tree-panel">
          <TagTree
            defaultExpandedTags={['writing', 'research']}
            defaultIcon={<Hash aria-hidden="true" />}
            nodes={tagTreeDemoNodes}
            onMenuAction={() => {}}
            onSelect={setSelectedTag}
            selectedTag={selectedTag}
          />
        </div>
      </div>
    </ComponentPreviewCard>
  )
}

export const tagTreeDefinition = {
  id: 'tag-tree',
  summary: '支持展开、选中和节点操作菜单的层级标签导航',
  status: 'Ready',
  frame: 'plain',
  preview: () => <TagTreeDemo />,
} satisfies ComponentDefinition
