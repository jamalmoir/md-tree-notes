import type { Node } from "./types"
import { get } from "svelte/store"
import { nodes } from "./stores"

export const dataHandler = {
    core: {
        'getNodes': getNodes,
        'createNode': createNode,
        'updateNode': updateNode,
        'deleteNode': deleteNode,
    },

    plugins: {},

    register(name, func) {
        this.plugins[name] = func
    },

    execute(name, ...args) {
        const func = this.plugins[name] || this.core[name]
        func(...args)
    },
}


function getNodes(): Node[] {
    return get(nodes)
}


function createNode(name: string, parentID?: string) {
    const node: Node = {
        id: Math.floor(Math.random() * (999999999 - 1) + 1),
        name: name,
        position: 1,
        colour: 'red',
        tags: [],
        children: [],
        markdown: '',
    }
    nodes.update(nodeList => {
        if (parentID) {
            const parent = findNode(nodeList, parseInt(parentID))
            const pos = parent.children.length + 1
            node.position = pos
            parent.children.push(node)
        } else {
            const pos = nodeList.length + 1
            node.position = pos
            nodeList.push(node)
        }
        return nodeList
    })
}


function updateNode(node: Node) {}


function deleteNode(node: Node) {}


function findNode(nodeList: Node[], targetID: number): Node | null {
    for (const node of nodeList) {
        if (node.id === targetID) {
            return node
        } else if (node.children.length) {
            const childResults = findNode(node.children, targetID)

            if (childResults) {
                return childResults
            }
        }
    }
}
