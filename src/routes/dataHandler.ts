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
                const {node: parent} = findNode(nodeList, parseInt(parentID))
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

    updateNode(nodeId: string, name: string) {
        let updatedNode = null;

        nodes.update(nodeList => {
            const {node} = findNode(nodeList, parseInt(nodeId))
            node.name = name
            updatedNode = node

            return nodeList
        })

        return updatedNode
    },

    deleteNode(nodeId: string) {
        nodes.update(nodeList => {
            const {parent, node} = findNode(nodeList, parseInt(nodeId))
            const index = parent.children.indexOf(node)
            parent.children.splice(index, 1)

            return nodeList
        })
    },
}


function findNode(nodeList: Node[], targetID: number): {node: Node, parent: Node | null} | null  {
    for (const node of nodeList) {
        if (node.id === targetID) {
            return {node, parent: null}
        } else if (node.children.length) {
            const childResults = findNode(node.children, targetID)

            if (childResults) {
                return childResults.parent ? childResults : {node: childResults.node, parent: node}
            }
        }
    }
}
