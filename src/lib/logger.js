export default class Logger {
  constructor(target, field, indicator = ">") {
    this.target = target;
    this.field = field;
    this.indicator = indicator;
    this.type = "normal";
    this.message = "";
  }

  setField(value) {
    this.field = value;
    return this;
  }

  setType(value) {
    this.type = value;
    return this;
  }

  setMessage(value, returnThis = true) {
    this.message = `[${this.target}] ${this.indicator} [${this.field}] ${value}`;
    if (returnThis) return this;
    return this.message;
  }

  log() {
    let printCommand;
    switch (this.type) {
      case "normal":
        printCommand = console.log();
        break;
      case "error":
        printCommand = console.error();
        break;
    }
    printCommand(this.message);
  }
}
