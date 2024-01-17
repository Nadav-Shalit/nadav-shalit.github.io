class Arena {
  _arenaStaus = {};
  constructor(rows, chairs) {
    this.rows = rows;
    this.chairs = chairs > 23 ? 22 : chairs;
    this.initAvailabeCapacty();
  }

  // Getter
  get getArenaSataus() {
    return this._arenaStaus;
  }
  get getArenaAvailabeCapacty() {
    return this.calcArena();
  }

  //Setter
  set saveChair(chairId) {
    console.log({ chairId });
    const [c, row, chair] = chairId.split("-");
    this._arenaStaus[row][chair] = "X";
    console.log(this._arenaStaus);
  }
  // Method
  initAvailabeCapacty() {
    for (let rowIdx = 1; rowIdx <= this.rows; rowIdx++) {
      this._arenaStaus[rowIdx] = {};
      for (let chairIdx = 1; chairIdx <= this.chairs; chairIdx++) {
        this._arenaStaus[rowIdx][chairIdx] = "O";
      }
      console.log("this._arenaStaus[rowIdx]", this._arenaStaus[rowIdx]);
    }
    console.log({ arenaStaus: this._arenaStaus });
  }
}
