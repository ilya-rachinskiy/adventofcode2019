
class Graph {
    constructor() {
        this.vertices = {}
        this.edges;
    }
    addVertex(newVertex) {
        this.vertices[newVertex.getKey()] = newVertex;

        return this;
    }
    getVertexByKey(vertexKey) {
        return this.vertices[vertexKey];
    }
    getNeighbors(vertex) {
        return vertex.getNeighbors();
    }
    getAllVertices() {
        return Object.values(this.vertices);
    }

    addEdge(edge) {
        // Try to find and end start vertices.
        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        // Insert start vertex if it wasn't inserted.
        if (!startVertex) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey());
        }

        // Insert end vertex if it wasn't inserted.
        if (!endVertex) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.getKey());
        }

        // Check if edge has been already added.
        if (this.edges[edge.getKey()]) {
            throw new Error('Edge has already been added before');
        } else {
            this.edges[edge.getKey()] = edge;
        }

        // Add edge to the vertices.
        if (this.isDirected) {
            // If graph IS directed then add the edge only to start vertex.
            startVertex.addEdge(edge);
        } else {
            // If graph ISN'T directed then add the edge to both vertices.
            startVertex.addEdge(edge);
            endVertex.addEdge(edge);
        }

        return this;
    }
    findEdge(startVertex, endVertex) {
        const vertex = this.getVertexByKey(startVertex.getKey());

        if (!vertex) {
            return null;
        }

        return vertex.findEdge(endVertex);
    }
}

module.exports = Graph;