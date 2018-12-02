let input, insert, insertBtn, btnInsert, sort, output;
let nodes = [];
let list = [];
let n;
let scl = 1;

async function setup() {
    var cnv = createCanvas(windowWidth, windowHeight - 30);
    cnv.style('display', 'block');
    cnv.style('margin-left', 0);

    input = createInput();
    btnInsert = createButton('submit');
    btnInsert.style('margin-right', '10px');
    insert = createInput();

    insertBtn = createButton('insert');
    insertBtn.style('margin-right', '10px');

    btnInsert.mousePressed(pressed);
    insertBtn.mousePressed(onInsert);
    sort = createButton('sort');
    sort.mousePressed(() => {
        n = list.length;
        heapsort()
    });
    output = createSpan();
}

async function onInsert() {
    let int = parseInt(insert.value());

    list.push(int);
    await sleep(100);
    nodes.push(new TreeNode(list.length - 1, int));
    await setParents();

}

async function pressed() {
    let ints = input.value();
    ints = ints.split(',');
    nodes = [];
    list = [];
    for (let i = 0; i < ints.length; i++) {
        list.push(parseInt(ints[i]));
        await sleep(100);
        nodes.push(new TreeNode(i, list[i]));
        await setParents();
        await sleep(100);

    }
}

function layers() {
    return Math.log2(list.length) + 1;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight - 30);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    scale(scl);
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i]) {
            nodes[i].update();
            nodes[i].draw();
        } else console.log("lol");
    }

    for (let i = 0; i < list.length; i++) {
        textSize(30);
        textAlign(CENTER);
        stroke(255);
        fill(255);
        text(list[i], 50 * i - width / 2 + 25, 30 - height / 2);
        noFill();
        stroke(255);
        rect(50 * i - width / 2, -height / 2, 50, 50);
    }
}

async function setParents() {
    let n = 0;
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].setParent(nodes[Math.floor((i - 1) / 2)]);
    }
}

async function swap(i, j) {
    let tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;

    tmp = nodes[i];
    nodes[i] = nodes[j];
    nodes[j] = tmp;


    nodes[j].index = j;
    nodes[i].index = i;
    await setParents();
    await sleep(500);

}


async function heapsort() {
    await buildheap();
    await sleep(2000);
    while (n > 1) {
        n--;
        await swap(0, n);
        await downheap(0);
    }
    output.html(list.join(","));
}

async function buildheap() {
    for (let v = n / 2 - 1; v >= 0; v--)
        await downheap(Math.floor(v));
}

async function downheap(v) {
    let w = 2 * v + 1;         // erster Nachfolger von v
    while (w < n) {
        if (w + 1 < n)       // gibt es einen zweiten Nachfolger?
            if (list[w + 1] > list[w]) w++;
        // w ist der Nachfolger von v mit maximaler Markierung

        if (list[v] >= list[w]) return;  // v hat die Heap-Eigenschaft
        // sonst
        await swap(v, w);  // vertausche Markierungen von v und w
        v = w;             // fahre mit v=w fort
        w = 2 * v + 1;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}