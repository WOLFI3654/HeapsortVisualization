function TreeNode(index, value) {

    this.position = function () {
        let i;
        let n = 0;
        let node = this.index;

        // number of row
        for (i = 0; node >= n; i++) {
            n += Math.pow(2, i);
        }
        n -= Math.pow(2, i - 1); // correction

        // number of column
        let j = node - n + 1;
        j = 1 + (j - 1) * 2; // recalculated

        return {
            x: (j / Math.pow(2, i) * this.spacing * layers()), y: i * this.spacing
        }
    };

    this.index = index;
    this.value = value;
    this.spacing = 100;
    this.x = 0;
    this.y = 0;
    this.w = 50;
    this.h = 50;
    this.parent = null;
    this.setParent = function (parent) {
        if (parent === this) parent = undefined;
        this.parent = parent;
    };


    this.draw = function () {
        push();
        textSize(30);
        textAlign(CENTER);
        stroke(255);
        fill(200);
        ellipse(this.x, this.y, this.w, this.h);
        fill(255);

        text(this.value, this.x, this.y);
        stroke(255);
        if (this.parent) line(this.parent.x, this.parent.y, this.x, this.y);
        pop();

    };

    this.update = function () {
        let pos = this.position();
        this.x = lerp(this.x, pos.x - width / 4, 0.1);
        this.y = lerp(this.y, pos.y - height / 4, 0.1);
    }
}
