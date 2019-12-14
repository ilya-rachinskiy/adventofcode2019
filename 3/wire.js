class Point {

    constructor(x, y, position) {
        this.x = x;
        this.y = y;
        this.index = position;
    }
    get distance() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    distanceToPoint(p1) {
        return Math.abs((p1.y - this.y)) + Math.abs((p1.x - this.x));
    }
    equals(p1) {
        return p1.x == this.x && p1.y == this.y;
    }

}
const inLine = (p1, p2, p3) => {
    let inX = p1.x > p2.x ? p3.x >= p2.x && p3.x <= p1.x : p3.x <= p2.x && p3.x >= p1.x;
    let inY = p1.y > p2.y ? p3.y >= p2.y && p3.y <= p1.y : p3.y <= p2.y && p3.y >= p1.y;
    return inX && inY;
}
class Wire {
    constructor(path) {

        const getWirePoints = (data) => {

            const wireSteps = data.split(',');
            const coords = [new Point(0, 0, -1)];
            wireSteps.forEach((element, index) => {
                let direction = element.slice(0, 1);
                let distance = parseInt(element.slice(1));
                let previewsCoord = coords[coords.length - 1];

                switch (direction) {
                    case 'L':
                        coords.push(new Point(previewsCoord.x - distance, previewsCoord.y, index))
                        break;
                    case 'U':
                        coords.push(new Point(previewsCoord.x, previewsCoord.y - distance, index))
                        break;
                    case 'R':
                        coords.push(new Point(previewsCoord.x + distance, previewsCoord.y, index))
                        break;
                    case 'D':
                        coords.push(new Point(previewsCoord.x, previewsCoord.y + distance, index))
                        break;
                }
            });
            return coords;

        }

        this._coords = getWirePoints(path)
    }
    async intersection(wire) {
        const w1 = this._coords;
        const w2 = wire._coords;
        let result = [];
        let index1 = 0;
        let index2 = 0;

        while (index1 < w1.length - 1) {

            index2 = 1;
            while (index2 < w2.length - 1) {

                result.push(this.computation(w1[index1], w1[index1 + 1], w2[index2], w2[index2 + 1]));

                index2++;
            }
            index1++;
        }
        return Promise.all(result).then(x => {
            const intersections = x.filter(p => p != null);
            console.log('intersections = ', intersections);
            console.log('closest - ', intersections.map(x => ({ point: x, distance: x.distance })).sort((a, b) => a.distance > b.distance)[0]
            );

            console.log('closest - ', Math.min(...intersections.map(x => (x.distance))));
            //return intersections.map(x => ({ point: x, distance: x.distance })).sort((a, b) => a.distance > b.distance)[0];
            return intersections;
        })
    }
    computation(pointStart1, pointEnd1, pointStart2, pointEnd2) {
        return new Promise((resolve, reject) => {
            resolve(GetIntersectionCoord(pointStart1, pointEnd1, pointStart2, pointEnd2));
        });

    }
}
function GetIntersectionCoord(A, B, C, D) {
    let a1 = Math.abs(B.y - A.y);
    let b1 = Math.abs(A.x - B.x);
    let c1 = a1 * (A.x) + b1 * (A.y);

    // Line CD represented as a2x + b2y = c2  
    let a2 = Math.abs(D.y - C.y);
    let b2 = Math.abs(C.x - D.x);
    let c2 = a2 * (C.x) + b2 * (C.y);

    let determinant = a1 * b2 - a2 * b1;

    if (determinant == 0) {
        return null;
    }
    else {
        let x = (b2 * c1 - b1 * c2) / determinant;
        let y = (a1 * c2 - a2 * c1) / determinant;
        const targetPoint = new Point(x, y, B.index);


        if (inLine(A, B, targetPoint) && inLine(C, D, targetPoint)) {
            return targetPoint;

        } else {
            return null;
        }
    }

}
class MinimizeSignalDelay {
    constructor(wire1, wire2) {
        this.firstWire = wire1;
        this.secondWire = wire2;
    }
    getMinimalDistance() {

    }
    async getBestDistanceToIntersections() {
        let intersectsArray = await this.firstWire.intersection(this.secondWire);
        let result = []
        for (let intersectIndex = 0; intersectIndex < intersectsArray.length; intersectIndex++) {
            let intersects = intersectsArray[intersectIndex];
            const array = [...this.firstWire._coords.filter(x => x.index < intersects.index), intersects]
            let sum = 0;
            for (let index = 0; index < array.length - 1; index++) {

                let d = array[index].distanceToPoint(array[index + 1]);
                sum += d;

            }
            sum;
            result.push({ point: intersects, sum })


        }
        return result;
    }
}

var compute = async (path1, path2) => {
    const wire1 = new Wire(path1);
    const wire2 = new Wire(path2);
    const manager = new MinimizeSignalDelay(wire1, wire2);
    const manager2 = new MinimizeSignalDelay(wire2, wire1);
    const sumArray = await manager.getBestDistanceToIntersections();
    const sum2Array = await manager2.getBestDistanceToIntersections();

   let sum= sum2Array.map(x => {
        let r = sumArray.find(y => y.point.equals(x.point));
        return r.sum+x.sum
    })

    console.log(Math.min(...sum))
 

}
module.exports = { compute }
