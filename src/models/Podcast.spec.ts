import {MongooseModel} from "@tsed/mongoose";
import {TestMongooseContext} from "@tsed/testing-mongoose";
import { Podcast } from "./Podcast";

describe("Podcast", () => {
    let model: MongooseModel<Podcast>;
    beforeAll(TestMongooseContext.create);
    afterAll(TestMongooseContext.reset);
    beforeEach(() => {
        model = TestMongooseContext.get<MongooseModel<Podcast>>(Podcast);
    })

    const data: Podcast = {
        number: 0,
        title: 'Test Title',
        description: 'Some Test Description',
        duration: 120000,
    }
  
    it("create", async () => {
        const podcast = new model(data);
        await podcast.save();
        expect(podcast._id).toBeDefined();
        expect(podcast.published).toBeDefined();
        expect(podcast.number).toBe(data.number);
        expect(podcast.title).toBe(data.title);
        expect(podcast.description).toBe(data.description);
        expect(podcast.duration).toBe(data.duration);
    });

    it("read", async () => {
        const [podcast] = await model.find({ number: data.number });
        expect(podcast._id).toBeDefined();
        expect(podcast.published).toBeDefined();
        expect(podcast.number).toBe(data.number);
        expect(podcast.title).toBe(data.title);
        expect(podcast.description).toBe(data.description);
        expect(podcast.duration).toBe(data.duration);
    });

    it("update", async () => {
        const updatedData: Podcast = {
            number: 0,
            title: 'Updated Test Title',
            description: 'Some Test Description',
            duration: 120000,
        }
        const podcast = new model(updatedData);
        await podcast.update(updatedData)
        expect(podcast._id).toBeDefined();
        expect(podcast.published).toBeDefined();
        expect(podcast.number).toBe(updatedData.number);
        expect(podcast.title).toBe(updatedData.title);
        expect(podcast.description).toBe(updatedData.description);
        expect(podcast.duration).toBe(updatedData.duration);
    });

    it("delete", async () => {
        const [podcast] = await model.find({ number: data.number });
        await podcast.delete();
        const results = await model.find({ number: data.number });
        expect(results).toStrictEqual([]);
    });
  });