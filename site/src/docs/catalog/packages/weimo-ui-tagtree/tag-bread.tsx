import { ComponentPreviewCard } from 'weimo-ui-core/components/component-preview-card'
import { TagBread } from 'weimo-ui-tagtree/components/tag-bread'
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

export const tagBreadDefinition = {
  id: 'tag-bread',
  summary: '标签路径字符串驱动的磨砂面包屑导航胶囊',
  status: 'Ready',
  frame: 'plain',
  preview: () => <TagBreadDemo />,
} satisfies ComponentDefinition
