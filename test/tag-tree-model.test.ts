import { describe, expect, it } from 'vitest'

import {
  buildVisibleRows,
  collectSelectedAncestorTags,
  toggleExpandedTag,
  type TagTreeNode,
} from '../src/components/tag-tree/tag-tree-model'

const nodes: TagTreeNode[] = [
  {
    tag: 'root',
    children: [
      {
        tag: 'root/child',
        children: [{ tag: 'root/child/leaf' }],
      },
    ],
  },
]

describe('tag tree model', () => {
  it('collects selected ancestors and exposes expanded rows', () => {
    expect([...collectSelectedAncestorTags(nodes, 'root/child/leaf')]).toEqual([
      'root/child',
      'root',
    ])

    expect(
      buildVisibleRows(nodes, new Set(['root', 'root/child']), 'root/child/leaf').map(
        ({ tag, depth, selected }) => ({ tag, depth, selected }),
      ),
    ).toEqual([
      { tag: 'root', depth: 0, selected: false },
      { tag: 'root/child', depth: 1, selected: false },
      { tag: 'root/child/leaf', depth: 2, selected: true },
    ])
  })

  it('toggles an expanded tag without mutating the input', () => {
    const expanded = ['root']

    expect(toggleExpandedTag(expanded, 'root')).toEqual([])
    expect(toggleExpandedTag(expanded, 'other')).toEqual(['root', 'other'])
    expect(expanded).toEqual(['root'])
  })
})
