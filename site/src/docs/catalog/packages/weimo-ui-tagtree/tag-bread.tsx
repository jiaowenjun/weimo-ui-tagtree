import { ChevronRight, RotateCcw } from 'lucide-react'
import { useState } from 'react'

import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { GhostIconButton } from 'weimo-ui-core/components/ghost-icon-button'
import { TextButton } from 'weimo-ui-core/components/text-button'
import { TagBread } from 'weimo-ui-tagtree/components/tag-bread'
import type { ComponentDefinition } from '../../component-docs'

const pathOptions = [
  '产品/设计系统/组件/导航/标签面包屑',
  '知识库/前端/React/组件设计',
  '项目/Weimo UI/标签',
] as const

function TagBreadDemo() {
  const [tag, setTag] = useState<string>(pathOptions[0])

  return (
    <div className="docs-page">
      <header className="docs-page__intro">
        <p className="docs-page__eyebrow">weimo-ui-tagtree/components/tag-bread</p>
        <h1>标签面包屑</h1>
        <p>把斜杠分隔的标签路径渲染为磨砂胶囊；层级过多时自动折叠，并通过菜单访问中间路径。</p>
      </header>

      <div className="docs-page__grid">
        <ComponentPreviewCard
          action={
            <GhostIconButton
              aria-label="恢复完整路径"
              onClick={() => setTag(pathOptions[0])}
              size="sm"
            >
              <RotateCcw aria-hidden="true" />
            </GhostIconButton>
          }
          className="tagtree-preview-card tagtree-preview-card--compact"
          label="交互路径"
          footer={
            <div className="docs-card-footer">
              <span className="docs-card-footer__result">当前路径：{tag}</span>
              {pathOptions.map((path, index) => (
                <TextButton key={path} onClick={() => setTag(path)} variant="ghost">
                  示例 {index + 1}
                </TextButton>
              ))}
            </div>
          }
        >
          <div className="tagtree-preview-canvas">
            <div className="tag-bread-preview">
              <div className="tag-bread-preview__viewport">
                <TagBread maxVisible={4} onSelect={setTag} tag={tag} />
              </div>
            </div>
          </div>
        </ComponentPreviewCard>

        <ComponentPreviewCard
          className="tagtree-preview-card tagtree-preview-card--compact"
          label="自定义分隔符"
        >
          <div className="tagtree-preview-canvas">
            <div className="tag-bread-preview">
              <div className="tag-bread-preview__viewport">
                <TagBread
                  maxVisible={3}
                  separator={<ChevronRight aria-hidden="true" />}
                  tag="工作区/组件库/标签/导航/当前标签"
                />
              </div>
            </div>
          </div>
        </ComponentPreviewCard>
      </div>
    </div>
  )
}

export const tagBreadDefinition = {
  id: 'tag-bread',
  summary: '标签路径字符串驱动的磨砂面包屑导航胶囊',
  status: 'Ready',
  frame: 'plain',
  searchAliases: ['TagBread', 'Breadcrumb', '标签路径', '标签面包屑', '面包屑'],
  preview: () => <TagBreadDemo />,
} satisfies ComponentDefinition
