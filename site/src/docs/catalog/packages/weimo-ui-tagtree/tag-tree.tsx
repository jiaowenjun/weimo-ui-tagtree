import { FolderTree } from 'lucide-react'
import { useState } from 'react'

import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { LabeledSwitch } from 'weimo-ui-core/components/labeled-switch'
import { TagTree, type TagTreeNode } from 'weimo-ui-tagtree/components/tag-tree'
import type { ComponentDefinition } from '../../component-docs'

const nodes: TagTreeNode[] = [
  {
    tag: '产品',
    children: [
      { tag: '产品/设计系统' },
      {
        tag: '产品/功能',
        children: [
          { tag: '产品/功能/标签' },
          { tag: '产品/功能/搜索' },
        ],
      },
    ],
  },
  {
    tag: '工程',
    children: [
      { tag: '工程/前端' },
      { tag: '工程/后端' },
    ],
  },
  { tag: '归档', menuEnabled: false },
]

function TagTreeDemo() {
  const [selectedTag, setSelectedTag] = useState('产品/功能/标签')
  const [showActions, setShowActions] = useState(true)
  const [lastAction, setLastAction] = useState('尚未执行节点操作')

  return (
    <div className="docs-page">
      <header className="docs-page__intro">
        <p className="docs-page__eyebrow">weimo-ui-tagtree/components/tag-tree</p>
        <h1>标签树</h1>
        <p>支持层级展开、选中祖先自动展开、行级操作菜单，以及受控或非受控的展开状态。</p>
      </header>

      <div className="docs-page__grid">
        <ComponentPreviewCard
          action={
            <LabeledSwitch
              ariaLabel="显示节点操作"
              checked={showActions}
              labelOff="纯导航"
              labelOn="带操作"
              onCheckedChange={setShowActions}
            />
          }
          className="tagtree-preview-card"
          label="交互标签树"
          footer={
            <div className="docs-card-footer">
              <span className="docs-card-footer__result">已选择：{selectedTag}</span>
              <span className="docs-card-footer__result">{lastAction}</span>
            </div>
          }
        >
          <div className="tagtree-preview-canvas">
            <div className="tagtree-preview-panel">
              <TagTree
                defaultExpandedTags={['产品', '产品/功能']}
                nodes={nodes}
                onMenuAction={(action, tag) => setLastAction(`${action}：${tag}`)}
                onSelect={(tag) => setSelectedTag(tag)}
                selectedTag={selectedTag}
                variant={showActions ? 'default' : 'no-action'}
              />
            </div>
          </div>
        </ComponentPreviewCard>

        <ComponentPreviewCard
          className="tagtree-preview-card tagtree-preview-card--compact"
          label="空状态与默认图标"
        >
          <div className="tagtree-preview-canvas">
            <div className="tagtree-preview-panel">
              <TagTree
                defaultIcon={<FolderTree aria-hidden="true" />}
                emptyLabel="暂无可用标签"
                nodes={[]}
                variant="no-action"
              />
            </div>
          </div>
        </ComponentPreviewCard>
      </div>
    </div>
  )
}

export const tagTreeDefinition = {
  id: 'tag-tree',
  summary: '支持展开、选中和节点操作菜单的层级标签导航',
  status: 'Ready',
  frame: 'plain',
  searchAliases: ['TagTree', 'TagTreeRow', 'TagTreeModel', '标签树', '标签树行'],
  preview: () => <TagTreeDemo />,
} satisfies ComponentDefinition
