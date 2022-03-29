import type { DataHandler, Node } from "../lib/types"
import { nodes, selectedNode } from "../lib/stores"

import { get } from "svelte/store"

export const dataHandler: DataHandler = {

    getNodes(): Node[] {
        return get(nodes)
    },

    createNode(name: string, parentID?: string) {
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

        selectedNode.update(oldNode => node)

        return get(selectedNode)
    },

    updateNode(node: Node) {
        return node
    },

    deleteNode(node: Node) {
        return node
    },
}


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
