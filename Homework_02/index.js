import { EventEmitter } from "events";

class Counter extends EventEmitter {
  constructor() {
    super();

    this.currentNumber = 0;

    this.increaseCount = 0;
    this.decreaseCount = 0;
    this.resetCount = 0;
  }

  increase() {
    if (this.currentNumber === 10) {
      this.emit("maxReached");
    } else {
      this.currentNumber++;
      this.increaseCount++;
      this.emit("increase");
      this.emit("change", this.currentNumber);
      this.emitAdditionalEvents();
    }
  }

  decrease() {
    if (this.currentNumber === -10) {
      this.emit("minReached");
    } else {
      this.currentNumber--;
      this.decreaseCount++;
      this.emit("decrease");
      this.emit("change", this.currentNumber);
      this.emitAdditionalEvents();
    }
  }

  emitAdditionalEvents() {
    if (this.currentNumber === 0) {
      this.emit("zero");
    } else if (this.currentNumber > 0) {
      this.emit("positive");
    } else if (this.currentNumber < 0) {
      this.emit("negative");
    }
  }

  reset() {
    this.currentNumber = 0;
    this.emit("reset");
    this.emit("change", this.currentNumber);

    this.resetCount++;
  }

  getStats() {
    this.emit("stats", {
      increases: this.increaseCount,
      decreases: this.decreaseCount,
      resets: this.resetCount,
    });
  }
}

const counter = new Counter();

counter.on("change", (newNumber) => {
  console.log(`Current number: ${newNumber}`);
});

counter.on("positive", () => {
  console.log("The number is now positive!");
});

counter.on("negative", () => {
  console.log("The number is now negative!");
});

counter.on("zero", () => {
  console.log("The number is now zero!");
});

counter.on("increase", () => {
  console.log("The number has increased!");
});

counter.on("decrease", () => {
  console.log("The number has decreased!");
});

counter.on("maxReached", () => {
  console.log("Already at the maximum value.");
});

counter.on("minReached", () => {
  console.log("Already at the minimum value.");
});

counter.on("reset", () => {
  console.log("The counter has been reset.");
});

counter.on("stats", (stats) => {
  console.log(
    `Increased: ${stats.increases} time(s), Decreased: ${stats.decreases} time(s), Reset: ${stats.resets} time(s)`
  );
});

counter.emit("change", counter.currentNumber);

counter.increase();
counter.increase();
counter.decrease();
counter.reset();
counter.getStats();
