export class ResMovie {
  readonly id: string;
  readonly title: string;
  readonly description: string;

  constructor(obj: any) {
    this.id = obj?._id;
    this.title = obj?.title;
    this.description = obj?.description;
  }
}
