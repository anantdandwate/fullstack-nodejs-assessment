import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ConflictException,
} from "@nestjs/common";
import { Cocktails } from "./cocktails.entity";
import { CocktailsService } from "./cocktails.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { NotFoundException } from "@nestjs/common";

@ApiTags("cocktails")
@Controller("cocktails")
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @ApiOperation({
    summary: "Get all cocktails",
  })
  @ApiResponse({
    status: 200,
    description: "List of cocktails",
  })
  @Get()
  searchCocktails(): Promise<Cocktails[]> {
    return this.cocktailsService.findAll();
  }

  @ApiOperation({
    summary: "Get cocktail by id",
  })
  @ApiResponse({
    status: 200,
    description: "Cocktail found",
  })
  @ApiResponse({
    status: 404,
    description: "Cocktail not found",
  })
  @Get(":id")
  async getCocktail(@Param("id") id: string) {
    const cocktail = await this.cocktailsService.findOne(+id);

    if (!cocktail) {
      throw new NotFoundException("Cocktail not found");
    }

    return cocktail;
  }

  @ApiOperation({
    summary: "Create cocktail",
  })
  @ApiResponse({
    status: 201,
    description: "Cocktail created",
  })
  @Post()
  async newCocktail(@Body() cocktail: Cocktails) {
    try {
      await this.cocktailsService.create(cocktail);
      return cocktail;
    } catch (err) {
      throw new ConflictException("Cocktail title already exists");
    }
  }
}
