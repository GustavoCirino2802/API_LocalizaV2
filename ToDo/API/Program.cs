using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapGet("/", () => "Projeto API_LocalizaV2!");

app.MapPost("/api/usuario/cadastrar", ([FromBody] Usuario usuario,  
    [FromServices] AppDataContext ctx) =>
{
    ctx.Usuarios.Add(usuario);
    ctx.SaveChanges();
    return Results.Created("", usuario);
}); 

app.MapPost("/api/veiculo/cadastrar", ([FromBody] Veiculo veiculo,  
    [FromServices] AppDataContext ctx) =>
{
    ctx.Veiculos.Add(veiculo);
    ctx.SaveChanges();
    return Results.Created("", veiculo);
}); 

 //////////////////////// DIVISÃO CADASTRO /////////////////////////

app.MapGet("/api/usuario/buscar/{cpf}", ([FromRoute] string cpf,  
    [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.Find(cpf);
    if(usuario is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(usuario);
}); 

app.MapGet("/api/veiculo/buscar/{placa}", ([FromRoute] string placa,  
    [FromServices] AppDataContext ctx) =>
{
    Veiculo? veiculo = ctx.Veiculos.Find(placa);
    if(veiculo is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(veiculo);
}); 

//////////////////////// DIVISÃO BUSCAR /////////////////////////


app.MapGet("/api/usuario/listar", ([FromServices] AppDataContext ctx) =>
{
    if(ctx.Usuarios.Any())
    {
        return Results.Ok(ctx.Usuarios.ToList());
    }
    return Results.NotFound();
}); 

app.MapGet("/api/veiculo/listar", ([FromServices] AppDataContext ctx) =>
{
    if(ctx.Veiculos.Any())
    {
        return Results.Ok(ctx.Veiculos.ToList());
    }
    return Results.NotFound();
}); 

//////////////////////// DIVISÃO LISTAR /////////////////////////

app.MapDelete("/api/usuario/deletar/{cpf}", ([FromRoute] string cpf,  
    [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.Find(cpf);
    if(usuario is null)
    {
        return Results.NotFound();
    }
    ctx.Usuarios.Remove(usuario);
    ctx.SaveChanges();
    return Results.Ok(usuario);
}); 

app.MapDelete("/api/veiculo/deletar/{placa}", ([FromRoute] string placa,  
    [FromServices] AppDataContext ctx) =>
{
    Veiculo? veiculo = ctx.Veiculos.Find(placa);
    if(veiculo is null)
    {
        return Results.NotFound();
    }
    ctx.Veiculos.Remove(veiculo);
    ctx.SaveChanges();
    return Results.Ok(veiculo);
}); 


//////////////////////// DIVISÃO DELETAR /////////////////////////


app.MapPut("/api/usuario/alterar/{cpf}", ([FromRoute] string cpf, 
    [FromBody] Usuario usuarioAlterado,  
    [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.Find(cpf);
    if(usuario is null)
    {
        return Results.NotFound();
    }
    usuario.NomeCompleto = usuarioAlterado.NomeCompleto;
    usuario.Celular = usuarioAlterado.Celular;
    usuario.Email = usuarioAlterado.Email;
    usuario.Senha = usuarioAlterado.Senha;
    
    ctx.Usuarios.Update(usuario);
    ctx.SaveChanges();
    return Results.Ok(usuario);
}); 

app.MapPut("/api/veiculo/alterar/{placa}", ([FromRoute] string placa, 
    [FromBody] Veiculo veiculoAlterado,  
    [FromServices] AppDataContext ctx) =>
{
    Veiculo? veiculo = ctx.Veiculos.Find(placa);
    if(veiculo is null)
    {
        return Results.NotFound();
    }
    veiculo.Modelo = veiculoAlterado.Modelo;
    veiculo.Marca = veiculoAlterado.Marca;
    veiculo.Ano = veiculoAlterado.Ano;
    
    ctx.Veiculos.Update(veiculo);
    ctx.SaveChanges();
    return Results.Ok(veiculo);
}); 

app.Run();
