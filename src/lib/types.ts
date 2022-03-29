export type Node = {
    id: number
    name: string
    position: number
    colour: string
    tags: string[]
    children: Node[]
    markdown: string
}

export type DataHandler = {
    getNodes(): Node[]
    createNode(name: string, parentId?: string): Node
    updateNode(nodeId: string, name: string): Node
    deleteNode(nodeId: string): void
}