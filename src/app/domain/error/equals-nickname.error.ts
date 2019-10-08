export class EqualsNicknameError extends Error{
  constructor(msg: string) {
    super(msg);
    this.name = EqualsNicknameError.name;
  }
}