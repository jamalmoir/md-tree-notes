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
    updateNode(node: Node): Node
    deleteNode(node: Node): Node
}