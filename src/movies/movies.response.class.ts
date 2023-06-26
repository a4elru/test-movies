export class ResMovie {
  readonly id: string;
  readonly creatorUserId: string;
  readonly title: string;
  readonly description: string;

  constructor(obj: any) {
    this.id = obj?._id;
    this.creatorUserId = obj?.creatorUserId;
    this.title = obj?.title;
    this.description = obj?.description;
  }
}
