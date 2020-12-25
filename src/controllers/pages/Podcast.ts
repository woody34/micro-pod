import {BodyParams, Controller, Delete, Get, PathParams, Post, Put, QueryParams} from "@tsed/common";
import { Required, Returns, Status, Summary } from "@tsed/schema";
import { FilterQuery } from "mongoose";
import { Podcast } from "../../models/Podcast";
import { PodcastService } from "../../services/PodcastService";
import StatusCodes from 'http-status-codes'
import { NotFound } from "@tsed/exceptions";

const { OK, CREATED, NO_CONTENT } = StatusCodes

@Controller("/podcast")
export class PodcastController {
  constructor(private service: PodcastService) {}

  @Get("/")
  @Summary("Retrieve all podcast docs")
  @(Returns(OK, Array).Of(Podcast).Description("Success"))
  async getAll(): Promise<Podcast[]> {
    const models = await this.service.query();
    return models
  }

  @Get("/:id")
  @Summary("Retrieve podcast doc by Id")
  @(Status(OK, Podcast).Description("Success"))
  getById(@PathParams("id") id: string) {
    return this.service.findById(id);
  }

  @Post("/query")
  @Summary("Query docs using mongo query")
  @(Status(OK, Podcast).Description("Success"))
  query(@BodyParams() query: FilterQuery<Podcast>) {
    return this.service.query(query);
  }

  @Post("/")
  @Summary("Create new podcast doc")
  @(Returns(CREATED, Podcast).Description("Created"))
  create(
    @BodyParams()
    payload: Podcast
  ) {
    return this.service.upsert(payload);
  }

  @Put("/")
  @Summary("Update a podcast doc")
  @(Returns(CREATED, Podcast).Description("Updated"))
  update(
    @BodyParams()
    @Required()
    payload: Podcast
  ) {
    return this.service.upsert(payload);
  }

  @Delete("/:id")
  @Summary("Delete podcast doc by Id")
  @(Returns(NO_CONTENT).Description("No content"))
  deleteById(@PathParams("id") id: string) {
    return this.service.delete(id);
  }
}
