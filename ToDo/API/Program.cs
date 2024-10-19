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

app.MapGet("/api/usuario/listar", ([FromServices] AppDataContext ctx) =>
{
    if(ctx.Usuarios.Any())
    {
        return Results.Ok(ctx.Usuarios.ToList());
    }
    return Results.NotFound();
}); 

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

app.Run();
