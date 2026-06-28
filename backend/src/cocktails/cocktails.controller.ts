import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { Cocktails } from "./cocktails.entity";
import { CocktailsService } from "./cocktails.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

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
  getCocktail(@Param("id") id: string) {
    return this.cocktailsService.findOne(+id);
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
    console.log("info: creating cocktail", cocktail);
    const res = await this.cocktailsService.create(cocktail);
    console.log("res", res);
    return cocktail;
  }
}
