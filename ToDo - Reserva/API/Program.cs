using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapGet("/", () => "Projeto API_LocalizaV2!");

//////////////////////// CADASTRO DE USUÁRIOS /////////////////////////

app.MapPost("/api/usuario/cadastrar", ([FromBody] Usuario usuario,  
    [FromServices] AppDataContext ctx) =>
{
    ctx.Usuarios.Add(usuario);
    ctx.SaveChanges();
    return Results.Created("", usuario);
}); 

//////////////////////// CADASTRO DE VEÍCULOS /////////////////////////

app.MapPost("/api/veiculo/cadastrar", ([FromBody] Veiculo veiculo,  
    [FromServices] AppDataContext ctx) =>
{
    ctx.Veiculos.Add(veiculo);
    ctx.SaveChanges();
    return Results.Created("", veiculo);
}); 

//////////////////////// CADASTRO DE RESERVAS /////////////////////////

app.MapPost("/api/reserva/cadastrar", ([FromBody] Reserva reserva,  
    [FromServices] AppDataContext ctx) =>
{
    var veiculo = ctx.Veiculos.Find(reserva.Placa);
    if (veiculo is null || veiculo.Disponivel == "NÃO")
    {
        return Results.BadRequest("Veículo não disponível para reserva.");
    }

    ctx.Reservas.Add(reserva);
    veiculo.Disponivel = "NÃO"; // Atualiza o status do veículo para NÃO disponível
    ctx.SaveChanges();
    return Results.Created("", reserva);
}); 

//////////////////////// BUSCAR USUÁRIO /////////////////////////

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

//////////////////////// BUSCAR VEÍCULO /////////////////////////

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

//////////////////////// LISTAR USUÁRIOS /////////////////////////

app.MapGet("/api/usuario/listar", ([FromServices] AppDataContext ctx) =>
{
    if(ctx.Usuarios.Any())
    {
        return Results.Ok(ctx.Usuarios.ToList());
    }
    return Results.NotFound();
}); 

//////////////////////// LISTAR VEÍCULOS /////////////////////////

app.MapGet("/api/veiculo/listar", ([FromServices] AppDataContext ctx) =>
{
    if(ctx.Veiculos.Any())
    {
        return Results.Ok(ctx.Veiculos.ToList());
    }
    return Results.NotFound();
}); 

//////////////////////// LISTAR RESERVAS /////////////////////////

app.MapGet("/api/reserva/listar", ([FromServices] AppDataContext ctx) =>
{
    if(ctx.Reservas.Any())
    {
        return Results.Ok(ctx.Reservas.ToList());
    }
    return Results.NotFound();
}); 
//////////////////////// LISTAR VEÍCULOS DISPONÍVEIS /////////////////////////

app.MapGet("/api/veiculo/listardisponiveis", ([FromServices] AppDataContext ctx) =>
{
    var veiculosDisponiveis = ctx.Veiculos.Where(v => v.Disponivel == "SIM").ToList();
    
    if (veiculosDisponiveis.Any())
    {
        return Results.Ok(veiculosDisponiveis);
    }
    return Results.NotFound("Nenhum veículo disponível para reserva.");
});


//////////////////////// CANCELAR RESERVA /////////////////////////

app.MapDelete("/api/reserva/cancelar/{reservaId}", ([FromRoute] int reservaId,  
    [FromServices] AppDataContext ctx) =>
{
    Reserva? reserva = ctx.Reservas.Find(reservaId);
    if(reserva is null)
    {
        return Results.NotFound();
    }
    
    // Atualiza o veículo para disponível
    var veiculo = ctx.Veiculos.Find(reserva.Placa);
    if (veiculo != null)
    {
        veiculo.Disponivel = "SIM"; // Altera a disponibilidade do veículo
    }

    ctx.Reservas.Remove(reserva);
    ctx.SaveChanges();
    return Results.Ok(reserva);
}); 

//////////////////////// DELETAR USUÁRIO /////////////////////////

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

//////////////////////// DELETAR VEÍCULO /////////////////////////

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

//////////////////////// ALTERAR USUÁRIO /////////////////////////

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

//////////////////////// ALTERAR VEÍCULO /////////////////////////

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
