import {CollectionOf, Default, Maximum, Minimum, Optional, Property, Required} from "@tsed/schema";
import {Model, ObjectID, Unique} from "@tsed/mongoose";

@Model({
  collection: 'podcast'
})
export class Podcast {
  static collection = 'podcast'
  @ObjectID()
  _id?: string;

  @Required()
  @Unique()
  @Property()
  number: number;

  @Required()
  @Property()
  title: string;

  @Required()
  @Property()
  description: string;

  @Required()
  @Minimum(0)
  @Maximum(2 * 60 * 1000) // 2 hours
  @Property()
  duration: number;

  @Default(new Date().toISOString())
  @Property()
  published?: string;
}