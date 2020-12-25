import { Inject, Service} from "@tsed/common";
import { InternalServerError, NotFound } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { FilterQuery, MongooseQueryOptions, QueryOptions } from "mongoose";
import { Podcast } from "../models/Podcast";

@Service()
export class PodcastService {
    @Inject(Podcast)
    private Podcast: MongooseModel<Podcast>;

    async findById(id: string): Promise<Podcast | null> {
        try {
            const podcast = await this.Podcast.findById(id).exec();

            if (!podcast) {
                throw new NotFound(`Podcast with Id '${id}' not found`);
            }
    
            return podcast;
        } catch (e) {
            throw new InternalServerError(e.message || `Error finding podcast '${id}'` )
        }
    }

    async upsert(podcast: Podcast): Promise<Podcast> {
        try {
            const model = new this.Podcast(podcast);

            const options: QueryOptions = { upsert: true };
    
            if (podcast._id) {
                await model.updateOne(podcast, options);
            } else {
                await model.save()
            }
    
            return model;
        } catch (e) {
            throw new InternalServerError(e.message || `Error saving podcast` )
        }
    }

    async query(options:  FilterQuery<Podcast> = {}): Promise<Podcast[]> {
        try {
            const podcast = await this.Podcast.find(options)
            return podcast;
        } catch (e) {
            console.log(e)
            throw new InternalServerError(e.message || `Error querying for podcast` )
        }
    }

    async delete(_id: string) {
        try {
            const filter: FilterQuery<Podcast> = { _id };
            await this.Podcast.deleteOne(filter).exec();
        } catch (e) {
            throw new InternalServerError(e.message || `Error deleting podcast '${_id}'` )
        }
    }
}