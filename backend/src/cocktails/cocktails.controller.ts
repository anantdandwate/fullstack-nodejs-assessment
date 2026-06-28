import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { Cocktails } from "./cocktails.entity";
import { CocktailsService } from "./cocktails.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("cocktails")
@Controller("cocktails")
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Get()
  searchCocktails(): Promise<Cocktails[]> {
    return this.cocktailsService.findAll();
  }
  @Get(":id")
  getCocktail(@Param("id") id: string) {
    return this.cocktailsService.findOne(+id);
  }

  @Post()
  async newCocktail(@Body() cocktail: Cocktails) {
    console.log("info: creating cocktail", cocktail);
    const res = await this.cocktailsService.create(cocktail);
    console.log("res", res);
    return cocktail;
  }
}
