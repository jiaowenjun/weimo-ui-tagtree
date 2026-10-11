import { useState } from 'react'

import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { TagBread } from 'weimo-ui-tagtree/components/tag-bread'
import { TagBreadItem } from 'weimo-ui-tagtree/components/tag-bread-item'
import type { ComponentDefinition } from '../../component-docs'
import { ComponentCardTitle } from '../../component-card-title'

function TagBreadDemo() {
  return (
    <ComponentPreviewCard
      className="tag-page__card"
      label={<ComponentCardTitle componentName="tag-bread">标签面包屑</ComponentCardTitle>}
    >
      <div className="tag-page__canvas">
        <div className="tag-page__bread-preview">
          <TagBread tag="文学/古代/诗词" onSelect={() => {}} />
          <TagBread tag="文学/古代/诗词/唐诗/李白/静夜思" onSelect={() => {}} />
        </div>
      </div>
    </ComponentPreviewCard>
  )
}

function TagBreadItemDemo() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  return (
    <ComponentPreviewCard
      className="tag-page__card"
      label={<ComponentCardTitle componentName="tag-bread-item">标签面包屑项</ComponentCardTitle>}
    >
      <div className="tag-page__canvas">
        <div className="tag-page__bread-preview">
          <div className="tag-page__item-preview">
            <TagBreadItem path="文学" onSelect={setSelectedPath}>
              文学
            </TagBreadItem>
            <span aria-hidden="true">/</span>
            <TagBreadItem path="文学/古代" onSelect={setSelectedPath}>
              古代
            </TagBreadItem>
            <span aria-hidden="true">/</span>
            <TagBreadItem path="文学/古代/诗词" onSelect={setSelectedPath}>
              诗词
            </TagBreadItem>
          </div>
          <p className="tag-page__item-readout">
            {selectedPath
              ? `最近选中:${selectedPath}`
              : '点击任意层级,查看 onSelect 回传的 path'}
          </p>
        </div>
      </div>
    </ComponentPreviewCard>
  )
}

export const tagBreadDefinition = {
  id: 'tag-bread',
  summary: '标签路径字符串驱动的磨砂面包屑导航胶囊',
  status: 'Ready',
  frame: 'plain',
  preview: () => (
    <>
      <TagBreadDemo />
      <TagBreadItemDemo />
    </>
  ),
} satisfies ComponentDefinition
