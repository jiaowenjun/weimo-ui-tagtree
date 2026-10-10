import { useState } from 'react'
import { CalendarDays, Folder, Hash } from 'lucide-react'

import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import {
  TagTree,
  type TagTreeNode,
  type TagTreeVariant,
} from 'weimo-ui-tagtree/components/tag-tree'
import {
  buildVisibleRows,
  toggleExpandedTag,
  type VisibleTagTreeRow,
} from 'weimo-ui-tagtree/components/tag-tree-model'
import { TagTreeRow } from 'weimo-ui-tagtree/components/tag-tree-row'
import type { ComponentDefinition } from '../../component-docs'
import { ComponentCardTitle } from '../../component-card-title'

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

function TagTreeDemo({ variant = 'default' }: { variant?: TagTreeVariant }) {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined)

  return (
    <ComponentPreviewCard
      className="tag-page__card"
      label={
        <ComponentCardTitle componentName="tag-tree">
          {variant === 'default' ? '标签树' : '无操作标签树'}
        </ComponentCardTitle>
      }
    >
      <div className="tag-page__canvas">
        <div className="tag-page__tree-panel">
          <TagTree
            defaultExpandedTags={['writing', 'research']}
            defaultIcon={<Hash aria-hidden="true" />}
            nodes={tagTreeDemoNodes}
            onMenuAction={variant === 'default' ? () => {} : undefined}
            onSelect={setSelectedTag}
            selectedTag={selectedTag}
            variant={variant}
          />
        </div>
      </div>
    </ComponentPreviewCard>
  )
}

const tagTreeRowDemoNodes: TagTreeNode[] = [writingTreeNode]

function TagTreeRowDemo() {
  const [expandedTags, setExpandedTags] = useState(['writing'])
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined)
  const renderedRows = buildVisibleRows(
    tagTreeRowDemoNodes,
    new Set(expandedTags),
    selectedTag,
  )

  function handleSelect(row: VisibleTagTreeRow) {
    setSelectedTag(row.tag)
    if (row.hasChildren && !row.expanded) {
      setExpandedTags((currentTags) => toggleExpandedTag(currentTags, row.tag))
    }
  }

  function handleToggle(row: VisibleTagTreeRow) {
    setExpandedTags((currentTags) => toggleExpandedTag(currentTags, row.tag))
  }

  return (
    <ComponentPreviewCard
      align="center"
      className="tag-page__card"
      label={<ComponentCardTitle componentName="tag-tree-row">标签树行</ComponentCardTitle>}
    >
      <div className="tag-page__canvas">
        <div className="tag-page__tree-panel">
          <div aria-label="TagTreeRow preview" className="tag-tree" role="tree">
            <div className="tag-tree__list">
              {renderedRows.map((row) => (
                <TagTreeRow
                  key={row.tag}
                  onMenuAction={() => {}}
                  onSelect={handleSelect}
                  onToggle={handleToggle}
                  row={row}
                  rowMenuEnabled={row.tag !== 'writing/ideas'}
                  variant={row.tag === 'writing/ideas' ? 'no-action' : 'default'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComponentPreviewCard>
  )
}

function TagTreePageDemo() {
  return (
    <>
      <TagTreeRowDemo />
      <TagTreeDemo />
      <TagTreeDemo variant="no-action" />
    </>
  )
}

export const tagTreeDefinition = {
  id: 'tag-tree',
  summary: '支持展开、选中和节点操作菜单的层级标签导航',
  status: 'Ready',
  frame: 'plain',
  preview: () => <TagTreePageDemo />,
} satisfies ComponentDefinition
