class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get distance() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
}
const getWirePoints = (data) => {

    const wireSteps = data.split(',');
    const coords = [new Point(0, 0)];
    wireSteps.forEach(element => {
        let direction = element.slice(0, 1);
        let distance = parseInt(element.slice(1));
        let previewsCoord = coords[coords.length - 1];

        switch (direction) {
            case 'L':
                // console.log('GOING LEFT')
                coords.push(new Point(previewsCoord.x - distance, previewsCoord.y))
                break;
            case 'U':
                // console.log('GOING UP')
                coords.push(new Point(previewsCoord.x, previewsCoord.y - distance))
                break;

            case 'R':
                // console.log('GOING RIGHT')
                coords.push(new Point(previewsCoord.x + distance, previewsCoord.y))
                break;
            case 'D':
                // console.log('GOING DOWN')
                coords.push(new Point(previewsCoord.x, previewsCoord.y + distance))
                break;

        }



    });
    return coords;

}

let w1 = getWirePoints(wire1);
let w2 = getWirePoints(wire2);
console.log(w1)
console.log(w2)
let result = [];
let index1 = 0;
let index2 = 0;

while (index1 < w1.length - 1) {

    index2 = 1;
    while (index2 < w2.length - 1) {
        result.push(computation(w1[index1], w1[index1 + 1], w2[index2], w2[index2 + 1]));
        index2++;
    }
    index1++;
}
Promise.all(result).then(x => {
    const intersections = x.filter(p => p != null);
    console.log('intersections = ', intersections);
    console.log('closest - ', Math.min(...intersections.map(x => (x.distance))));
})



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
        const inLine = (p1, p2) => {
            let inX = p1.x > p2.x ? x >= p2.x && x <= p1.x : x <= p2.x && x >= p1.x;
            let inY = p1.y > p2.y ? y >= p2.y && y <= p1.y : y <= p2.y && y >= p1.y;
            return inX && inY;
        }

        if (inLine(A, B) && inLine(C, D)) {
            return new Point(x, y);

        } else {
            return null;
        }
    }

}


function computation(x1, y1, x2, y2) {
    return new Promise((resolve, reject) => {
        resolve(GetIntersectionCoord(x1, y1, x2, y2));
    });

}
