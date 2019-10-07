export class PlayersSavedModel {
  private readonly pOneExist: boolean;
  private readonly pTwoExist: boolean;

  constructor(pOneExist: boolean, pTwoExist: boolean) {
    this.pOneExist = pOneExist;
    this.pTwoExist = pTwoExist;
  }
  public getPOneExist() {
    return this.pOneExist;
  }

  public getPTwoExist() {
    return this.pTwoExist;
  }
}
