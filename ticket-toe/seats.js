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
  set soldChair(chairId) {
    const [c, row, chair] = chairId.split("-");
    this._arenaStaus[row][chair] = "X";
  }
  set markChair(chairId) {
    const [c, row, chair] = chairId.split("-");
    this._arenaStaus[row][chair] = "S";
  }
  set unMarkChair(chairId) {
    const [c, row, chair] = chairId.split("-");
    this._arenaStaus[row][chair] = "O";
  }
  validSelect() {
    let flag = false;
    Object.entries(this._arenaStaus).map((row) => {
      const [rowNum, chairs] = row;
      if (Object.values(chairs).includes("S")) {
        const soldChairs = this.getRowStatus(chairs, "X");
        const avialbelChairs = this.getRowStatus(chairs, "O");
        const savedChairs = this.getRowStatus(chairs, "S");

        console.log({
          rowNum,
          rowLen: this.chairs,
          chairs,
          soldChairs,
          savedChairs,
          avialbelChairs,
        });
      }
    });
    return flag;
  }
  getRowStatus(chairs, status = null) {
    return Object.keys(chairs).filter((el) => {
      if (status) {
        if (status === chairs[el]) return el;
      }
    });
  }

  calcArena() {
    const capacity = this.rows * this.chairs;
    let availablesChairs = 0;
    let soldChairs = 0;
    let savedChairs = 0;

    Object.entries(this._arenaStaus).map((row) => {
      const [rowNum, chairs] = row;
      availablesChairs += this.getRowStatus(chairs, "O").length;
      soldChairs += this.getRowStatus(chairs, "X").length;
      savedChairs += this.getRowStatus(chairs, "S").length;
    });
    // console.log({ availablesChairs, soldChairs, savedChairs });
    const capacityPct = Math.floor((1 - availablesChairs / capacity) * 100);
    return { capacity, availablesChairs, soldChairs, savedChairs, capacityPct };
  }
  // Method
  initAvailabeCapacty() {
    for (let rowIdx = 1; rowIdx <= this.rows; rowIdx++) {
      this._arenaStaus[rowIdx] = {};
      for (let chairIdx = 1; chairIdx <= this.chairs; chairIdx++) {
        this._arenaStaus[rowIdx][chairIdx] = "O";
      }
    }
  }
}
